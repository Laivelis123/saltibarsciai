import React from "react";
import styles from "./errorMessage.module.css";

const ErrorMessage = ({ message, onClick }) => {
  return (
    <div className={styles.error} onClick={onClick}>
      {message}
    </div>
  );
};

export default ErrorMessage;
