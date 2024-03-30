import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UI from "../components/UI/UI";
import axios from "axios";

function Pagrindinis() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const getLinkStyle = () => {
    if (user.accountType === "teacher") {
      return "btn btn-primary btn-lg"; // Bootstrap primary button style
    } else if (user.accountType === "student") {
      return "btn btn-secondary btn-lg"; // Bootstrap secondary button style
    } else {
      return "btn btn-outline-primary btn-lg"; // Default Bootstrap outline primary button style
    }
  };

  const renderLinks = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      switch (user.accountType) {
        case "teacher":
          return (
            <Link to="/valdymas/mokytojas" className={getLinkStyle()}>
              Valdyti kaip mokytojas
            </Link>
          );
        case "student":
          return (
            <Link to="/valdymas/mokinys" className={getLinkStyle()}>
              Valdyti kaip mokinys
            </Link>
          );
        default:
          return <p>Kazkas</p>;
      }
    }
  };

  return (
    <UI>
      <div className="d-flex justify-content-left align-items-center p-3">
        <div className="text-center">
          <div>{renderLinks()}</div>
        </div>
      </div>
    </UI>
  );
}

export default Pagrindinis;
