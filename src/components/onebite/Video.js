import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import OneBiteVideoCompressed from '../../images/videos/OneBiteVidCompressed.mp4'


class Video extends Component {
  constructor() {
    super()

    this.state = {
      controls: false
    }
  }



  render() {
    var mobile = window.innerWidth < 450 ? true : false 
    return (
      <div className="video-container">
        <ReactPlayer
          onClick={() => this.setState({ controls: true })}
          url={OneBiteVideoCompressed}
          playing
          muted={true}
          width={mobile ? '100%' : '85%'}
          height={mobile ? '100%' : '85%'}
          controls={this.state.controls}          
          className="home-video-player"
        />
      </div>
    )
  }
}



export default Video