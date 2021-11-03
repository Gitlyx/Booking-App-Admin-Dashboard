import { useState, useEffect } from "react";

// API GET ALL
export const GetAllRoutes = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // On page load perform this
  useEffect(() => {
    fetch("https://localhost:5001/api/alleruter")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoading(false);
          console.log(result)
        },
        (error) => {
          setIsError(true);
          setIsLoading(false);
        }
      );
  }, []);

  return {
    isError,
    isLoading,
    data,
  };
};

// API DELETE
export const DeleteRoute = (id) => {
  const [data, setData] =useState()
;  const url = "https://localhost:5001/reise/rute?ruteId=" + id;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((resp) => {
      setData(resp)
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    return data;
};

