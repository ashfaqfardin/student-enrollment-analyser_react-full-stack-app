import React from 'react';
import './Sidebar.css';
import { BsFillBarChartFill } from 'react-icons/bs';
import Navlinks from '../navlinks/Navlinks';
import navData from '../../utilities/nav-data/NavData'

export default function Sidebar() {
    return (
        <div className="sidebar_container">
            <div className="sidebarContent_container">
            <div className="logo_box">
                <h1 className="logoText_color">SEAS</h1>
            </div>
            <div className="dashB_btn">
                <BsFillBarChartFill style={{color:"#0840da",marginRight:"5px"}} />
                <h3 className="logoText_color">
                    Dashboard
                </h3>
            </div>
            <div className="nav_container">
                {
                    navData.map(data => <Navlinks key={data.index} data={data} ></Navlinks>)
                }
            </div>
        </div>
        </div>
        
    )
}
