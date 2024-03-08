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
            ['1.1 Lastelė', '1.1l'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2 Kraujotaka', '1.2l'],
            ['1.3 Organai', '1.3l'],
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