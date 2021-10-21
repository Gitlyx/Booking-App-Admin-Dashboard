import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Trip = () => {
  // ----- State -----
  const [printRute, setPrintRute] = useState({rute:[]})

  // ----- Function -----
useEffect(()=>{
  axios.get('https://localhost:5001/reise/rute')
  .then((resp)=>{
    console.log(resp.response.data)
  })
})
  
  return (
    <>
      <div className={"d-flex flex-row"}>
        <h1>
          Oversikt{" "}
          <Link to="newroute">
            <i className={"bi bi-plus-square px-3"} />
          </Link>
        </h1>
        <div>
          {/* {printRute.rute.map(rute => <div>rute.ruteFra</div>)} */}
        </div>
      </div>
    </>
  );
};