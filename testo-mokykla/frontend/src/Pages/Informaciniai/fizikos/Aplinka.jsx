import React from "react";
import UI from "../../../components/UI/UI";
function Aplinka() {
  return (
    <UI>
      {
        <div className="container">
          <h1>Poveikis aplinkai</h1>

          <p1>
            <li>
              Jonizuojanti spinduliuotė: Radioktyvumas dažnai lydi jonizuojančią
              spinduliuotę, kuri gali pažeisti ląstelių struktūrą ir sukelti
              genetinius pažeidimus. Tai gali turėti įtakos augalų, gyvūnų ir
              žmonių sveikatai. Branduolinių atliekų tvarkymas: Radioktyvūs
              elementai gali būti susidarę branduolinių reaktorių veikimo metu
              arba branduolinių sprogimų metu. Tinkamas šių atliekų tvarkymas
              yra esminis, siekiant užkirsti kelią jų išmetimui į aplinką ir
              užtikrinti saugų ilgalaikį saugojimą.
            </li>

            <li>
              Radioaktyvumo sklaida dirvoje ir vandenyje: Jei radioktyvūs
              elementai patenka į dirvą ar vandenį, jie gali plisti ir sukelti
              taršą. Tai gali turėti pasekmių ne tik vietiniam ekosistemų
              funkcionavimui, bet ir paveikti žmonių gyvenamąsias vietas bei
              žemės ūkio produkciją. Radiacinė aplinka: Radioktyvumo poveikis
              gali būti išmatuojamas radiaciniais rodikliais, tokių kaip
              dozimetrija ir radiaciniai matavimai. Šie matavimai yra svarbūs,
              siekiant nustatyti, ar tam tikroje srityje nėra pavojingų
              radiacinės aplinkos lygių.
            </li>

            <li>
              Ilgaamžiai radioktyvūs izotopai: Kai kurie radioktyvūs izotopai
              yra ilgaamžiai, ir jie gali išlikti aplinkoje labai ilgą laiką.
              Tai kelia riziką ilgalaikiam radiaciniam poveikiui.
            </li>
          </p1>
          <button className="first_btn">Bandomasis testas</button>
          <button className="next_btn">Mokytojo paskirti testai</button>
        </div>
      }
    </UI>
  );
}
export default Aplinka;
