import React, {useState, useEffect} from 'react'

// POST - Hent alle reiser
export const GetAllTrips = (id) => {
    // State
    const [data, setData] = useState()

    // URL
    const url = "https://localhost:5001/reise/reiser"

    useEffect(() => {
        async function fetchRoute() {
          const response = await fetch(url);
          const resp = await response.json();
          console.log("API result :", resp);
          setReiseId(resp.ruteId)
          setRuteFra(resp.ruteFra);
          setRuteTil(resp.ruteTil);
          setDagsreise(resp.dagsreise);
          setIsLoading(false);
        }
        fetchRoute();
      }, [url]);
}
