import React, { useState, useEffect } from "react";

// API GET ALL
export const GetAllRoutes = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // On page load perform this
  useEffect(() => {
    fetch("https://localhost:5001/reise/rute")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoading(false);
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
  const url = "https://localhost:5001/reise/rute?ruteId=" + id;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};


