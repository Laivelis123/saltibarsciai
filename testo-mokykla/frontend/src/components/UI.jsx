import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import SideNav from "./SideNav";

const UI = ({ children }) => {
  // State for filter text
  const [filterText, setFilterText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {isLoggedIn && (
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 flex-wrap">
              <SideNav
                filterText={filterText}
                setFilterText={setFilterText}
                isLoggedIn={isLoggedIn} // Pass isLoggedIn prop to SideNav
              />
            </div>
          </div>
        )}
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
