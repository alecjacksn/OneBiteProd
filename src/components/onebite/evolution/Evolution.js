import React, { Component } from 'react';
import evo1 from '../../../images/evo1.png'
import evo2 from '../../../images/evo2.png'
import { Modal, Button, Input } from 'antd';


class Evolution extends Component {
  constructor() {
    super()

    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }



  render() {
    return (
      <div className="evo-container">
        <div className="evo1-main-div">
          <div className="evo1-div">
            <img src={evo1} alt="evolution logo" className="evo1" />
          </div>
          <div className='divider-right'></div>
          <div className="evo1-span-div">
            <div className="coming-soon-div">
              <span style={{ fontSize: '3.0em', color: 'rgba(0,0,0, .5)', fontWeight: '400' }}>Coming soon</span>
            </div>
            <div className="span-waitinglist-div">
              <span>Get on the Waiting list now!</span>
              <div>
                <Button type="primary" onClick={this.showModal}>Sign Up</Button>
                <Modal
                  title="OneBite Evolution"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <div className='popup-main-div'>
                    <div className="popup-img-div">
                      <img src={evo2} alt="Evolution Logo"/>
                    </div>
                    <div className='popup-divider-right'></div>
                    <div className="popup-signup-div">
                    <span>First Name*</span>
                    <Input placeholder="First Name" />
                    <span>Last Name*</span>
                    <Input placeholder="Last Name" />
                    <span>Email *</span>
                    <Input placeholder="Email" />
                    <span>Company:</span>
                    <Input placeholder="Basic usage" />
                    </div>
                  </div>


                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Evolution;
