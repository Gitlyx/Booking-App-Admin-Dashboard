export async function fetchAll(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log("GET request : ", data);
  return data;
}

export async function deleteRoute(id) {
  if (window.confirm("Er du sikker på å slette denne ruten?")) {
    let url = "https://localhost:5001/api/slettrute?ruteId=" + id;
    const response = await fetch(url, { method: "DELETE" });
    const data = await response.json();
    console.log("DELETE request : ", data);
    return data;
  } else {
    console.log("DELETE request : Declined");
  }
}

export async function checkSession() {
  const response = await fetch("https://localhost:5001/api/session");
  const data = await response.json();
  console.log("GET request (CheckSession) : ", data);
  return data;
}

export async function fetchOne(id) {
  const url = "https://localhost:5001/api/enrute?ruteId=" + id;
  const response = await fetch(url);
  const data = await response.json();
  console.log("GET request : ", data);
  return data;
}

export async function updateRoute(innData) {
  const url = "https://localhost:5001/api/oppdaterrute";
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(innData),
  });
  const data = await response.json();
  console.log("PUT request : ", data);
  return data;
}

export async function addNewRoute(innData) {
  const url = "https://localhost:5001/api/nyrute";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(innData),
  });
  const data = await response.json();
  console.log("POST request : ", data)
  return data
}
