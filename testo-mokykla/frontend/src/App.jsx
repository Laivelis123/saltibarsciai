import React, { useState } from "react";
import SideNav from "./components/SideNav";
import UI from "./components/UI";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([
    { name: "Fizika" },
    { name: "Chemija" },
    { name: "Lietuviu" },
    { name: "Biologija" },
  ]);

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (filterText) => {
    setFilterText(filterText);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <UI filterText={filterText} filterCategories={handleFilterChange}>
      <SideNav categories={filteredCategories} />
    </UI>
  );
}

export default App;
