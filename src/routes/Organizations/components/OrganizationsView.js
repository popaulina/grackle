import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import './Organizations.scss'
import { WithContext as ReactTags } from 'react-tag-input'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
const AddUserForm = require('../containers/AddUserFormContainer').default

//todo: loading, reset on cancel
var OrganizationsView = ({ organization, editing, setEditing, deleteOrganization, save, editedOrganization, dispatch, samples, users }) => {
  console.log(users)
  return(
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
      <div className="sample-list">
          <Col xs={3}> Users: </Col> <AddUserForm />
            <BootstrapTable 
                data={users} 
                striped 
                hover 
                pagination >
              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
              <TableHeaderColumn dataField="email" isKey={true} dataSort={true}>Email</TableHeaderColumn>
            </BootstrapTable>
        </div> 
    </div>
  </Grid>
)};

export default OrganizationsView