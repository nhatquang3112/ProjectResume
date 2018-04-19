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
                <article class="media">
                  <figure class="media-left">
                    <p class="image is-48x48">
                      <img src="https://avatars2.githubusercontent.com/u/29501183?s=400&u=a5d8e63293fb02fcd2880bcf8fcef2ea4a367031&v=4"/>
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Nhat-Quang Tran</strong>
                        <br></br>
                        My name is Quang, a Computer Science student from the National University of Singapore (NUS)
                        <br></br>
                        With experience in front-end web development and android game development, I am seeking for internship
                        opportunities to further expand my programming skills and to become a better software engineer.
                      </p>
                    </div>
                  </div>
                </article>

            </div>
        );
      }
}

export default VideoPlayer;
