import React, { Component } from 'react';
import { Collapse } from 'antd';
import movementPic from '../../../images/Thin Brooke Bar Movements.png'
import pastvpresent from '../../../images/past vs. now onebite marketinggg.png'
const Panel = Collapse.Panel;

const customPanelStyle = {
  width: '100%',
  paddingTop: '5px',
};



class FAQ extends Component {


  render() {

    return (

      // <div className="faq-container">
      //   <div className="faq-questions-container">
      //     {/* <div className="faq-question-box">
      //       <div className="faq-question-header">
      //         <span></span>
      //       </div>
      //     </div> */}
      //     {createFAQ()}
      //     {createFAQ()}
      //     {createFAQ()}

      //   </div>
      // </div>
      <div className="faq-container">
        <span>Why OneBite?</span>
        <div className="faq-main-div">
          <Collapse accordion>
            <Panel style={customPanelStyle} header="What is the OneBite?" key="1">
              <p>The OneBite System is a revolutionary product from the future. Dentists have been using sticks, Q-tips, and paintbrushes to get the horizontal and midline record for over 100 years. This method takes multiple tries because the bite material hardens too quickly, and this method is also terribly inaccurate. With the OneBite system you will get the perfect record every time. Saving you time and money, while creating a precise occlusal bite record of the patient.</p>
            </Panel>
            <Panel style={customPanelStyle} header="Why should I use OneBite?" key="3">
              <p>OneBite allows for a perfect record of any symmetrical or asymmetrical face. The OneBite consists of two bars, a horizontal and a vertical bar, that can record accurate 90 degree angles on a patients face. For an asymmetrical face, unscrew and flip the horizontal bar for full-free movement to guarantee the perfect record every time. After the record is taken, slide the arch off of the bars and send in an envelope to your technician.</p>
            </Panel>
            <Panel style={customPanelStyle} header="How is the OneBite system better than the way I take the patients occlusal bite record right now?" key="4">
              <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <p style={{fontSize: '16px', color: 'rgba(0,0,0, .8)'}}>There isn't one product from 100 years ago that can be used in this unless it has been revolutionized and updated. The OneBite is the newest technology in dental industry helping dentist and universities around the world. We are so sure you will love the OneBite System we will ship out a free sample and if you don't like it there is nothing lossed.</p>
                <img src={pastvpresent} alt="Past Vs Present" style={{ maxWidth: '70%', maxHeight: '70%', padding: '15px 0', margin: '0 auto' }} />
              </div>
            </Panel>
            <Panel style={customPanelStyle} header="Is the OneBite system Universal?" key="5">
              <p>Yes, the OneBite system is a universal, disposable, product that can be articulated on any articulator.</p>
            </Panel>
            <Panel style={customPanelStyle} header="How do I use the OneBite system?" key="6">
              <p id="faq-last-p-tag">In 6 simple steps and it will be on it's way to your dental technician.</p>
              <ol>
                <li>
                  Place bite material on the arch of the OneBite and let the patient bite down on the arch and let the bite material fully set.
                </li>
                <li>
                  For symmetrical faces you are now at the perfect 90 degree angle locking position. Adjust the adjust the horizontal and vertical lines according to the facial features.
                  </li>
                <li>
                  For asymmetrical faces, unscrew and flip the horizontal bar for full-free movement, allowing the bars to move independently from each other.
                  </li>
                <li>
                  Once the record has been finalized, tighten the fastener.
                  </li>
                <li>
                  Place bite material in the holes and around the fastener, to permanently preserve the record.
                  </li>
                <li>
                  Detach the arch from the rod, and place both pieces in the envelop to send to the technician
 Possibly list these steps in bars with the all the steps filling an entire screen.
                  </li>
              </ol>

            </Panel>
            <Panel style={customPanelStyle} header="OneBite Movements" key="7">
              <div>
                <p style={{fontSize: '16px', color: 'rgba(0,0,0, .8)'}}>The OneBite can be used on symmetrical and A-symmetrical faces. For symmetrical faces it will rotate left to right while maintaining a 90 degree angle throughout. It also moves laterally to ensure the perfect record. For A-symmetrical faces you are able to unscrew the horizontal bar, flip it, and screw it back on to then have complete free movement of both horizontal and vertical bars without a 90 degree angle lock to capture patients with A-symmetrical facial features.</p>
                <img src={movementPic} alt="OneBite system movements" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>

    );
  }
}

export default FAQ;


