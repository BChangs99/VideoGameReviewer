import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, GET_PROFILES } from '../actions/types'

//profile could be our own profile, or another users profile if we click on their account
//profiles is a list of profiles
const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                error: payload,
                loading: false

            }
        default:
            return state;
    }
}