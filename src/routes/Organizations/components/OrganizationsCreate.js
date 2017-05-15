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
      </Col>
      </Row>
    </div>
  </Grid>
);

export default OrganizationsCreate



























