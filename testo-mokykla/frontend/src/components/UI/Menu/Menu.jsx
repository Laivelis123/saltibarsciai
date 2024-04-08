import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import styles from "./menu.module.css";
const Menu = () => {
  const { user, userData, fetchUser, logout } = useAuth();
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);
  return (
    <>
      <ul>
        {user && (
          <li>
            <Link to="/">Pagrindinis</Link>
          </li>
        )}
        <li>
          <Link to="/naujienos">Naujienos</Link>
        </li>
        {!user && (
          <li>
            <Link to="/prisijungimas">Prisijungimas</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/registracija">Registracija</Link>
          </li>
        )}
        <li>
          <Link to="/apie">Apie</Link>
        </li>
        <li>
          <Link to="/kontaktai">Kontaktai</Link>
        </li>
        {user && (
          <li className={styles.non_link_li}>
            <button
              onClick={logout}
              className={`btn btn-lg ${styles.buttonColor}`}
            >
              Atsijungti
            </button>
          </li>
        )}
        {user && (
          <li className={styles.non_link_li}>
            <Link to="/profilis">Sveiki, {userData.username}</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
