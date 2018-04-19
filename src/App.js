import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bulma.css';
import firebase from 'firebase'
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
      currentCommenter: '',
      commentList: [],
    };
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommenterChange = this.handleCommenterChange.bind(this);
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
        }))
      });
    });

  };

  handleCommentChange(event) {
    this.setState({
      currentComment: event.target.value
    })
  };

  handleCommenterChange(event) {
    this.setState({
      currentCommenter: event.target.value
    })
  };

  submitComment() {
    const commentListRef = db.collection('commentList');
    // send comment to database
    var timeCreated = '' + new Date().getTime();
    commentListRef.doc(timeCreated).set({
      content: this.state.currentComment,
      owner: this.state.currentCommenter,
      id: timeCreated,
    })
    .then(() => {
      console.log('Comment sent');
    })

    // reset currentComment
    this.setState({
      currentComment: ''
    })
  };


  render() {

    return (
      <div className="App">
        <h1>{this.state.currentComment}</h1>
        <h1>{this.state.currentCommenter}</h1>

        <div className="commentSection"> 
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="http://xpertlab.com/wp-content/uploads/2014/04/20151012_561baed03a54e.png"/>
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Type your name..."
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

        {
          this.state.commentList.map((comment, commentIndex) => (
            <div class="commentCard">
              <div class ="commentOwner">
                <p>Name: {comment.owner}</p>
              </div>
              <div class ="commentContent">
                <p>Content: {comment.content}</p>
              </div>
            </div>
          ))
        }

      </div>
    );
  };
}

export default App;
