import React, { useState } from "react";

export const TripRoute = () => {

    // ----- State -----
    const [avreisested, setAvreisested] = useState("");
    const [destinasjon, setDestinasjon] = useState("");
    const [dagsreise, setDagsreise] = useState(false);

  // ----- HTML -----
  return (
    <>
      <div class="row card py-4">
        <h3 class="text-uppercase">Registrer nye reiserute</h3>
        <form class="col-lg-8">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label class="col-form-label">
                Avreisested : 
              </label>
            </div>
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-auto">
              <span id="avreise_feilmeleding" class="form-text">
              </span>
            </div>
          </div>

          <div class="row g-3 my-4 align-items-center">
            <div class="col-auto">
              <label class="col-form-label">
                Destinasjon : 
              </label>
            </div>
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-auto">
              <span id="avreise_feilmeleding" class="form-text">
              </span>
            </div>
          </div>
          
        </form>
      </div>
    </>
  );
};
