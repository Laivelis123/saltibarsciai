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
            ['1.1', '1.1l'],//pavadinmas matomas puslapy, linkas � puslap�
            ['1.2', '1.2l'],
            ['1.3', '1.3l'],
            ['1.4', '1.4l']
        ],
    },
    {
        tema: 'Organinė chemija',
        potemes: [
            ['2.1 Nuolatinė', '2.1l'],
            ['2.2 Taikymas pramonėje' , '2.2l'],
            ['2.3 Terpėse', '2.3l'],
        ],
    },
]
export default Chemija