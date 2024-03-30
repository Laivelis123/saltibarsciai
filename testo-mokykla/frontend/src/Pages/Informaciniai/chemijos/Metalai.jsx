import React from "react";
import UI from "../../../components/UI/UI";
function Met() {
  return (
    <UI>
      {
        <div className="container">
          <h1>Metalai</h1>

          <p1>
            Bendrieji metalų savybės:
            <li>
              Blykstingumas: Metalai dažnai turi metalinį blizgesį. Duktibilumas
              ir plastiškumas: Metalai gali būti ištempti į ploną lakštą arba
              iškalami į formas be sulūžimo. Geros laidumo savybės: Metalai
              gerai laiduoja elektrą ir šilumą.
            </li>
            <li>
              Elektronų pasiskirstymas: Metaluose elektronai yra susitelkę į
              elektroninį debesį, kuriame jie yra laisvi judėti. Tai leidžia
              metalams būti geriausiais elektriniais laidais.
            </li>
            <li>
              Metalų junginiai: Dauguma metalų sudaro joninio tipo junginius su
              nemetaliniais elementais, taip sukurdami metalinius junginius.
            </li>
            Oksidacija ir redukcija: Metalai lengvai pasiduoda oksidacijai
            (praranda elektronus) ir gali būti sumažinti (gauna elektronus).
            Reakcijos su rūgštimis: Dauguma metalų reaguoja su rūgštimis,
            išskiriant vandenilį ir sudarant metalo druskas. Šilumos laidumo
            savybės: Metalai gerai laiduoja šilumą, todėl dažnai naudojami kaip
            šilumos laidžiai elementai. Tirpumas: Kai kurie metalai gali būti
            tirpstantys skystose medžiagose, kaip pavyzdžiui, živinas. Metalų
            grupės: Periodinėje cheminių elementų lentelėje metalai gali būti
            suskirstyti į alkalių metalus, žemės alkalinius metalus, perėjimo
            metalus, švino grupės metalus ir kt. Korozija: Metalai gali reaguoti
            su aplinkos elementais ir sudaryti korozijos produktus, kurie gali
            paveikti metalo struktūrą.
          </p1>
          <button className="first_btn">Bandomasis testas</button>
          <button className="next_btn">Mokytojo paskirti testai</button>
        </div>
      }
    </UI>
  );
}
export default Met;
