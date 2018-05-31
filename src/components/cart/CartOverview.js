import React, { Component } from 'react'
import Checkout from './stripe/StripeComp'
import { connect } from 'react-redux'
import { SubTotalCalculator, getProductsInCart, createOrdersObj } from '../Utils/Utilities'
import { Redirect } from 'react-router-dom';
import { clearReduxCart, updateOrderObj, updateUserOccupation, updateTokenObj, updateOrderRes } from '../../ducks/reducer'


import productsList from '../onebite/products/productsList'
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUB_KEY from '../../constants/stripePubKey'

import { Tooltip, Button, Select, Icon, Modal, Spin } from 'antd';

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
      Occupation: '',
      redirectToCheckout: false,
      visible: false
    }
    this.onToken = this.onToken.bind(this)
    this.redirectHomeFunction = this.redirectHomeFunction.bind(this)
    this.createOrder = this.createOrder.bind(this)
  }



  componentDidMount() {
    // var item1 = this.props.item1
    // var item2 = this.props.item2
    // var item3 = this.props.item3
    // var item1SKU = productsList[0].testSKU
    // var item2SKU = productsList[1].testSKU
    // var item3SKU = productsList[2].testSKU

    // if (item1 == false && item2 == false && item3 == false) {
    //   console.log("THEY ARE ALL FALSE")
    // } else {
    //   createOrdersObj(
    //     item1,
    //     item2,
    //     item3,
    //     item1SKU,
    //     item2SKU,
    //     item3SKU,
    //     this.props.updateOrderObj,
    //     this.createOrder
    //   )
    // }
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

  successToken() {

  }

  onToken = (token) => {    
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



  testToken = (token, shippingAddress) => {
    axios.post('/api/create-order',
      {
        stripeToken: token.id,
        amount: SubTotalCalculator(getProductsInCart(this.props.cart)) ? Number(SubTotalCalculator(getProductsInCart(this.props.cart)).toString() + '00') : null,
        currency: CURRENCY,
        description: "Checkout",
        stripeEmail: token.email,
        token1: token,
        shippingAddress: shippingAddress

      }).then(response => {        
      }).catch(err => {
        console.log("ERROR", err)
        // return this.errorPayment()
      });
  }


  showModal(inp) {
    return this.setState({
      visible: inp
    })
  }



  createOrder(token, shippingAddress) {
    var item1 = this.props.item1
    var item2 = this.props.item2
    var item3 = this.props.item3
    var item1SKU = productsList[0].testSKU
    var item2SKU = productsList[1].testSKU
    var item3SKU = productsList[2].testSKU
    var name = token.card.name
    var line1 = shippingAddress.billing_address_line1
    var city = shippingAddress.billing_address_city
    var state = shippingAddress.billing_address_state
    var country = shippingAddress.billing_address_country
    var zip = shippingAddress.billing_address_zip
    this.props.updateTokenObj(token)
    this.showModal(true)

    var returnedOrderObj = createOrdersObj(
      item1,
      item2,
      item3,
      item1SKU,
      item2SKU,
      item3SKU,
      name,
      line1,
      city,
      state,
      country,
      zip,
      token.email,
      this.props.updateOrderObj,
    )

    axios.post('/api/create-order', returnedOrderObj)
      .then(response => {
        this.props.updateUserOccupation(true)
        this.props.updateOrderRes(response.data.success)
        localStorage.setItem("orderId", response.data.success.id)
        localStorage.setItem("tokenId", token.id)
        this.showModal(false)
        return this.redirectFuntion()
      }).catch(err => {
        console.log("ERROR", err)
        // return this.errorPayment()
      });
  }






  // testGetResponse() {
  //   axios.post('https://api3.getresponse360.com/v3/contacts',
  //     {
  //       "name": "Jan Kowalski",
  //       "email": "testeremail@gmail.com",
  //       "dayOfCycle": "10",
  //       "campaign": {
  //         "campaignId": "jf7e3jn"
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
  //         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  //         "X-Auth-Token": "",
  //         "X-Domain": "onebite.com"
  //       }

  //     }).then(res => {
  //       console.log("RESPONSE", res)
  //     })
  // }

  // testsomething() {
  //   axios({
  //     method: 'POST',
  //     url: "https://api3.getresponse360.com/v3/contacts",
  //     crossDomain: true,
  //     data: {
  //       "name": "Jan Kowalski",
  //       "email": "testeremail@gmail.com",
  //       "dayOfCycle": "10",
  //       "campaign": {
  //         "campaignId": "jf7e3jn"
  //       }
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE',
  //       "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  //       "X-Auth-Token": "",
  //       "X-Domain": "onebite.com"
  //     }
  //   }).then((res) => console.log("RES", res)).catch((error) => { console.log("ERRORRRR", error); });
  // }

  redirectFuntion() {
    this.setState({
      redirectToCheckout: true
    })
  }


  onClickPay() {
    console.log("CLICKEDDDDDDDD")
  }


  handleChange(value) {    
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

    if (this.state.redirectToCheckout) {
      return <Redirect push to='/cart-checkout' />;
    }

    return (
      <div className="overview-container">
        <div className="overview-checkout">

          <div>
            <span style={{ fontSize: '14px' }}>Occupation (required)</span>
            <Select
              showSearch
              style={{ width: '100%', marginTop: '2px' }}
              placeholder="Select an Occupation"
              optionFilterProp="children"
              onChange={(e) => this.props.updateUserOccupation(e)}

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
            token={this.createOrder}
            shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            receipt_email
            name="OneBite"
            disabled={false}
            panelLabel="Review Order"
            label={"Proceed to Checkout"}
          />
        </div>
        <Modal
          className="model-cart-waiting"          
          visible={this.state.visible}
          style={{background: 'none'}}
        >
          <Spin size="large" className="ant-d-spinner" />
        </Modal>
        <div style={{ padding: '30px 10px' }}>
          <span style={{ paddingRight: '5px' }}>Shipping</span>
          <Tooltip placement="right" title={"Shipping information and options are provided in the next section."}>
            <Icon type="question-circle-o" />
          </Tooltip>
        </div>
        <div className="overview-total-spans">
          <span>TOTAL</span>
          <span>${subTotal}</span>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, { clearReduxCart, updateOrderObj, updateUserOccupation, updateTokenObj, updateOrderRes })(Cart)