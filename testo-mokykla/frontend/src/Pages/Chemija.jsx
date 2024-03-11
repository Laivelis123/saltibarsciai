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
            ['Metalai ', '/chemija/met'],//pavadinmas matomas puslapy, linkas � puslap�
            ['Nemetalai', '/chemija/nem'],
            ['Elektrolizė', '/chemija/eliz'],
        ],
    },
    {
        tema: 'Organinė chemija',
        potemes: [
            ['Alkoholiai', '/chemija/alk'],
            ['Aldehidai' , '/chemija/ald'],
            ['Karboksirūgštys', '/chemija/karb'],
        ],
    },
]
export default Chemija