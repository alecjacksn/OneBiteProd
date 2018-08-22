import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home'
import Cart from './components/cart/Cart'
import About from './components/about/About'
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
import UserProfile from './components/user/UserProfile'
import ReactGA from 'react-ga';


export function fireTracking(nextState) {

    const { pathname } = nextState.location // this gives you the next URL

    ReactGA.pageview(pathname)

}


export function alert(){
    return alert("YOU LEFT THE PAGE")
}

export default (
    <Switch>
        {/* EMPLOYEE ROUTES */}
        <Route exact path='/' onUpdate={fireTracking} component={Home} />
        <Route path='/cart' onUpdate={fireTracking} component={Cart} />
        <Route path='/about' onUpdate={fireTracking} component={About} />
        {/* <Route path='/contact' onUpdate={fireTracking} component={Contact} /> */}
        {/* <Route path='/events' onUpdate={ fireTracking } component={Events} /> */}
        <Route path='/onebite/products' onUpdate={fireTracking} component={Products} />
        {/* <Route path='/onebite/system' onUpdate={ fireTracking } component={System} /> */}
        {/* <Route path='/onebite/functions' onUpdate={ fireTracking } component={Functions} /> */}
        <Route path='/onebite/instructions' onUpdate={fireTracking} component={Instructions} />
        <Route path='/onebite/partners' onUpdate={fireTracking} component={Partners} />
        <Route path='/user/profile' onUpdate={fireTracking} component={UserProfile} />
        {/* <Route path='/Juan-Oliver' onUpdate={ fireTracking } component={JuanOliver} /> */}
        {/* <Route path='/laboratory' onUpdate={ fireTracking } component={Laboratory} /> */}
        {/* <Route path='/philosophy' onUpdate={ fireTracking } component={Philosophy} /> */}
        <Route path='/philosophy' onUpdate={fireTracking} component={Philosophy} />
        <Route path='/cart-checkout' onUpdate={fireTracking} onLeave={() => this.alert()} component={CartCheckout} />
        {/* <Route render={() => {
            return (<div>I'm sorry, the page you're looking for cannot be found. A highly trained monkey is working to build the page as you read this.
        </div>)
        }} /> */}

    </Switch>
)