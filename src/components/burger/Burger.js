import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import './burger.css'

// import BurgerContent from './BurgerContent'

ReactGA.initialize(process.env.REACT_APP_GOOGLE);
ReactGA.pageview(window.location.pathname + window.location.search);


class MenuTab extends Component {
  render() {
    return (
      <Menu right isOpen={this.props.tabOpen}>
        <Link onClick={() =>
          ReactGA.event({
            category: 'Menu Tab',
            action: 'Menu Home'
          })
        } className="burger-basic-nav" to="/">Home</Link>
        <Link onClick={() =>
          ReactGA.event({
            category: 'Menu Tab',
            action: 'Menu Cart'
          })
        } className="burger-basic-nav" to="/cart">Cart</Link>
        <ReactGA.OutboundLink
          className="burger-basic-nav"
          to="https://juanolivier.gr8.com/"
          target="_blank"
          eventLabel="About Page"
        >About
                </ReactGA.OutboundLink>
        {/* <Link className="burger-basic-nav" to="/events">Events</Link> */}
        <span className="burger-oneBite">OneBite</span>
        <Link onClick={() =>
          ReactGA.event({
            category: 'Menu Tab',
            action: 'Menu Products'
          })
        } className="burger-link" id="about" to="/onebite/products">Products</Link>
        {/* <Link className="burger-link" id="about" to="/onebite/system">System</Link> */}
        {/* <Link className="burger-link" id="decor" to="/onebite/functions">Functions</Link> */}
        {/* <Link className="burger-link" id="decor" to="/onebite/instructions">Clinical Instructions</Link> */}
        <Link onClick={() =>
          ReactGA.event({
            category: 'Menu Tab',
            action: 'International Dealers'
          })
        } className="burger-link" id="home" to="/onebite/partners">International Dealers</Link>
        {/* <span className="burger-precision">Precision Dental Products</span> */}
        {/* <Link className="burger-link" id="books" to="/Juan-Oliver">Juan Oliver</Link> */}
        {/* <Link className="burger-link" id="contact" to="/laboratory">Dental Laboratory</Link> */}
        {/* <Link className="burger-link" id="home" to="/philosophy">Philosophy</Link>                 */}
        {/* <BurgerContent /> */}
      </Menu>
    );
  }
}

export default MenuTab