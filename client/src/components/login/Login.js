import React from 'react'
import './style.scss'
import NbaImage from '../../Assets/Svg/nba.svg'

function Login(props) {
   
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
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="passwrod"></input>
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

export default Login;
