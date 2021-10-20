import React, { useState } from "react";
import axios from axios
import CTAButton from "../parts/CTAButton";

export const TripRoute = () => {
  // ----- State -----
  const [avreisested, setAvreisested] = useState("");
  const [destinasjon, setDestinasjon] = useState("");
  const [dagsreise, setDagsreise] = useState(false);

  // ----- Function -----
  const handleToggle = (e) => {
    setDagsreise(!dagsreise);
  };

  // ----- HTML -----
  return (
    <>
      <div className={"row"}>
        <div className={"row card py-4 col-lg-7"}>
          <h3 className={"text-uppercase"}>Registrer nye reiserute</h3>
          <form className={"col-lg-12 my-4"}>
            <div className={"row g-3 align-items-center"}>
              <div className={"col-auto"}>
                <label class="col-form-label">Avreisested :</label>
              </div>
              <div className={"col-auto"}>
                <input type="text" className={"form-control"} />
              </div>
              <div className={"col-auto"}>
                <span id="avreise_feilmeleding" className={"form-text"}></span>
              </div>
            </div>

            <div class="row g-3 my-4 align-items-center">
              <div class="col-auto">
                <label class="col-form-label">Destinasjon :</label>
              </div>
              <div class="col-auto">
                <input type="text" class="form-control" />
              </div>
              <div class="col-auto">
                <span id="avreise_feilmeleding" class="form-text"></span>
              </div>
            </div>

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                onChange={(e) => handleToggle(e)}
              />
              <label class="form-check-label">
                {dagsreise == false && (
                  <small>
                    <span className={"text-decoration-underline"}>IKKE</span>{" "}
                    dagsreise
                  </small>
                )}
                {dagsreise == true && <small>Dagsreise</small>}
              </label>
            </div>

            <CTAButton className={"mt-4"}>Opprett ny rute</CTAButton>

          </form>
        </div>
      </div>
    </>
  );
};
