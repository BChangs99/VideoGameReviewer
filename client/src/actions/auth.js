import axios from 'axios';
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types'

//Load User
export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

//Register Action
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password })

    try {
        //Try to register the user with our api
        //If its successful we'll dispatch to the auth reducer to give them the updated state (payload)
        //and the success case
        const res = await axios.post('api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {
        //If we run into an error, we'll give loop through all the errors and display them all with the setAlert action
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        //Then we'll dispatch fail case to the auth reducer
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        //Try to register the user with our api
        //If its successful we'll dispatch to the auth reducer to give them the updated state (payload)
        //and the success case
        const res = await axios.post('api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {
        //If we run into an error, we'll give loop through all the errors and display them all with the setAlert action
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        //Then we'll dispatch fail case to the auth reducer
        dispatch({
            type: LOGIN_FAIL
        })
    }
}