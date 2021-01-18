import React from 'react'
import Profile from './Profile'
import Sidebar from '../Dashboard/Sidebar'
import './profile_container.css'

function Profile_Container() {
    return (
        <div className="profile">
            <div className="profile_container">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="profile_div">
                    <Profile />
                </div>
            </div>
        </div>
    )
}


export default Profile_Container