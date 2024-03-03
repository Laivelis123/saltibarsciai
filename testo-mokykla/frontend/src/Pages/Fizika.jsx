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
            ['Pavyzdys', '/fizika/Pav'],//pavadinmas matomas puslapy, linkas į puslapį
            ['1.2 Branduolinė', '/fizika/Brand'],
            ['1.3 Elektroninė', '/fizika/Elek'],
            ['1.4 Molekulinė', '/fizika/Mol']
        ],
    },
    {
        tema: 'Medžiagos būsenų kitimas',
        potemes: [
            ['2.1 Kietų kūnų savybės', '2.1l'],
            ['2.2 Skystų kūnų savybės', '2.2l'],
            ['2.3 Dujinių kūnų savybės', '2.3l'],
        ],
    },
    {
        tema: 'Atomo sandara',
        potemes: [
            ['2.1 Elektronai', '2.1l'],
            ['2.2 Protonai ir neutronai', '2.2l'],
            ['2.3 ', '2.3l'],
        ],
    },
    {
        tema: 'Radioaktyvumas',
        potemes: [
            ['2.1 Poveikis aplinkai', '2.1l'],
            ['2.2 Poveikis žmogui', '2.2l'],
            ['2.3 Spinduliuotės', '2.3l'],
        ],
    },
    {
        tema: 'Atomų branduolių virsmai',
        potemes: [
            ['2.1 ', '2.1l'],
            ['2.2', '2.2l'],
            ['2.3', '2.3l'],
        ],
    },
    {
        tema: 'Visata ir jos evoliucija',
        potemes: [
            ['2.1 Planetos', '2.1l'],
            ['2.2 Visatos raida', '2.2l'],
            ['2.3 Gyvybės atsiradimas', '2.3l'],
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
            ['2.1  ', '2.1l'],
            ['2.2 ', '2.2l'],
            ['2.3 Taikymas pramonėje', '2.3l'],
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