require('dotenv').config();



const express = require('express')
  , SERVER_CONFIGS = require('./const/server')
  , configureServer = require('./server')
  , configureRoutes = require('./routes')
  , bodyParser = require('body-parser')
  , cors = require('cors')

var stripe = require("stripe")(process.env.LIVESTRIPESECRETKEY)

const app = express();
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


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
configureServer(app);
// configureRoutes(app);


app.post('/api/stripe', (req, res) => {
  const stripeToken = req.body.stripeToken
  const stripeEmail = req.body.stripeEmail
  console.log("STRIPE TOKEN", stripeToken)
  console.log("REQ . BODY", req.body)
  console.log("EMAILLLL", stripeEmail)
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