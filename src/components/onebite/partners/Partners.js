import React, { Component } from 'react'
import dealerInfo from './PartnersInfo'
import { Collapse } from 'antd';


import bulgaria from './partnersImages/american-flag.png'
import canada from './partnersImages/canada-flag-2.jpg'
import columbia from './partnersImages/colombia-flag.png'
import czech_republic from './partnersImages/czech-flag.png'


const Panel = Collapse.Panel;




const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;



class Partners extends Component {
  constructor() {
    super()
  }

  createPanelText(param) {    
    var displayArr = []
    var x;
    dealerInfo.dealers.forEach((e, i) => {
      if (e.country == param) {        
        var x = (
          <div key={i} className="partners-content-container">
            <div className="partners-company-logo-div">
              <img src={e.companyLogo} className={param === 'Columbia' ? 'partners-columbia-logo' : param === 'United States' ? "partners-us-logo" : "partners-company-logo"} />
            </div>
            <div className="partners-data-center-div">
              <div style={{width: '100%', borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <span style={{fontSize: '1.65em'}}>{e.companyName}</span>
              <span>{e.country}</span>
              </div>
              <span style={{marginBottom: '10px'}}>{e.address}</span>
              <a style={{marginBottom: '10px'}} href={e.website} target="_blank">{e.website}</a>
              <a style={{marginBottom: '10px'}} href={`mailto:${e.dealerEmail}`}>{e.dealerEmail}</a>
              <span>{e.phoneNumber}</span>
            </div>
            {/* <div className="partners-data-right-div">
              
            </div> */}
          </div>
        )
        displayArr.push(x)
      }
    })

    return displayArr;

  }

  createPanel() {
    var displayArr = []
    var x

    dealerInfo.countries.forEach((e, i) => {
      // console.log("EEEE", e)
      var x =
        <Panel header={<div className="partners-header-div">{e.name} <img className="partners-header-flag" src={e.flag} /></div>} key={i}>
          {this.createPanelText(e.name)}
        </Panel>
      displayArr.push(x)
    })
    return displayArr
  }

  callback(key) {    
  }


  render() {    
    return (
      <div className="partners-container">
        <div className="partners-top-header-div">
          <span style={{ color: 'black', fontSize: '2em', fontWeight: '200' }}>International Dealers</span>
        </div>
        <div className="partners-dropdown-container">
          <Collapse onChange={() => this.callback()}>
            {/* <Panel header={<div>{dealerInfo.countries[0].name}<img src={dealerInfo.countries[0].flag} /></div>} key="1">
              <p>{text}<img src={dealerInfo.countries[0].flag} /></p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>

            </Panel> */}
            {this.createPanel()}

          </Collapse>
        </div>
      </div>
    );
  }
}

export default Partners