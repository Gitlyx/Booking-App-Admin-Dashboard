import { useState, useEffect } from "react";
import axios from "axios";

export const useReiseData = (id) => {
  const [isError, setIsError1] = useState(false); // Oppstår det feilmelding?
  const [isLoading, setIsLoading] = useState(true); // Laster inn?
  const [reise, setReise] = useState(null); // Liste med reiser

  // Hent liste med ruter
  useEffect(() => {
    if (id !== -1) {
      let url = "https://localhost:5001/reise/reiser?id=" + id;
      axios.get(url).then((returnData) => {
        setReise(returnData.data);
        setIsLoading(false);
      });
    } 
  });

  return {
    isLoading: isLoading,
    data: reise,
    isError: isError,
  };
};
