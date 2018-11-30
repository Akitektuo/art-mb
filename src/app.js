import React, { Component } from 'react';
import './app.css';
import firebase from 'firebase';
import Gallery from 'react-grid-gallery';
import classNames from 'classnames';

class App extends Component {

  BUTTON_INITAL_TEXT = "Mai multe informații";

  componentWillMount() {
    this.setState({
      imageURL: "",
      name: "",
      description: "",
      infoButtonText: this.BUTTON_INITAL_TEXT,
      extraInfo: "",
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
        extraInfo,
        phone,
        email
      } = sBio.val();
      let {
        description
      } = sBio.val();
      const year = new Date().getFullYear();
      description = description.replace(/\[yyyy\]/g, year);
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
          extraInfo,
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
      description,
      extraInfo,
      infoButtonText,
      phone,
      email
    } = this.state;
    return (
      <div className="app">
        <div className="header">
          <div className="presentation">
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
                <div className="more-info" onClick={this.onClickInfo}>
                  { infoButtonText }
                </div>
                <div className="phone">
                  <img src="https://png.icons8.com/ios-glyphs/30/333333/phone.png"/>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="phone-text">
                    { phone }
                  </a>
                </div>
                <div className="email">
                  <img src="https://png.icons8.com/ios-glyphs/30/333333/new-post.png"/>
                  <a href={`mailto:${email}`} className="email-text">
                    { email }
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames("detail", {
            "hide": infoButtonText === this.BUTTON_INITAL_TEXT,
            "show": infoButtonText !== this.BUTTON_INITAL_TEXT
          })}>
            { extraInfo }
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

  onClickInfo = () => {
    let { infoButtonText } = this.state;
    infoButtonText = infoButtonText == this.BUTTON_INITAL_TEXT ? "Mai puține informații" : this.BUTTON_INITAL_TEXT;
    this.setState({
      infoButtonText
    })
  }

}

export default App;
