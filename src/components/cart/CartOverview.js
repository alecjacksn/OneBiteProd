import React, { Component } from 'react'
import Checkout from './stripe/StripeComp'
import { connect } from 'react-redux'
import { SubTotalCalculator, getProductsInCart } from '../Utils/Utilities'
import { Redirect } from 'react-router-dom';
import { clearReduxCart } from '../../ducks/reducer'
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUB_KEY from '../../constants/stripePubKey'
import axios from 'axios'

const CURRENCY = 'USD';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      redirectHome: false
    }
    this.onToken = this.onToken.bind(this)
    this.redirectHomeFunction = this.redirectHomeFunction.bind(this)
  }

  redirectHomeFunction() {
    this.setState({
      redirectHome: true
    })
  }

  onToken = token => {
    axios.post('/api/stripe',
      {
        stripeToken: token.id,
        amount: SubTotalCalculator(getProductsInCart(this.props.cart)) ? Number(SubTotalCalculator(getProductsInCart(this.props.cart)).toString() + '00') : null,
        currency: CURRENCY,
        description: "Checkout"
      }).then(response => {
        console.log("RESPONSE", response)
        alert(`success`);

      });
  }

  render() {
    const subTotal = SubTotalCalculator(getProductsInCart(this.props.cart)) ? SubTotalCalculator(getProductsInCart(this.props.cart)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "0.00"
    const amount = SubTotalCalculator(getProductsInCart(this.props.cart)) ? Number(SubTotalCalculator(getProductsInCart(this.props.cart)).toString() + '00') : null

    if (this.state.redirectHome) {
      return <Redirect push to='/' />;
    }

    return (
      <div className="overview-container">

        <div className="overview-main-div">
          <div className="overview-summery-header">
            <span>Order Summery</span>


          </div>
          <div className="overview-content-div">
            <div className="overview-sub-div">
              <span>SUBTOTAL</span>
              <span>${subTotal}</span>
              {/* {console.log("NEW FUNCTION TEST", `${SubTotalCalculator(getProductsInCart(this.props.cart)).toString() + '00'}`)} */}
              {/* {console.log("PRODUCTS ARRAY",getProductsInCart(this.props.cart))} */}
            </div>
            <div className="overview-sub-div">
              <span>SHIPPING</span>
              <span>$0.00</span>
            </div>
            <div className="overview-sub-div">
              <span>ESTIMATED TAX</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="overview-checkout">
            <div className="overview-total-spans">
              <span>TOTAL</span>
              <span>${subTotal}</span>
            </div>
            <StripeCheckout
              stripeKey={STRIPE_PUB_KEY}
              token={this.onToken}
              shippingAddress
              billingAddress
              receipt_email
            />
            {/* <Checkout
              clearReduxCart={this.props.clearReduxCart}
              redirectHome={this.redirectHomeFunction}
              name={'OneBite'}
              description={'Checkout'}
              amount={amount}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, { clearReduxCart })(Cart)