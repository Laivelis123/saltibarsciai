import React from 'react'
import UI from "../../components/UI";
function Branduoline (){
    return (
        <UI>
        {
            <div className="container"> 
            <h1 id='header'>
                Branduolinė vidinė energija
            </h1>
            <p1>
                <h2>Branduolinės energijos formos</h2>
                <li>
                Branduolinė vidinė energija yra energetinė būsena, kuri 
                susijusi su branduolio sudėtimi ir jo komponentų, tokiais kaip kvarkai ir gluonai,
                sąveika. Ši energija yra susijusi su stipraus branduolinio sąveikos jėga, kuri veikia tarp 
                kvarkų ir gluonų.                </li>
            </p1>
            <button className='left'>
                Pradėti testą
            </button>
            <button className= 'center'>
                Pradėti testą
            </button>
            <button className= 'right'>
                Kitas testas
            </button>
        
            </div>
        }
        </UI>
    );
}
export default  Branduoline;    