import React, { Children, useState } from "react";
import { Link } from "react-router-dom";
import "./CTAButton.css";

export const CancelButton = (props) => {

  return (
    <Link to={props.til} className={"mt-4 btn call-to-action"}>
      {props.children}
    </Link>
  );
};
