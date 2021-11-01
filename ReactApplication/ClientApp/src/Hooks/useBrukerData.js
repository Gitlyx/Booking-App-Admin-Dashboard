export const checkSession = (props) => {
  return fetch("https://localhost:5001/bruker/session")
    .then((resp) => resp.json())
    .then((resp) => props.setSession(resp));
};
