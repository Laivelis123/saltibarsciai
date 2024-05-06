import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import { useAuth } from "../../../context/AuthContext";
import PropTypes from "prop-types";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
const Menu = ({ showSidebar, setShowSidebar }) => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(jwtDecode(user.accessToken).username);
    }
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user, setShowSidebar]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {window.innerWidth <= 768 && !showSidebar && (
        <ul className="pt-3 mb-0 text-center bg-dark">
          <li>
            <Link className="display-1 rounded-pill" onClick={toggleSidebar}>
              {"ΞΞ"}
            </Link>
          </li>
        </ul>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            {user && (
              <li className="px-2 py-2 text-center">
                <Link className="px-2 py-1 " to="/">
                  Pagrindinis
                </Link>
              </li>
            )}
            <li className="px-2 py-2  text-center">
              <Link className="px-2 py-1 " to="/naujienos">
                Naujienos
              </Link>
            </li>
            <li className="px-2 py-2  text-center">
              <Link className="px-2 py-1 " to="/apie">
                Apie
              </Link>
            </li>
            <li className="px-2 py-2  text-center">
              <Link className="px-2 py-1 " to="/kontaktai">
                Kontaktai
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {user ? (
              <ul className="navbar-nav me-auto my-2 my-lg-0">
                <li
                  className="px-2 py-2 text-center"
                  style={{ listStyleType: "none" }}
                >
                  <Link className="rounded-pill px-2 py-1 " to="/profilis">
                    Sveiki, {username}
                  </Link>
                </li>
                <li
                  className="px-2 py-2 text-center"
                  style={{ listStyleType: "none" }}
                >
                  <Link
                    onClick={logout}
                    className={`rounded-pill px-2 py-1  ${styles.buttonColor}`}
                  >
                    Atsijungti
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto my-2 my-lg-0">
                <li
                  className="px-2 py-2 text-center"
                  style={{ listStyleType: "none" }}
                >
                  <Link className="px-2 py-1 " to="/registracija">
                    Registracija
                  </Link>
                </li>
                <li
                  className="px-2 py-2 text-center"
                  style={{ listStyleType: "none" }}
                >
                  <Link className="px-2 py-1 " to="/prisijungimas">
                    Prisijungimas
                  </Link>
                </li>
              </ul>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};

Menu.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
};

export default Menu;
