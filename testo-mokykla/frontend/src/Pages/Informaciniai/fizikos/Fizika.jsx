import React, { useState } from "react";
import SideNav from "../../../components/SideNav";
import UI from "../../../components/UI";

function Fizika() {
  const [categories, setCategories] = useState([
    { name: "Vidinė energija" },
    { name: "Medžiagos būsenų kitimas" },
    { name: "Atomo sandara" },
    { name: "Radioaktyvumas" },
    { name: "Visata ir jos evoliucija" },
    { name: "Elektros srovė" },
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
export default Fizika;
