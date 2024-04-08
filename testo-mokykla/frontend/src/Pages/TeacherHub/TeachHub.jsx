import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UI from "../../components/UI/UI";
function TeachHub() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
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
          setUser({
            username: response.data.username,
            email: response.data.email,
            accountType: response.data.accountType,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="container mt-4">
      <h2>Mokytojų tvarkyklė</h2>
      <div className="d-grid gap-2">
        <Link
          to="/valdymas/mokytojas/tvarkyti/kategorijas"
          className="btn btn-primary"
        >
          Tvarkyti Kategorijas
        </Link>
        <Link
          to="/valdymas/mokytojas/tvarkyti/testus"
          className="btn btn-primary"
        >
          Tvarkyti Testus
        </Link>
        <Link
          to="/valdymas/mokytojas/tvarkyti/grupes"
          className="btn btn-primary"
        >
          Tvarkyti Grupes
        </Link>
      </div>
    </div>
  );
}

export default TeachHub;
