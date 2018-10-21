import React, { Component } from 'react';
import './app.css';
import firebase from 'firebase';
import Gallery from 'react-grid-gallery';

class App extends Component {

  componentWillMount() {
    this.setState({
      imageURL: "",
      name: "",
      description: "",
      phone: "",
      email: "",
      data: []
    });
    if (!firebase.apps.length) {
      let config = {
        databaseURL: "https://mariana-bojan.firebaseio.com/",
        projectId: "mariana-bojan"
      };
      firebase.initializeApp(config);
    }
    firebase.database().ref("/profile/").once("value").then(sBio => {
      const {
        image,
        name,
        description,
        phone,
        email
      } = sBio.val();
      firebase.database().ref("/painting/").once("value", sImg => {
        if (sImg.val() == null) {
          return;
        }
        const data = []
        sImg.forEach(d => {
          const {
            image,
            width,
            height,
            title
          } = d.val();
          if (image == "" || width == 0 || height == 0) {
            return;
          }
          data.push({
            src: image,
            thumbnail: image,
            thumbnailWidth: width,
            thumbnailHeight: height,
            caption: title,
            thumbnailCaption: title
          });
        });
        this.setState({
          imageURL: image,
          name,
          description,
          phone,
          email,
          data
        });
      })
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
          <div className="profile">
            <img src={ imageURL }/>
          </div>
          <div className="bio">
            <div className="name">
              { name }
            </div>
            <div className="description">
              { description }
            </div>
            <div className="contact">
              <div className="phone">
                <img src="https://png.icons8.com/ios-glyphs/30/333333/phone.png"/>
                <a href={`tel:${this.state.phone.replace(/\s+/g, "")}`} className="phone-text">
                  { this.state.phone }
                </a>
              </div>
              <div className="email">
                <img src="https://png.icons8.com/ios-glyphs/30/333333/new-post.png"/>
                <a href={`mailto:${this.state.email}`} className="email-text">
                  { this.state.email }
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery">
          <Gallery 
            rowHeight={512}
            images={this.state.data}
            enableImageSelection={false}
            imageCountSeparator=" din "/>
        </div>
      </div>
    );
  }
}

export default App;
