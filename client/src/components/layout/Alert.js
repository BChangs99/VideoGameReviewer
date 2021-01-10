import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap'


const Alert= ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
        console.log(alert.alertType)    

        switch(alert.alertType){
            case 'danger': 
                return  <Button key={alert.id} variant='danger'> {alert.msg} </Button>
            case 'notice':
                return  <Button key={alert.id} variant='info'> {alert.msg} </Button>
            case 'success':
                return  <Button key={alert.id} variant='success'> {alert.msg} </Button>
            case 'warning':
                return  <Button key={alert.id} variant='warning'> {alert.msg} </Button>
            default:
                return <div></div>;
        }

    }
)

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
