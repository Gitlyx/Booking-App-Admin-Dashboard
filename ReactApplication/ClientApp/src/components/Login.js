import React, { useState } from "react";
import validering from "./validering";
import axios from "axios";

export const Login = () => {
  // ----- State -----

  const [values, setValues] = useState({
    brukernavn: "",
    passord: "",
  });

  const [errors, setErrors] = useState({});

  // ----- Functions -----
  // https://www.youtube.com/watch?v=WvRwiE9IkFg

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validering(values));
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
                onChange={handleChange}
                value={values.brukernavn}
              />
              {errors.brukernavn && (
                <small style={{ color: "red" }}>
                  {errors.brukernavn}
                </small>
              )}
            </div>
            <div className={"form-group"}>
              <label htmlFor={"errorBrukernavn"}>Passord</label>
              <input
                type="text"
                name="passord"
                className={"form-control"}
                onChange={handleChange}
                value={values.passord}
              />
              {errors.passord && (
                <small style={{ color: "red" }}>
                  {errors.passord}
                </small>
              )}
            </div>
            <button className={"btn btn-secondary mt-3"} onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
