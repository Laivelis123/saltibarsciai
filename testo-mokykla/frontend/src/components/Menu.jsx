import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchBar } from "./SearchBar";
import styles from "./menu.module.css";
import { useAuth } from "../utils/useAuth";

export default function Menu({ filterText, handleFilterChange }) {
  const navigate = useNavigate();
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
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.log(
            "Baigėsi sesija arba nebegalioja žetonas. Atjungiamas vartotojas."
          );
          localStorage.removeItem("token");
          navigate("/prisijungimas");
        }
      }
    };

    fetchUsername();
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/prisijungimas");
  };
  return (
    <>
      <ul>
        {username && (
          <li>
            <Link to="/">Pagrindinis</Link>
          </li>
        )}
        <li>
          <Link to="/naujienos">Naujienos</Link>
        </li>
        {!username && (
          <li>
            <Link to="/prisijungimas">Prisijungimas</Link>
          </li>
        )}
        {!username && (
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
        {username && (
          <li className={styles.logout_li}>
            <button onClick={handleLogout}>Atsijungti</button>
          </li>
        )}
        {username && <li className={styles.non_link_li}><Link to ="/profilis">Sveiki, {username}</Link></li>}
      </ul>
      <SearchBar filterText={filterText} onChange={handleFilterChange} />
    </>
  );
}
