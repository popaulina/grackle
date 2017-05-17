import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import './Organizations.scss'
import { WithContext as ReactTags } from 'react-tag-input'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

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
      <div className="sample-list">
          <Col xs={3}> Users: </Col>
            <BootstrapTable 
                data={[]} 
                striped 
                hover 
                pagination >
              <TableHeaderColumn dataField="id" isKey={true} hidden />
              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort={true}>Email</TableHeaderColumn>
            </BootstrapTable>
        </div> 
        <hr className="create-hr" />
        <div className="sample-list">
          <Col xs={3}> Samples: </Col>
          { editing ?
            <BootstrapTable 
                data={samples} 
                selectRow={{
                  mode: 'checkbox',
                  clickToSelect: true,
                  selected: editedOrganization.sample_ids,
                  onSelect: (row, selected) => 
                    dispatch(change('organizationsView', 'sample_ids', updateSelected(editedOrganization.sample_ids, row, selected)))
                }}
                striped 
                hover 
                pagination >
              <TableHeaderColumn dataField="id" isKey={true} hidden />
              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
            </BootstrapTable> :
            <BootstrapTable 
                data={samples} 
                striped 
                hover 
                pagination >
              <TableHeaderColumn dataField="id" isKey={true} hidden />
              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
            </BootstrapTable>
          }
        </div> 
    </div>
  </Grid>
);

export default OrganizationsView