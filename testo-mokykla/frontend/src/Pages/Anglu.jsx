import React from 'react'
import UI from "../components/UI";
import Accordion from "./Accordion";

function Anglu() {

    return (
        <UI>
            <Accordion data={data}></Accordion>
        </UI>
    );
}
const data = [
    {
        tema: '',
        potemes: [
            ['1.1 Present simple', '/anglu/present'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Past simple', '/anglu/past'],
            ['1.3 Present perfect', '/anglu/presPerf'],
            ['1.4 Past  perfect', '/anglu/pastPerf']
        ],
    },
]
export default Anglu