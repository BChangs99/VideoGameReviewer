import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Sidebar from '../Dashboard/Sidebar'
import './Dashboard_container.css'



function Dashboard_container(){

    return(
        <div className="Dashboard">
            <div className="Dashboard_container">

                <div className="sidebar">
                    <Sidebar/>
                </div>

                <div className="Dashboard_div">
                <Dashboard/>
                </div>

        </div>
        </div>
    )

}


export default Dashboard_container