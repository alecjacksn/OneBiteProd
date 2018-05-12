import React, { Component } from 'react';
import './App.css';
import './reset.css'
import Router from './Router'
import { Layout } from 'antd';
import HeaderComp from './components/header/Header'
import Burger from './components/burger/Burger'
import TopWarningBar from './components/help/TopWarningBar'
const { Header, Footer, Content } = Layout;
class App extends Component {
  constructor() {
    super()

    this.state = {
      tabOpen: false
    }
  }


  render() {
    return (
      <Layout>
        <TopWarningBar />
        <Burger tabOpen={this.state.tabOpen} />
        <Header style={{ padding: '0 75px 0 75px', position: 'fixed', width: '100%', background: 'rgba(0,0,0, 1)', boxShadow: "0px 2px 15px rgba(0,0,0, .6)", borderBottom: '4px solid rgb(76,73,140)', zIndex: 100 }}>
          <HeaderComp />

        </Header>
        <Layout>
          <Content>
            <div className="content-div">{Router}
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', background: 'rgb(50,50,50)'}}>
          <span style={{color: 'white'}}>OneBite ©2018 Precision Dental Products</span>
         </Footer>
      </Layout>

    );
  }
}

export default App;
