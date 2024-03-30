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
} from "./Pages";
import CategoryTemplate from "./Pages/Informaciniai/CategoryTemplate";

function App() {
  return (
    <Routes>
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
        <Route path="/kurti/kategorija" element={<Kategorija />} />
        <Route path="/category/:categoryId" element={<CategoryTemplate />} />
        {categoryRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
