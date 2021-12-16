import React from 'react';
import './Navlink.css';

export default function Navlinks({data}) {
    
    return (
        <a href={data.path} style={{textDecoration: "none"}}>
        <div className="nav_contents">
           <data.icon/>
           <p>
               {data.refName}
           </p>
        </div>
        </a>
    )
}
