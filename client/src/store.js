import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

//Store subscription listener for tracking when token changes -> Whenever the token changes, we will immediately call setAuthToken
// which will authenticate/deauthenticate the user

let currentState = store.getState();

store.subscribe(() => {
    //Save previous state for comparison
    let previousState = currentState;
    currentState = store.getState();

    //If the token changes, call setAuthtoken to update localStorage and set axios headers
    if (previousState.auth.token !== currentState.auth.token) {
        const token = currentState.auth.token
        setAuthToken(token)
    }
})

export default store