import React, { Component } from 'react';
import actualCoverPhoto from '../../images/main-Website Home Page.png'
import Products from '../onebite/products/Products'
import { connect } from 'react-redux'
import FAQ from '../onebite/FAQ/FAQ'
import Video from '../onebite/Video'
import axios from 'axios'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      test: {}
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }



  render() {
    return (
      <div className="home-container">
        {/* <button onClick={() => this.newUpdate()} style={{ width: '200px', height: '200px', background: 'steelblue' }}>TEST GET RESPONSE</button> */}
        <img src={actualCoverPhoto} alt="#" className="home-img" />
        <Video />
        <FAQ />
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
