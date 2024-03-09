import React from 'react'
import UI from "../components/UI";
import Accordion from "./Accordion";

function Lietuviu() {

    return (
        <UI>
            <Accordion data={data}></Accordion>
        </UI>
    );
}
const data = [
    {
        tema: 'Skyryba',
        potemes: [
            ['1.1 Vienarūšės sakinio dalys', '/liet/vien'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Pažyminiai', '/liet/paz'],
            ['1.3 Įterpiniai', '/liet/iterp'],
            ['1.4 Krepiniai', '/liet/kreip'],

        ],
    },
    {
        tema: 'Rašyba',
        potemes: [
            ['1.1 Balsių rašymas', '/liet/bals'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Priebalsių rašyba', '/liet/prieb'],
            ['1.3 Sudurtinių žodžių rašymas', '/liet/sud']
        ],
    },
]
export default Lietuviu