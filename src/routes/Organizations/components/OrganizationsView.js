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
        <Button onClick={() => deleteOrganization(organization)}> Delete </Button>
        <Button className="edit" onClick={() => setEditing()}> {editing ? "Cancel" : "Edit"}</Button>
        {editing ? <Button className="edit" onClick={() => save(editedOrganization)}> Save </Button> : ""}
        <hr />
      </div>  
      <Row>
        <Col xs={3} className="viewLabel"> Tags: </Col>
        <Col xs={7} className="viewLabel verticalLine">
          <ReactTags tags={organization ? organization.tags : []} readOnly={!editing}
              handleDelete={(tag) => {
                dispatch(change('OrganizationsEdit', 'tags', organization.tags.filter((x) => x !== organization.tags[tag])))}
              }
              handleAddition={(tag) => 
                dispatch(change('OrganizationsEdit'), 'tags', organization.tags.push({id: organization.tags.length + 1, text: tag
              }))} 
              classNames={{
                tags: 'tags',
                tagInput: 'tagInput',
                tagInputField: 'tagInputField',
                selected: 'tagsSelected',
                tag: 'tagSingle',
                remove: 'tagRemove'
              }}/>
        </Col>
      </Row>
    </div>
  </Grid>
);

export default OrganizationsView