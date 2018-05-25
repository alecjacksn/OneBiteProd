import React, { Component } from 'react';
import { Collapse } from 'antd';
import movementPic from '../../../images/Thin Brooke Bar Movements.png'
import pastvpresent from '../../../images/past vs. now onebite marketinggg.png'
import OneBiteLogo from '../../../images/OneBite Logo 1500 px 600 dpi.png'
import ReactPlayer from 'react-player'
import YouTubePlayer from 'react-player/lib/players/YouTube'

const Panel = Collapse.Panel;

const customPanelStyle = {
  width: '100%',
  paddingTop: '5px',
  height: 'auto'
};




class FAQ extends Component {


  render() {
    return (
      <div className="faq-container">
        <div className="faq-header-div">
          <span>Why <img src={OneBiteLogo} className='faq-img' />?</span>
        </div>
        <div className="faq-main-div">
          <Collapse accordion>
            <Panel style={customPanelStyle} header="What is the OneBite?" key="1">
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0px 25px 30px 25px' }}>
                <p style={{ fontSize: '16px', color: 'rgba(0,0,0, .8)' }}>The OneBite system is a universal system that will capture the perfect midline and horizontal line angles on the patients face. With the OneBite system the dentist no longer has to be concerned with the bite material setting up in 20 to 30 seconds before the record is taken.</p>
                <img src={pastvpresent} alt="Past Vs Present" style={{ maxWidth: '70%', maxHeight: '70%', padding: '15px 0', margin: '0 auto' }} />
              </div>
            </Panel>
            <Panel style={customPanelStyle} header="Why should I use OneBite?" key="3">
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0px 25px 10px 25px' }}>
                <p style={{ fontSize: '16px', color: 'rgba(0,0,0, .8)' }}>With the OneBite system the dentist has the flexibility to continually make adjustments on the line angles without any time restraints. Also, the system is unique because we're able to capture the information of the line angles on patients that have symmetrical or asymmetrical faces.</p>
              </div>
            </Panel>
            <Panel style={customPanelStyle} header="OneBite Movements" key="4">
              <div style={{ padding: '0px 25px 30px 25px' }}>
                <p style={{ fontSize: '16px', color: 'rgba(0,0,0, .8)', marginBottom: '15px' }}>The OneBite system can be used on symmetrical faces and asymmetrical faces. For symmetrical faces the midline and horizontal bars will have a torque right to left or a movement right to left, maintaining the 90 degree angle. For asymmetrical faces you are able to take off the front knob flip the horizontal bar and with this set up the two bars will be independent from each other and capture angle as needed.</p>
                <img src={movementPic} alt="OneBite system movements" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
            </Panel>
            <Panel style={customPanelStyle} header="How do I use the OneBite system?" key="5">
              <p id="faq-last-p-tag">In 6 simple steps and it will be on it's way to your dental technician.</p>
              <ol>
                <li>
                  Loosen the fastener until you are able to position the horizontal bar at a 90 degree angle from the vertical bar. Snap the bar into place using the nibs and lightly tighten the fastener.
                </li>
                <li>
                  Slide arch into the rods with the tallest part of the vertical bar going up and the horizontal bar parallel to the arch.
                  </li>
                <li>
                  If the rods are too close to the patients nose, place the nose extender between the arch and the rods to create more space. Remember to keep the nose extender in your office for the next case.
                  </li>
                <li>
                  Place bite registration material on the arch of the patient's mouth and on the OneBite arch. Let the patient bite down onto the arch then let the materiel fully set.
                  </li>
                <li>
                  You are now in an ideal 90 degree angle locking position for symmetrical faces, adjust the horizontal and vertical bar according to the facial features.
                  </li>
                <li>
                  For asymmetrical facial features, the rods can be set to move independently from each other. Take the fastener off and flip the horizontal rod with the nibs facing the fastener. Place the fastener back and tighten.
                  </li>
                <li>
                  Once the records are finalized, twist the fastener until extremely tight.
                  </li>
                <li>
                  To permanently preserve the records, place the bite registration material all the way to the back of the holes and around the fastener.
                  </li>
                <li>
                  When shipping the OneBite, make sure to detach the arch from the rods after your record has been secure.
Put videos for instructions. (How to mount and how to use)
                  </li>
                <div className="faq-video-container">
                  <YouTubePlayer
                    url='https://www.youtube.com/watch?v=E3PwjTsGF3M'
                    style={{ cursor: 'pointer' }}
                    controls={true}
                  />
                </div>
              </ol>

            </Panel>
            <Panel style={customPanelStyle} header="How do I mount the OneBite System?" key="6">
              <div className="faq-video-container">
                <YouTubePlayer
                  url='https://www.youtube.com/watch?v=JZ_RwlKw4lA'
                  style={{ cursor: 'pointer' }}
                  controls={true}
                />
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>

    );
  }
}

export default FAQ;


