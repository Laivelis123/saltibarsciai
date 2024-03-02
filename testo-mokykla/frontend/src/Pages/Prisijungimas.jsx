import React from 'react';
import { useState } from 'react';
import styles from './prisijungimas.module.css';
import { Link } from "react-router-dom";

function Prisijungimas() {
    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Prisijungimas</h2>
            <form className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.formLabel}>Username</label>
                    <input type="text" id="username" name="username" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input type="password" id="password" name="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.submitButton}>Login</button>
                </div>
            </form>
            <Link to="/">Go back to main page</Link>
        </div>
    );
}

export default Prisijungimas;