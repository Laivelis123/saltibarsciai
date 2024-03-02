import React from 'react';
import styles from './registracija.module.css';
import { Link } from "react-router-dom";

function Registracija() {
    return (
        <div className={styles.registerContainer}>
            <h2 className={styles.registerTitle}>Registracija</h2>
            <form className={styles.registerForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.formLabel}>Username</label>
                    <input type="text" id="username" name="username" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                    <input type="email" id="email" name="email" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input type="password" id="password" name="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitButton}>Register</button>
                </div>
            </form>
            <Link to="/">Go back to main page</Link>
        </div>
    );
}

export default Registracija;