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
      <ul className="py-3">
        {window.innerWidth <= 768 && !showSidebar && (
          <li className="m-2">
            <Link className="px-2 py-1 rounded-pill" onClick={toggleSidebar}>
              {"ΞΞ"}
            </Link>
          </li>
        )}
        <div className="flex-wrap m-2">
          {(window.innerWidth > 768 || !showSidebar) && (
            <>
              {user && (
                <div className="menu-item">
                  <li className="px-2 rounded-pill">
                    <Link className="px-2 py-1 rounded-pill" to="/">
                      Pagrindinis
                    </Link>
                  </li>
                </div>
              )}
              <div className="menu-item">
                <li className="px-2">
                  <Link className="px-2 py-1  rounded-pill" to="/naujienos">
                    Naujienos
                  </Link>
                </li>
              </div>
              {!user && (
                <>
                  <div className="menu-item">
                    <li className="px-2">
                      <Link
                        className="px-2 py-1  rounded-pill"
                        to="/prisijungimas"
                      >
                        Prisijungimas
                      </Link>
                    </li>
                  </div>
                  <div className="menu-item">
                    <li className="px-2">
                      <Link
                        className="px-2 py-1  rounded-pill"
                        to="/registracija"
                      >
                        Registracija
                      </Link>
                    </li>
                  </div>
                </>
              )}
              <div className="menu-item">
                <li className="px-2">
                  <Link className="px-2 py-1 rounded-pill" to="/apie">
                    Apie
                  </Link>
                </li>
              </div>
              <div className="menu-item">
                <li className="px-2">
                  <Link className="px-2 py-1  rounded-pill" to="/kontaktai">
                    Kontaktai
                  </Link>
                </li>
              </div>
              {user && (
                <li style={{ float: "right" }}>
                  <Link className="rounded-pill px-2 py-1 " to="/profilis">
                    Sveiki, {username}
                  </Link>
                  <Link
                    onClick={logout}
                    className={`rounded-pill px-2 py-2  ${styles.buttonColor}`}
                  >
                    Atsijungti
                  </Link>
                </li>
              )}
            </>
          )}
        </div>
      </ul>
    </>
  );
};

Menu.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
};

export default Menu;
