import React, { Component } from 'react';
import './App.css';
import './bulma.css';
import firebase from 'firebase'
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import VideoCard from './components/VideoCard';
require('firebase/firestore')
const config = {
  apiKey: "AIzaSyA5OF2SSGffajrja4juFCrdor5zhyjo25Y",
  authDomain: "projectresume-53405.firebaseapp.com",
  databaseURL: "https://projectresume-53405.firebaseio.com",
  projectId: "projectresume-53405",
  storageBucket: "projectresume-53405.appspot.com",
  messagingSenderId: "155727017015"
}
firebase.initializeApp(config)
const db = firebase.firestore()

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: 'Tran Nhat Quang',
      currentComment: '',
      currentReply: '',
      replyIndex: '-1',
      currentCommenter: '',
      commentList: [],
      currentVideoTitle: '',
      currentVideoId: '',
      videoList: [
          {
              title: 'Welcome to my Online Resume',
              videoId: '6iN-DHPgFSU'
          },
          {
              title: 'My Experience',
              videoId: 'dbuGg--MRjo'
          },
          {
              title: 'My Education at NUS',
              videoId: 'LuJKrTGKFpI'
          }
      ]
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommenterChange = this.handleCommenterChange.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  };

  componentDidMount() {
    // set listener on the commentList
    const commentListRef = db.collection('commentList');
    commentListRef.onSnapshot(snap => {
      this.setState({
        commentList: snap.docs.map(doc => ({
          content: doc.data().content,
          owner: doc.data().owner,
          id: doc.data().id,
          replyList: doc.data().replyList,
        }))
      });
    });
    //set the default video
    let newVideo = this.state.videoList[0];
      this.setState({
          currentVideoTitle: newVideo.title,
          currentVideoId: newVideo.videoId,
      })
  };

  handleCommentChange(event) {
    this.setState({
      currentComment: event.target.value
    })
  };

  handleReplyChange(event) {
    this.setState({
      currentReply: event.target.value
    })
  };

  handleCommenterChange(event) {
    this.setState({
      currentCommenter: event.target.value
    })
  };
  onTabChange = (tabIndex) => {
      let newVideo = this.state.videoList[tabIndex];
      this.setState({
          currentVideoTitle: newVideo.title,
          currentVideoId: newVideo.videoId
      })
  }

  submitComment() {
    const commentListRef = db.collection('commentList');
    // send comment to database
    if (this.state.currentComment.length > 0) {
      var timeCreated = '' + new Date().getTime();
      commentListRef.doc(timeCreated).set({
        content: this.state.currentComment,
        owner: this.state.currentCommenter.length > 0 ? this.state.currentCommenter : 'Anonymous',
        id: timeCreated,
        replyList: [],
      })
      .then(() => {
        console.log('Comment sent');
      })
    }
    // reset currentComment
    this.setState({
      currentComment: ''
    })
  };

  submitReply(id) {
    // console.log(id);
    // send reply to database
    const commentRef = db.collection('commentList').doc(id)
    if (this.state.currentReply.length > 0) {
      db.runTransaction((trans) => {
        return trans.get(commentRef).then(doc => {
          var newReplyList = doc.data().replyList
          newReplyList.push({
            owner: this.state.currentCommenter.length > 0 ? this.state.currentCommenter : 'Anonymous',
            content: this.state.currentReply,
          });
          // console.log(newReplyList)
          trans.update(commentRef, {replyList: newReplyList});
        })
      }).then(() => {
        console.log('Reply sent')
        // reset replyIndex and currentReply
        this.setState({
          currentReply: ''
        })
      })
    }
    this.setState({
      replyIndex: '-1'
    })
  };

  openReplyBox(index) {
    this.setState({
      replyIndex: index
    })
  }


  render() {

    return (
      <div className="App">
        <Header />
        <br/>
        <div className="columns">
          <div className="column is-1">
          </div>

          <div className="column is-7">
            <VideoPlayer title={this.state.currentVideoTitle} videoId={this.state.currentVideoId}/>
            <hr/>
            <div className="commentBox">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src="https://www.freeiconspng.com/uploads/profile-icon-28.png"/>
                  </p>
                </figure>
                <div class="media-content">
                  <div class="field">
                    <div class="control">
                      <input class="input" type="text" placeholder="Type your name (for both commenting and replying)"
                        value={this.state.currentCommenter} onChange={this.handleCommenterChange}
                      />
                    </div>
                  </div>
                  <div class="field">
                    <p class="control">
                      <textarea class="textarea" placeholder="Add a comment..."
                        value={this.state.currentComment} onChange={this.handleCommentChange}
                      ></textarea>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control">
                      <button class="button" onClick={this.submitComment}>Post comment</button>
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <div className="commentSection">
              {
                this.state.commentList.map((comment, commentIndex) => (
                  <article class="media">
                    <figure class="media-left">
                      <p class="image is-64x64">
                        <img src="https://www.freeiconspng.com/uploads/profile-icon-28.png"/>
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{comment.owner}</strong>
                          <br></br>
                          {comment.content}
                          <br></br>
                          <small><a onClick={this.openReplyBox.bind(this, commentIndex)}>Reply</a></small>
                          {this.state.replyIndex.toString() === commentIndex.toString() &&
                            <span className="replyBox">
                              <input class="input" type="text" placeholder="Add a reply..."
                                value={this.state.currentReply} onChange={this.handleReplyChange}
                              />
                              <a class="button" onClick={this.submitReply.bind(this, comment.id)}>Post</a>
                            </span>
                          }
                        </p>
                      </div>

                       {comment.replyList !== undefined &&

                        comment.replyList.map((reply, replyIndex) => (
                          <article class="media">
                            <figure class="media-left">
                              <p class="image is-48x48">
                                <img src="https://www.freeiconspng.com/uploads/profile-icon-28.png"/>
                              </p>
                            </figure>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>{reply.owner}</strong>
                                  <br></br>
                                  {reply.content}
                                </p>
                              </div>
                            </div>
                          </article>
                        ))
                      }

                    </div>
                  </article>
                ))
              }
            </div>
          </div>



            <div className="column is-3">
              <label class="label">Playlist</label>
              {
                this.state.videoList.map((obj, index) => (
                    <VideoCard key={obj.title + index} title={obj.title} index={index} onTabClick={this.onTabChange} />
                ))
              }
            </div>

        </div>
      </div>
    );
  };
}

export default App;
