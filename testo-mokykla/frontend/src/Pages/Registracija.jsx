import React, { useState } from "react";
import styles from "./registracija.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Registracija() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:5001/registration", {
        username,
        email,
        password,
        accountType,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Registration</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Account Type:</label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="student"
              checked={accountType === "student"}
              onChange={() => setAccountType("student")}
              className={styles.radioInput}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.radioText}>Student</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="teacher"
              checked={accountType === "teacher"}
              onChange={() => setAccountType("teacher")}
              className={styles.radioInput}
            />
            <span className={styles.checkmark}></span>
            <span className={styles.radioText}>Teacher</span>
          </label>
        </div>
        <button onClick={handleRegistration} className={styles.button}>
          Register
        </button>
        <Link to="/prisijungimas" className={styles.link}>
          Already have an account? Login here.
        </Link>
      </form>
    </div>
  );
}

export default Registracija;
