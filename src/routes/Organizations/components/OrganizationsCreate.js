import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import './Organizations.scss'
import { WithContext as ReactTags } from 'react-tag-input';

var OrganizationsCreate = ({ organization, create, dispatch }) => (
  <Grid className="content">
    <div className="page viewText">
      <div className="title">
        Create An Organization
        <Button className="edit" onClick={() => create(organization)}> Save </Button> 
        <hr />
      </div>  
      <Row>
      <Col className="info">
        <Row>
          <Col xs={3} className="viewLabel align-baseline"> Name: </Col>
          <Col xs={7}><Field name="name" component="input" type="text" /></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Tags: </Col>
          <Col xs={7}>
            <ReactTags tags={organization.tags} 
                handleDelete={(tag) => 
                  dispatch(change('organizationsCreate', 'tags', organization.tags.filter((x) => x !== organization.tags[tag])))}
                handleAddition={(tag) => 
                  dispatch(change('organizationsCreate'), 'tags', organization.tags.push({id: organization.tags.length + 1, text: tag
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
      </Col>
      </Row>
    </div>
  </Grid>
);

export default OrganizationsCreate



























