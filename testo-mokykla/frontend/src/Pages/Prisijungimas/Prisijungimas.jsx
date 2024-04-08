import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import UI from "../../components/UI/UI.jsx";
import styles from "./prisijungimas.module.css";

function Prisijungimas() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username && password) {
      await login(username, password);
      navigate("/");
    }
  };

  return (
    <>
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
    </>
  );
}

export default Prisijungimas;
