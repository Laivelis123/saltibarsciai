import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";
import SideNav from "./SideNav/SideNav";

const UI = ({ children }) => {
  const { user, refreshToken } = useAuth();
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    if (user) {
      refreshToken();
    }
  }, []);
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 flex-wrap">
            {user ? (
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
