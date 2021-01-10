import React, { useState } from 'react'
import './style.scss'
import NbaImage from '../../Assets/Svg/nba.svg'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth'
import { Redirect } from 'react-router-dom';

function Login({ login, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const { email, password } = formData;

    const onSubmit = e => {
        e.preventDefault();
        login(email, password)
    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="dashboard" />
    }

    return (
        <div>
            <div className="base-container" >
                < div className="content" >
                    <div className="image">
                        <img src={NbaImage} />
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        autoComplete="email"
                                        name="email"
                                        onChange={e => onChange(e)}
                                        placeholder="email"
                                        type="text"
                                        value={email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        autoComplete="password"
                                        name="password"
                                        onChange={e => onChange(e)}
                                        placeholder="password"
                                        type="password"
                                        value={password}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button type="submit" className="btn">Login</button>
                        </div>
                    </form>
                </div >
            </div >

        </div >
    )

}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
