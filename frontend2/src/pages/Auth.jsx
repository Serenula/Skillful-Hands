import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = (props) => {
  const [showLogin, setShowLogin] = useState(true);
  // const [showRegister, setShowRegister] = useState(!showLogin);
  const [showRegister, setShowRegister] = useState(true);
  return (
    <>
      {showLogin && (
        <Login
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          setRole={props.setRole}
          handleToken={props.handleToken}
        />
      )}
      {showRegister && <Register setShowLogin={setShowLogin} />}
    </>
  );
};

export default Auth;
