import React, { useState } from 'react'
import Profile from './profile'
import Sidebar from '../Dashboard/Sidebar'
import './profile_container.css'

function profile_container(){
    return(
        <div className="profile">
            <div className="profile_container">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="profile_div">
                    <Profile/>
                </div>
             
            </div>

        </div>
    )


}


export default profile_container