import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = (result) => {
    setShowLogin(result);
    setShowRegister(!result);
  };
  return (
    <>
      {showLogin && (
        <Login
          setAccessToken={props.setAccessToken}
          setRole={props.setRole}
          setId={props.setId}
          handleToken={props.handleToken}
          setShowLogin={props.setShowLogin}
          handleShowLogin={handleShowLogin}
        />
      )}
      {showRegister && <Register handleShowLogin={handleShowLogin} />}
    </>
  );
};

export default Auth;
