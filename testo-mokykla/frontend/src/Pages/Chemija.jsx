import React from 'react'
import UI from "../components/UI";
import Accordion from "./Accordion";

function Chemija() {

    return (
        <UI>
            <Accordion data={data}></Accordion>
        </UI>
    );
}
const data = [
    {
        tema: 'Neorganinė chemija',
        potemes: [
            ['1.1 Metalai ', '/chemija/met'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Nemetalai', '/chemija/nem'],
            ['1.3 Elektrolizė', '/chemija/eliz'],
        ],
    },
    {
        tema: 'Organinė chemija',
        potemes: [
            ['2.1 Alkoholiai', '/chemija/alk'],
            ['2.2 Aldehidai' , '/chemija/ald'],
            ['2.3 Karboksirūgštys', '/chemija/karb'],
        ],
    },
]
export default Chemija