import React, { Component } from 'react';
import { Button } from 'antd'
import OneBiteLogo from '../../images/OneBite Logo 1500 px 600 dpi.png'


class About extends Component {

  render() {
    return (
      <div className="about-container">
        <div className="about-div">
          <div className="about-top-div">
            <span>New to <img src={OneBiteLogo} className='faq-img' />?</span>
            <div style={{ width: '100%', height: '1px', background: 'rgba(240,240,240, 1)' }}></div>
          </div>
          <div style={{height: '100px'}}>
            <Button size={'large'}>No thanks :(</Button>
            <div style={{ height: '100%', width: '1px', background: 'rgba(240,240,240, 1)', marginTop: "-10px" }}></div>
            <Button href="https://juanolivier.gr8.com/" target="_blank" type="primary" size={'large'} >Learn More!</Button>
          </div>
        </div>
      </div>
    );
  }
}



export default About;
