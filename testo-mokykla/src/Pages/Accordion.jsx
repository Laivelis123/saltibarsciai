import React from 'react'
import "./Accordion.css"
import { Link } from "react-router-dom";
import { useState } from 'react'

export default function Accordion({ data }) {
    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    return (
        <div className='wrapper'>
            <div className='accordion'>
                {data.map((item, i) => (
                    <div className='item'>
                        <div className='title' onClick={() => toggle(i)}>
                            <h2>{item.tema}</h2>
                            <span>{selected === i ? '-' : '+'}</span>
                        </div>
                        {item.potemes.map((t, j) => (
                            <div className={selected === i ? 'content show' : 'content'}>
                                <Link to={item.potemes[j][1]}>{item.potemes[j][0]}</Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}