import React, { useEffect } from "react";
import "./link.style.scss";
import { Link } from "react-router";

const LinkView = (props) => {
  return (
    <div className="container">
      <a
        style={{
          backgroundColor: props.color,
          borderColor: props.color
        }}
        className="link linkbox"
        target="_blank"
        href={props.link}
      >
        {props.text}
      </a>
    </div>
  );
};

export default LinkView;
