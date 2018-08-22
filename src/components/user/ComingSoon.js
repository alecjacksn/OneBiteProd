import React, { Component } from 'react'
import OneBite from '../../images/OneBite Logo 1500 px 600 dpi.png'


class ComingSoon extends Component {


  render() {
   
    return (
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems:'center', marginTop: '50px', flexDirection: "column"}}>
      <img src={OneBite} style={{width: '400px', height: 'auto', marginBottom: '30px'}}/>
      <span style={{color: '#262626', fontWeight: '400', fontSize: '32px'}}>COMING SOON</span>
      </div>
    )
  }
}



export default ComingSoon