import React, { useState } from "react";
import SideNav from "../../../components/UI/SideNav/SideNav";
import UI from "../../../components/UI/UI";

function Rašyba() {
  const [categories, setCategories] = useState([
    { name: "Balsių rašymas" },
    { name: "Priebalsių rašyba" },
    { name: "Sudurtinių žodžių rašymas" },
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
export default Rašyba;
