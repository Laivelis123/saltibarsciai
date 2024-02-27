import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

function UI({ children }) {
  return (
    <>
      <Header />
      <Menu />
      {children}
      <Footer />
    </>
  );
}

export default UI;
