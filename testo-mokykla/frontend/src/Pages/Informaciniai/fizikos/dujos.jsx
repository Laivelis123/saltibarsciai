import React from "react";
import UI from "../../../components/UI/UI";
function Dujos() {
  return (
    <UI>
      {
        <div className="container">
          <h1 id="header">Dujos</h1>
          <p1>
            <li>
              Molekulės ir Atomai: Dujos gali būti sudarytos iš atomų arba
              molekulių. Pavyzdžiui, oro dujos yra sudarytos iš skirtingų
              molekulių, tokių kaip azotas (N2), deguonis (O2), anglies
              dioksidas (CO2) ir kt.
            </li>

            <li>
              Judėjimas: Dujos charakterizuoja chaotiškas judėjimas. Molekulės
              nuolat susiduria tarpusavyje ir su aplinkiniais objektais. Šis
              judėjimas yra pagrindinė priežastis, kodėl dujos užima visas
              turimas erdves.
            </li>

            <li>
              Tūris: Dujų molekulės užima didelį tūrį palyginti su skystaisiais
              arba kietuoju būsenos laipsniais. Jų molekulės yra nesusijusios,
              todėl jų tūris plinta, kad užimtų visas turimas erdves.
              Temperatūra ir Slegis: Dujos yra jautrios temperatūrai ir slėgiui.
              Šios būsenos būdingos idealiosioms dujoms, kurios yra teorinės
              dujų būsenos, kurią aprašo Boyle-Mariotte ir Charles'io dėsniai.
              Boyle-Mariotte dėsnis teigia, kad jei dujų temperatūra nepakinta,
              tai jų slėgis yra tiesiogiai proporcingas tūriui. Charles'io
              dėsnis teigia, kad esant pastovioms sąlygoms (pvz., jei slėgis
              neminta), dujų tūris yra tiesiogiai proporcingas temperatūrai.
            </li>

            <li>
              Fizikiniai Būsenos Kintamieji: Dujų būseną galima apibūdinti pagal
              tokias fizikinių būsenų kintamuosius kaip temperatūra, slėgis,
              tūris ir masė. Šie kintamieji nustato dujų būseną ir jų elgseną.
            </li>

            <li>
              Gazo Dėsniai: Dujos paklūsta tam tikriems fizikiniams dėsniams,
              pavyzdžiui, Avogadro dėsniui, kuris teigia, kad vienodos sąlygos
              turi vienodą tūrį dujų, nepriklausomai nuo jų rūšies. Dujų
              Elgsena: Realaus dujų elgseną dažnai geriau aprašo van der Waals
              lygtis, kuri atsižvelgia į molekulinį tūrį ir jų tarpusavio
              sąveiką.
            </li>
          </p1>
          <button className="first_btn">Bandomasis testas</button>
          <button className="next_btn">Mokytojo paskirti testai</button>
        </div>
      }
    </UI>
  );
}
export default Dujos;
