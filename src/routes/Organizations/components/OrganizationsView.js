import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import './Organizations.scss'
import { WithContext as ReactTags } from 'react-tag-input';

//todo: loading, reset on cancel
var OrganizationsView = ({ organization, editing, setEditing, deleteOrganization, save, editedOrganization, dispatch }) => (
  <Grid className="content">
    <div className="page viewText">
      <div className="title">
        Organization:  
        { editing ? 
              <Field name="name" component="input" type="text"/> :
              <span className="entityName">{organization ? organization.name : ""}</span>
        }
        <Button className="edit" onClick={() => setEditing()}> {editing ? "Cancel" : "Edit"}</Button>
        {editing ? <Button className="edit" onClick={() => save(editedOrganization)}> Save </Button> : ""}
        <hr />
      </div>  
    </div>
  </Grid>
);

export default OrganizationsView