import React, { Component } from 'react'
import Checkout from './stripe/StripeComp'
import { connect } from 'react-redux'
import { SubTotalCalculator, getProductsInCart } from '../Utils/Utilities'
import { Redirect } from 'react-router-dom';
import { clearReduxCart } from '../../ducks/reducer'

import { Select } from 'antd';


import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUB_KEY from '../../constants/stripePubKey'



import axios from 'axios'


const Option = Select.Option;
const CURRENCY = 'USD';
const generalDentistId = "90514104"
const prosthodontistId = "90514404"
const dentalTechnicianId = "90514504"
const otherId = ""


class Cart extends Component {
  constructor() {
    super();

    this.state = {
      redirectHome: false,
      buttonDisabled: true,
      Occupation: ''
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

  errorPayment(data) {
    console.log("IT WAS AN ERROR HERE", data)
    alert('Payment Error', data);
    localStorage.clear()
    this.props.clearReduxCart()
    return this.redirectHomeFunction(true)
  };

  onToken = (token) => {
    console.log("TOKENNNN", token)
    var headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "X-Auth-Token": "e046bc4a0c1ed2e2e64bcbe35be21b84"
    }
    axios.post('/api/stripe',
      {
        stripeToken: token.id,
        amount: SubTotalCalculator(getProductsInCart(this.props.cart)) ? Number(SubTotalCalculator(getProductsInCart(this.props.cart)).toString() + '00') : null,
        currency: CURRENCY,
        description: "Checkout",
        stripeEmail: token.email

      }).then(response => {
    
        // console.log("TOKEN.EMAIL", token.email)
        // console.log("CARD NAME", token.card.name)
        // console.log("RESPONSE FROM API/STRIPE", response)
        // axios.post('https://api3.getresponse360.com/v3/contacts',
        //   {
        //     "name": token.card.name,
        //     "email": token.email,
        //     "campaign": {
        //       "campaignId": this.state.Occupation
        //     }, headers: {
        //       "Content-Type": "application/json",      
        //       "Access-Control-Allow-Origin": "https://onebite.com",        
        //     }

        //   }).then(res => {
            // console.log("RESPONSE", response)
            return this.successPayment()
          // })

      }).catch(err => {
        console.log("ERROR", err)
        return this.errorPayment()
      });
  }

  onClickPay() {
    console.log("CLICKEDDDDDDDD")
  }


  handleChange(value) {
    console.log(`selected ${value}`);
    this.setState({
      Occupation: value,
      buttonDisabled: false
    })
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
            {/* <div className="overview-sub-div">
              <span>ESTIMATED TAX</span>
              <span>$0.00</span>
            </div> */}
          </div>
          <div className="overview-checkout">
            <div className="overview-total-spans">
              <span>TOTAL</span>
              <span>${subTotal}</span>
            </div>
            <div style={{ padding: '20px 0px 20px 0px' }}>
              <span style={{ fontSize: '14px' }}>Occupation (required)</span>
              <Select
                showSearch
                style={{ width: '100%', marginTop: '2px' }}
                placeholder="Select an Occupation"
                optionFilterProp="children"
                onChange={(e) => this.handleChange(e)}

                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="90514104">General Dentist</Option>
                <Option value="90514404">Prosthodontist</Option>
                <Option value="90514504">Dental Technician</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>


            <StripeCheckout
              stripeKey={STRIPE_PUB_KEY}
              token={this.onToken}
              shippingAddress
              billingAddress
              receipt_email
              name="OneBite"
              disabled={true}
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