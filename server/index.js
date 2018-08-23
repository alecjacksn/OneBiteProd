require('dotenv').config();

const auth_controller = require('./auth_controller')
const user_controller = require('./user_controller')
const express = require('express')
  , SERVER_CONFIGS = require('./const/server')
  , configureServer = require('./server')
  , configureRoutes = require('./routes')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , helmet = require('helmet')
  , request = require('request')
  , passport = require('passport')
  , massive = require('massive')
  , Auth0Strategy = require('passport-auth0')
  , session = require('express-session')

var stripe = require("stripe")(process.env.LIVESTRIPESECRETKEY)

const app = express();
app.use(cors());
app.use(helmet())

app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

massive(process.env.CONNECTIONSTRING).then(db => {
  app.set('db', db);
})


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  expires: 172800000
}));


app.use(passport.initialize());
app.use(passport.session());

////////////////////////////    Authentication \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {
  const db = app.get('db');
  db.users.find_user(profile.id).then(user => {
    if (user[0]) {
      userStuff = true
      return done(null, user);
    } else {
      userStuff = false
      db.users.create_user([profile.id, profile.picture, profile.displayName, profile.emails[0].value])
        .then(user => {
          return done(null, user);
        })
    }
  }).catch(
    console.log('error')
  )
}))


passport.serializeUser((user, done) => {
  if (user[0].user_company === null) {
    userStuff = false
  } else { userStuff = true }
  done(null, user);
})

// USER COMES FROM SESSION - INVOKED ON EVERY ENDPOINT.
passport.deserializeUser((obj, done) => {
  return done(null, obj[0]);
})

app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'https://www.onebite.com/#/',
  failureRedirect: 'https://www.onebite.com/#/'
}))


app.get('/login/user', auth_controller.login);
app.get('/logout', auth_controller.logout);


app.get('/auth/authorized', (req, res) => {
  if (!req.user) {
    return res.status(403).send(false)
  } else {
    return res.status(200).send(req.user);
  }
})



app.get('/auth', passport.authenticate('auth0'));




const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("ERRROR", stripeErr)
    res.status(500).send({ error: stripeErr });
  } else {
    // console.log("SUCCESS", stripeRes)
    res.status(200).send({ success: stripeRes });
  }
}


const postStripeOrder = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("ERRROR", stripeErr)
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}



const getStripeToken = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("ERRROR", stripeErr)
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}




const getStripeOrder = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log("ERRROR", stripeErr)
    res.status(500).send({ error: stripeErr });
  } else {
    // console.log("STRIPE RES", stripeRes)    
    res.status(200).send({ success: stripeRes });
  }
}







const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
configureServer(app);
// configureRoutes(app);


app.post('/api/get-token', (req, res) => {
  // console.log("REQ . BODY", req.body.token)
  stripe.tokens.retrieve(
    req.body.token,
    getStripeToken(res)
  );
})


app.post('/api/get-order', (req, res) => {
  // console.log("THIS WAS HIT", req.body)
  stripe.orders.retrieve(
    req.body.token,
    getStripeToken(res)
  );
})





app.post('/api/update-order-shipping', (req, res) => {
  var orderId = req.body.orderId
  var shippingId = req.body.shippingId

  stripe.orders.update(orderId, {
    selected_shipping_method: shippingId
  }, getStripeOrder(res))
});



app.post('/api/pay-for-order', (req, res) => {
  stripe.orders.pay(req.body.orderId, {
    source: req.body.tokenId // obtained with Stripe.js
  }, getStripeOrder(res))
})





app.post('/api/stripe', (req, res) => {
  const stripeToken = req.body.stripeToken
  const stripeEmail = req.body.stripeEmail
  stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: stripeToken,
    description: req.body.description,
    receipt_email: stripeEmail
  }, postStripeCharge(res))
});


app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log(`Server running on port ${SERVER_CONFIGS.PORT}`);
});



app.post('/api/create-order', (req, res) => {
  // console.log("REQ.body", req.body)
  stripe.orders.create(req.body, postStripeOrder(res))
})


app.post('/api/edituser', user_controller.edit_user)


// app.get('/api/user/:id', user_controller.user_by_id)

app.post('/api/user/:id', (req, res, next) => {
  req.app.get('db').users.user_by_id(req.params.id).then(response => res.status(200).send(response))
})



app.post('/api/add/contact', function (req, res, next) {
  var name = req.body.name
  var email = req.body.email
  var job = req.body.job



  request({
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': process.env.GETRESPONSEAPI
    },
    url: 'https://api.getresponse.com/v3/contacts',
    body: JSON.stringify({
      "name": name,
      "email": email,
      "campaign": {
        "campaignId": job
      }
    }),
    method: 'POST'
  }, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    } else {
      // console.log("HET IT WORKED", httpResponse)

    }
  });


});


