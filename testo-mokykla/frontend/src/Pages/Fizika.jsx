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
            ['1.1 Branduolinė', '/fizika/Brand'],
            ['1.2 Elektroninė', '/fizika/Elek'],
            ['1.3 Molekulinė', '/fizika/Mol']
        ],
    },
    {
        tema: 'Medžiagos būsenų kitimas',
        potemes: [
            ['2.1 Kietų kūnų savybės', '/fizika/kieti'],
            ['2.2 Skystų kūnų savybės', '/fizika/skysti'],
            ['2.3 Dujinių kūnų savybės', '/fizika/dujos'],
        ],
    },
    {
        tema: 'Atomo sandara',
        potemes: [
            ['2.1 Elektronai', '/fizika/elektr'],
            ['2.2 Protonai ir neutronai', '/fizika/prot'],
        ],
    },
    {
        tema: 'Radioaktyvumas',
        potemes: [
            ['2.1 Poveikis aplinkai', '/fizika/apll'],
            ['2.2 Poveikis žmogui', '/fizika/apl2'],
            ['2.3 Spinduliuotės', '/fizika/spind'],
        ],
    },
    {
        tema: 'Visata ir jos evoliucija',
        potemes: [
            ['2.1 Visatos raida', ''],
        ],
    },
    {
        tema: 'Elektros srovė',
        potemes: [
            ['2.1 Nuolatinė', '/fizika/nuolat'],
            ['2.2 Taikymas pramonėje' , '/fizika/taikymas'],
            ['2.3 Terpėse', '/fizika/terpe'],
        ],
    },
]

export default Fizika