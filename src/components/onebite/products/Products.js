import React, { Component } from 'react'
import DisplayedProducts from './DisplayedProducts'
import { Link } from 'react-router-dom'
import {Button} from 'antd'

class Products extends Component {
    render() {
        return (
            <div>
                {window.innerWidth < 450 ?
                    <div className="mobile-home-products-header">
                        <span>Products</span>
                    </div>
                    : null}
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
                        <div className="products-checkout-div">
                        <Button size={'large'}> <Link to="/cart" className="checkout-button">Cart </Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Products