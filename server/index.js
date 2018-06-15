require('dotenv').config();



const express = require('express')
  , SERVER_CONFIGS = require('./const/server')
  , configureServer = require('./server')
  , configureRoutes = require('./routes')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , helmet = require('helmet')
  , request = require('request')

var stripe = require("stripe")(process.env.TESTSTRIPESECRETKEY)

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



var options = {
  url: 'https://api.getresponse.com/v3/contacts',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'api-key d8923313fd9d175bfacc991531e34c21'
  }
};

var userData = {
  "name": "Joe Schmoe",
  "email": "joeyschmoey@gmail.com",
  "dayOfCycle": "10",
  "campaign": {
    "campaignId": "90514404"
  },
  "customFieldValues": [
    {
      "customFieldId": "n",
      "value": [
        "white"
      ]
    }
  ],
}

app.post('/api/add/contact', function (req, res, next) {
  var name = req.body.name
  var email = req.body.email
  var job = req.body.job
  console.log("NAME", name)
  console.log("email", email)
  console.log("job", job)
  console.log("THIS WAS HIT")


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
      console.log("BODY", body)
    }
  });


});


