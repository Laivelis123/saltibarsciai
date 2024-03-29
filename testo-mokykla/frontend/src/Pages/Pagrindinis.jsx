import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import UI from "../components/UI";
import SideNav from "../components/SideNav";
function Pagrindinis() {
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

export default Pagrindinis;
