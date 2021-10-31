import React, { useState } from "react";
import { NavbarTop } from "./NavbarTop";
import { Container } from "reactstrap";
import { Login } from "./Login";
export const Layout = () => {
  // ---- State ----
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <div>
      <NavbarTop isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />
      <Container className={"my-5"}>
        {!isLoggedIn &&  <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}
      </Container>
    </div>
  );
};
