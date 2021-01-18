import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

//This PrivateRoute will just check for authentication before redirecting to login or to the actual component
//This PrivateRoute file is pretty common, sort of like a template

//...rest will just take in anything else that is passed in
//auth: { isAuthenticaed, loading } is just destructuring
const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            (!isAuthenticated && !loading)
                ? (<Redirect to="/login" />)
                : (<Component {...props} />)
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
