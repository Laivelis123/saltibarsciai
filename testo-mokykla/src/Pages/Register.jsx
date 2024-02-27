import React from "react";
import UI from "../components/UI";
import styles from "./register.module.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <UI>
      <form>
        <h1>Register</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          required
          aria-describedby="uidnote"
        />
        <p id="uidnote" className={styles.instructions}>
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          aria-describedby="pwdnote"
        />
        <p id="pwdnote" className={styles.instructions}>
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">Confirm Password:</label>
        <input
          type="password"
          id="confirm_pwd"
          required
          aria-describedby="confirmnote"
        />
        <p id="confirmnote" className={styles.instructions}>
          Must match the first password input field.
        </p>

        <button>Sign Up</button>

        <p>
          Already registered?
          <br />
          <span className={styles.line}>
            <Link to="/login">Sign in</Link>
          </span>
        </p>
      </form>
    </UI>
  );
}
