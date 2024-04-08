﻿import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./registracija.module.css";
import * as Yup from "yup";
import axios from "axios";

function Registracija() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Vartotojo vardas turi būti bent 3 simbolių ilgio")
      .max(15, "Vartotojo vardas turi būti iki 15 simbolių ilgio")
      .required(
        "Vartotojo vardas yra privalomas ir turi būti nuo 3 iki 15 simbolių ilgio"
      ),
    password: Yup.string()
      .min(4, "Slaptažodis turi būti bent 4 simbolių ilgio")
      .max(40, "Slaptažodis turi būti iki 40 simbolių ilgio")
      .required(
        "Slaptažodis yra privalomas ir turi būti nuo 4 iki 20 simbolių ilgio"
      ),
    email: Yup.string()
      .email("Netinkamas el. pašto formatas")
      .required("El. paštas yra privalomas"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Slaptažodžiai turi sutapti")
      .required("Pakartokite slaptažodį"),
    accountType: Yup.string().required("Pasirinkite paskyros tipą"),
  });

  const handleRegistration = async (values, { setErrors }) => {
    const { username, email, password, confirmPassword, accountType } = values;

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
      if (error.response && error.response.data && error.response.data.error) {
        setErrors({
          form: error.response.data.error,
        });
      } else if (error.response && error.response.status === 400) {
        setErrors({
          form: "Vartotojas arba paštas jau egzistuoja",
        });
      } else {
        setErrors({
          form: "Klaida vykdant prašymą.",
        });
      }
    }
  };

  return (
    <>
      {error && <div className="mb-3 text-danger">{error}</div>}
      <div className="container mt-5">
        {!registrationSuccess && (
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              accountType: "student",
            }}
            onSubmit={handleRegistration}
            validationSchema={validationSchema}
          >
            {({ errors }) => (
              <Form className={styles.formColor}>
                <h2 className="mb-4">Registracija</h2>

                <div className="mb-3 ">
                  <label htmlFor="username" className="form-label ">
                    Vartotojo vardas
                  </label>
                  <Field
                    autoComplete="off"
                    type="text"
                    id="username"
                    name="username"
                    className="form-control  bg-secondary text-light"
                    placeholder="Petras"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger "
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="email" className="form-label">
                    El. pašto adresas
                  </label>
                  <Field
                    autoComplete="off"
                    type="email"
                    id="email"
                    name="email"
                    className="form-control bg-secondary text-light"
                    placeholder="El. paštas"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Slaptažodis
                  </label>
                  <Field
                    autoComplete="off"
                    type="password"
                    id="password"
                    name="password"
                    className="form-control  bg-secondary text-light"
                    placeholder="Slaptažodis"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Patvirtinkite slaptažodį
                  </label>
                  <Field
                    autoComplete="off"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control bg-secondary text-light"
                    placeholder="Pakartokite slaptažodį"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <label className="form-label mb-0">Paskyros tipas</label>
                  <div className="d-flex align-items-center d-block mx-auto">
                    <div className="form-check me-2">
                      <Field
                        type="radio"
                        id="student"
                        name="accountType"
                        value="student"
                        className="form-check-input bg-success"
                      />
                      <label htmlFor="student" className="form-check-label">
                        Studentas
                      </label>
                    </div>
                    <div className="form-check">
                      <Field
                        type="radio"
                        id="teacher"
                        name="accountType"
                        value="teacher"
                        className="form-check-input bg-success"
                      />
                      <label htmlFor="teacher" className="form-check-label">
                        Mokytojas
                      </label>
                    </div>
                  </div>
                  <ErrorMessage
                    name="accountType"
                    component="div"
                    className="text-danger"
                  />
                </div>
                {errors.form && (
                  <div className="mb-3 text-danger">{errors.form}</div>
                )}

                <button type="submit" className="btn btn-lg btn-dark ">
                  Registruotis
                </button>
              </Form>
            )}
          </Formik>
        )}
        {registrationSuccess && (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className={`col-md-6 ${styles.formColor}`}>
                <h2 className="mb-4 text-center">Registracija sėkminga!</h2>
                <Link
                  to="/prisijungimas"
                  className="btn btn-primary d-block mx-auto"
                >
                  Prisijunkite čia
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Registracija;
