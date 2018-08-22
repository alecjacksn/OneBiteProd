import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo, updateObj, getUserById } from '../../ducks/reducer'
import ReactGA from 'react-ga'
import { Input, Button } from 'antd';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

ReactGA.initialize(process.env.REACT_APP_GOOGLE);
ReactGA.pageview(window.location.pathname + window.location.search);



class EditProfile extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      email: '',
      phone: null,
      company: '',
      website: '',

    }
  }

  componentWillMount() {
    this.setState({
      name: this.props.user.user_name
    })
  }


  updateUser() {
    var x;
    let data = {
      user_name: this.state.name ? this.state.name : this.props.user.user_name,
      email: this.state.email ? this.state.email : this.props.user.email,
      phone: this.state.phone ? this.state.phone : this.props.user.phone,
      company: this.state.company ? this.state.company : this.props.user.company,
      website: this.state.website ? this.state.website : this.props.user.website,
      authid: this.props.user.authid,
      user_id: this.props.user['user_id']
    }
    axios.post('/api/edituser', data)
      .then(axios.post(`/api/user/${data.user_id}`).then(res => {
        this.props.updateObj(res.data[0])      
      }),      
        // this.props.getUserInfo()
        // this.props.updateObj(data)
      )
  }

  updateUserState(e, input) {
    this.setState({
      [input]: e.target.value
    })
  }

  getUseruser_name() {
    return this.props.userObj.user_name
  }

  render() {
    var name = this.props.user ? this.props.user.user_name : null
    var email = this.props.user ? this.props.user.email : null
    var phone = this.props.user ? this.props.user.phone : null
    var company = this.props.user ? this.props.user.company : null
    var website = this.props.user ? this.props.user.website : null
    return (
      <div>
        {this.props.user.authid ?
          <div className="edit-profile-container">
            <div className="edit-profile-div">
              <div className="edit-profile-input-div">
                <span>Name</span>
                <Input onChange={(e) => this.updateUserState(e, 'name')} defaultValue={name} maxLength={90}/>
              </div>
              <div className="edit-profile-input-div">
                <span>Email</span>
                <Input onChange={(e) => this.updateUserState(e, 'email')} defaultValue={email} maxLength={90} />
              </div>
              <div className="edit-profile-input-div">
                <span>Number</span>
                <Input type="text" pattern="\d*" maxLength="15" onChange={(e) => this.updateUserState(e, 'phone')} defaultValue={phone} />
              </div>
              <div className="edit-profile-input-div">
                <span onClick={() => this.resetComapny}>Company</span>
                <Input onChange={(e) => this.updateUserState(e, 'company')} defaultValue={company} maxLength={90}/>
              </div>
              <div className="edit-profile-input-div">
                <span>Website</span>
                <Input onChange={(e) => this.updateUserState(e, 'website')} defaultValue={website} maxLength={90}/>
              </div>

            </div>
            <div className="edit-save-button-div">
              <Button onClick={() => this.updateUser()} style={{ width: '200px' }} size={'large'} type="primary">Save Changes</Button>
            </div>
          </div>
          : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getUserInfo, updateObj, getUserById })(EditProfile)