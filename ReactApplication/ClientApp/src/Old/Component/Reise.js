import React, { useState, useEffect } from "react";
import { CTAButton } from "../parts/CTAButton";
import axios from "axios";
import { CancelButton } from "../parts/CancelButton";
import { useHistory } from "react-router-dom";

import "./Reise.css";

export const Reise = (props) => {
  const history = useHistory();
  // Hent rute ID som blir sendt gjennom
  const ruteId = props.location.state.id;

  // ----- State -----
  const [dagsreise, setDagsreise] = useState();
  const [reiseDatoTid, setReiseDatoTid] = useState();
  const [ruteFra, setFra] = useState();
  const [ruteTil, setTil] = useState();
  const [prisBarn, setBarn] = useState();
  const [prisVoksen, setVoksen] = useState();
  const [prisLugarStandard, setStandard] = useState();
  const [prisLugarPremium, setPremium] = useState();

  // ----- Feilmelding -----
  const [feilmeldDato, setFeilmeldDato] = useState();
  const [feilmeldBarn, setFeilmeldBarn] = useState();
  const [feilmeldVoksen, setFeilmeldVoksen] = useState();
  const [feilmeldStandard, setFeilmeldStandard] = useState();
  const [feilmeldPremium, setFeilmeldPremium] = useState();
  const [isOk, setIsOk] = useState(false);

  // ----- Const -----
  const reise = {
    reiseDatoTid,
    ruteFra,
    ruteTil,
    prisBarn,
    prisVoksen,
    prisLugarStandard,
    prisLugarPremium,
  };

  // ----- Page on load ----
  useEffect(() => {
    const url = "https://localhost:5001/reise/enrute?ruteId=" + ruteId;
    axios.get(url).then((resp) => {
      setDagsreise(resp.data.dagsreise);
      setFra(resp.data.ruteFra);
      setTil(resp.data.ruteTil);
    });
  }, [ruteId]);

  // ----- Click handler -----
  const handleClick = () => {
    if (isOk) {
      axios.post("https://localhost:5001/reise/reise", reise).then(() => {
        history.goBack();
      });

      console.log(reise);
    }
  };

  // ----- Valider -----
  const inputvalider = (e) => {
    let inndata = e.target.value;
    let innname = e.target.name;
    let melding = "Prisen kan ikke være 0";
    let ok;

    if (!inndata.match(/^(?!\s*$).+/)) {
      ok = false;
      if (innname === "barn") {
        setFeilmeldBarn(melding);
      }
      if (innname === "voksen") {
        setFeilmeldVoksen(melding);
      }
      if (innname === "standard") {
        setFeilmeldStandard(melding);
      }
      if (innname === "premium") {
        setFeilmeldPremium(melding);
      }
    } else {
      ok = true;
      if (innname === "barn") {
        setFeilmeldBarn("");
      }
      if (innname === "voksen") {
        setFeilmeldVoksen("");
      }
      if (innname === "standard") {
        setFeilmeldStandard("");
      }
      if (innname === "premium") {
        setFeilmeldPremium("");
      }
    }

    setIsOk(ok);
  };

  // ----- Valider dato -----
var idag = new Date()
var date = new Date()
console.log(idag.getTime())
console.log(reiseDatoTid)

  return (
    <>
      <div className={" row col-lg-6 card py-4 px-2"}>
        <h1>
          {reise.ruteFra} - {reise.ruteTil}
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={"row g-3 align-items-center my-1"}>
            <div className={"col-lg-3"}>
              <label className={"col-form-label"}>Avreise :</label>
            </div>
            <div className={"col-auto"}>
              <input
                type="datetime-local"
                className={"form-control"}
                name="dato"
                onChange={(e) => {
                  setReiseDatoTid(e.target.value);
                  inputvalider(e);
                }}
              />
            </div>
            <div className={"col-auto"}>
              <small className={"text-danger"}>{feilmeldDato}</small>
            </div>
          </div>

          <div className={"row g-3 align-items-center my-1"}>
            <div className={"col-lg-3"}>
              <label className={"col-form-label"}>Barne billett :</label>
            </div>
            <div className={"col-auto"}>
              <input
                type="number"
                className={"form-control"}
                name="barn"
                onChange={(e) => {
                  setBarn(e.target.value);
                  inputvalider(e);
                }}
              />
            </div>
            <div className={"col-auto"}>
              <small className={"text-danger"}>{feilmeldBarn}</small>
            </div>
          </div>

          <div className={"row g-3 align-items-center my-1"}>
            <div className={"col-lg-3"}>
              <label className={"col-form-label"}>Voksen billett :</label>
            </div>
            <div className={"col-auto"}>
              <input
                type="number"
                className={"form-control"}
                name="voksen"
                onChange={(e) => {
                  setVoksen(e.target.value);
                  inputvalider(e);
                }}
              />
            </div>
            <div className={"col-auto"}>
              <small className={"text-danger"}>{feilmeldVoksen}</small>
            </div>
          </div>

          {dagsreise === false && (
            <>
              <div className={"row g-3 align-items-center my-1"}>
                <div className={"col-lg-3"}>
                  <label className={"col-form-label"}>Standard lugar :</label>
                </div>
                <div className={"col-auto"}>
                  <input
                    type="standard"
                    className={"form-control"}
                    name="avreisested"
                    onChange={(e) => {
                      setStandard(e.target.value);
                      inputvalider(e);
                    }}
                  />
                </div>
                <div className={"col-auto"}>
                  <small className={"text-danger"}>{feilmeldStandard}</small>
                </div>
              </div>

              <div className={"row g-3 align-items-center my-1"}>
                <div className={"col-lg-3"}>
                  <label className={"col-form-label"}>Premium lugar :</label>
                </div>
                <div className={"col-auto"}>
                  <input
                    type="number"
                    className={"form-control"}
                    name="premium"
                    onChange={(e) => {
                      setPremium(e.target.value);
                      inputvalider(e);
                    }}
                  />
                </div>
                <div className={"col-auto"}>
                  <small className={"text-danger"}>{feilmeldPremium}</small>
                </div>
              </div>
            </>
          )}

          <div className={"d-flex flex-row"}>
            <CTAButton click={() => handleClick()}>Opprett ny rute</CTAButton>

            <div className={"mx-3"}>
              <CancelButton til={"/managetrip"}>Avbryt</CancelButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
