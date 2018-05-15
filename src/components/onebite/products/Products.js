import React, { Component } from 'react'
import DisplayedProducts from './DisplayedProducts'
import { Link } from 'react-router-dom'

class Products extends Component {
    render() {
        return (
            <div className="products-parent">
                <div className="products-container">
                    <div className="products-main-div">
                        <div className="products-left-nav">
                            <span style={{ fontSize: '1.2em', fontWeight: '700', borderBottom: "1px solid rgba(0,0,0, .5)", paddingBottom: '5px', marginBottom: '10px' }}>Products</span>
                            <span className="products-nav-span">OneBite</span>
                            <span className="products-nav-span">OneBite Nose Extender</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <DisplayedProducts />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '125px', paddingRight: '25px' }}>
                        <Link to="/cart" className="checkout-button">CHECKOUT</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Products