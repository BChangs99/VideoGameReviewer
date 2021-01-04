import React from 'react'
import NbaImage from '../../Assets/Svg/nba.svg'
import './style.scss'

function Register(props) {
   
        return (
            <div>
                <div className="base-container" >
                <div className="content">
                    <div className="image">
                        <img src={NbaImage} />
                    </div>
                    <div className="form">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" placeholder="username"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="email"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="password"></input>
                            </div>
                        </div>
                    </div>

                <div className="footer">
                    <button type="submit" className="btn">Login</button>
                </div>

                </div>
                </div>
                
            </div>
        )
    
}

export default Register
