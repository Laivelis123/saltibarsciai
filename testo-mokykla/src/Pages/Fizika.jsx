import React from 'react'
import UI from "../components/UI";
import "./Style.css"
import {useState } from 'react'

function Fizika() {
    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    return (
        <UI>
        <div className='wrapper'>
            <div className='accordion'>
                {data.map((item, i) => (
                    <div className='item'>
                        <div className='title' onClick={()=> toggle(i) }>
                            <h2>{item.tema}</h2>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        <div className={selected === i ? 'content show' : 'content'}>{item.potemes}</div>
                    </div>
                ))}
            </div>
            </div>
        </UI>
    );
}

const data = [
    {
        tema: '1',
        potemes: '1.1',
    },
    {
        tema: '2',
        potemes: '2.1',
    }
]

export default Fizika