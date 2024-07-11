import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Homepage.module.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Homepage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);
  const openRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);

  return (
    <div>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logoLink}>
          <img
            src="Skilfull Hands (1).png"
            alt="Logo"
            className={styles.logo}
          />
        </NavLink>
        <div className={styles.navLinks}>
          <span className={styles.link} onClick={openLoginModal}>
            Login
          </span>
          <span className={styles.link} onClick={openRegisterModal}>
            Register
          </span>
        </div>
      </nav>
      <div className={styles.hero}>
        <img src="heroimage.jpg" alt="Hero" className={styles.heroImage} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroText}>
          Freelance
          <br />
          Professional
          <br />
          Services
        </div>
      </div>
      {showLogin && <LoginModal onClose={closeLoginModal} />}
      {showRegister && <RegisterModal onClose={closeRegisterModal} />}
    </div>
  );
};

export default Homepage;
