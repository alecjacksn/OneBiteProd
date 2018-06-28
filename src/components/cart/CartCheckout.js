import React, { Component } from 'react'
import { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart, updateOrderRes, clearRedux, clearReduxCart, tokenFalse } from '../../ducks/reducer'
import { SubTotalCalculator, getProductsInCart } from '../Utils/Utilities'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import products from '../onebite/products/productsList'
import mapIcon from '../../images/map-marker.png'
import { Button, Icon, Spin, Modal } from 'antd';
import moment from 'moment'
import axios from 'axios'
import ReactGA from 'react-ga'


class CartCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeShippingChoice: '',
      orderRes: {},
      finishedLoading: false,
      redirectHome: false,
      loading: false,
      tokenObj: {},
      tokenFinished: false
    }
    this.redirectHomeFunction = this.redirectHomeFunction.bind(this)
  }


  componentDidMount() {
    this.setState({
      tokenObj: this.props.tokenObj
    })
  }


  componentWillMount() {
    var orderId = localStorage.getItem('orderId')
    var tokenId = localStorage.getItem('tokenId')
    axios.post('/api/get-order', { token: orderId }).then(res => {
      this.props.updateOrderRes(res.data.success)
      this.setState({
        activeShippingChoice: res.data.success.selected_shipping_method,
        orderRes: res.data.success,
        finishedLoading: true,
        tokenObj: this.props.tokenObj,
        tokenCard: this.props.tokenObj.card
      })
      axios.post('/api/get-token', { token: tokenId }).then(res => {
        this.setState({
          tokenFinished: true,
          tokenObj: res.data.success
        })
      })
    })
  }

  displayItems() {
    var item1 = this.props.item1
    var item2 = this.props.item2
    var item3 = this.props.item3
    var displayedArr = []
    for (var i = 0; i < products.length; i++) {
      if (eval(`item${i + 1}`)) {
        var div = (
          <div key={i} className="checkout-mapped-item-div">
            <div className="checkout-img-div">
              <img alt="OneBite Product" src={products[i].image} className="checkout-mapped-img" />
            </div>
            <div className="checkout-mapped-info-container">
              <div className="checkout-mapped-info">
                <span>{products[i].name}</span>
                <span>Quantity: {eval(`item${i + 1}`)}</span>
              </div>
              <span className="checkout-mapped-price">${products[i].price * eval(`item${i + 1}`)}.00</span>

            </div>
          </div>
        )
        displayedArr.push(div)
      }
    }
    return displayedArr
  }

  removeFedEx(str) {
    var newStr = str.split(" ")
    if (newStr[0] === 'FedEx') {
      newStr.shift()
      return newStr.join(" ")
    } else {
      return str
    }

  }


  moneyFormat(num) {
    var re = /\b(\d+)(\d{2})\b/;
    var subst = '$1.$2';
    var str = num.toString();
    if (str.length <= 2) {
      return `0.${num}`
    }
    var result = str.replace(re, subst);
    return result
  }

  updateShipping(id, orderId) {
    axios.post('/api/update-order-shipping', { orderId: orderId, shippingId: id })
      .then(res => {
        this.props.updateOrderRes(res.data.success)
        this.setState({
          activeShippingChoice: id,
          orderRes: res.data.success
        })
      })
    ReactGA.event({
      category: 'Updated Shipping',
      action: 'Updated shipping option',
      value: id
    })
    this.getAmount()
    return this.displayShippingOptions(this.props.orderRes.shipping_methods, this.props.orderRes.selected_shipping_method, this.props.orderRes.id)
  }

  displayShippingOptions(options, activeShippingChoice, orderId) {

    var displayArr = []
    var x;
    options.forEach((e, i) => {
      var x = (
        <div key={i} className="checkout-shipping-button-div">
          {e.id === this.state.activeShippingChoice ? <Icon className="check-icon" type="check" /> : <Icon className="check-icon-hidden" type="check" />}
          <Button onClick={() => this.updateShipping(e.id, orderId)} type={e.id === this.state.activeShippingChoice ? 'primary' : null} ghost={e.id === this.state.activeShippingChoice ? true : false} className="checkout-shipping-button">
            <div className="checkout-shipping-info-div" style={{ paddingBottom: '5px' }}>
              <span className="checkout-shipping-span">{this.removeFedEx(e.description)}</span>
              <span className="checkout-shipping-span">${this.moneyFormat(e.amount)}</span>
            </div>
            <div className="checkout-shipping-info-div">
              <span>Delivery:</span>
              <span>{moment(e.delivery_estimate ? e.delivery_estimate.date : "N/A").format('DD MMMM YYYY')}</span>
            </div>
          </Button>
        </div>
      )
      displayArr.push(x)
    })
    // console.log("OPTIONS", options)
    return displayArr
  }

  getAmount() {
    return `$${this.moneyFormat(this.state.orderRes.amount)}`
  }

  getShippingCost(options, active) {
    return options.map((e, i) => {
      if (e.id === active) {
        return `$${this.moneyFormat(e.amount)}`
      }
    })
  }

  getTaxCost(obj) {
    var items = obj.items
    return items.map((e, i) => {
      if (e.description === "Sales tax") {
        return `$${this.moneyFormat(e.amount)}`
      }
    })
  }

  redirectHomeFunction() {
    this.setState({
      redirectHome: true
    })
    return this.props.tokenFalse()
  }

  successPayment() {
    localStorage.clear()
    this.props.clearReduxCart()
    this.props.clearRedux()
    this.success()
    // return this.redirectHomeFunction(true)
  };

  success() {
    Modal.success({
      title: 'Your order has been placed!',
    });
    return this.redirectHomeFunction(true)
  }

  errorPayment(data) {
    alert(`There was an issue with your order. Please contact support@onebite.com. We Apologize for the inconvenience :(`, );
    localStorage.clear()
    this.props.clearReduxCart()
    return this.redirectHomeFunction(true)
  };



  checkoutAndPay() {
    var orderId = this.state.orderRes.id
    var tokenId = this.state.tokenObj.id
    this.setState({
      loading: true
    })
    axios.post('/api/pay-for-order', {
      orderId: orderId,
      tokenId: tokenId
    }).then(response => {
      this.setState({
        loading: false
      })
      ReactGA.event({
        category: 'PAY Pressed',
        action: 'Order Placed',        
    })
      return this.successPayment()
    }).catch(err => {
      console.log("ERROR", err)
      // return this.errorPayment()
      return this.errorPayment()
    });
  }




  render() {
    // console.log('order res', this.props.orderRes)
    var shippingOptions = this.state.orderRes.shipping_methods;
    var activeShippingChoice = this.state.orderRes.selected_shipping_method
    const subTotal = SubTotalCalculator(getProductsInCart(this.props.cart)) ? SubTotalCalculator(getProductsInCart(this.props.cart)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "0.00"
    var orderId = this.props.orderRes.id

    var shippingAdd = this.state.orderRes.shipping
    var userInfo = this.state.tokenObj


    if (this.props.updatedTokenObj === false) {
      return <Redirect push to='/cart' />;
    }

    if (this.state.redirectHome) {
      return <Redirect push to='/' />;
    }

    return (
      <div className="checkout-home-container">
        <div className="checkout-home-top-div">
          <div className="checkout-top-header">
            <span>Checkout</span>
          </div>
          <div className="checkout-items-container">
            <div className="checkout-items-div">
              {this.displayItems()}
            </div>
          </div>
          <div className="checkout-shipping-container">
            {
              this.state.finishedLoading ?
                <div className="checkout-shipping-container-div">
                  <div style={{ marginTop: '15px' }}>
                    <img src={mapIcon} alt="Map Icon" />
                  </div>
                  <div className="checkout-shipping-options-div">
                    {shippingOptions ? this.displayShippingOptions(shippingOptions, activeShippingChoice, orderId) : null}
                  </div>
                </div>
                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Spin size="large" className="ant-d-spinner" />
                </div>
            }
          </div>
          <div className="checkout-shipping-review-container">
            {
              this.state.tokenFinished ?
                <div className="checkout-shipping-review-div">
                  <div className="checkout-review-info-container">
                    <div className="checkout-review-spans">
                      <span>Name</span>
                      <span>{this.state.tokenFinished ? userInfo.card.name : null}</span>
                    </div>
                    <div className="checkout-review-spans">
                      <span>Email</span>
                      <span>{this.state.tokenFinished ? userInfo.email : null}</span>
                    </div>
                    <div className="checkout-review-spans">
                      <span>Card</span>
                      <span>{this.state.tokenFinished ? `******${userInfo.card.last4}` : null}</span>
                    </div>
                    <div className="checkout-review-spans">
                      <span>Address</span>
                      <span id="checkout-info-address-span">{this.state.finishedLoading ? `${shippingAdd ? shippingAdd.address.line1 + " " + shippingAdd.address.city + " " + shippingAdd.address.state + " " + shippingAdd.address.postal_code + " " + shippingAdd.address.country : "N/A"}` : null}</span>
                    </div>
                  </div>
                  <div className="checkout-review-div">
                    <div className="checkout-review-spans">
                      <span>Products</span>
                      <span>{this.state.finishedLoading ? `$${subTotal}` : null}</span>
                    </div>
                    <div className="checkout-review-spans">
                      <span>Shipping</span>
                      <span>{this.state.finishedLoading ? this.getShippingCost(shippingOptions, activeShippingChoice) : null}</span>
                    </div>
                    <div className="checkout-review-spans">
                      <span>Tax</span>
                      <span>{this.state.finishedLoading ? this.getTaxCost(this.state.orderRes) : null}</span>
                    </div>
                    <div className="checkout-review-spans checked-total">
                      <span>Total</span>
                      <span>{this.state.finishedLoading ? `$${this.moneyFormat(this.state.orderRes.amount)}` : null}</span>
                    </div>
                    <div>
                      <Button loading={this.state.loading} onClick={() => this.checkoutAndPay()} type="primary" className="checkout-pay-button">Pay</Button>
                    </div>
                  </div>

                </div>

                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Spin size="large" className="ant-d-spinner" />
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart, updateOrderRes, clearRedux, clearReduxCart, tokenFalse })(CartCheckout)