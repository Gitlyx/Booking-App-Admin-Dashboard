export async function fetchTrip(id) {
  const url = "https://localhost:5001/api/enreise?id=" + id;
  const response = await fetch(url);
  const data = await response.json();
  console.log("GET request : ", data)
  return data;
  
};

export async function fetchAll(id) {
  const url = "https://localhost:5001/api/reiser?id=" + id;
  const response = await fetch(url);
  const data = await response.json();
  console.log("GET request : ", data);
  return data;
}

export async function deleteTrip(id) {
  if (window.confirm("Er du sikker på å slette denne reisen?")) {
    let url = "https://localhost:5001/api/reise?reiseId=" + id;
    const response = await fetch(url, { method: "DELETE" });
    const data = await response.json();
    console.log("DELETE request : ", data);
    return data;
  } else {
    console.log("DELETE request : Declined");
  }
}

export async function updateTrip(inndata) {
  const url = "https://localhost:5001/api/oppdaterreise";
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inndata),
  });
  const data = await response.json();
  console.log("PUT request : ", data);
  return data;
}
