import React, { Component } from 'react'
import { } from '../../ducks/reducer'
import ReactGA from 'react-ga'
import EditProfile from './EditProfile'
import { connect } from 'react-redux'
import ComingSoon from './ComingSoon'

ReactGA.initialize(process.env.REACT_APP_GOOGLE);
ReactGA.pageview(window.location.pathname + window.location.search);



class UserProfile extends Component {
  constructor() {
    super()

    this.state = {
      selected: 'edit profile'
    }
  }


  updatedSelectedbox(sel) {
    this.setState({
      selected: sel
    })
  }

  render() {

    return (
      <div className="user-profile-container">
        <div className="user-profile-box-container">
          <div className="user-profile-left-side">
            <div className="user-left-buttons-div">

              <div onClick={() => this.updatedSelectedbox('edit profile')} className={this.state.selected === 'edit profile' ? "user-edit-selected-div" :"user-edit-profile-div"}>
                <span>Edit Profile</span>
              </div>
              <div onClick={() => this.updatedSelectedbox('subscription')} className={this.state.selected === 'subscription' ? "user-edit-selected-div" :"user-edit-profile-div"}>
                <span>Subscriptions</span>
              </div>

              <div onClick={() => this.updatedSelectedbox('order history')} className={this.state.selected === 'order history' ? "user-edit-selected-div" :"user-edit-profile-div"}>
                <span>Order History</span>
              </div>

              <div onClick={() => this.updatedSelectedbox('preferences')} className={this.state.selected === 'preferences' ? "user-edit-selected-div" :"user-edit-profile-div"}>
                <span>Preferences</span>
              </div>
            </div>
          </div>
          <div className="user-profile-content-container">
          {this.state.selected === 'edit profile' ? <EditProfile /> : <ComingSoon />}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {})(UserProfile)
