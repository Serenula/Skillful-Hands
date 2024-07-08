import React from "react";
import styles from "./ServicePage.module.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoLink}>
        <img src="/Skilfull Hands.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.navLinks}>
        <Link to={`/users/${userId}`} className={styles.link}>
          Profile
        </Link>
        <a href="/" className={styles.link}>
          Log out
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
