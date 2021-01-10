import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert'
import { register } from '../../../actions/auth'
import NbaImage from '../../../Assets/Svg/nba.svg'
import './style.scss'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

function Register({ setAlert, register, isAuthenticated }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        register({ name, email, password })
    }

    const { name, email, password } = formData;

    //Redirect if authenticated
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div>
            <div className="base-container" >
                <div className="content">
                    <div className="image">
                        <img src={NbaImage} />
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="name">name</label>
                                    <input
                                        value={name}
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        autoComplete="name"
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        value={email}
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        autoComplete="email"
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        value={password}
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        autoComplete="new-password"
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button type="submit" className="btn">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
