import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILES,
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types'


//*** We have clear_profiles in so many places, b/c we use the same profile state object in the app everytime we want to access a single profile
//Whenever we want to load another users profile, we need to clear the profile that was loaded in beforehand
//If we dont want to use the profile object, theres no point keeping in state, so we cleared it also in getallProfiles

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        //Theres a possibility when a guest is browsing someone's profile,
        // and then creates an account, then the guest has access tot hat user's profile still
        //To get around this, we added clear_profile here
        dispatch({ type: CLEAR_PROFILE })
        //err.response.status is the 400 or 500 code
        //statusText is the message

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get(`/api/profile/USER/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Create/Update a profile
//formData is the data that the user enters to update their profile
//history is a React Router object that lets us redirect the user
//edit param is for checking if they are editing their profile, or creating one for the first time
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        //If we are creating a profile for the first time, after we're done we will redirect user to the dashboard
        //Commented out for now b/c dashboard component not created
        // if (!edit) {
        //     history.push('dashboard')
        // }
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Delete account and profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone')) {
        try {
            const res = await axios.delete('/api/profile');
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })

            dispatch(setAlert('Your account has been deleted permanently'))
        } catch (err) {

        }
    }
}