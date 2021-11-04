export async function sessionStatus () {
    const url = "https://localhost:5001/api/session"
    const response = await fetch(url);
    const data = await response.json();
    console.log("GET Sesssion request : ", data)
    return data;    
}

export async function userLoggout () {
    const url = "https://localhost:5001/api/loggut";
    await fetch(url);
}