import React, { Children, useState } from "react";
import "./CTA.css";

export const CTAButton = (props) => {



  return (
    <button type={"button"} onClick={props.click} className={"mt-4 btn call-to-action"}>
      {props.children}
    </button>
  );
};