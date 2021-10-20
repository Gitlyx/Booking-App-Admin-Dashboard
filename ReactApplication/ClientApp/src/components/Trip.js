import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const Trip = () => {
  // ----- State -----
  const [isToggled, setToggled] = useState("Hello");

  // ----- Functions -----
  const changeHandler = (e) => {
    setToggled(e.target.value);
    console.log(isToggled)
  }


  return (
    <>
        
    </>
  );
};
