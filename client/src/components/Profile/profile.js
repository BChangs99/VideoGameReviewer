import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile'
import PropTypes from 'prop-types'
import './profile.css'

function Profile({ createProfile }) {
    const [formData, setFormData] = useState({
        bio: '',
        status: '',
        location: ''
    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        createProfile(formData)
    }

    const { location, status, bio } = formData

    return (
        <div className="profile_base_container">
            <div className="profile_form">
                <Form onSubmit={e => onSubmit(e)}>
                    <h1>Profile</h1>
                    <Form.Group >
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            name="bio"
                            placeholder="Bio"
                            value={bio}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            name="status"
                            placeholder="Status"
                            value={status}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            name="location"
                            placeholder="Location"
                            value={location}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <div >
                        <button type="submit">Create/Update</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

Profile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(Profile)

