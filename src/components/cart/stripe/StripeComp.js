import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import STRIPE_PUB_KEY from '../../../constants/stripePubKey'
import PAYMENT_SERVER_URL from '../../../constants/stripeServer'
import { clearReduxCart } from '../../../ducks/reducer'


const CURRENCY = 'USD';


const successPayment = (redirectHome, clearReduxCart) => {
  alert('Payment Successful');
  localStorage.clear()
  clearReduxCart()
  return redirectHome(true)
};

const errorPayment = data => {  
  alert('Payment Error', data);
};

const onToken = (amount, description, email, redirectHome, clearReduxCart) => token =>
  axios.post('/api/stripe',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount,
      receipt_email: token.email
    })
    .then(successPayment(redirectHome, clearReduxCart))
    .catch(errorPayment);

const Checkout = ({ name, description, amount, email, redirectHome, clearReduxCart }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    email={toString(email)}
    token={onToken(amount, description, email, redirectHome, clearReduxCart)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUB_KEY}
    shippingAddress
    billingAddress
    receipt_email
  />



export default Checkout