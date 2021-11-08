import { signOutWithGoogle } from "../firebase/firebase.util";
import "./LandingPage.style.scss";
import React from "react";
import { connect } from "react-redux";
import Linkk from "../Components/link";
import {
  GetLinks,
  SetLinks,
  SetStyles,
  GetStyles
} from "../firebase/firebase.util";
import { setLinks } from "../redux/links/link.actions";
import { setStyles } from "../redux/styles/styles.actions";
import { Modal, Button } from "react-bootstrap";
import alertify from "alertifyjs";
import "alertifyjs/build/css/themes/semantic.min.css";
import { TwitterPicker } from "react-color";

var user;

class LandingPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
      show1: false,
      text: null,
      link: null,
      primaryColor: props.currentStyles.primaryColor,
      bgColor: props.currentStyles.bgColor,
      dnColor: props.currentStyles.dnColor
    };

    GetLinks(props.currentUser.uid).then((links) => {
      this.props.setLinks(links);
    });
    GetStyles(props.currentUser.uid).then((styles) => {
      this.props.setStyles(styles);
    });
  }

  //modal 1
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  // modal 2
  handleClose1() {
    this.setState({ show1: false });
  }

  handleShow1() {
    this.setState({ show1: true });
  }

  // function to set link and update link state and close modal check and add http://
  setter() {
    const http = "http://";
    var LinkToSet = this.state.link;
    //adding httpws if not there
    if (LinkToSet.substring(0, 4) === "http") {
    } else {
      LinkToSet = http.concat(LinkToSet);
    }
    //setting the firebase and updating redux state
    SetLinks(user.uid, this.state.text, LinkToSet).then(() => {
      GetLinks(user.uid).then((links) => {
        this.props.setLinks(links);
      });
    });
    alertify.message("Link Added!!");
    this.handleClose();
  }

  // handalingform submit
  handleSubmit(event) {
    const { text, link } = event.target.value;
    console.log(text);
  }
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  //handle primaryColor
  handleprimaryColor(color, e) {
    this.setState({ primaryColor: color.hex });
  }

  //handle bgColor
  handlebgColor(color, e) {
    this.setState({ bgColor: color.hex });
  }

  handlednColor(color, e) {
    this.setState({ dnColor: color.hex });
  }

  //set colors to firebase
  setColors() {
    SetStyles(
      user.uid,
      this.state.primaryColor,
      this.state.bgColor,
      this.state.dnColor
    ).then(() => {
      GetStyles(user.uid).then((styles) => {
        this.props.setStyles(styles);
      });
    });
    this.handleClose1();
  }
  //copy to clipboard
  copyie() {
    navigator.clipboard.writeText(
      `https://csb-zdldr.netlify.app/v/${user.uid}`
    );
    alertify.message("Viewer link Copied to Clipboard");
  }

  render() {
    document.body.style.backgroundColor = this.props.currentStyles.bgColor;

    user = this.props.currentUser;
    const links = this.props.links;
    // SetLinks(user.uid);
    var linkComps;
    if (links === null) {
      linkComps = "";
    } else {
      linkComps = links.map((data) => (
        <Linkk link={data.link} text={data.text} />
      ));
    }

    return (
      <div>
        {/* setting button */}
        <div className="dropdown">
          <button
            style={{ backgroundColor: this.props.currentStyles.primaryColor }}
            className="dropbtn"
          >
            <i class="bi bi-gear fa-lg"></i>
          </button>
          <div className="dropdown-content">
            <a onClick={() => this.handleShow()}>
              <i class="bi bi-plus-circle-fill"></i>Add Link
            </a>
            <a onClick={() => this.handleShow1()}>
              <i class="bi bi-palette-fill"></i>Visual Setting
            </a>
            <a onClick={this.copyie}>
              <i class="bi bi-intersect"></i>Copy Link
            </a>
            <a href="#" onClick={signOutWithGoogle}>
              <i class="bi bi-person-x-fill"></i>
              Sign Out
            </a>
          </div>
        </div>
        <img
          style={{ borderColor: this.props.currentStyles.primaryColor }}
          className="user-dp"
          src={user.photoURL}
          alt="user-pic"
        />

        <p
          className="user-name"
          style={{ color: this.props.currentStyles.dnColor }}
        >
          {user.displayName}
        </p>

        <div className="linksContainer">{linkComps}</div>

        {/* test */}

        {/* for madal 1 */}
        <form onSubmit={this.handleSubmit}>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header>
              <Modal.Title>Add Link</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Label : <input name="text" onChange={this.handleChange} />
              <br />
              <br />
              Link : <input name="link" onChange={this.handleChange} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
              </Button>

              <Button
                type="submit"
                variant="primary"
                onClick={() => {
                  if (this.state.text == null || this.state.link == null) {
                    alertify.message("Cannot Leave Label or Link empty");
                  } else {
                    this.setter();
                  }
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
        {/* modal 2 */}
        <Modal show={this.state.show1} onHide={() => this.handleClose1()}>
          <Modal.Header>
            <Modal.Title>Visual Setting</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Find your Custom Color's hex Code{" "}
            <a href="https://htmlcolorcodes.com/color-picker/">here</a>
            <br />
            <br />
            Primary Color:
            <br />
            <br />
            <TwitterPicker
              color={this.state.primaryColor}
              onChangeComplete={(color) => this.handleprimaryColor(color)}
            />
            <br />
            <br />
            Background Color:
            <br />
            <br />
            <TwitterPicker
              color={this.state.bgColor}
              onChangeComplete={(color) => this.handlebgColor(color)}
            />
            <br />
            <br />
            Display Name Color:
            <br />
            <br />
            <TwitterPicker
              color={this.state.dnColor}
              onChangeComplete={(color) => this.handlednColor(color)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose1()}>
              Close
            </Button>

            <Button
              type="submit"
              variant="primary"
              onClick={() => {
                this.setColors();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  links: state.links.links,
  currentStyles: state.styles.currentStyles
});

const mapDispatchToProps = (dispatch) => ({
  setLinks: (links) => dispatch(setLinks(links)),
  setStyles: (styles) => dispatch(setStyles(styles))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
