import React, { useState } from "react";
import axios from "axios";


export const Login = () => {
  // ----- State -----
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [brukernavnError, setBrukernavnError] = useState("");
  const [passordError, setPassordError] = useState("");

  // ----- Functions -----
  const loggInn = () => {
    const bruker ={
      Brukernavn: brukernavn,
      Passord: passord,
    }

    const url = "Bruker/LoggInn";
    
    axios.post(url, bruker, () => {
      console.log("Success!")
    });
  }


  // ----- Render -----
  return (
    <>
     <div className={"row justify-content-center "}>
        <div className={"col-lg-6 col-md-8 col-sm-12 p-5 border"}>
          <h2 className={"mb-4"}>
            <i className={"bi bi-person-fill"}> </i>Login
          </h2>
          <form>
            <div className={"form-group"}>
              <label>Brukernavn</label>
              <input
                type="text"
                className={"form-control"}
                onChange={(e)=>setBrukernavn(e.target.value)}
              />
              <small style={{color: "red"}} id={setBrukernavnError}></small>
            </div>
            <div className={"form-group"}>
              <label htmlFor={"passord"}>Passord</label>
              <input
                type="text"
                name="passord"
                className={"form-control"}
                onChange={(e)=>setPassord(e.target.value)}
              />
            </div>
            <div className="form-group">
            <button type="submit" className={"btn btn-secondary mt-2"}>
              Login
            </button>
            </div>
          </form>
        </div>
      </div>
    
    
    </>
  );
};