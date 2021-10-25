import React, { useState, useEffect } from "react";
import { CTAButton } from "../parts/CTAButton";
import axios from "axios";
import { CancelButton } from "../parts/CancelButton";
import { useHistory } from "react-router-dom";

export const Reise = (props) => {
  const history = useHistory();
  // Hent rute ID som blir sendt gjennom
  const ruteId = props.location.state.id;

  // ----- State -----
  const [dagsreise, setDagsreise] = useState();
  const [reiseDatoTid, setReiseDatoTid] = useState();
  const [fra, setFra] = useState();
  const [til, setTil] = useState();
  const [barn, setBarn] = useState();
  const [voksen, setVoksen] = useState();
  const [standard, setStandard] = useState();
  const [premium, setPremium] = useState();
  // ----- Const -----
  const reise = {
    reiseDatoTid: reiseDatoTid,
    ruteFra: fra,
    ruteTil: til,
    prisBarn: barn,
    prisVoksen: voksen,
    prisLugarStandard: standard,
    prisLugarPremium: premium,
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

  const handleClick = () => {
    axios.post('https://localhost:5001/reise/reise', reise)
    .then(() => {
      history.goBack();
    })

    console.log(reise)
  }

  return (
    <>
      <h1>
        {reise.ruteFra} - {reise.ruteTil}
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={"row g-3 align-items-center"}>
          <div className={"col-auto"}>
            <label className={"col-form-label"}>Avreise :</label>
          </div>
          <div className={"col-auto"}>
            <input
              type="datetime-local"
              className={"form-control"}
              name="avreisested"
              onChange={(e) => {
                setReiseDatoTid(e.target.value);
              }}
            />
          </div>
          <div className={"col-auto"}>
            <small className={"text-danger"}>Feilmelding</small>
          </div>
        </div>

        <div className={"row g-3 align-items-center"}>
          <div className={"col-auto"}>
            <label className={"col-form-label"}>Barne billett :</label>
          </div>
          <div className={"col-auto"}>
            <input
              type="number"
              className={"form-control"}
              name="avreisested"
              onChange={(e) => {
                setBarn(e.target.value);
              }}
            />
          </div>
          <div className={"col-auto"}>
            <small className={"text-danger"}>Feilmelding</small>
          </div>
        </div>

        <div className={"row g-3 align-items-center"}>
          <div className={"col-auto"}>
            <label className={"col-form-label"}>Voksen billett :</label>
          </div>
          <div className={"col-auto"}>
            <input
              type="number"
              className={"form-control"}
              name="avreisested"
              onChange={(e) => {
                setVoksen(e.target.value);
              }}
            />
          </div>
          <div className={"col-auto"}>
            <small className={"text-danger"}>Feilmelding</small>
          </div>
        </div>

        {dagsreise === false && (
          <>
            <div className={"row g-3 align-items-center"}>
              <div className={"col-auto"}>
                <label className={"col-form-label"}>Standard lugar :</label>
              </div>
              <div className={"col-auto"}>
                <input
                  type="number"
                  className={"form-control"}
                  name="avreisested"
                  onChange={(e) => {
                    setStandard(e.target.value);
                  }}
                />
              </div>
              <div className={"col-auto"}>
                <small className={"text-danger"}>Feilmelding</small>
              </div>
            </div>

            <div className={"row g-3 align-items-center"}>
              <div className={"col-auto"}>
                <label className={"col-form-label"}>Premium lugar :</label>
              </div>
              <div className={"col-auto"}>
                <input
                  type="number"
                  className={"form-control"}
                  name="avreisested"
                  onChange={(e) => {
                    setStandard(e.target.value);
                  }}
                />
              </div>
              <div className={"col-auto"}>
                <small className={"text-danger"}>Feilmelding</small>
              </div>
            </div>
          </>
        )}

<div className={"d-flex flex-row"}>
              <CTAButton click={()=>handleClick()}>Opprett ny rute</CTAButton>

              <div className={"mx-3"}>
                <CancelButton til={"/managetrip"}>Avbryt</CancelButton>
              </div>
            </div>
      </form>
    </>
  );
};
