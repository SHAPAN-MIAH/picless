import React from 'react';
import videojs from 'video.js';

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
          console.log('onPlayerReady', this)
        });
        console.log(this.videoNode)
      }

      
    
      componentWillUnmount() {
        if (this.player) {
          this.player.dispose()
        }
      }
    
      render() {
        return (
          <div className="video-js">	
            <div data-vjs-player>
              <video ref={ node => this.videoNode = node } className="video-js"></video>
            </div>
          </div>
        )
      }
}
