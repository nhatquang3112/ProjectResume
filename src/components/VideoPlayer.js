import YouTube from 'react-youtube';
import React, {Component} from 'react';

class VideoPlayer extends Component {
    onVideoReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

    render() {
        const opts = {
          height: '450',
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
                <p>My name is Quang, a Computer Science student from the National University of Singapore (NUS)</p>
                <br></br>
                <p>With experience in front-end web development and android game development, I am seeking for internship
                opportunities to further expand my programming skills and to become a better software engineer.
                </p>

            </div>
        );
      }
}

export default VideoPlayer;
