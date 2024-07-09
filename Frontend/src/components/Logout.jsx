import React from "react";
import styles from "./Logout.module.css";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("accessToken");
    onLogout();
  };
  return (
    <a href="/" className={styles.logoutButton} onClick={handleLogout}>
      {" "}
      Logout{" "}
    </a>
  );
};

export default Logout;
