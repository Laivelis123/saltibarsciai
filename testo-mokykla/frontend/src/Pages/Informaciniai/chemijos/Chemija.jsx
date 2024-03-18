import React, { useState } from "react";
import SideNav from "../../../components/SideNav";
import UI from "../../../components/UI";

function Chemija() {
  const [categories, setCategories] = useState([
    { name: "Neorganinė" },
    { name: "Organinė" },
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
export default Chemija;
