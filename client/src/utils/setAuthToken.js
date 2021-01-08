import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        //Set global headers
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token', token);
    }
}

export default setAuthToken;