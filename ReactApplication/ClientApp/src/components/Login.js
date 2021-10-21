import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
  // ----- State -----

  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  // ----- Functions -----

  const valider = (e) => {
    let text = e.target.value;

    if (text === "") {
      setErrorLogin("Mangler brukernavn/passord");
    console.log(false);
      return false;
    }
    console.log(true);
    return true;
  }

  const handleSubmit = (e) => {
    if (valider(true)) {
          axios
      .post("https://localhost:5001/bruker/bruker", {
        brukernavn: brukernavn,
        passord: passord,
      })
      .then(() => {
        setErrorLogin(<p style={{ color: "green" }}>Logginn vellykket!</p>);
        console.log("Success");
      })
      .catch((resp) => {
        if (resp.response) {
          setErrorLogin(<p style={{ color: "red" }}>{resp.response.data}</p>);
        }
      });
    }

  };

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
                name="brukernavn"
                className={"form-control"}
                onChange={(e) => {
                  setBrukernavn(e.target.value);
                  valider(e.target.value);
                }}
              />
            </div>
            <div className={"form-group"}>
              <label htmlFor={"errorBrukernavn"}>Passord</label>
              <input
                type="text"
                name="passord"
                className={"form-control"}
                onChange={(e) => {
                  setPassord(e.target.value);
                  valider(e.target.value);
                }}
              />
            </div>
            <div className="py-2">{errorLogin}</div>
            <button className={"btn btn-secondary mt-3"} onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
