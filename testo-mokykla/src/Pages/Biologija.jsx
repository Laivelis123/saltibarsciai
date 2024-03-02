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
        tema: '',
        potemes: [
            ['1.1', '1.1l'],//pavadinmas matomas puslapy, linkas á puslapá
            ['1.2', '1.2l'],
            ['1.3', '1.3l'],
            ['1.4', '1.4l']
        ],
    },
]
export default Biologija