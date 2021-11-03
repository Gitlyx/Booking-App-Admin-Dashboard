import { useState, useEffect } from "react";

// API DELETE
export const DeleteTrip = (id) => {
  const url = "https://localhost:5001/api/reise?reiseId=" + id;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      console.log(url);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// API GET REQUEST - one trip
export const GetOneTrip = (id) => {
  const [data, setData] = useState({});
  const url = "https://localhost:5001/reise/enreise?id=" + id;
  useEffect(() => {
    async function fetchTrip() {
      const response = await fetch(url);
      const resp = await response.json();
      setData(resp);
    }
    fetchTrip();
  }, [url]);



  return data;
};
