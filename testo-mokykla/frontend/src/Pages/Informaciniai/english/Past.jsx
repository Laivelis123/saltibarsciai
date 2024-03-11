import React from 'react'
import UI from "../../../components/UI";
function Past()
{
    return (
        <UI>
        {
             <div className="container"> 
             <h1>
                Past simple 
             </h1>

             <p1>
            <li> We use the past tense to talk about:

something that happened once in the past:
I met my wife in 1983.
We went to Spain for our holidays.
They got home very late last night.</li>

<li>something that happened several times in the past:
When I was a boy, I walked a mile to school every day.
We swam a lot while we were on holiday.
They always enjoyed visiting their friends.</li>

something that was true for some time in the past:
I lived abroad for ten years.
He enjoyed being a student.
She played a lot of tennis when she was younger.

<li>we often use expressions with ago with the past simple:
I met my wife a long time ago.</li>
             
                
             </p1>
             <button className='first_btn'>Bandomasis testas</button>
             <button className='next_btn'>Mokytojo paskirti testai</button>


             </div>

        }
        </UI>
    );

}
export default  Past;     