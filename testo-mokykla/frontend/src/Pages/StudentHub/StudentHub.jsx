import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UI from "../../components/UI/UI";
function StudentHub() {
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
    <UI>
      <div className="container mt-4">
        <h2>Mokinių tvarkyklė</h2>
        <div className="d-grid gap-2">
          <Link to="/" className="btn btn-primary">
            Priskirti Testai
          </Link>
          <Link to="/" className="btn btn-primary">
            Įvertinimai
          </Link>
        </div>
      </div>
    </UI>
  );
}

export default StudentHub;
