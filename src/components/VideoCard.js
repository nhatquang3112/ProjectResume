import React, {Component} from 'react';

class VideoCard extends Component {
    constructor(props) {
      super(props);
      this.changeTab = this.changeTab.bind(this);
    }

    changeTab(e) {
        if (typeof this.props.onTabClick === 'function') {
            this.props.onTabClick(this.props.index);
        }
    }

    render() {
        const videoTitle = this.props.title;
        //const index = this.props.index;

        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">

                        {/* Video Image */}
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://cdn0.iconfinder.com/data/icons/flat-green-icon-set/128/Play_Icon_FlatGreen.png" alt="card" />
                            </figure>
                        </div>

                        {/* Video Title */}
                        <div className="media-content">
                            <a className="bd-link" onClick={this.changeTab}>
                              <p className="bd-link-subtitle">
                                {videoTitle}
                              </p>

                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default VideoCard
