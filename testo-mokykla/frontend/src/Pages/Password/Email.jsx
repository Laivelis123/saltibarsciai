import { useState } from "react";
import { Link } from "react-router-dom";
import UI from "../../components/UI/UI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../Prisijungimas/prisijungimas.module.css";
import * as Yup from "yup";
import axios from "axios";
import ServerPaths from "../../context/ServerPaths";
function Email() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegistration = async (values, { setErrors }) => {
    const { email } = values;

    try {
      const response = await axios.post(ServerPaths.Auth.CHECK_EMAIL, {
        email,
        link: "http://localhost:5173/slaptazodis",
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
              email: "",
            }}
            onSubmit={handleRegistration}
          >
            {({ errors }) => (
              <Form className={styles.formColor}>
                <h2 className="mb-4">Slaptažodžio keitimas</h2>

                <div className="mb-3 ">
                  <label htmlFor="email" className="form-label ">
                    El. Paštas
                  </label>
                  <Field
                    autoComplete="off"
                    type="text"
                    id="email"
                    name="email"
                    className="form-control  bg-secondary text-light"
                    placeholder="Petras@pav.lt"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger "
                  />
                </div>
                {errors.form && (
                  <div className="mb-3 text-danger">{errors.form}</div>
                )}

                <button type="submit" className="btn btn-lg btn-dark ">
                  Atsiūsti laišką
                </button>
              </Form>
            )}
          </Formik>
        )}
        {registrationSuccess && (
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className={`col-md-6 ${styles.formColor}`}>
                <h2 className="mb-4 text-center">Laiškas išsiūstas</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </UI>
  );
}

export default Email;
