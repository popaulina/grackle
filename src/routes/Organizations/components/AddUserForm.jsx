import React from 'react';
import { connect } from 'react-redux'
import { Field, change, reduxForm } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import { addUser } from '../modules/organizations'

var AddUserForm = ({ email, id, addUser }) => (
	<div>
		<Field name="email" component="input" type="text"/> 
        <Button onClick={() => addUser(email, id)}>Add User</Button>
	</div>
);

export default AddUserForm