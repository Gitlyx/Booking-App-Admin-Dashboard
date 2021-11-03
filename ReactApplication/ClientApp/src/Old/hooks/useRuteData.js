import { useState, useEffect } from "react";
import axios from "axios";

export const useRuteData = () => {
  const [isError, setIsError] = useState(false); // Oppstår det feilmelding?
  const [isLoading, setIsLoading] = useState(true); // Laster inn?
  const [rute, setRute] = useState(null); // Liste med ruter

  // Hent liste med ruter
  useEffect(() => {
    axios.get("https://localhost:5001/api/alleruter").then((returnData) => {
      setRute(returnData.data);
      console.log(returnData)
      setIsLoading(false);
    });
  }, []);

  return {
    isLoading: isLoading,
    data: rute,
    isError: isError,
  };
};

export const useEnRuteData = (id) => {
  const [isError, setIsError] = useState(false); // Oppstår det feilmelding?
  const [isLoading, setIsLoading] = useState(true); // Laster inn?
  const [rute, setRute] = useState({}); // Liste med ruter

  useEffect(()=>{
    const url = 'https://localhost:5001/reise/enrute?ruteId=' + id;
    axios.get(url).then((returnData)=>{
      setRute(returnData.data)
      setIsLoading(false);
    })
  }, [id])

  return {
    isLoading: isLoading,
    data: rute,
    isError: isError
  }
}
