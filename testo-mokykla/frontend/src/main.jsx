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
import Anatomija from "./Pages/Informaciniai/bio/Anatomija.jsx";
import Branduoline from "./Pages/Informaciniai/fizikos/Branduoline.jsx";
import Molekuline from "./Pages/Informaciniai/fizikos/Molekuline.jsx";
import Elektronine from "./Pages/Informaciniai/fizikos/Elektronine.jsx";
import Elektr from "./Pages/Informaciniai/fizikos/elektr.jsx";
import PoveikisA from "./Pages/Informaciniai/fizikos/PoveikisA.jsx";
import PoveikisZ from "./Pages/Informaciniai/fizikos/PoveikisZ.jsx";
import Spind from "./Pages/Informaciniai/fizikos/Spind.jsx";
import Vis from "./Pages/Informaciniai/fizikos/Vis.jsx";
import Taikymas from "./Pages/Informaciniai/fizikos/Taikymas.jsx";
import Terpe from "./Pages/Informaciniai/fizikos/Terpe.jsx";
import Nuolat from "./Pages/Informaciniai/fizikos/Nuolat.jsx";
import Prot from "./Pages/Informaciniai/fizikos/prot.jsx";
import Eliz from "./Pages/Informaciniai/chemijos/Eliz.jsx";
import Kieti from "./Pages/Informaciniai/fizikos/kieti.jsx";
import Dujos from "./Pages/Informaciniai/fizikos/dujos.jsx";
import Skysti from "./Pages/Informaciniai/fizikos/skysti.jsx";
import Alk from "./Pages/Informaciniai/chemijos/Alk.jsx";
import Ald from "./Pages/Informaciniai/chemijos/Ald.jsx";
import Karb from "./Pages/Informaciniai/chemijos/Karb.jsx";
import Met from "./Pages/Informaciniai/chemijos/Met.jsx";
import Nem from "./Pages/Informaciniai/chemijos/Nem.jsx";
import Aug from "./Pages/Informaciniai/bio/Aug.jsx";
import Gyv from "./Pages/Informaciniai/bio/Gyv.jsx";
import Kr from "./Pages/Informaciniai/bio/Kr.jsx";
import Last from "./Pages/Informaciniai/bio/Last.jsx";
import Org from "./Pages/Informaciniai/bio/Org.jsx";
import Raida from "./Pages/Informaciniai/bio/Raida.jsx";
import Vien from "./Pages/Informaciniai/lietuviu/Vien.jsx";
import Prieb from "./Pages/Informaciniai/lietuviu/Prieb.jsx";
import Paz from "./Pages/Informaciniai/lietuviu/Paz.jsx";
import Kreip from "./Pages/Informaciniai/lietuviu/Kreip.jsx";
import Iterp from "./Pages/Informaciniai/lietuviu/Iterp.jsx";
import Bals from "./Pages/Informaciniai/lietuviu/Bals.jsx";
import Sud from "./Pages/Informaciniai/lietuviu/Sud.jsx";
import Past from "./Pages/Informaciniai/english/Past.jsx";
import PastPrf from "./Pages/Informaciniai/english/PastPrf.jsx";
import Pres from "./Pages/Informaciniai/english/Pres.jsx";
import PrsP from "./Pages/Informaciniai/english/PrsP.jsx";
const router = createBrowserRouter([
    //__________________________PAGRINDINIS____________________________//
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
        path: "prisijungimas",
        element: <Prisijungimas />,
    },
    {
        path: "registracija",
        element: <Registracija />,
    },
    //__________________________FIZIKA____________________________//
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
        path: "fizika/prot",
        element: <Prot />,
    },
    {
        path: "fizika/vis",
        element: <Vis />,
    },
    {
        path: "fizika/dujos",
        element: <Dujos />,
    },
    {
        path: "fizika/apl",
        element: <PoveikisA />,
    },
    {
        path: "fizika/apl2",
        element: <PoveikisZ />,
    },
    {
        path: "fizika/spind",
        element: <Spind />,
    },
    {
        path: "fizika/terpe",
        element: <Terpe />,
    },
    {
        path: "fizika/nuolat",
        element: <Nuolat />,
    },
    {
        path: "fizika/taikymas",
        element: <Taikymas />,
    },
    {
        path: "fizika/elektr",
        element: <Elektr />,
    },
    //__________________________CHEMIJA____________________________//
    {
        path: "chemija",
        element: <Chemija />,
    },
    {
        path: "chemija/alk",
        element: <Alk />,
    },
    {
        path: "chemija/ald",
        element: <Ald />,
    },
    {
        path: "chemija/met",
        element: <Met />,
    },
    {
        path: "chemija/nem",
        element: <Nem />,
    },
    {
        path: "chemija/eliz",
        element: <Eliz />,
    },
    {
        path: "chemija/karb",
        element: <Karb />,
    },
    //__________________________BIOLOGIJA____________________________//
    {
        path: "biologija",
        element: <Biologija />,
    },
    {
        path: "biologija/anatomija",
        element: <Anatomija />,
    },
    {
        path: "bio/aug",
        element: <Aug />,
    },
    {
        path: "bio/gyv",
        element: <Gyv />,
    },
    {
        path: "biologija/anatomija/kraujotaka",
        element: <Kr />,
    },
    {
        path: "biologija/anatomija/lastelė",
        element: <Last />,
    },
    {
        path: "biologija/anatomija/organai",
        element: <Org />,
    },
    {
        path: "bio/raida",
        element: <Raida />,
    },
    //__________________________ANGLU____________________________//
    {
        path: "anglu",
        element: <Anglu />,
    },
    {
        path: "anglu/present",
        element: <Pres />,
    },
    {
        path: "anglu/past",
        element: <Past />,
    },
    {
        path: "anglu/presPerf",
        element: <PrsP />,
    },
    {
        path: "anglu/pastPerf",
        element: <PastPrf />,
    },
    //__________________________LIETUVIU____________________________//
    {
        path: "lietuviu",
        element: <Lietuviu />,
    },
    {
        path: "liet/vien",
        element: <Vien />,
    },
    {
        path: "liet/iterp",
        element: <Iterp />,
    },
    {
        path: "liet/bals",
        element: <Bals />,
    },
    {
        path: "liet/prieb",
        element: <Prieb />,
    },
    {
        path: "liet/kreip",
        element: <Kreip />,
    },
    {
        path: "liet/paz",
        element: <Paz />,
    },
    {
        path: "liet/sud",
        element: <Sud />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
