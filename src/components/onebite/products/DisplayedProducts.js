import React, { Component } from 'react'
import productsTest from './productsList'
import {connect} from 'react-redux'
import {addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart} from '../../../ducks/reducer'
import { message } from 'antd';

const success = () => {
    message.success(`Item Added to Cart`);
  };

class DisplayedProducts extends Component {

    addToCart(item) {
        if (item === 1){
            var currentItem = this.props.item1
            this.props.updateItem1Quantity(++currentItem)
            this.props.showItemInCart(1, true)
        }
        if (item === 2){
            var currentItem = this.props.item2
            this.props.updateItem2Quantity(++currentItem)
            this.props.showItemInCart(2, true)
        }
        if (item === 3){
            var currentItem = this.props.item3
            this.props.updateItem3Quantity(++currentItem)
            this.props.showItemInCart(3, true)
        }
        if(localStorage.getItem('cart') != null){        
            var cart = localStorage.getItem('cart').split(',')
            cart.push(item.toString())
            this.props.addToCart(cart)
            localStorage.setItem('cart', cart)
            return success()
        } else {         
            localStorage.setItem('cart', item.toString())
            this.props.addToCart(item.toString())
            return success()
        }
    }

    productsFunction() {
        var newArray = []
        return productsTest.map((e, i) => {
            return (
                <div key={i} className="single-product-container">
                    <img className="single-product-img" alt="The Product" src={e.image} />
                    <div className="single-product-info-div">
                        <div>
                            {e.name}
                        </div>
                        <br />
                        <span>{e.displayPrice}</span>
                        <br />
                        <br />
                        <button onClick={() => this.addToCart(e.id)} className="add-to-cart-button">Add To Cart</button>
                        {/* <button onClick={() => localStorage.clear()} className="add-to-cart-button">CLEAR STOREAGE</button> */}
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className="display-products-container">
                {this.productsFunction()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
  }
  
 
  
  export default connect(mapStateToProps, {addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart})(DisplayedProducts);
  