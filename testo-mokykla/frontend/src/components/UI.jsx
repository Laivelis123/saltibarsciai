import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

const UI = ({ filterText, filterCategories, children }) => {
  return (
    <>
      <Header />
      <Menu filterText={filterText} handleFilterChange={filterCategories} />
      {children}
      <Footer />
    </>
  );
};

export default UI;
