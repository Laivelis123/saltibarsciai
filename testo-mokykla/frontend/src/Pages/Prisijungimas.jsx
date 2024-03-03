import React, { useState } from "react";
import styles from "./prisijungimas.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Prisijungimas() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Login</h2>
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
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
        </div>
        <Link to="/registracija" className={styles.link}>
          Don't have an account? Sign up here.
        </Link>
      </form>
    </div>
  );
}

export default Prisijungimas;
