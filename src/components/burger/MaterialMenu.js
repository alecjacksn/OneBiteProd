import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      right: false,
    };
  }

  toggleDrawer = (open) => {
    this.setState({ right: open })
    return this.testerFunction()
  };

  testerFunction(){
    return this.state.right
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button style={{ background: 'red' }} onClick={this.toggleDrawer(true)}>Open Right</Button>
        <Drawer anchor="right" open={this.testerFunction()} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List>test</List>
              <Divider />
              <List>test</List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);