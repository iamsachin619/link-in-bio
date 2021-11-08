import React from "react";
import "./view.style.css";
import LinkView from "../Components/LinkView";
import { signOutWithGoogle } from "../firebase/firebase.util";
import { GetLinks, GetUserData, GetStyles } from "../firebase/firebase.util";
import { withRouter, useParams } from "react-router-dom";

var linkComps, userImg, userName;

class View extends React.Component {
  constructor(props) {
    super();
    this.state = {
      links: null,
      userData: null,
      primaryColor: "green",
      bgColor: "white",
      dnColor: "black"
    };
    GetLinks(props.match.params.userId).then((links) => {
      this.setState({ links: links });
    });
    GetUserData(props.match.params.userId).then((data) => {
      this.setState({ userData: data });
    });
    GetStyles(props.match.params.userId).then((styles) => {
      const { primaryColor, bgColor, dnColor } = styles;
      this.setState({
        primaryColor: primaryColor,
        bgColor: bgColor,
        dnColor: dnColor
      });
    });
  }

  render() {
    document.body.style.backgroundColor = this.state.bgColor;

    if (this.state.links === null) {
      linkComps = "fdtdt";
    } else {
      linkComps = this.state.links.map((data) => (
        <LinkView
          color={this.state.primaryColor}
          link={data.link}
          text={data.text}
        />
      ));
    }

    if (this.state.userData === null) {
      userImg = "";
      userName = "";
    } else {
      userImg = (
        <img
          style={{ borderColor: this.state.primaryColor }}
          className="user-dp"
          src={this.state.userData.photoURL}
          alt="user-pic"
        />
      );
      userName = (
        <p style={{ color: this.state.dnColor }} className="user-name">
          {this.state.userData.displayName}
        </p>
      );
    }
    return (
      <div>
        {userImg}
        {userName}

        <div className="linkscontainer">{linkComps}</div>
      </div>
    );
  }
}

export default withRouter(View);
