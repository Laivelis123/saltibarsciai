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
  Naujienos,
  Apie,
  Kontaktai,
} from "./Pages";
//import Pav from "./Pages/Informaciniai/Pavyzdys.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Branduoline from "./Pages/Informaciniai/fizikos/Branduoline.jsx";
import Molekuline from "./Pages/Informaciniai/fizikos/Molekuline.jsx";
import Elektronine from "./Pages/Informaciniai/fizikos/Elektronine.jsx";
import Elektr from "./Pages/Informaciniai/fizikos/Elektr.jsx";
import Prot from "./Pages/Informaciniai/fizikos/Prot.jsx";
import Kieti from "./Pages/Informaciniai/fizikos/Kieti.jsx";
import Dujos from "./Pages/Informaciniai/fizikos/Dujos.jsx";
import Skysti from "./Pages/Informaciniai/fizikos/Skysti.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/naujienos",
    element: <Naujienos />,
  },
  {
    path: "/apie",
    element: <Apie />,
  },
  {
    path: "/kontaktai",
    element: <Kontaktai />,
  },
  {
    path: "fizika",
    element: <Fizika />,
  },
  {
    path: "fizika/Brand",
    element: <Branduoline />,
  },
  {
    path: "fizika/Elek",
    element: <Elektronine />,
  },
  {
    path: "fizika/Mol",
    element: <Molekuline />,
  },
  {
    path: "fizika/kieti",
    element: <Kieti />,
  },
  {
    path: "fizika/skysti",
    element: <Skysti />,
  },
  {
    path: "fizika/dujos",
    element: <Dujos />,
  },
  {
    path: "fizika/prot",
    element: <Prot />,
  },
  
  {
    path: "fizika/dujos",
    element: <Dujos />,
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
