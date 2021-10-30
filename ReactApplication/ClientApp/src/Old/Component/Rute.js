import React, { useState } from "react";
import axios from "axios";
import { CTAButton } from "../parts/CTAButton";
import { CancelButton } from "../parts/CancelButton";
import { useHistory } from "react-router-dom";

export const Rute = () => {
  const history = useHistory();

  // ----- State -----
  const [avreisested, setAvreisested] = useState("");
  const [destinasjon, setDestinasjon] = useState("");
  const [dagsreise, setDagsreise] = useState(false);

  // Validering
  const [isOk, setIsOk] = useState(false);

  // Feilmeldinger
  const [axiosFeilmelding, setAxiosFeilmelding] = useState("");
  const [avreisestedFeilmelding, setAvreisestedFeilmelding] = useState("");
  const [destinasjonFeilmelding, setDestinasjonFeilmelding] = useState("");

  // ----- Function -----
  // Set true/false for dagsreise
  const handleToggle = (e) => {
    setDagsreise(!dagsreise);
  };

  // Post-request mot database
  const handleSubmit = (e) => {
    var nyReise = {
      ruteFra: avreisested,
      ruteTil: destinasjon,
      dagsreise: dagsreise,
    };

    const url = "https://localhost:5001/reise/rute?";

    if (isOk === true) {
      axios
        .post(url, nyReise)
        .then(() => {
          history.goBack();
        })
        .catch((resp) => {
          if (resp.response) {
            setAxiosFeilmelding(resp.response.data);
          }
        });
    } else {
      setAxiosFeilmelding("Feltene kan IKKE være tom");
    }
  };

  // Inputvalidering
  const inputvaliderFra = (e) => {
    let inndata = e.target.value;
    let innname = e.target.name;
    let melding = "Kan ikke være tomt!";
    let ok = isOk;

    if (!inndata.match(/^(?!\s*$).+/)) {
      ok = false;
      console.log(innname);
      if (innname === "avreisested") {
        setAvreisestedFeilmelding(melding);
      }
      if (innname === "destinasjon") {
        setDestinasjonFeilmelding(melding);
      }
    } else {
      ok = true;
      console.log(innname);
      if (innname === "avreisested") {
        setAvreisestedFeilmelding("");
      }
      if (innname === "destinasjon") {
        setDestinasjonFeilmelding("");
      }
      setIsOk(ok);
    }
  };

  // ----- HTML -----
  return (
    <>
      <div className={"row"}>
        <div className={"row card py-4 col-lg-6 px-2"}>
          <h3 className={"text-uppercase"}>Registrer nye reiserute</h3>
          <form className={"col-lg-12 my-1"}>
            <div className={"row g-3 align-items-center"}>
              <div className={"col-auto"}>
                <label class="col-form-label">Avreisested :</label>
              </div>
              <div className={"col-auto"}>
                <input
                  type="text"
                  className={"form-control"}
                  name="avreisested"
                  onChange={(e) => {
                    setAvreisested(e.target.value);
                    inputvaliderFra(e);
                  }}
                />
              </div>
              <div className={"col-auto"}>
                <small className={"text-danger"} class="form-text">
                  {avreisestedFeilmelding}
                </small>
              </div>
            </div>

            <div class="row g-3 my-1 align-items-center">
              <div class="col-auto">
                <label class="col-form-label">Destinasjon :</label>
              </div>
              <div class="col-auto">
                <input
                  type="text"
                  class="form-control"
                  name="destinasjon"
                  onChange={(e) => {
                    setDestinasjon(e.target.value);
                    inputvaliderFra(e);
                  }}
                />
              </div>
              <div class="col-auto">
                <small className={"text-danger"} class="form-text">
                  {destinasjonFeilmelding}
                </small>
              </div>
            </div>

            <div class="form-check form-switch mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                onChange={(e) => handleToggle(e)}
              />
              <label class="form-check-label">
                {dagsreise === false && (
                  <small>
                    <span className={"text-decoration-underline"}>IKKE</span>
                     <small> dagsreise</small>
                  </small>
                )}
                {dagsreise === true && <small>Dagsreise</small>}
              </label>
            </div>

            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <span id="avreise_feilmeleding" class="form-text"></span>
              </div>
            </div>

            <div className={"d-flex flex-row"}>
              <CTAButton click={handleSubmit}>Opprett ny rute</CTAButton>

              <div className={"mx-3"}>
                <CancelButton til={"/managetrip"}>Avbryt</CancelButton>
              </div>
            </div>

            <div class="col-auto mt-3">
              <span class="form-text text-danger">{axiosFeilmelding}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
