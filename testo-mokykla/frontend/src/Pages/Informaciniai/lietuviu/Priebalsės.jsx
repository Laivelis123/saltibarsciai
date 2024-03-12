import React from 'react'
import UI from "../../../components/UI";
function Priebalsės()
{
    return (
        <UI>
        {
             <div className="container"> 
             <h1>
                Priebalsių rašyba
             </h1>

             <p1>
                <li>
                žodžių šaknyje, kai eina prieš balses ir dvibalses, pvz.: gėlė,
gėrybė, kūryba, laimė, laukas, namas, vėjas, Matas, Saulius, Būda,
Dainys, Mūša, Mažeikiai, Seda, geras, gera, gūdus, gūdi, meilus,
meili, sotus, soti, vienas, viena, kitas, kita, visas, visa, mes, jūsų, matyti, gulėti, sūpuoti, tylėti, bėga, meta, šoka, lėtai, vakarop, kada;


                </li>
                <li>
                kai eina prieš l, m, n, r, v, j, pvz.: klausti, kaklas, plauti, šluota,
žaislas, Sližys, Klaipėda, Karklė, greitmaistis, kmynas, prašmatnus,
smailas, versmė, Kmita, Pryšmančiai, Smalvos, glotnutis, knyga, plasnoti, sapnuoti

                </li>
                <li>
                kai eina prieš priebalses (išskyrus l, m, n, r, v, j) ir jų kilmę
sunku nustatyti, pvz.: aikštė, aukštas, daiktas, lazda, status, spaudė,
vapsva

                </li>
                <li>
                 Prieš priebalses l, m, n, r einančios priebalsės rašomos taip, kaip tariama, net ir tais atvejais, kai giminiškuose žodžiuose rašoma kitokia
priebalsė, pvz.: dugnas (plg. dubti), drumzlės (plg. drumsti), mėšlas (plg.
mėžti)

                </li>
                
             </p1>
             <button>Bandomasis testas</button>
             <button className='next_btn'>Mokytojo paskirti testai</button>


             </div>

        }
        </UI>
    );

}
export default Priebalsės;     