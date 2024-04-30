import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";
import SideNav from "./SideNav/SideNav";

const UI = ({ children }) => {
  const { user, refreshToken } = useAuth();
  const [filterText, setFilterText] = useState("");
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);

  useEffect(() => {
    if (user) {
      refreshToken();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div style={{ display: "flex", flexGrow: 1 }}>
        {showSidebar && (
          <SideNav
            filterText={filterText}
            setFilterText={setFilterText}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
        )}
        <div style={{ flex: 1, marginLeft: showSidebar ? 0 : "auto" }}>
          <Header />
          <Menu showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UI;
