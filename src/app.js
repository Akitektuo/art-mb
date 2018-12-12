import React, { Component } from 'react';
import './app.css';
import firebase from 'firebase';
import Gallery from 'react-grid-gallery';
import classNames from 'classnames';

class App extends Component {

  BUTTON_INITAL_TEXT = "Mai multe informații";
  startFrom = 11;

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
    if (!this.isDeveloment()) {
      return;
    }
    this.addPicture(2559, 2113, "Fecioară cu minotaur", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F009.jpg?alt=media&token=da96068b-bf26-45b4-8d50-db5f17b8af2e");
    this.addPicture(2040, 2688, "Oglinda", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F010.jpg?alt=media&token=506b8034-8eac-4f36-a343-cae0bfd9d647");
    this.addPicture(2020, 2048, "", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F011.jpg?alt=media&token=4ee499c9-2a7a-4097-b06c-ce28b50131e9");
    this.addPicture(2092, 2080, "Primăvara", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F012.jpg?alt=media&token=a3c26ef4-0d57-4084-8326-75718ee98e02");
    this.addPicture(2100, 2400, "", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F013.jpg?alt=media&token=2a32ace2-9255-4afa-ae6e-57d714e43993");
    this.addPicture(2040, 2892, "Iubire", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F014.jpg?alt=media&token=7f68d3b2-c9d2-4027-ba28-aa2d72a1fa97");
    this.addPicture(2076, 2904, "", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F015.jpg?alt=media&token=9e72a0d9-d668-4b71-a530-65cb43db0c28");
    this.addPicture(2550, 2112, "Artiști", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F016.jpg?alt=media&token=a42f0a68-31c5-4c03-8347-7843a48cc3c4");
    this.addPicture(2478, 2058, "Visul", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F017.jpg?alt=media&token=6540ede4-975e-438b-b0de-fd2af2db7dc5");
    this.addPicture(2070, 2898, "Fazanul", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F018.jpg?alt=media&token=d8b47ead-8631-4ed3-befd-76f92beb6c8a");
    this.addPicture(2088, 2946, "Compoziție", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F019.jpg?alt=media&token=1984b5ba-be86-4808-a7fd-0d41803325b2");
    this.addPicture(1998, 2730, "", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F020.jpg?alt=media&token=2b711223-0c8e-40fb-b1a5-936bbf09e221");
    this.addPicture(2040, 2874, "Baba cu gâsca", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F021.jpg?alt=media&token=d95d5653-1a50-449a-9c22-36180d492bf3");
    this.addPicture(2076, 2742, "Pieta", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F022.jpg?alt=media&token=e71218e9-35a0-40b8-acdd-c19b100e0ab2");
    this.addPicture(2112, 2976, "Complicii", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F023.jpg?alt=media&token=c22519fc-22e6-40b7-9e21-f28bc4e1d207");
    this.addPicture(2136, 3018, "Party", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F024.jpg?alt=media&token=8930e63b-a0ce-4854-81b7-09bf847523b7");
    this.addPicture(2984, 2120, "Circul", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F025.jpg?alt=media&token=e33ce90b-8cdd-4c4c-8f1b-80fed4d6cafb");
    this.addPicture(2106, 2970, "Accident", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F026.jpg?alt=media&token=a6884547-0154-42ef-8bfb-cf24ec0bc7af");
    this.addPicture(2088, 2886, "Fazanul", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F027.jpg?alt=media&token=0b5b07a8-f7f3-4560-98e2-0f62ab6ec65f");
    this.addPicture(2106, 2946, "Obosită", "https://firebasestorage.googleapis.com/v0/b/mariana-bojan.appspot.com/o/pictures%2F028.jpg?alt=media&token=8ed0dda9-953b-415d-910b-ba13fdd0a39b");
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

  isDeveloment = () => { 
    return '_self' in React.createElement('div');
  }

  addPicture = (width, height, title, url) => {
    const divideBy = Math.floor(Math.round(Math.max(width, height)) / 1000);
    if (divideBy < 1) {
      divideBy = 1;
    }
    width = Math.round(width / divideBy);
    height = Math.round(height / divideBy);
    firebase.database().ref("/painting/" + (this.startFrom++)).set({
      height,
      image: url,
      title,
      width
    });
  }

}

export default App;
