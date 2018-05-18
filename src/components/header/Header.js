import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom'
// import { Icon } from 'antd'
import { connect } from 'react-redux'
import { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart } from '../../ducks/reducer'
import OneBiteLogo from '../../images/OneBite Logo 1500 px 600 dpi.png'
import Burger from '../burger/Burger'

class Header extends Component {
  constructor(){
    super()

    this.state = {
      tabOpen: false
    }

  }


  // componentDidMount(){
  //   var cart = localStorage.getItem('cart').split(',')
  //   this.props.addToCart(cart)
  // }

  componentWillMount() {
    var item1 = 0;
    var item2 = 0;
    var item3 = 0;
    var cart = localStorage.getItem('cart') ? localStorage.getItem('cart').split(',') : null
    cart ?
      cart.reduce(function (n, person) {
        if (person === '1') {
          console.log("THIS IS HIT")
          ++item1
        }
        if (person === '2') {
          ++item2
        }
        if (person === '3') {
          ++item3
        }
      }, 0) : null
    // console.log("VAR ITEM 1", item1)
    if (item1 > 0) {
      this.props.showItemInCart(1, true)
      this.props.updateItem1Quantity(item1)
    }
    if (item2 > 0) {
      this.props.showItemInCart(2, true)
      this.props.updateItem2Quantity(item2)
    }
    if (item3 > 0) {
      this.props.showItemInCart(3, true)
      this.props.updateItem3Quantity(item3)
    }
    // console.log("VAR ITEM 2", item2)
    // console.log("VAR ITEM 3", item3)
    this.props.addToCart(cart)
  }



  render() {


    return (
      <div className="header-container">
        <div className="header-main-div">
          <div className="header-logo-div">
            <Link style={{ color: 'white' }} to="/"><img src={OneBiteLogo} alt="OneBite Logo" className="header-logo" /></Link>
          </div>
          <div className="header-nav-container">
            <div className="header-nav-main-div">
              <Link to="/onebite/products">Products</Link>
              <span>About</span>
              <Link to="/cart">
                Cart{this.props.cart ? <span id="header-cart-id">({Number(this.props.item1) + Number(this.props.item2) + Number(this.props.item3)})</span> : "(0)"}</Link>
            </div>
                <Burger tabOpen={this.state.tabOpen} />
          </div>
        </div>
      </div>




      // <Row>
      //   {/* <span>{this.state.cartLength}TESTING</span> */}
      //   <Col span={6} push={18}>
      //     <div className="header-container">
      //       <Link to="/onebite/products">Products</Link>
      //       {/* <Icon type="user" /> */}
      //       <span>About</span>
      //       <Link to="/cart">
      //         {/* <Icon type="shopping-cart"
      //               style={{
      //                 color: 'rgba(95,177,87, 1)',
      //                 fontSize: '1.2em',
      //                 fontWeight: '400',     

      //               }} /> */}
      //         Cart
      //             {this.props.cart ? <span>({Number(this.props.item1) + Number(this.props.item2) + Number(this.props.item3)})</span> : "(0)"}</Link>
      //     </div>
      //   </Col>
      //   <Col span={18} pull={6}>
      //     <div style={{ width: '125px', height: '125px' }}>
      //       <Link style={{ color: 'white' }} to="/"><img src={OneBiteLogo} alt="OneBite Logo" className="header-logo" /></Link>
      //     </div>
      //   </Col>

      // </Row>

    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart })(Header)