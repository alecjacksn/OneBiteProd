import React, { Component } from 'react'
import productsList from './productsList'
import { connect } from 'react-redux'
import { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart } from '../../../ducks/reducer'
import { message, Button } from 'antd';

const success = () => {
    message.success(`Item Added to Cart`);
};

class DisplayedProducts extends Component {

    addToCart(item) {
        if (item === 1) {
            var currentItem = this.props.item1
            this.props.updateItem1Quantity(++currentItem)
            this.props.showItemInCart(1, true)
        }
        if (item === 2) {
            var currentItem = this.props.item2
            this.props.updateItem2Quantity(++currentItem)
            this.props.showItemInCart(2, true)
        }
        if (item === 3) {
            var currentItem = this.props.item3
            this.props.updateItem3Quantity(++currentItem)
            this.props.showItemInCart(3, true)
        }
        if (localStorage.getItem('cart') != null) {
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
        return productsList.map((e, i) => {
            return (
                <div key={i} className="single-product-container">
                    <div className="single-product-img-div">
                        <img className="single-product-img" alt="The Product" src={e.image} />
                    </div>
                    <div className="single-product-info-div">
                        <span>{e.name}</span>   
                        {window.innerWidth < 450 ? null :<br />}
                        <span>{e.displayPrice}</span>           
                        {window.innerWidth < 450 ? null :<br />}
                        {window.innerWidth < 450 ? null :<br />}                               
                        <Button size={'large'} onClick={() => this.addToCart(e.id)} >Add To Cart</Button>
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



export default connect(mapStateToProps, { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart })(DisplayedProducts);
