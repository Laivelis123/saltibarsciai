import React, { useState, useEffect } from "react";
import styles from "./prisijungimas.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Prisijungimas() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/prisijungimas", {
        username,
        password,
      });
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin} >
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
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
        <Link to="/registracija" className={styles.link}>
          Don't have an account? Sign up here.
        </Link>
      </form>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default Prisijungimas;
