import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { Icon } from 'antd'
import { connect } from 'react-redux'
import { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart, updateTokenObj, updateOrderRes } from '../../ducks/reducer'
import OneBiteLogo from '../../images/OneBite Logo 1500 px 600 dpi.png'
import Burger from '../burger/Burger'
import ReactGA from 'react-ga'
import axios from 'axios'
import MaterialMenu from '../burger/MaterialMenu'
import Menu from '@material-ui/icons/Menu';

ReactGA.initialize(process.env.REACT_APP_GOOGLE);
ReactGA.pageview(window.location.pathname + window.location.search);

class Header extends Component {
  constructor() {
    super()

    this.state = {
      tabOpen: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }


  componentDidMount() {
    if (localStorage.getItem('tokenId')) {
      var tokenId = localStorage.getItem('tokenId')
      axios.post('/api/get-token', { token: tokenId }).then(res => {
        this.props.updateTokenObj(res.data.success)
      })
    }
    if (localStorage.getItem('orderId')) {
      var orderId = localStorage.getItem('orderId')
      axios.post('/api/get-order', { token: orderId }).then(res => {
        this.props.updateOrderRes(res.data.success)
      })

    }
  }

  componentWillMount() {
    var item1 = 0;
    var item2 = 0;
    var item3 = 0;
    var cart = localStorage.getItem('cart') ? localStorage.getItem('cart').split(',') : null
    cart ?
      cart.reduce(function (n, person) {
        if (person === '1') {
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
  
  toggleDrawer(open){
    console.log("THIS WAS HIT", open)
    this.setState({
      tabOpen: open
    })
  }

  closeDrawer(){
    this.setState({
      tabOpen: false
    })
  }


  render() {
    return (
      <div className="header-container">
        <div className="header-main-div">
          <div className="header-logo-div">
            <Link onClick={() =>
              ReactGA.event({
                category: 'Button Clicked',
                action: 'OneBite Logo Clicked'
              })
            } style={{ color: 'white' }} to="/"><img src={OneBiteLogo} alt="OneBite Logo" className="header-logo" /></Link>
          </div>
          <div className="header-nav-container">
            <div className="header-nav-main-div">
              <Link onClick={() =>
                ReactGA.event({
                  category: 'Button Clicked',
                  action: 'Link to Products Page'
                })
              } to="/onebite/products">Products</Link>
              {/* <Link to="/about">About</Link> */}
              <ReactGA.OutboundLink
                to="https://juanolivier.gr8.com/"
                target="_blank"
                eventLabel="About Page"
              >About
                </ReactGA.OutboundLink>
              <Link onClick={() =>
                ReactGA.event({
                  category: 'Button Clicked',
                  action: 'Link to Cart Page'
                })
              } to="/cart">
                Cart{this.props.cart ? <span id="header-cart-id">({Number(this.props.item1) + Number(this.props.item2) + Number(this.props.item3)})</span> : "(0)"}</Link>
            </div>
            {/* <Burger onClick={() =>
              ReactGA.event({
                category: 'Button Clicked',
                action: 'opened burger tab'
              })
            } tabOpen={this.state.tabOpen} /> */}
            <div>
              <Menu style={{fontSize: '25px', color: 'white', marginTop: '20px', marginLeft: '10px'}} onClick={() => this.toggleDrawer(!this.state.tabOpen)} />
              <MaterialMenu tabOpen={this.state.tabOpen} toggleDrawer={this.closeDrawer}/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { addToCart, updateItem1Quantity, updateItem2Quantity, updateItem3Quantity, showItemInCart, updateTokenObj, updateOrderRes })(Header)