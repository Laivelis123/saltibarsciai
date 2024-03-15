import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SearchBar } from "./SearchBar";
import styles from "./menu.module.css";

export default function Menu({ filterText, handleFilterChange }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/auth/username",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error("Klaida ieškant vartotojo vardo:", error);
      }
    };

    fetchUsername();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/prisijungimas";
  };
  return (
    <>
      <ul>
        <li>
          <Link to="/">Pagrindinis</Link>
        </li>
        <li>
          <Link to="/naujienos">Naujienos</Link>
        </li>
        <li>
          <Link to="/prisijungimas">Prisijungimas</Link>
        </li>
        <li>
          <Link to="/registracija">Registracija</Link>
        </li>
        <li>
          <Link to="/apie">Apie</Link>
        </li>
        <li>
          <Link to="/kontaktai">Kontaktai</Link>
        </li>
        {username && (
          <li className={styles.logout_li}>
            <button onClick={handleLogout}>Atsijungti</button>
          </li>
        )}
        {username && <li className={styles.non_link_li}>Sveiki, {username}</li>}
      </ul>
      <SearchBar filterText={filterText} onChange={handleFilterChange} />
    </>
  );
}
