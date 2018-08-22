import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
// import homeIcon from '../../images/icons/baseline_home_black_48dp.png'
import AccessAlarmIcon from '@material-ui/icons/Alarm';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Info from '@material-ui/icons/Info';
import Products from '@material-ui/icons/AddShoppingCart';
import Map from '@material-ui/icons/Place';
import Person from '@material-ui/icons/Person'
import AddPerson from '@material-ui/icons/PersonAdd'
import Exit from '@material-ui/icons/ExitToApp'


const styles = {
  list: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    padding: '15px'
  },
  fullList: {
    width: 'auto',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px 5px'
  },
  icon: {
    fontSize: 26,
    marginRight: '15px'
  },
};

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      right: false,
    };

  }

  toggleDrawer(open) {
    this.setState({ right: open })
    return this.forceUpdate()
  };

  render() {
    const { classes } = this.props;    
    return (

      <div>
        {this.props.tabOpen ?
          <div>

            <Drawer anchor="right" open={true} onClose={() => this.props.toggleDrawer()}>

              <div
                tabIndex={0}
                role="button"
                onClick={() => this.props.toggleDrawer()}
                onKeyDown={() => this.props.toggleDrawer()}
              >
                <div className={classes.list}>
                  {!this.props.user
                    ?
                    <div className={classes.div}>
                      <Person className={classes.icon} />
                      <div><a className="burger-basic-nav" href={process.env.REACT_APP_LOGIN}>Login</a></div>
                    </div>
                    :
                    <div>
                      <div className={classes.div}>
                        <Person className={classes.icon} />
                        <div><Link className="burger-basic-nav" to="/user/profile">Profile</Link></div>
                      </div>
                      <div className={classes.div}>
                        <Exit className={classes.icon} />
                        <div><a className="burger-basic-nav" href={process.env.REACT_APP_LOGOUT} >Logout</a></div>
                      </div>
                    </div>
                  }



                  {!this.props.user
                    ? <div className={classes.div}>
                      <AddPerson className={classes.icon} />
                      <div>
                        <a className="burger-basic-nav" href={process.env.REACT_APP_LOGIN}>Sign Up</a>
                      </div>
                    </div>
                    : null
                  }

                  <Divider />
                  {/* <Divider /> */}
                  {/* <span className="burger-oneBite">OneBite</span>
                  <Divider /> */}
                  <div className={classes.div}>
                    <HomeIcon className={classes.icon} />
                    <Link onClick={() =>
                      ReactGA.event({
                        category: 'Menu Tab',
                        action: 'Menu Home'
                      })
                    } className="burger-basic-nav" to="/">Home</Link>
                  </div>
                  <div className={classes.div}>
                    <ShoppingCart className={classes.icon} />
                    <Link onClick={() =>
                      ReactGA.event({
                        category: 'Menu Tab',
                        action: 'Menu Cart'
                      })
                    } className="burger-basic-nav" to="/cart">Cart</Link>
                  </div>
                  <div className={classes.div}>
                    <Info className={classes.icon} />
                    <ReactGA.OutboundLink
                      className="burger-basic-nav"
                      to="https://juanolivier.gr8.com/"
                      target="_blank"
                      eventLabel="About Page"
                    >About
                </ReactGA.OutboundLink>
                  </div>
                  {/* <Link className="burger-basic-nav" to="/events">Events</Link> */}
                  <div className={classes.div}>
                    <Products className={classes.icon} />
                    <Link onClick={() =>
                      ReactGA.event({
                        category: 'Menu Tab',
                        action: 'Menu Products'
                      })

                    } className="burger-basic-nav" id="about" to="/onebite/products">Products</Link>
                  </div>
                  {/* <Link className="burger-link" id="about" to="/onebite/system">System</Link> */}
                  {/* <Link className="burger-link" id="decor" to="/onebite/functions">Functions</Link> */}
                  {/* <Link className="burger-link" id="decor" to="/onebite/instructions">Clinical Instructions</Link> */}
                  <div className={classes.div}>
                    <Map className={classes.icon} />
                    <Link onClick={() =>
                      ReactGA.event({
                        category: 'Menu Tab',
                        action: 'International Dealers'
                      })
                    } className="burger-basic-nav" id="home" to="/onebite/partners">International Dealers</Link>
                  </div>
                  <Divider />
                </div>
              </div>
            </Drawer>
          </div>
          : null}
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);