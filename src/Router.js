import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home/Home'
import Cart from './components/cart/Cart'
import Contact from './components/contact/Contact'
import Events from './components/events/Events'
import System from './components/onebite/System'
import Functions from './components/onebite/Functions'
import Instructions from './components/onebite/Instructions'
import Partners from './components/onebite/Partners'
import JuanOliver from './components/precision/JuanOliver'
import Laboratory from './components/precision/Laboratory'
import Philosophy from './components/precision/Philosophy'
import Products from './components/onebite/products/Products'

export default (
    <Switch>
        {/* EMPLOYEE ROUTES */}
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/contact' component={Contact} />
        <Route path='/events' component={Events} />
        <Route path='/onebite/products' component={Products} />
        <Route path='/onebite/system' component={System} />
        <Route path='/onebite/functions' component={Functions} />
        <Route path='/onebite/instructions' component={Instructions} />
        <Route path='/onebite/partners' component={Partners} />
        <Route path='/Juan-Oliver' component={JuanOliver} />
        <Route path='/laboratory' component={Laboratory} />
        <Route path='/philosophy' component={Philosophy} />
        {/* <Route render={() => {
            return (<div>I'm sorry, the page you're looking for cannot be found. A highly trained monkey is working to build the page as you read this.
        </div>)
        }} /> */}

    </Switch>
)