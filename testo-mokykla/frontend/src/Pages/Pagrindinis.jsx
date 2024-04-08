import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import UI from "../components/UI/UI";

function Pagrindinis() {
  const { user, userData, fetchUser, loading, logout } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const getLinkStyle = () => {
    if (userData.accountType === "teacher") {
      return "btn btn-primary btn-lg";
    } else if (user.accountType === "student") {
      return "btn btn-secondary btn-lg"; // Bootstrap secondary button style
    } else {
      return "btn btn-outline-primary btn-lg"; // Default Bootstrap outline primary button style
    }
  };

  const renderLinks = () => {
    if (loading) {
      return <p>Krauna...</p>;
    } else {
      return (
        <div>
          {user && userData.accountType === "teacher" && (
            <Link to="/valdymas/mokytojas" className={getLinkStyle()}>
              Valdyti kaip mokytojas
            </Link>
          )}
          {user && userData.accountType === "student" && (
            <Link to="/valdymas/mokinys" className={getLinkStyle()}>
              Valdyti kaip mokinys
            </Link>
          )}
          {!user && <p>Prašome prisijungti</p>}
          {user && !["teacher", "student"].includes(userData.accountType) && (
            <p>Nei mokytojas nei studentas</p>
          )}
        </div>
      );
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
