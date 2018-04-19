import YouTube from 'react-youtube';
import React, {Component} from 'react';

class VideoPlayer extends Component {
    onVideoReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

    render() {
        const opts = {
          height: '430',
          width: '815',
          playerVars: {
            autoplay: 0
          }
        };
        const videoId = this.props.videoId;
        const title = this.props.title;

        // style={{marginLeft: "10px"}}
        return (
            <div align="left">
                <YouTube
                    videoId= {videoId}
                    opts={opts}
                    onReady={this.onVideoReady}
                />
                <p className="title is-4">{title}</p>
            </div>
        );
      }
}

export default VideoPlayer;
