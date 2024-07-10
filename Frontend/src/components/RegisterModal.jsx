import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

const RegisterModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register with:", { name, email, password, role });
    onClose();
  };

  return (
    <div className={styles.modal} style={{ display: "block" }}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>
          {role === "vendor" && (
            <div className={styles.formGroup}>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""> Select service category</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Aircon Servicing">Aircon Servicing</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Pet Grooming">Pet Grooming</option>
                <option value="Personal Training">Personal Training</option>
              </select>
            </div>
          )}
          <div className={styles.buttonContainer}>
            <button type="subit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
