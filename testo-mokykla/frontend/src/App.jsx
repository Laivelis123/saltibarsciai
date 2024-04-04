import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import TeacherRoutes from "./utils/TeacherRoutes";
import StudentRoutes from "./utils/StudentRoutes";
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
  Grupė,
  EditGroups,
  EditGroup,
  YourGroups,
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
        <Route element={<StudentRoutes />}>
          <Route path="/valdymas/mokinys" element={<StudentHub />} />
          <Route path="/valdymas/mokinys/grupės" element={<YourGroups />} />
          <Route
            path="/valdymas/mokinys/testai/baigti"
            element={<DoneQuizes />}
          />
          <Route
            path="/valdymas/mokinys/testai/daryti"
            element={<TakeQuizes />}
          />
        </Route>
        <Route path="/valdymas/mokinys/ivertinimai" element={<GivenGrades />} />
        <Route element={<TeacherRoutes />}>
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
            path="/valdymas/mokytojas/tvarkyti/testus"
            element={<ManageQuizes />}
          />
          <Route
            path="/valdymas/mokytojas/tvarkyti/grupes"
            element={<ManageGroups />}
          />
          <Route
            path="/valdymas/mokytojas/tvarkyti/grupes/kurti"
            element={<Grupė />}
          />
          <Route
            path="/valdymas/mokytojas/tvarkyti/grupes/redaguoti"
            element={<EditGroups />}
          />
          <Route
            path="/valdymas/mokytojas/tvarkyti/grupes/redaguoti/:groupId"
            element={<EditGroup />}
          />
        </Route>

        <Route path="/category/:categoryId" element={<CategoryTemplate />} />
        {categoryRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
