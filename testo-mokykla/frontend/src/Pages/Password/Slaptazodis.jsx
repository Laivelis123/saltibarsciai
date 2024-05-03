import React, { useState } from "react";
import { Link } from "react-router-dom";
import UI from "../../components/UI/UI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../Prisijungimas/prisijungimas.module.css";
import * as Yup from "yup";
import axios from "axios";
import ServerPaths from "../../context/ServerPaths";
function Slaptazodis() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(4, "Slaptažodis turi būti bent 4 simbolių ilgio")
      .max(40, "Slaptažodis turi būti iki 40 simbolių ilgio")
      .required(
        "Slaptažodis yra privalomas ir turi būti nuo 4 iki 20 simbolių ilgio"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Slaptažodžiai turi sutapti")
      .required("Pakartokite slaptažodį"),
  });

  const handleRegistration = async (values, { setErrors }) => {
    const { username, password, confirmPassword } = values;

    try {
      const response = await axios.post(ServerPaths.Auth.UPDATE_PASSWORD, {
        username,
        password,
      });
      console.log(response);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrors({
          form: error.response.data.message,
        });
      } else {
        setErrors({
          form: "Klaida vykdant prašymą.",
        });
      }
    }
  };

  return (
    <UI>
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
                <h2 className="mb-4">Slaptažodžio keitimas</h2>

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
                {errors.form && (
                  <div className="mb-3 text-danger">{errors.form}</div>
                )}

                <button type="submit" className="btn btn-lg btn-dark ">
                  Pakeisti slaptažodį
                </button>
              </Form>
            )}
          </Formik>
        )}
        {registrationSuccess && (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className={`col-md-6 ${styles.formColor}`}>
                <h2 className="mb-4 text-center">
                  Slaptažodžio pakeitimas sėkmingas!
                </h2>
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
    </UI>
  );
}

export default Slaptazodis;
