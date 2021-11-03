import React from "react";
import { ProgressBar } from "react-bootstrap";

export const Loading = () => {
  return (
    <div className={"d-flex vh-70 ustify-content-center fade-this"}>
      <div className={""}>
        <h2>Laster inn ...</h2>
        <ProgressBar animated now={100} style={{ width: "300px" }} />
      </div>
    </div>
  );
};
