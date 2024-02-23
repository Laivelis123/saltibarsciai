import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import Menu from "./components/Menu";
function App() {
  return (
    <>
      <Header />
      <Menu />
      <SideNav />
      <Footer />
    </>
  );
}

export default App;
