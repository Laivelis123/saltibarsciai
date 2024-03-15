import React, { useState } from "react";
import styles from "./registracija.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UI from "../components/UI.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Registracija() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateInput = () => {
    const badSymbols = /[!@#$%^&*(),.?":{}|<>]/;
    const passwordMatch = password === confirmPassword;
    let errors = {};

    if (!username) {
      errors.username = "Vartotojo vardas privalomas";
    } else if (badSymbols.test(username)) {
      errors.username = "Vartotojo vardas negali turėti specialių simbolių.";
    }

    if (!email) {
      errors.email = "El. pašto adresas privalomas";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      errors.email = "El. pašto adresas neteisingas.";
    }

    if (!password) {
      errors.password = "Slaptažodis privalomas";
    } else if (password.length < 6) {
      errors.password = "Slaptažodis turi būti ilgesnis nei 6 simboliai.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Slaptažodžio patvirtinimas privalomas";
    } else if (!passwordMatch) {
      errors.confirmPassword = "Slaptažodžiai nesutampa.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          username,
          email,
          password,
          accountType,
        }
      );
      console.log(response);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error(error);
      setErrors({
        ...errors,
        form: error.response.data.error,
      });
    }
  };

  const clearError = (key) => {
    setErrors({
      ...errors,
      [key]: null,
    });
  };

  return (
    <UI>
      <div className={styles.container}>
        {!registrationSuccess ? (
          <form className={styles.form} onSubmit={handleRegistration}>
            <h2 className={styles.title}>Registracija</h2>
            {errors.form && (
              <ErrorMessage
                message={errors.form}
                onClick={() => clearError("form")}
              />
            )}
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Vartotojo vardas
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearError("username");
                }}
                name="username"
                className={styles.input}
              />
              {errors.username && (
                <ErrorMessage
                  message={errors.username}
                  onClick={() => clearError("username")}
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                El. pašto adresas
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                name="email"
                className={styles.input}
              />
              {errors.email && (
                <ErrorMessage
                  message={errors.email}
                  onClick={() => clearError("email")}
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Slaptažodis
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
                name="password"
                className={styles.input}
              />
              {errors.password && (
                <ErrorMessage
                  message={errors.password}
                  onClick={() => clearError("password")}
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Patvirtink slaptažodį
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError("confirmPassword");
                }}
                name="confirmPassword"
                className={styles.input}
              />
              {errors.confirmPassword && (
                <ErrorMessage
                  message={errors.confirmPassword}
                  onClick={() => clearError("confirmPassword")}
                />
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="accountType" className={styles.label}>
                Paskyros tipas
              </label>
              <div className={styles.radioGroup}>
                <label htmlFor="student">
                  <input
                    type="radio"
                    id="student"
                    name="accountType"
                    value="student"
                    checked={accountType === "student"}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                  Studentas
                </label>
                <label htmlFor="teacher">
                  <input
                    type="radio"
                    id="teacher"
                    name="accountType"
                    value="teacher"
                    checked={accountType === "teacher"}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                  Mokytojas
                </label>
              </div>
            </div>
            <button type="submit" className={styles.button}>
              Registruotis
            </button>
            <Link to="/prisijungimas" className={styles.link}>
              Jau turite paskyrą? Prisijunkite čia.
            </Link>
          </form>
        ) : (
          <div>
            <p>Registracija sėkminga!</p>
            <Link to="/prisijungimas">Prisijunkite čia</Link>
          </div>
        )}
      </div>
    </UI>
  );
}

export default Registracija;
