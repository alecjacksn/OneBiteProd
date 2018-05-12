import React, { Component } from 'react';

// import { hideWarning } from '../../ducks/reducer'


const hideWarning = localStorage.getItem('hideWarning')


class TopWarningBar extends Component {
  constructor() {
    super()

    this.state = {
      hide: true
    }
  }

  componentDidMount(){
    this.setState({
      hide: hideWarning
    })
  }

  hideWarning(){
    this.setState({hide: true})
    return localStorage.setItem('hideWarning', true)
  }

  render() {
    return (
      <div className={this.state.hide ? 'warning-hidden' : "warning-bar-container"}>
        <div className="warning-bar-spans-div">
          <span style={{ fontSize: '1.2em' }}>Welcome to the all new OneBite website! We appreciate your patience as we continue to improve.</span>
          <span>Something not working correctly? Please contact us at support@onebite.com or click <a href="mailto:support@onebite.com" style={{ borderBottom: '1.2px solid rgb(132,187,244)', color: 'rgb(102,157,214)' }}>here</a></span>
        </div>
        <button onClick={() => this.hideWarning()} className="warning-close-button">X</button>
      </div>
    )
  }
}



export default TopWarningBar