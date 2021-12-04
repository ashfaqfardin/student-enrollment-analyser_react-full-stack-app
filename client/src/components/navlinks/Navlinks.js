import React from 'react';
import './Navlink.css';

export default function Navlinks({data}) {
    return (
        <div className="nav_contents">
           <data.icon/>
           <p>
               {data.refName}
           </p>
        </div>
    )
}
