import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UI from "../components/UI";
import axios from "axios";
import SideNav from "../components/SideNav";

function Pagrindinis() {
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
        <div className="row">
          <div className="col">
            {user.accountType === "teacher" && (
              <Link to="/kurti/kategorija" className="btn btn-primary">
                Create Category
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* <SideNav categories={filteredCategories} /> */}
    </UI>
  );
}

export default Pagrindinis;
