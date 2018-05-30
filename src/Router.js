import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home'
import Cart from './components/cart/Cart'
import Contact from './components/contact/Contact'
import Events from './components/events/Events'
import System from './components/onebite/System'
import Functions from './components/onebite/Functions'
import Instructions from './components/onebite/Instructions'
import Partners from './components/onebite/partners/Partners'
import JuanOliver from './components/precision/JuanOliver'
import Laboratory from './components/precision/Laboratory'
import Philosophy from './components/precision/Philosophy'
import Products from './components/onebite/products/Products'
import CartCheckout from './components/cart/CartCheckout'
import ReactGA from 'react-ga';


export function fireTracking(nextState) {

    const { pathname } = nextState.location // this gives you the next URL

    ReactGA.pageview(pathname)

}

export default (
    <Switch>
        {/* EMPLOYEE ROUTES */}
        <Route exact path='/' onEnter={fireTracking} component={Home} />
        <Route path='/cart' onEnter={fireTracking} component={Cart} />
        <Route path='/contact' onEnter={fireTracking} component={Contact} />
        {/* <Route path='/events' onEnter={ fireTracking } component={Events} /> */}
        <Route path='/onebite/products' onEnter={fireTracking} component={Products} />
        {/* <Route path='/onebite/system' onEnter={ fireTracking } component={System} /> */}
        {/* <Route path='/onebite/functions' onEnter={ fireTracking } component={Functions} /> */}
        <Route path='/onebite/instructions' onEnter={fireTracking} component={Instructions} />
        <Route path='/onebite/partners' onEnter={fireTracking} component={Partners} />
        {/* <Route path='/Juan-Oliver' onEnter={ fireTracking } component={JuanOliver} /> */}
        {/* <Route path='/laboratory' onEnter={ fireTracking } component={Laboratory} /> */}
        {/* <Route path='/philosophy' onEnter={ fireTracking } component={Philosophy} /> */}
        <Route path='/philosophy' onEnter={fireTracking} component={Philosophy} />
        <Route path='/cart-checkout' onEnter={fireTracking} component={CartCheckout} />
        {/* <Route render={() => {
            return (<div>I'm sorry, the page you're looking for cannot be found. A highly trained monkey is working to build the page as you read this.
        </div>)
        }} /> */}

    </Switch>
)