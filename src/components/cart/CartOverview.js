import React, { Component } from 'react'
// import Checkout from './stripe/StripeComp'
import { connect } from 'react-redux'
import { SubTotalCalculator, getProductsInCart, createOrdersObj } from '../Utils/Utilities'
import { Redirect } from 'react-router-dom';
import { clearReduxCart, updateOrderObj, updateUserOccupation, updateTokenObj, updateOrderRes } from '../../ducks/reducer'


import productsList from '../onebite/products/productsList'
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUB_KEY from '../../constants/stripePubKey'
import ReactGA from 'react-ga'
import { Tooltip, Select, Icon, Modal, Spin } from 'antd';

import axios from 'axios'


const Option = Select.Option;
const CURRENCY = 'USD';
const generalDentistId = "6aSAY"
const prosthodontistId = "6aSbe"
const dentalTechnicianId = "6aSRi"
const otherId = "6rLqp"


class Cart extends Component {
  constructor() {
    super();

    this.state = {
      redirectHome: false,
      buttonDisabled: true,
      occupation: '',
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
        return this.successPayment()

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
    var item1SKU = productsList[0].liveSKU
    var item2SKU = productsList[1].liveSKU
    var item3SKU = productsList[2].liveSKU
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
        this.newUpdate(name, token.email, this.state.occupation)
        this.props.updateUserOccupation(true)
        this.props.updateOrderRes(response.data.success)
        localStorage.setItem("orderId", response.data.success.id)
        localStorage.setItem("tokenId", token.id)
        this.showModal(false)
        return this.redirectFuntion()
      }).catch(err => {
        console.log("ERROR", err)
      });
  }



  newUpdate(name, email, job) {
    axios.post('/api/add/contact', {
      name: name,
      email: email,
      job: job
    }).then(res => {
      // console.log('RESSS', res)
    }).catch(err => {
      // console.log("ERROR", err)
    })
  }


  redirectFuntion() {
    this.setState({
      redirectToCheckout: true
    })
  }


  updateUserJob(value) {
    this.setState({
      occupation: value,
      buttonDisabled: false
    })
    ReactGA.event({
      category: 'Button Clicked',
      action: `Selected Occupation ${value}`,      
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
              onClick={() => console.log("SELECT WQAS HIT TOO")}
              showSearch
              style={{ width: '100%', marginTop: '2px' }}
              placeholder="Select an Occupation"
              optionFilterProp="children"
              onChange={(e) => this.updateUserJob(e)}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option onClick={() => console.log("THIS WAS HIT", "general dentist")} value="6aSAY">General Dentist</Option>
              <Option value="6aSbe">Prosthodontist</Option>
              <Option value="6aSRi">Dental Technician</Option>
              <Option value="6rLqp">Other</Option>
            </Select>
          </div>

          <div className="overview-stripe-button-div">
            <StripeCheckout
              stripeKey={STRIPE_PUB_KEY}
              token={this.createOrder}
              shippingAddress={true}
              billingAddress={true}
              zipCode={true}
              receipt_email
              name="OneBite"
              disabled={this.state.buttonDisabled}
              panelLabel="Review Order"
              label={"Proceed to Checkout"}
            />
          </div>
        </div>
        <Modal
          className="model-cart-waiting"
          visible={this.state.visible}
          style={{ background: 'none' }}
        >
          <Spin size="large" className="ant-d-spinner" />
        </Modal>
        <div className="overview-shipping-div">
          <span style={{ paddingRight: '5px' }}>Shipping</span>
          <Tooltip placement="right" title={"Shipping information and options are provided in the next section."}>
            <Icon type="question-circle-o" />
          </Tooltip>
        </div>
        <div className="overview-total-spans">
          <span>Subtotal</span>
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