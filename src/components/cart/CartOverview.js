import React, { Component } from 'react'
import Checkout from './stripe/StripeComp'
import { connect } from 'react-redux'
import { SubTotalCalculator, getProductsInCart } from '../Utils/Utilities'
import { Redirect } from 'react-router-dom';
import { clearReduxCart } from '../../ducks/reducer'

import { Select } from 'antd';


import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUB_KEY from '../../constants/stripePubKey'



// import { StripeProvider } from 'react-stripe-elements';
// import MyStoreCheckout from './MyStoreCheckout';


import axios from 'axios'


const Option = Select.Option;
const CURRENCY = 'USD';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      redirectHome: false,
      buttonDisabled: true
    }
    this.onToken = this.onToken.bind(this)
    this.redirectHomeFunction = this.redirectHomeFunction.bind(this)
  }

  redirectHomeFunction() {
    this.setState({
      redirectHome: true
    })
  }

  successPayment() {
    alert('Payment Successful');
    localStorage.clear()
    this.props.clearReduxCart()
    return this.redirectHomeFunction(true)
  };

  onToken = (token) => {
    console.log("TOKENNNN", token)
    axios.post('/api/stripe',
      {
        stripeToken: token.id,
        amount: SubTotalCalculator(getProductsInCart(this.props.cart)) ? Number(SubTotalCalculator(getProductsInCart(this.props.cart)).toString() + '00') : null,
        currency: CURRENCY,
        description: "Checkout",
        stripeEmail: token.email

      }).then(response => {
        console.log("TOKEN.EMAIL", token.email)
        this.successPayment()
        console.log("RESPONSE", response)
        alert(`success`);

      }).catch(err => {
        this.successPayment()
        console.log("ERROR", err)
        alert("There was an error. Please contact support@onebite.com", err)
      });
  }

  onClickPay() {
    console.log("CLICKEDDDDDDDD")
  }


  handleChange(value) {
    console.log(`selected ${value}`);
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
            <div style={{ padding: '20px 0px 20px 0px'}}>
              <span style={{fontSize: '14px'}}>Occupation (required)</span>
              <Select
                showSearch
                style={{ width: '100%', marginTop: '2px' }}
                placeholder="Select an Occupation"
                optionFilterProp="children"
                onChange={(e) => this.handleChange(e)}

                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="general dentist">General Dentist</Option>
                <Option value="prosthodontist">Prosthodontist</Option>
                <Option value="dental technician">Dental Technician</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>
            {/* <StripeProvider apiKey={STRIPE_PUB_KEY}>
              <MyStoreCheckout />
            </StripeProvider> */}


            <StripeCheckout
              stripeKey={STRIPE_PUB_KEY}
              token={this.onToken}
              shippingAddress
              billingAddress
              receipt_email
              name="OneBite"
              disabled={this.state.buttonDisabled}
              onClick={() => this.onClickPay()}
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