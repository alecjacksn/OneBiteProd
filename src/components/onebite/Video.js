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
    return (
      <div className="video-container">
        <ReactPlayer
          onClick={() => this.setState({ controls: true })}
          url={OneBiteVideoCompressed}
          playing
          muted={true}
          width='85%'
          height='85%'
          controls={this.state.controls}
          style={{ cursor: 'pointer', paddingBottom: '50px', paddingTop: '50px' }}
        />
      </div>
    )
  }
}



export default Video