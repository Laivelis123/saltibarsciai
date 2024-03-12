import React from 'react'
import UI from "../../../components/UI";
function Nuolatinė()
{
    return (
        <UI>
        {
             <div className="container"> 
             <h1>
                Nuolatinė srovė
             </h1>

             <p1>
             <li>Nuolatinė srovė (DC) yra elektros srovė, kurios kryptis išlieka pastovi laiko eigoje, tai yra, jos stiprumas ir kryptis nekinta. Šis elektros srovės tipas yra fundamentali elektros inžinerijos sąvoka ir turi įvairių taikymo sričių. Štai keletas svarbių faktų apie nuolatinę srovę fizikos požiūriu:</li>

Elektronų judėjimas: Nuolatinė srovė susidaro, kai elektronai juda per laidininką nuo neigiamai įelektrintos vietos (minusinė elektroda) link teigiamai įelektrintos vietos (pliusinė elektroda). Šis judėjimas yra nuolatinis ir pastovus, o tai skiria nuolatinę srovę nuo kitų srovės tipų.

Pavyzdžiai: Pavyzdžiai nuolatinės srovės šaltinių yra baterijos, akumuliatoriai, taip pat nuolatinės elektros energijos šaltiniai, tokie kaip generatoriai arba solariniai elementai.

<li>Matavimas: Nuolatinės srovės stiprumas išmatuojamas amperais (A). Matavimui dažnai naudojamas prietaisas, vadinamas ampermetru.

Nuolatinės srovės charakteristikos: Šios srovės charakteristika yra pastovi kryptis ir dažnai pastovus stiprumas. Tai svarbu, ypač kai kuriais taikymo atvejais, tokiais kaip maitinimas elektroninėms įrangoms.</li>

<li>Taikymai: Nuolatinė srovė yra plačiai naudojama įvairiose srityse. Ji yra esminė elektros energijos perdavimo ir maitinimo įvairiems elektroniniams įrenginiams, tokiems kaip telefonai, kompiuteriai, elektros varikliai ir kt.

Elektros grandinės su nuolatine srove: Elektros grandinėse su nuolatine srove paprastai yra elementai, kurie valdo srovės stiprumą, tokie kaip rezistoriai, kondensatoriai ir induktorius. Šie elementai leidžia projektuoti elektros grandines pagal pageidaujamus funkcionalumo ir kontrolės principus.</li>

             </p1>
             <button className='first_btn'>Bandomasis testas</button>
             <button className='next_btn'>Mokytojo paskirti testai</button>


             </div>

        }
        </UI>
    );

}
export default Nuolatinė;     