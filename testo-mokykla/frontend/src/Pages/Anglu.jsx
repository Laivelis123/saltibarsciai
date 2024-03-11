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
            ['Present simple', '/anglu/present'],//pavadinmas matomas puslapy, linkas � puslap�
            ['Past simple', '/anglu/past'],
            ['Present perfect', '/anglu/presPerf'],
            ['Past  perfect', '/anglu/pastPerf']
        ],
    },
]
export default Anglu