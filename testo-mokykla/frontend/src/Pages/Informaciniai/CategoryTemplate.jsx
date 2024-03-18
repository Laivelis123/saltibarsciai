import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "../../utils/PrivateRoutes";
import categoryRoutes from "../../categoryRoutes";
import UI from "../../../components/UI";
function CategoryTemplate({ categoryName, bulletPoints }) {
  // Sukuriamas objektas aprašomas kategorijos pavadinimas "categoryName "ir masyvas su punktais "bulletPoints", nenaudojamas kol kas
  return subCatgories ? (
    <UI>
      <div className="container">
        <h1>{categoryName}</h1>
        <p1>
          {bulletPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </p1>
        <button>Bandomasis testas</button>
        <button className="next_btn">Mokytojo paskirti testai</button>
      </div>
    </UI>
  ) : (
    <UI filterText={filterText} filterCategories={handleFilterChange}>
      <SideNav categories={filteredCategories} />
    </UI>
  );
}
export default CategoryTemplate;
