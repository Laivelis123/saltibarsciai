import React, { useState, useEffect, useRef } from 'react'
import "./Style.css"

export default function Accordion(Data) {

    const [toggle, setToggle] = useState(false)
    const [heightEl, setHeightEl] = useState();

    const refHeight = useRef()

    useEffect(() => {
        console.log(refHeight);
        setHeightEl(`${refHeight.current.scrollHeight}px`)
    }, [])

    const toggleState = () => {
        setToggle(!toggle)
    }

    console.log(toggle);
    return (
        <div className="accordion">

            <button
                onClick={toggleState}
                className="accordion-visible">
                <span>{Data.title}</span>
                <img
                    className={toggle && "active"}/>
            </button>

            <div
                className={toggle ? "accordion-toggle animated" : "accordion-toggle"}
                style={{ height: toggle ? `${heightEl}` : "0px" }}
                ref={refHeight}
            >
                <p aria-hidden={toggle ? "true" : "false"}>
                    {Data.list}
                </p>
            </div>

        </div>
    )
}