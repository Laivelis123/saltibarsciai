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
            ['1.1 Metalai ', '1.1l'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Pusmetaliai', '1.2l'],
            ['1.3 Elektrolizė', '1.3l'],
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