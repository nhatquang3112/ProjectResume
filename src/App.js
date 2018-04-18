import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
        <h1>{this.state.name}</h1>
        <h1>{this.state.currentComment}</h1>
        <h1>{this.state.currentCommenter}</h1>


        <span>Change your name below</span>
        <textarea value={this.state.currentComment} placeholder="comment" onChange={this.handleCommentChange} />
        <textarea value={this.state.currentCommenter} placeholder="commenter" onChange={this.handleCommenterChange} />
        <button onClick={this.submitComment}>Submit</button>

      </div>
    );
  };
}

export default App;
