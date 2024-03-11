import React from 'react'
import UI from "../../../components/UI";
function Terpe()
{
    return (
        <UI>
        {
             <div className="container"> 
             <h1>
                 Elektros srovė terpėje
             </h1>

             <p1>
             <li>Elektronų judėjimas: Elektros srovė yra susijusi su elektronų judėjimu medžiagoje. Paprastai elektronai yra neigiamai įelektrinti ir juda nuo vietų, kurios turi daugiau neigiamų krūvių, link vietų su mažiau neigiamų krūvių arba su daugiau teigiamų krūvių.

Laidininkai: Dauguma medžiagų turi tam tikrą laidumą elektronams. Metalo laidininkuose elektronai gali laisvai judėti, sudarant elektros srovę. Izoliuotose medžiagose elektronai gali būti prisirišę prie atomų ir nejudėti laisvai.</li>

<li>Elektros pasipriešinimas: Elektros pasipriešinimas (elektrinė varža) yra svarbus dydis, nurodantis, kaip lengvai elektronai gali judėti per medžiagą. Maža elektrinė varža reiškia geresnį laidumą, o didelė elektrinė varža reiškia blogą laidumą.

Srovės stipris: Elektros srovės stipris matuojamas amperais (A). Jis nusako, kiek elektronų pernešama per laidininką per vienetinį laiko tarpą.</li>

<li>Įtampa: Elektros įtampa (voltai, V) nurodo potencialų skirtumą tarp dviejų taškų elektros grandinėje, kurie skatina elektronų judėjimą. Kuo didesnis įtampos skirtumas, tuo greičiau juda elektronai.

Jėga ir judėjimas: Elektronai juda per laidininką dėl elektros jėgos, kurią sukelia elektrinė įtampa. Elektros jėga veikia neigiamus elektronus nuo vietų su mažiau neigiamų krūvių link vietų su daugiau neigiamų krūvių arba su daugiau teigiamų krūvių.</li>

<li>Šiluminiai efektai: Elektros srovė terpėje taip pat gali sukelti šilumos išsiskyrimą. Šiluminiai efektai gali būti svarbūs, ypač kai svarbu įvertinti laidininko efektyvumą ir išvengti per didelės šiluminės energijos praradimų.</li>
                
             </p1>
             <button className='first_btn'>Bandomasis testas</button>
             <button className='next_btn'>Mokytojo paskirti testai</button>


             </div>

        }
        </UI>
    );

}
export default  Terpe;     