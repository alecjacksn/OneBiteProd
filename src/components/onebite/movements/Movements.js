import React, { Component } from 'react';
import movementPhoto1 from '../../../images/Thin Brooke Bar Movements.png'




class Movements extends Component {



  render() {

    return (
      // <div className="move-container">
      //   <div className="move-layer">
      //     <span>OneBite Movements</span>
      //     <img src={MovementPhoto} alt="movements of OneBite" className="move-img" />
      //   </div>
      // </div>
      <div>
        <img src={movementPhoto1} alt="How the OneBite Movement Works" className="movement-img"/>
      </div>
    );
  }
}

export default Movements;
