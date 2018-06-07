import React from 'react'
import productsList from '../onebite/products/productsList'
import _ from 'underscore-node'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { message, Modal } from 'antd';
const confirm = Modal.confirm;




export function getProductsInCart(cart) {
  if (cart) {
    const products = productsList
    const inCart = cart
    // var result = _.difference(products, inCart)
    var productsArray = []
    if (inCart.length > 1) {
      inCart.map((e, i) => {
        for (var q = 0; q < products.length; q++) {
          if (e === products[q].id.toString()) {
            // console.log("ARRAY TRUE")
            productsArray.push(products[q])
          }
        }

      })
      // console.log("TEST ARRAY", productsArray)
      return productsArray
    } else {
      products.map((e, i) => {
        if (inCart.includes(e.id.toString())) {
          return productsArray.push(e)
        }
      })
    }
    return productsArray
  }
  return null
}

export function SubTotalCalculator(cartItems) {
  if (cartItems) {    
    if (cartItems.length > 1) {
      Array.prototype.sum = function (prop) {
        var total = 0
        for (var i = 0, _len = this.length; i < _len; i++) {
          total += this[i][prop]
        }
        return total
      }
      return cartItems.sum("price")
    }    
    return cartItems[0] ? cartItems[0].price : ''
  }
  return null
}


export function displayProductsInCart(cartItems, removeFunction, removeFromReduxFunction, cartFromRedux, updateQuantityFunction, item1, item2, item3, display1, display2, display3, clearCart) {

  var displayArray = []
  if (cartItems) {
    if (!display1 && !display2 && !display3) {
      return (
        <div className="nothing-in-cart">
          <span>Your cart is empty! </span>
        </div>
      )
    }
    productsList.forEach((e, i) => {
      if ((e.id === 1 && display1 === false) || (e.id === 2 && display2 === false) || (e.id === 3 && display3 === false)) {
        return null
      }
      var contentDiv = (
        <div key={i} className="cart-item-displayed-container">
          <div className={i === 2 ? "cart-item-displayed-div-last" : "cart-item-displayed-div"}>
            <div className="cart-img-div">
              <img src={e.image} alt="the product" />
            </div>
            <div className="cart-item-content">
              <div className="cart-item-content-header">
                <span>{e.name}</span>
                <div className="cart-display-pricing-div">
                  <span>{e.displayPrice}</span>
                  <div>
                    <input maxLength={2} placeholder={0} onChange={(e) => updateQuantityFunction(i + 1, e.target.value)} className="cart-quantity-input" defaultValue={e.id === 1 ? item1 : e.id === 2 ? item2 : item3} />
                  </div>
                  <span>${(parseInt(e.price) * Number(eval(`item${e.id}`))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
                </div>
              </div>
              <span onClick={() => showConfirm(i, removeFromReduxFunction, cartFromRedux, clearCart)} className="cart-remove-button">Remove</span>
            </div>
          </div>

        </div>
      )
      displayArray.push(contentDiv)
    })
    return displayArray

  } else {
    return (
      <div className="nothing-in-cart">
        <span>Your cart is empty! </span>
      </div>
    )
  }
}

export function removeItemFromCart(index, removeFromRedux, redux, clearCart) {
  var id = index + 1
  clearCart(id)
}


function submit(index, removeFromRedux, redux, clearCart) {
  confirmAlert({
    title: 'Remove Item?',
    // message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          message.success(`Removed`);
          return removeItemFromCart(index, removeFromRedux, redux, clearCart)
        }
      },
      {
        label: 'No',
        onClick: () => {          
          return null
        }
      }
    ]
  })
};

function showConfirm(index, removeFromRedux, redux, clearCart) {
  confirm({
    title: 'Do you Want to delete these items?',
    // content: 'Some descriptions',
    onOk() {      
      message.success(`Removed`);
      return removeItemFromCart(index, removeFromRedux, redux, clearCart)
    },
    onCancel() {      
    },
  });
}







export function CountNumberOfItemsInCart(cart, item1, item2, item3, saveCart, addToCart) {
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
      return saveCart(newCartArray[0], addToCart)
    }

    if (theItem > map[id]) {
      for (var i = 0; i < difference; i++) {
        newCartArray[0].push(id.toString())
      }
      return saveCart(newCartArray[0], addToCart)

    } else if (theItem < map[id]) {
      for (var i = 0; i < difference; i++) {
        newCartArray[0].splice(newCartArray[0].indexOf(id.toString()), 1)
        // console.log("CARTTTTT", cart)
      }
      return saveCart(newCartArray[0], addToCart)
    }
  }  
}



export function createOrdersObj(
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
  email,
  updateOrderObj
) {
  var postCountry = country === "United States" ? "US" : country
  var updatedObj = {}
  var defaultObj = {
    currency: 'usd',
    items: [

    ],
    shipping: {
      name: name,
      address: {
        line1: line1,
        city: city,
        state: state,
        country: postCountry,
        postal_code: zip
      }
    },
    email: email
  }
  if (item1 > 0) {
    defaultObj.items.push({

      parent: item1SKU,
      quantity: item1,
      type: 'sku',

    })
  } if (item2 > 0) {
    defaultObj.items.push({

      parent: item2SKU,
      quantity: item2,
      type: 'sku',

    })
  } if (item3 > 0) {
    defaultObj.items.push({

      parent: item3SKU,
      quantity: item3,
      type: 'sku',

    })
  }

  updateOrderObj(defaultObj)
  return defaultObj


}






