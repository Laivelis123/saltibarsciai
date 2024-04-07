import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";
import SideNav from "./SideNav/SideNav";
import axios from "axios";

const UI = ({ children }) => {
  // State for filter text
  const [filterText, setFilterText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null); // State to hold the token

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsLoggedIn(true);
        setToken(storedToken); // Set the token if it exists

        // Decode token to get expiry time
        const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
        const expiryTime = decodedToken.exp * 1000; // Convert expiry time to milliseconds

        // Check if token has less than 20 minutes remaining
        if (expiryTime - Date.now() < 20 * 60 * 1000) {
          try {
            // Request backend to update token
            const response = await axios.post(
              "http://localhost:3001/api/auth/updateToken",
              {
                token: storedToken,
              }
            );
            const { token } = response.data;
            setToken(token); // Update token in state
            localStorage.setItem("token", token); // Update token in localStorage
          } catch (error) {
            console.error("Error updating token:", error);
          }
        }
      }
      setIsLoading(false); // Set loading to false after checking login status
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 flex-wrap">
            {isLoading ? (
              <div className="text-white p-3 mt-5">
                <p className="fs-5">Loading...</p>
              </div>
            ) : isLoggedIn ? (
              <SideNav filterText={filterText} setFilterText={setFilterText} />
            ) : (
              <div className="text-white p-3 mt-5">
                <p className="fs-5">
                  Užduočių kūrimo bei atlikimo svetainė, prisijunkite arba
                  prisiregistruokite kaip mokinys arba mokytojas
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="col py-3 d-flex flex-column justify-content-between">
          <div>
            <Header />
            <Menu />
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UI;
