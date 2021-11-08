import React, { useEffect } from "react";
import "./link.style.scss";
import { connect } from "react-redux";
import { DelLink, GetLinks } from "../firebase/firebase.util";
import { setLinks } from "../redux/links/link.actions";
import alertify from "alertifyjs";

const Linkk = (props) => {
  let linkStyle = {
    backgroundColor: props.currentStyles.primaryColor,
    borderColor: props.currentStyles.primaryColor
  };
  return (
    <div className="container">
      <a
        style={linkStyle}
        className="link linkbox"
        target="_blank"
        href={props.link}
      >
        {props.text}
      </a>
      <span>
        <i
          className="trash"
          onClick={async () => {
            DelLink(props.currentUser.uid, props.link).then(() => {
              GetLinks(props.currentUser.uid).then((links) => {
                props.setLinks(links);
              });
            });
            alertify.message("Link Deleted!");
          }}
          className="bi bi-trash fa-lg"
        ></i>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentStyles: state.styles.currentStyles
});

const mapDispatchToProps = (dispatch) => ({
  setLinks: (links) => dispatch(setLinks(links))
});
export default connect(mapStateToProps, mapDispatchToProps)(Linkk);
