import React from 'react'
import UI from "../components/UI";
import Accordion from "./Accordion";

function Biologija() {

    return (
        <UI>
            <Accordion data={data}></Accordion>
        </UI>
    );
}
const data = [
    {
        tema: 'Anatomija',
        potemes: [
            ['1.1 Lastelė', '/bio/last'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Kraujotaka', '/bio/kr'],
            ['1.3 Organai', '/bio/org'],
        ],
    },
    {
        tema: 'Evoliucija',
        potemes: [
            ['1.1 Raida', '/bio/raida'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Augalai', '/bio/aug'],
            ['1.3 Gyvūnai', '/bio/gyv'],
        ],
    },
]
export default Biologija