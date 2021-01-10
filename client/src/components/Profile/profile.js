import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import './profile.css'

function profile(){


    return (
   
        <div className="profile_base_container">
          
            <div className="profile_form">
            <Form>
                <h1>Profile</h1>
                <Form.Group >
                    <Form.Label>User</Form.Label>
                    <Form.Control type="email" placeholder="User" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Status</Form.Label>
                    <Form.Control  placeholder="Status" />
                </Form.Group>


                <Form.Group >
                    <Form.Label>Bio</Form.Label>
                    <Form.Control  placeholder="Bio" />
                </Form.Group>


                <Form.Group >
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Location" />
                </Form.Group>


                <Form.Group >
                    <Form.Label>Date</Form.Label>
                    <Form.Control  placeholder="Date" />
                </Form.Group>

                </Form>

            </div>
        </div>




    )



}

export default profile

