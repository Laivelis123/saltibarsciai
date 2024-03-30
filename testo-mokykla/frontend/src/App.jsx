import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import categoryRoutes from "./categoryRoutes";
import {
  Prisijungimas,
  Registracija,
  Pagrindinis,
  Naujienos,
  Apie,
  Kontaktai,
  Profilis,
  Kategorija,
  TeachHub,
  ManageCategories,
  ManageQuizes,
  ManageGroups,
  StudentHub,
  DoneQuizes,
  TakeQuizes,
  GivenGrades,
  NeraPuslapio,
} from "./Pages";
import CategoryTemplate from "./Pages/Informaciniai/CategoryTemplate/CategoryTemplate";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NeraPuslapio />} />
      <Route path="/naujienos" element={<Naujienos />} />
      <Route path="/apie" element={<Apie />} />
      <Route path="/kontaktai" element={<Kontaktai />} />
      <Route element={<PublicRoutes />}>
        <Route path="prisijungimas" element={<Prisijungimas />} />
        <Route path="registracija" element={<Registracija />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Pagrindinis />} />
        <Route path="profilis" element={<Profilis />} />
        <Route path="/valdymas/mokinys" element={<StudentHub />} />
        <Route
          path="/valdymas/mokinys/testai/baigti"
          element={<DoneQuizes />}
        />
        <Route
          path="/valdymas/mokinys/testai/daryti"
          element={<TakeQuizes />}
        />
        <Route path="/valdymas/mokinys/ivertinimai" element={<GivenGrades />} />
        <Route path="/valdymas/mokytojas" element={<TeachHub />} />
        <Route
          path="/valdymas/mokytojas/tvarkyti/kategorijas/kurti"
          element={<Kategorija />}
        />
        <Route
          path="/valdymas/mokytojas/tvarkyti/kategorijas"
          element={<ManageCategories />}
        />
        <Route
          path="/valdymas/mokytojas//tvarkyti/testus"
          element={<ManageQuizes />}
        />
        <Route
          path="/valdymas/mokytojas//tvarkyti/grupes"
          element={<ManageGroups />}
        />
        <Route path="/category/:categoryId" element={<CategoryTemplate />} />
        {categoryRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
