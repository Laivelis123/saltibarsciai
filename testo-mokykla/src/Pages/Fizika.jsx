import React from 'react'
import UI from "../components/UI";
import Accordion from "./Accordion";

function Fizika() {

    return (
        <UI>
            <Accordion data={data}></Accordion>
        </UI>
    );
}

const data = [
    {
        tema: 'Vidinė energija',
        potemes: [
            ['1.1', '1.1l'],//pavadinmas matomas puslapy, linkas į puslapį
            ['1.2', '1.2l'],
            ['1.3', '1.3l'],
            ['1.4', '1.4l']
        ],
    },
    {
        tema: 'Medžiagos būsenų kitimas',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Atomo sandara',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Radioaktyvumas',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Atomų branduolių virsmai',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Visata ir jos evoliucija',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Elektros krūviai ir jų sąveika',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Nuolatinė elektros srovė',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Elektros srovė terpėse',
        potemes: [
            ['2.1', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
]

export default Fizika