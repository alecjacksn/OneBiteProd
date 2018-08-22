import React, { Component } from 'react'

import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

class BurgerContent extends Component {
  state = {
    collapsed: false,
  }
  render() {
    return (
      <div style={{ width: 256 }}>

        <Menu
          // defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >         
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>              
        </Menu>
      </div>
    );
  }
}

export default BurgerContent