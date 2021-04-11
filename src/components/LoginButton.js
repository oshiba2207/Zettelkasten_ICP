import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({setAppUser}) => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  isAuthenticated && (
    setAppUser(user.sub)
  )

  return( 
  !isAuthenticated && (
  <button onClick={() => loginWithRedirect()}>Log In</button>
  ))
};

export default LoginButton;