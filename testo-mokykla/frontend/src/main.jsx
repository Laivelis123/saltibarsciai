import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Fizika,
  Anglu,
  Chemija,
  Lietuviu,
  Biologija,
  Prisijungimas,
  Registracija,
} from "./Pages";
import Pav from "./Pages/Informaciniai/Pavyzdys.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "fizika",
    element: <Fizika />,
  },
  {
    path: "fizika/Pav",
    element: <Pav />,
  },
  {
    path: "chemija",
    element: <Chemija />,
  },
  {
    path: "anglu",
    element: <Anglu />,
  },
  {
    path: "lietuviu",
    element: <Lietuviu />,
  },
  {
    path: "biologija",
    element: <Biologija />,
  },
  {
    path: "prisijungimas",
    element: <Prisijungimas />,
  },
  {
    path: "registracija",
    element: <Registracija />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
