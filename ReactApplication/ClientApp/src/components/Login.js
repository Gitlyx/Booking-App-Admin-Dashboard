import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const Login = () => {
  // ----- State -----
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");

  // ----- Functions -----
  console.log("Brukernavn:" + brukernavn)
  console.log("Passord:" + passord)

  const changeHandler = (e) => {
    setBrukernavn(e.target.value);
    setPassord(e.target.value);
  }

  return (
    <>
     <div className={"row justify-content-center "}>
        <div className={"col-lg-6 col-md-8 col-sm-12 p-5 border"}>
          <h2 className={"mb-4"}>
            <i className={"bi bi-person-fill"}> </i>Login
          </h2>
          <form>
            <div className={"form-group"}>
              <label>brukernavn</label>
              <input
                type="text"
                className={"form-control"}
                onChange={(e)=>changeHandler(e)}
              />
            </div>
            <div className={"form-group"}>
              <label htmlFor={"passord"}>passord</label>
              <input
                type="text"
                name="passord"
                className={"form-control"}
                onChange={(e)=>changeHandler(e)}
              />
            </div>
            <button type="submit" className={"btn btn-secondary"}>
              Login
            </button>
          </form>
        </div>
      </div>
    
    
    </>
  );
};