import React from 'react'
import UI from "../../../components/UI";
function Pres()
{
    return (
        <UI>
        {
             <div className="container"> 
             <h1>
                Present simple
             </h1>

             <p1>
            <li> We use the present simple to talk about:

something that is true in the present:
I'm nineteen years old.
I'm a student.
He lives in London.

something that happens regularly in the present:
I play football every weekend.</li>

something that is always true:
The human body contains 206 bones.
<li>Light travels at almost 300,000 kilometres per second.

We often use adverbs of frequency like sometimes, always and never with the present simple:

I sometimes go to the cinema.
She never plays football.</li>
                
             </p1>
             <button className='first_btn'>Bandomasis testas</button>
             <button className='next_btn'>Mokytojo paskirti testai</button>


             </div>

        }
        </UI>
    );

}
export default  Pres;     