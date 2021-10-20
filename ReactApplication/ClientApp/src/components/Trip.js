import React, { useState } from "react";

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
