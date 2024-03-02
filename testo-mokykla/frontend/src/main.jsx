import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Page from "./Pages/Fizika"
import Login from './Pages/Prisijungimas.jsx'
import Register from './Pages/Registracija.jsx';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "fizika",
        element: <Page />,
    },
    {
        path: "prisijungimas",
        element: <Login />,
    },
    {
        path: "registracija",
        element: <Register />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
