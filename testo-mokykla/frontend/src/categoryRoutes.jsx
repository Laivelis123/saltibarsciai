import { Fizika, Chemija, Lietuviu, Biologija } from "./Pages";
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
const categoryRoutes = [
  {
    path: "/fizika",
    element: <Fizika />,
    key: "fizika",
  },
  {
    path: "/fizika/vidinė energija",
    element: <Vidinė />,
    key: "vidinė",
  },
  {
    path: "/fizika/medžiagos būsenų kitimas",
    element: <Kitimas />,
    key: "medžiagos",
  },
  {
    path: "/fizika/atomo sandara",
    element: <Atomas />,
    key: "atomo",
  },
  {
    path: "/fizika/radioaktyvumas",
    element: <Radioaktyvumas />,
    key: "radioaktyvumas",
  },
  {
    path: "/fizika/visata ir jos evoliucija",
    element: <Visata />,
    key: "visata",
  },
  {
    path: "/fizika/elektros srovė",
    element: <Elektra />,
    key: "elektros",
  },
  {
    path: "/fizika/vidinė energija/branduolinė",
    element: <Branduolinė />,
    key: "branduolinė",
  },
  {
    path: "/fizika/vidinė energija/elektroninė",
    element: <Elektroninė />,
    key: "elektroninė",
  },
  {
    path: "/fizika/vidinė energija/molekulinė",
    element: <Molekulinė />,
    key: "molekulinė",
  },
  {
    path: "/fizika/medžiagos būsenų kitimas/kieti",
    element: <Kieti />,
    key: "kieti",
  },
  {
    path: "/fizika/medžiagos būsenų kitimas/skysti",
    element: <Skysti />,
    key: "skysti",
  },
  {
    path: "/fizika/atomo sandara/protonai ir neutronai",
    element: <Protonai_neutronai />,
    key: "protonai_neutronai",
  },
  {
    path: "/fizika/visata ir jos evoliucija/raida",
    element: <RaidaV />,
    key: "raida",
  },
  {
    path: "/fizika/medžiagos būsenų kitimas/dujos",
    element: <Dujos />,
    key: "dujos",
  },
  {
    path: "/fizika/radioaktyvumas/poveikis aplinkai",
    element: <Aplinka />,
    key: "aplinka",
  },
  {
    path: "/fizika/radioaktyvumas/poveikis žmogui",
    element: <Žmogus />,
    key: "žmogus",
  },
  {
    path: "/fizika/radioaktyvumas/spinduliuotės",
    element: <Spinduliuotės />,
    key: "spinduliuotės",
  },
  {
    path: "fizika/elektros srovė/terpėse",
    element: <Terpėse />,
    key: "terpėse",
  },
  {
    path: "/fizika/elektros srovė/nuolatinė",
    element: <Nuolatinė />,
    key: "nuolatinė",
  },
  {
    path: "/fizika/elektros srovė/taikymas pramonėje",
    element: <Taikymas />,
    key: "taikymas",
  },
  {
    path: "/fizika/atomo sandara/elektronai",
    element: <Elektronai />,
    key: "elektronai",
  },
  {
    path: "/chemija",
    element: <Chemija />,
    key: "chemija",
  },
  {
    path: "/chemija/organinė",
    element: <Organinė />,
    key: "organinė",
  },
  {
    path: "/chemija/neorganinė",
    element: <Neorganinė />,
    key: "neorganinė",
  },
  {
    path: "/chemija/organinė/alkoholiai",
    element: <Alkoholiai />,
    key: "alkoholiai",
  },
  {
    path: "/chemija/organinė/aldehidai",
    element: <Aldehidai />,
    key: "aldehidai",
  },
  {
    path: "/chemija/neorganinė/metalai",
    element: <Metalai />,
    key: "metalai",
  },
  {
    path: "/chemija/neorganinė/nemetalai",
    element: <Nemetalai />,
    key: "nemetalai",
  },
  {
    path: "/chemija/neorganinė/elektrolizė",
    element: <Elektrolizė />,
    key: "elektrolizė",
  },
  {
    path: "/chemija/organinė/karboksirūgštys",
    element: <Karboksirūgštys />,
    key: "karboksirūgštys",
  },
  {
    path: "/biologija",
    element: <Biologija />,
    key: "biologija",
  },
  {
    path: "/biologija/anatomija",
    element: <Anatomija />,
    key: "anatomija",
  },
  {
    path: "/biologija/evoliucija",
    element: <Evoliucija />,
    key: "evoliucija",
  },
  {
    path: "/biologija/evoliucija/augalai",
    element: <Augalai />,
    key: "augalai",
  },
  {
    path: "/biologija/evoliucija/gyvūnai",
    element: <Gyvūnai />,
    key: "gyvūnai",
  },
  {
    path: "/biologija/anatomija/kraujotaka",
    element: <Kraujotaka />,
    key: "kraujotaka",
  },
  {
    path: "/biologija/anatomija/lastelė",
    element: <Lastelė />,
    key: "lastelė",
  },
  {
    path: "/biologija/anatomija/organai",
    element: <Organai />,
    key: "organai",
  },
  {
    path: "/biologija/evoliucija/raida",
    element: <Raida />,
    key: "raida",
  },
  {
    path: "/lietuviu",
    element: <Lietuviu />,
    key: "lietuviu",
  },
  {
    path: "/lietuviu/skyryba",
    element: <Skyryba />,
    key: "skyryba",
  },
  {
    path: "/lietuviu/rašyba",
    element: <Rašyba />,
    key: "rašyba",
  },
  {
    path: "/lietuviu/skyryba/vienarūšės sakinio dalys",
    element: <Vienarūšės />,
    key: "vienarūšės",
  },
  {
    path: "/lietuviu/skyryba/įterpiniai",
    element: <Iterpiniai />,
    key: "iterpiniai",
  },
  {
    path: "/lietuviu/rašyba/balsių rašymas",
    element: <Balsės />,
    key: "balsių",
  },
  {
    path: "/lietuviu/rašyba/priebalsių rašyba",
    element: <Priebalsės />,
    key: "priebalsių",
  },
  {
    path: "/lietuviu/skyryba/kreipiniai",
    element: <Kreipiniai />,
    key: "kreipiniai",
  },
  {
    path: "/lietuviu/skyryba/pažyminiai",
    element: <Pažyminiai />,
    key: "pažyminiai",
  },
  {
    path: "/lietuviu/rašyba/sudurtinių žodžių rašymas",
    element: <Sudurtiniai />,
    key: "sudurtinių",
  },
];

export default categoryRoutes;
