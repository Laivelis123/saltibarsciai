import { lazy } from "react";
import { Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";

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
  Grupė,
  EditGroups,
  EditGroup,
  StudentHub,
  DoneQuizes,
  TakeQuizes,
  GivenGrades,
  YourGroups,
  NeraPuslapio,
  CategoryTemplate,
  CreateQuiz,
  EditQuiz,
  EditQuizzes,
  YourQuizzes,
} from "./Pages";

export const allRoutes = [
  { path: "/naujienos", element: <Naujienos /> },
  { path: "/apie", element: <Apie /> },
  { path: "/kontaktai", element: <Kontaktai /> },
  { path: "/*", element: <NeraPuslapio /> },
];

export const allPrivateRoutes = [
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/", element: <Pagrindinis /> },
      { path: "/profilis", element: <Profilis /> },
      { path: "/category/:categoryId", element: <CategoryTemplate /> },
    ],
  },
];

export const allPublicRoutes = [
  {
    element: <PublicRoutes />,
    children: [
      { path: "prisijungimas", element: <Prisijungimas /> },
      { path: "registracija", element: <Registracija /> },
    ],
  },
];

export const allTeacherRoutes = [
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/valdymas/mokytojas", element: <TeachHub /> },
      {
        path: "/valdymas/mokytojas/tvarkyti/kategorijas/kurti",
        element: <Kategorija />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/kategorijas",
        element: <ManageCategories />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/testus",
        element: <ManageQuizes />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/grupes",
        element: <ManageGroups />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/grupes/kurti",
        element: <Grupė />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/grupes/redaguoti",
        element: <EditGroups />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/grupes/redaguoti/:groupId",
        element: <EditGroup />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/testai/kurti",
        element: <CreateQuiz />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/testai/redaguoti/:quizId",
        element: <EditQuiz />,
      },
      {
        path: "/valdymas/mokytojas/tvarkyti/testai/peržiūra",
        element: <EditQuizzes />,
      },
    ],
  },
];

export const allStudentRoutes = [
  {
    element: <PrivateRoutes />,
    children: [
      { path: "/valdymas/mokinys", element: <StudentHub /> },
      { path: "/valdymas/mokinys/grupės", element: <YourGroups /> },
      { path: "/valdymas/mokinys/testai/baigti", element: <DoneQuizes /> },
      { path: "/valdymas/mokinys/testai/daryti", element: <TakeQuizes /> },
      { path: "/valdymas/mokinys/ivertinimai", element: <GivenGrades /> },
      { path: "/valdymas/mokinys/testai", element: <YourQuizzes /> },
    ],
  },
];
