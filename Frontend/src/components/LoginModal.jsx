import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        "/api/auth/login",
        "POST",
        { email, password },
        null
      );
      console.log("Login successful:", response);

      const { access } = response;
      localStorage.setItem("accessToken", access);
      const decodedToken = jwtDecode(access);

      const { role } = decodedToken;

      if (role === "user") {
        navigate("/services");
      } else if (role === "vendor") {
        navigate("/vendor-profile");
      }

      onClose();
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., display error message)
    }
  };

  return (
    <div className={styles.modal} style={{ display: "block" }}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
