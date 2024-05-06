import { useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";
import SideNav from "./SideNav/SideNav";

const UI = ({ children }) => {
  const [filterText, setFilterText] = useState("");
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);

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
        <div
          style={{
            flex: 1,
            marginLeft: showSidebar ? 0 : "auto",
            width: showSidebar && 0,
          }}
        >
          <Header />
          <Menu showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

UI.propTypes = {
  children: PropTypes.node,
};

export default UI;
