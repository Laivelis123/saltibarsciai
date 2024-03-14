import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Fizika,
  Chemija,
  Lietuviu,
  Biologija,
  Prisijungimas,
  Registracija,
  Naujienos,
  Apie,
  Kontaktai,
} from "./Pages";
import {
  Anatomija,
  Evoliucija,
  Augalai,
  Gyvūnai,
  Lastelė,
  Kraujotaka,
  Raida,
  Organai,
} from "./Pages/Informaciniai/bio";
import {
  Aldehidai,
  Alkoholiai,
  Elektrolizė,
  Karboksirūgštys,
  Metalai,
  Nemetalai,
  Neorganinė,
  Organinė,
} from "./Pages/Informaciniai/chemijos";
import {
  Skyryba,
  Rašyba,
  Balsės,
  Iterpiniai,
  Kreipiniai,
  Pažyminiai,
  Priebalsės,
  Sudurtiniai,
  Vienarūšės,
} from "./Pages/Informaciniai/lietuviu";
import {
  Vidinė,
  Kitimas,
  Atomas,
  Radioaktyvumas,
  Visata,
  Elektra,
  Branduolinė,
  Elektroninė,
  Molekulinė,
  Kieti,
  Skysti,
  Dujos,
  Elektronai,
  Protonai_neutronai,
  Aplinka,
  Žmogus,
  Spinduliuotės,
  RaidaV,
  Nuolatinė,
  Taikymas,
  Terpėse,
} from "./Pages/Informaciniai/fizikos";
const router = createBrowserRouter([
  //_______________________PAGRINDINIS______________________//
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
  //_______________________FIZIKA______________________//
  {
    path: "fizika",
    element: <Fizika />,
  },
  {
    path: "fizika/vidinė energija",
    element: <Vidinė />,
  },
  {
    path: "fizika/medžiagos būsenų kitimas",
    element: <Kitimas />,
  },
  {
    path: "fizika/atomo sandara",
    element: <Atomas />,
  },
  {
    path: "fizika/radioaktyvumas",
    element: <Radioaktyvumas />,
  },
  {
    path: "fizika/visata ir jos evoliucija",
    element: <Visata />,
  },
  {
    path: "fizika/elektros srovė",
    element: <Elektra />,
  },
  {
    path: "fizika/vidinė energija/branduolinė",
    element: <Branduolinė />,
  },
  {
    path: "fizika/vidinė energija/elektroninė",
    element: <Elektroninė />,
  },
  {
    path: "fizika/vidinė energija/molekulinė",
    element: <Molekulinė />,
  },
  {
    path: "fizika/medžiagos būsenų kitimas/kieti",
    element: <Kieti />,
  },
  {
    path: "fizika/medžiagos būsenų kitimas/skysti",
    element: <Skysti />,
  },

  {
    path: "fizika/atomo sandara/protonai ir neutronai",
    element: <Protonai_neutronai />,
  },
  {
    path: "fizika/visata ir jos evoliucija/raida",
    element: <RaidaV />,
  },

  {
    path: "fizika/medžiagos būsenų kitimas/dujos",
    element: <Dujos />,
  },
  {
    path: "fizika/radioaktyvumas/poveikis aplinkai",
    element: <Aplinka />,
  },
  {
    path: "fizika/radioaktyvumas/poveikis žmogui",
    element: <Žmogus />,
  },
  {
    path: "fizika/radioaktyvumas/spinduliuotės",
    element: <Spinduliuotės />,
  },
  {
    path: "fizika/elektros srovė/terpėse",
    element: <Terpėse />,
  },
  {
    path: "fizika/elektros srovė/nuolatinė",
    element: <Nuolatinė />,
  },
  {
    path: "fizika/elektros srovė/taikymas pramonėje",
    element: <Taikymas />,
  },
  {
    path: "fizika/atomo sandara/elektronai",
    element: <Elektronai />,
  },
  //_______________________CHEMIJA______________________//

  {
    path: "chemija",
    element: <Chemija />,
  },
  {
    path: "chemija/organinė",
    element: <Organinė />,
  },
  {
    path: "chemija/neorganinė",
    element: <Neorganinė />,
  },
  {
    path: "chemija/organinė/alkoholiai",
    element: <Alkoholiai />,
  },
  {
    path: "chemija/organinė/aldehidai",
    element: <Aldehidai />,
  },
  {
    path: "chemija/neorganinė/metalai",
    element: <Metalai />,
  },
  {
    path: "chemija/neorganinė/nemetalai",
    element: <Nemetalai />,
  },
  {
    path: "chemija/neorganinė/elektrolizė",
    element: <Elektrolizė />,
  },
  {
    path: "chemija/organinė/karboksirūgštys",
    element: <Karboksirūgštys />,
  },
  //_______________________BIOLOGIJA______________________//
  {
    path: "biologija",
    element: <Biologija />,
  },
  {
    path: "biologija/anatomija",
    element: <Anatomija />,
  },
  {
    path: "biologija/evoliucija",
    element: <Evoliucija />,
  },
  {
    path: "biologija/evoliucija/augalai",
    element: <Augalai />,
  },
  {
    path: "biologija/evoliucija/gyvūnai",
    element: <Gyvūnai />,
  },
  {
    path: "biologija/anatomija/kraujotaka",
    element: <Kraujotaka />,
  },
  {
    path: "biologija/anatomija/lastelė",
    element: <Lastelė />,
  },
  {
    path: "biologija/anatomija/organai",
    element: <Organai />,
  },
  {
    path: "biologija/evoliucija/raida",
    element: <Raida />,
  },
  //_______________________LIETUVIU______________________//
  {
    path: "lietuviu",
    element: <Lietuviu />,
  },
  {
    path: "lietuviu/skyryba",
    element: <Skyryba />,
  },
  {
    path: "lietuviu/rašyba",
    element: <Rašyba />,
  },
  {
    path: "lietuviu/skyryba/vienarūšės sakinio dalys",
    element: <Vienarūšės />,
  },
  {
    path: "lietuviu/skyryba/įterpiniai",
    element: <Iterpiniai />,
  },
  {
    path: "lietuviu/rašyba/balsių rašymas",
    element: <Balsės />,
  },
  {
    path: "lietuviu/rašyba/priebalsių rašyba",
    element: <Priebalsės />,
  },
  {
    path: "lietuviu/skyryba/kreipiniai",
    element: <Kreipiniai />,
  },
  {
    path: "lietuviu/skyryba/pažyminiai",
    element: <Pažyminiai />,
  },
  {
    path: "lietuviu/rašyba/sudurtinių žodžių rašymas",
    element: <Sudurtiniai />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
