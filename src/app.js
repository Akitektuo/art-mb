import React, { Component } from 'react';
import './app.css';
import firebase from 'firebase';

class App extends Component {

  componentWillMount() {
    this.setState({
      imageURL: "",
      name: "",
      description: ""
    });
    if (!firebase.apps.length) {
      var config = {
        databaseURL: "https://mariana-bojan.firebaseio.com/",
        projectId: "mariana-bojan"
      };
      firebase.initializeApp(config);
    }
    firebase.database().ref("/profile/").once("value").then(s => {
      this.setState({
        imageURL: s.val().image,
        name: s.val().name,
        description: s.val().description
      });
    });
  }

  render() {
    const { 
      imageURL,
      name,
      description
    } = this.state;
    return (
      <div className="app">
        <div className="header">
          <img className="profile" src={ imageURL }/>
          <div className="bio">
            <div className="name">
              { name }
            </div>
            <div className="description">
              { description }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
