import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import {
  Fizika,
  Chemija,
  Lietuviu,
  Biologija,
  Prisijungimas,
  Registracija,
  Pagrindinis,
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
function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/naujienos" element={<Naujienos />} />
        <Route path="/apie" element={<Apie />} />
        <Route path="/kontaktai" element={<Kontaktai />} />
        <Route path="prisijungimas" element={<Prisijungimas />} />
        <Route path="registracija" element={<Registracija />} />
      </Route>
      , //Private
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Pagrindinis />} />
        //_______________________FIZIKA______________________//
        <Route path="fizika" element={<Fizika />}>
          <Route path="vidinė-energija" element={<Vidinė />} />
          <Route path="medžiagos-būsenų-kitimas" element={<Kitimas />} />
          <Route path="atomo-sandara" element={<Atomas />} />
          <Route path="radioaktyvumas" element={<Radioaktyvumas />} />
          <Route path="visata-ir-jos-evoliucija" element={<Visata />} />
          <Route path="elektros-srovė" element={<Elektra />} />
          <Route path="vidinė-energija/branduolinė" element={<Branduolinė />} />
          <Route path="vidinė-energija/elektroninė" element={<Elektroninė />} />
          <Route path="vidinė-energija/molekulinė" element={<Molekulinė />} />
          <Route path="medžiagos-būsenų-kitimas/kieti" element={<Kieti />} />
          <Route path="medžiagos-būsenų-kitimas/skysti" element={<Skysti />} />
          <Route
            path="atomo-sandara/protonai-ir-neutronai"
            element={<Protonai_neutronai />}
          />
          <Route path="visata-ir-jos-evoliucija/raida" element={<RaidaV />} />
          <Route path="medžiagos-būsenų-kitimas/dujos" element={<Dujos />} />
          <Route
            path="radioaktyvumas/poveikis-aplinkai"
            element={<Aplinka />}
          />
          <Route path="radioaktyvumas/poveikis-žmogui" element={<Žmogus />} />
          <Route
            path="radioaktyvumas/spinduliuotės"
            element={<Spinduliuotės />}
          />
          <Route path="elektros-srovė/terpėse" element={<Terpėse />} />
          <Route path="elektros-srovė/nuolatinė" element={<Nuolatinė />} />
          <Route
            path="elektros-srovė/taikymas-pramonėje"
            element={<Taikymas />}
          />
          <Route path="atomo-sandara/elektronai" element={<Elektronai />} />
        </Route>
        //_______________________CHEMIJA______________________//
        <Route path="chemija" element={<Chemija />}>
          <Route path="organinė" element={<Organinė />} />
          <Route path="neorganinė" element={<Neorganinė />} />
          <Route path="organinė/alkoholiai" element={<Alkoholiai />} />
          <Route path="organinė/aldehidai" element={<Aldehidai />} />
          <Route path="neorganinė/metalai" element={<Metalai />} />
          <Route path="neorganinė/nemetalai" element={<Nemetalai />} />
          <Route path="neorganinė/elektrolizė" element={<Elektrolizė />} />
          <Route
            path="organinė/karboksirūgštys"
            element={<Karboksirūgštys />}
          />
        </Route>
        //_______________________BIOLOGIJA______________________//
        <Route path="biologija" element={<Biologija />}>
          <Route path="anatomija" element={<Anatomija />} />
          <Route path="evoliucija" element={<Evoliucija />} />
          <Route path="evoliucija/augalai" element={<Augalai />} />
          <Route path="evoliucija/gyvūnai" element={<Gyvūnai />} />
          <Route path="anatomija/kraujotaka" element={<Kraujotaka />} />
          <Route path="anatomija/lastelė" element={<Lastelė />} />
          <Route path="anatomija/organai" element={<Organai />} />
          <Route path="evoliucija/raida" element={<Raida />} />
        </Route>
        //_______________________LIETUVIU______________________//
        <Route path="lietuviu" element={<Lietuviu />}>
          <Route path="skyryba" element={<Skyryba />} />
          <Route path="rašyba" element={<Rašyba />} />
          <Route
            path="skyryba/vienarūšės-sakinio-dalys"
            element={<Vienarūšės />}
          />
          <Route path="skyryba/įterpiniai" element={<Iterpiniai />} />
          <Route path="rašyba/balsių-rašymas" element={<Balsės />} />
          <Route path="rašyba/priebalsių-rašyba" element={<Priebalsės />} />
          <Route path="skyryba/kreipiniai" element={<Kreipiniai />} />
          <Route path="skyryba/pažyminiai" element={<Pažyminiai />} />
          <Route
            path="rašyba/sudurtinių-žodžių-rašymas"
            element={<Sudurtiniai />}
          />
        </Route>
      </Route>
      ,
    </Routes>
  );
}

export default App;
