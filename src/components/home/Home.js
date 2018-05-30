import React, { Component } from 'react';
import actualCoverPhoto from '../../images/main-Website Home Page.png'
import Products from '../onebite/products/Products'
import { connect } from 'react-redux'
import FAQ from '../onebite/FAQ/FAQ'
import Video from '../onebite/Video'
import Evolution from '../onebite/evolution/Evolution'
import axios from 'axios'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      test: {}
    }
  }


  // updateOrder(){
  //   console.log("HIT")
  //   axios.post('/api/update-order').then(res => {
  //     console.log("UPDATED ORDER RES", res)
  //   })
  // }

  render() {
    console.log("HOME ORDER ORB", this.props.orderObj)
    console.log("HOME ORDER res", this.props.orderRes)
    console.log("TOKEN OBJ", this.props.tokenObj)
    return (
      <div className="home-container">
        {/* <div className="home-top-section"> */}
        {/* <button onClick={() => {this.updateOrder()}} style={{background: 'steelblue', width: '200px', height: '100px' }}>UPDATE ORDER</button> */}


        {/* <div className="home-img-div"> */}
          <img src={actualCoverPhoto} alt="#" className="home-img" />
        {/* </div> */}




        {/* <Icon type="down" className="home-down-arrow" /> */}
        {/* </div> */}
        <Video />
        <FAQ />


        {/* <span>{this.state.test[0] ? this.state.test[0].testing: 'lol WORK'}</span>           */}
        {/* <div style={{ padding: '0 70px' }}>
          <div className="home-products-header-container">
            <div className="home-products-header-div">
              <span style={{ fontSize: '2em', fontWeight: '400', color: 'rgba(0,0,0, .6)' }}>Products</span>
            </div>
          </div>
          */
          // <div className="underline-home">
          //   <div style={{ height: '80vh', border: '2px solid darkgray', position: 'relative', zIndex: '1' }}>
          //     <div className="home-products-section">
          //       <DisplayedProducts />
          //     </div>
          //   </div>
          // </div >
          /*
          <div style={{ width: '100%' }}>
            <Cart />
          </div>
        </div > */}
        {/* <div className="home-past-present-div">
          <img align="middle" src={pastVsPresent} />
        </div> */}
        {/* <Movements /> */}
        <Products />        
        {/* <Evolution /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps)(Home);
