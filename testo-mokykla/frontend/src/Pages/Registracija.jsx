import React from 'react';
import { useState } from 'react';
import styles from './registracija.module.css';
import { Link } from "react-router-dom";
import Axios from 'axios';

function Registracija() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = () => {
        Axios.post('http://localhost:5001/registracija', {
            username: username, 
            email: email, 
            password: password
        }).then((respones) => {
            console.log(respones);
        });
    };

    return (
        <div className={styles.registerContainer}>
            <h2 className={styles.registerTitle}>Registracija</h2>
            <form className={styles.registerForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.formLabel}>Username</label>
                    <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} name="username" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} name="email" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} name="password" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <button onClick={register} type="submit" className={styles.submitButton}>Register</button>
                </div>
            </form>
            <Link to="/">Go back to main page</Link>
        </div>
    );
}

export default Registracija;