require('dotenv').config();



const express = require('express')
  , SERVER_CONFIGS = require('./const/server')
  , configureServer = require('./server')
  , configureRoutes = require('./routes')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , helmet = require('helmet')

var stripe = require("stripe")(process.env.LIVESTRIPESECRETKEY)

const app = express();
app.use(helmet())
app.use(cors());

app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());


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
  },  getStripeOrder(res)) 
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


// const app = express();
// app.use(bodyParser.json())
// app.use(cors())

// app.use(express.static(__dirname + '/../build'))




// massive(process.env.CONNECTIONSTRING).then(db => {
//   app.set('db', db);
// })







// app.get('/api/test', (req, res, next) => {
//   console.log("HIT")
//   req.app.get('db').getName.theName().then(prod => res.status(200).send(prod))
// })

// app.get('/', (req, res) => {
//   res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
// });



// app.post('/stripe', (req, res) => {
//   console.log("req.body", req.body)
//   stripe.charges.create(req.body, postStripeCharge(res));
// });





// let PORT = 3232;

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT} yoooooooo`)
// })