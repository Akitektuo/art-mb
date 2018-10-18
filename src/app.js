import React, { Component } from 'react';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <img className="profile" src="https://i0.wp.com/timdettmers.com/wp-content/uploads/2018/05/cropped-profile_300kb.png?fit=512%2C512"/>
          <div className="bio">
            <div className="name">
              Firstname Lastname
            </div>
            <div className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra quis justo sed condimentum. Aenean orci augue, viverra in tincidunt vestibulum, accumsan sit amet ante. Proin gravida augue nisi, eget molestie augue interdum id. Aliquam et felis ac turpis sagittis egestas ut at lectus. Pellentesque tellus ante, scelerisque a diam sit amet, volutpat pellentesque libero. Nullam massa massa, suscipit a luctus quis, tristique at est. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
