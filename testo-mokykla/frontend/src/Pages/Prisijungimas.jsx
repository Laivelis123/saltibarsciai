import React, { useState, useEffect } from "react";
import styles from "./prisijungimas.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UI from "../components/UI.jsx";

function Prisijungimas() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UI>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2 className={styles.title}>Prisijungimas</h2>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Vartotojo vardas
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
              Slaptažodis
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
              Prisijungti
            </button>
          </div>
          <Link to="/registracija" className={styles.link}>
            Neturinte paskyros? Registruokitės čia.
          </Link>
        </form>
        <h1>{loginStatus}</h1>
      </div>
    </UI>
  );
}

export default Prisijungimas;
