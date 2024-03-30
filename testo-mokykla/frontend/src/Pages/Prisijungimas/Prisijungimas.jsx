import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../../components/UI/UI.jsx";
import styles from "./prisijungimas.module.css";

function Prisijungimas() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        navigate("/");
      } else {
        setError("Neteisingas vartotojo vardas arba slaptažodis.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setError("Vartotojo vardas arba slaptažodis yra klaidingas.");
      } else if (error.response && error.response.status === 500) {
        setError("Serverio klaida. Prašome bandyti dar kartą.");
      } else {
        setError("Vidinė klaida. Prašome bandyti dar kartą.");
      }
    }
  };

  return (
    <UI>
      <div className="container mt-5">
        <div className={styles.formColor}>
          <form onSubmit={handleLogin}>
            <h2 className="mb-4">Prisijungimas</h2>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Vartotojo vardas
              </label>
              <input
                autoComplete="off"
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="form-control bg-secondary text-light"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label ">
                Slaptažodis
              </label>
              <input
                autoComplete="off"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="form-control  bg-secondary text-light"
              />
            </div>
            {error && <div className="mb-3 text-danger">{error}</div>}
            <div className="mb-3">
              <button type="submit" className="btn btn-lg btn-dark">
                Prisijungti
              </button>
            </div>
          </form>
        </div>
      </div>
    </UI>
  );
}

export default Prisijungimas;
