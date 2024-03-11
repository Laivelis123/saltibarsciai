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
            ['Vienarūšės sakinio dalys', '/liet/vien'],//pavadinmas matomas puslapy, linkas � puslap�
            ['Pažyminiai', '/liet/paz'],
            ['Įterpiniai', '/liet/iterp'],
            ['Krepiniai', '/liet/kreip'],

        ],
    },
    {
        tema: 'Rašyba',
        potemes: [
            ['Balsių rašymas', '/liet/bals'],//pavadinmas matomas puslapy, linkas � puslap�
            ['Priebalsių rašyba', '/liet/prieb'],
            ['Sudurtinių žodžių rašymas', '/liet/sud']
        ],
    },
]
export default Lietuviu