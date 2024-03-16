import React, { useState, useEffect } from "react";
import styles from "./registracija.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UI from "../components/UI.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Registracija() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const generateTokenExpiration = () => {
    const currentTime = Date.now();
    const expirationTime = currentTime + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    return expirationTime;
  };

  const generateToken = (user) => {
    const expirationTime = generateTokenExpiration();
    const tokenPayload = {
      exp: expirationTime,
      ...user,
    };
    const token = jwt.sign(tokenPayload, process.env.REACT_APP_JWT_SECRET);
    localStorage.setItem("token", token);
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
      generateToken({ username }); // Generate and store token after successful registration
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
      {" "}
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
            {/* Rest of the form */}
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
