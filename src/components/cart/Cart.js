import React, { Component } from 'react'
import OverView from './CartOverview'
import { displayProductsInCart, getProductsInCart, removeItemFromCart, CountNumberOfItemsInCart } from '../Utils/Utilities'
import { connect } from 'react-redux'
import { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart } from '../../ducks/reducer'
import _ from 'underscore-node'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.updateQuantity = this.updateQuantity.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.saveCart = this.saveCart.bind(this)
  }

  updateQuantity(id, input) {
    console.log("Input", input)
    var inputForParam = input ? input : 0
    console.log("id", id)
    if (id === 1) {
      this.props.updateItem1Quantity(Number(input))
    }
    if (id === 2) {
      this.props.updateItem2Quantity(Number(inputForParam))
    }
    if (id === 3) {
      this.props.updateItem3Quantity(Number(input))
    }
  }

  componentWillMount() {
    var theCart11 = this.props.cart
  }

  saveCart(arr) {
    console.log("ARRRRR", arr)
    localStorage.setItem('cart', arr)
    return this.props.addToCart(arr)
  }

  clearCart(id){
    console.log("ID ID ID ID ID", id)
    var cart = this.props.cart
    var filteredArray = _.without(cart, id.toString())
    if(id === 1){
      this.props.updateItem1Quantity(0)
      this.props.showItemInCart(id, false)
    }
    if(id === 2){
      this.props.updateItem2Quantity(0)
      this.props.showItemInCart(id, false)
    }
    if(id === 3){
      this.props.updateItem3Quantity(0)
      this.props.showItemInCart(id, false)
    }
    return this.saveCart(filteredArray)
  }


  testerFunction(cart) {
    var item1 = this.props.item1
    var item2 = this.props.item2
    var item3 = this.props.item3
    var numOfItems = 3
    var newCartArray = [];
    newCartArray.push(Array.isArray(cart) ? cart : cart.split(" "))
    var difference;
    var map = newCartArray[0].reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
    for (var i = 0; i < numOfItems; i++) {
      var id = i + 1;
      var theItem = id === 1 ? item1 : id === 2 ? item2 : id === 3 ? item3 : null
      // gets the difference between the input and the number of that item in the cart
      difference = (theItem > map[id]) ? theItem - map[id] : map[id] - theItem
      
    
      if (!map[id] && theItem > 0) {
        for (var i = 0; i < theItem; i++) {
          newCartArray[0].push(id.toString())
        }
        return this.saveCart(newCartArray[0])
      }

      if (theItem > map[id]) {
        for (var i = 0; i < difference; i++) {
          newCartArray[0].push(id.toString())
        }
        return this.saveCart(newCartArray[0])

      } else if (theItem < map[id]) {
        for (var i = 0; i < difference; i++) {
          newCartArray[0].splice(newCartArray[0].indexOf(id.toString()), 1)
          // console.log("CARTTTTT", cart)
        }
        return this.saveCart(newCartArray[0])
      }
    }
    console.log("NEW CART ARRAY", newCartArray[0])
  }



  countNumberOfItems(cart) {
    console.log("CART", cart)
    // console.log("IS ARRAY FUNCTION", Array.isArray(cart) ? cart : cart.split(" "))
    if (cart) {
      if (cart.length >= 0) {
        this.testerFunction(cart)
      }
    }
  }

  render() {

    console.log("LOCAL STORAGEEEE", localStorage.getItem('cart'))
    return (
      <div className="cart-home-container">
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.35rem', paddingRight: '25px', fontWeight: '700' }}>Cart</span>
        </div>
        <div>
          <div className="cart-container">
            <div className="cart-displayed-container">
              <div style={{ margin: '0 20px', marginTop: '25px', paddingLeft: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0, .4)' }}>
                <span style={{ fontSize: '1.85em', color: 'rgba(0,0,0, .8)', fontWeight: '400' }}>Items in Your Cart</span>
              </div>
              {this.countNumberOfItems(this.props.cart)}
              {displayProductsInCart(getProductsInCart(this.props.cart), removeItemFromCart, this.props.addToCart, this.props.cart, this.updateQuantity, this.props.item1, this.props.item2, this.props.item3, this.props.displayItem1, this.props.displayItem2, this.props.displayItem3, this.clearCart)}
            </div>
            <OverView />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps, { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart })(Cart)