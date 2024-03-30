import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./menu.module.css";

const Menu = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3001/api/data/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.log("Session expired or invalid token. User disconnected.");
          localStorage.removeItem("token");
          navigate("/prisijungimas");
        }
      }
    };

    fetchUsername();
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
          <li className={styles.non_link_li}>
            <button
              onClick={handleLogout}
              className={`btn btn-lg ${styles.buttonColor}`}
            >
              Atsijungti
            </button>
          </li>
        )}
        {username && (
          <li className={styles.non_link_li}>
            <Link to="/profilis">Sveiki, {username}</Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
