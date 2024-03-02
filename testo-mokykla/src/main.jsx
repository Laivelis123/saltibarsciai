import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Fizika from "./Pages/Fizika";
import Anglu from "./Pages/Anglu";
import Chemija from "./Pages/Chemija";
import Lietuviu from "./Pages/Lietuviu";
import Biologija from "./Pages/Biologija";
import Pav from "./Pages/Informaciniai/Pavyzdys.jsx";
import Naujienos from "./Pages/Naujienos";
import Apie from "./Pages/Apie";
import Kontaktai from "./Pages/Kontaktai";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
/*    Pagrindinis puslapis*/
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
/*    Fizika*/
    {
        path: "fizika",
        element: <Fizika />,
    },
    {
        path: "fizika/Pav",
        element: <Pav/>,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
