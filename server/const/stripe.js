require('dotenv').config()
const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? process.env.LIVESTRIPESECRETKEY
    : process.env.TESTSTRIPESECRETKEY;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;