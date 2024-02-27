import { useState } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import UI from "./components/UI";
import Fizika from "./Pages/Fizika";
import Anglu from "./Pages/Anglu";
import Chemija from "./Pages/Chemija";
import Lietuviu from "./Pages/Lietuviu";
import Biologija from "./Pages/Biologija";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Mainpage from "./Pages/Mainpage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "fizika",
    element: <Fizika />,
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
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
