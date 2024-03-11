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
            ['Branduolinė', '/fizika/Brand'],
            ['Elektroninė', '/fizika/Elek'],
            ['Molekulinė', '/fizika/Mol']
        ],
    },
    {
        tema: 'Medžiagos būsenų kitimas',
        potemes: [
            ['Kietų kūnų savybės', '/fizika/kieti'],
            ['Skystų kūnų savybės', '/fizika/skysti'],
            ['Dujinių kūnų savybės', '/fizika/dujos'],
        ],
    },
    {
        tema: 'Atomo sandara',
        potemes: [
            ['Elektronai', '/fizika/elektr'],
            ['Protonai ir neutronai', '/fizika/prot'],
        ],
    },
    {
        tema: 'Radioaktyvumas',
        potemes: [
            ['Poveikis aplinkai', '/fizika/apll'],
            ['Poveikis žmogui', '/fizika/apl2'],
            ['Spinduliuotės', '/fizika/spind'],
        ],
    },
    {
        tema: 'Visata ir jos evoliucija',
        potemes: [
            ['Visatos raida', '/fizika/vis'],
        ],
    },
    {
        tema: 'Elektros srovė',
        potemes: [
            ['Nuolatinė', '/fizika/nuolat'],
            ['Taikymas pramonėje' , '/fizika/taikymas'],
            ['Terpėse', '/fizika/terpe'],
        ],
    },
]

export default Fizika