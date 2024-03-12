import React from 'react'
import UI from "../../../components/UI";
function Vienarūšės()
{
    return (
        <UI>
        {
             <div className="container"> 
             <h1>
                Vienarūšės sakinio dalys
             </h1>

             <p1>
                <li>
                Sakinio dalių vienarūšiškumą lemia vienodi dviejų ar daugiau sakinio dalių sintaksiniai ryšiai su joms bendra sakinio dalimi ir (ar) vienodas komunikacinis reikšmingumas bendrosios sakinio dalies atžvilgiu.

                </li>
                <li>
                Vienarūšėmis gali tapti ir ne to paties sintaksinio ryšio sakinio dalys, jei
jos kalbėtojui savo turiniu yra vienodai svarbios bendrõsios sakinio dalies
atžvilgiu ir pasakomos išvardijamąja intonacija, pvz.: Paprastai, susirgus
plaučių ligomis, komplikuojasi pagrindinė, kardiovaskulinės sistemos liga. 


                </li>
                <li>
                Jei vienavardės sakinio dalys nėra vienodai svarbios bendrõsios sakinio dalies atžvilgiu ir nepasakomos išvardijamąja intonacija, jos nelaikomos vienarūšėmis, pvz.: Kambaryje pakampiais mėtėsi įvairių skudurų

                </li>
                <li>
                Vienarūšėmis sakinio dalimis gali eiti įvairios sakinio dalys – tariniai,
veiksniai, papildiniai, derinamieji ir nederinamieji pažyminiai, priedėliai,
aplinkybės.

                </li>

                
             </p1>
             <button className='first_btn'>Bandomasis testas</button>
             <button className='next_btn'>Mokytojo paskirti testai</button>


             </div>

        }
        </UI>
    );

}
export default Vienarūšės;     