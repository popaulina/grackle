
import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import ReactAudioPlayer from 'react-audio-player'
import Dropzone from 'react-dropzone'
import './Experiments.scss'
import { WithContext as ReactTags } from 'react-tag-input';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { updateSelected } from '../../../helpers'

var ExperimentsCreate = ({ experiment, create, dispatch, samples }) => (
  <Grid className="content">
    <div className="page viewText">
      <div className="title">
        Create An Experiment
        <Button className="edit" onClick={() => create(experiment)}> Save </Button> 
        <hr />
      </div>  
      <Col className="info">
        <Row>
          <Col xs={3} className="viewLabel align-baseline"> Name: </Col>
          <Col xs={7}><Field name="name" component="input" type="text" /></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Repeats: </Col>
          <Col xs={7}><Field name="repeats" component="input" type="number" /></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Active: </Col>
          <Col xs={7}><Field name="active" component="input" type="checkbox" className="css-checkbox"/></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Tags: </Col>
          <Col xs={7}>
            <ReactTags tags={experiment.tags} 
                handleDelete={(tag) => 
                  dispatch(change('experimentsCreate', 'tags', experiment.tags.filter((x) => x !== experiment.tags[tag])))}
                handleAddition={(tag) => 
                  dispatch(change('experimentsCreate'), 'tags', experiment.tags.push({id: experiment.tags.length + 1, text: tag
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
      <hr className="create-hr" />
      <Col xs={3}> Samples: </Col>
      <BootstrapTable 
          data={samples} 
          selectRow={{
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: (row, selected) => 
              dispatch(change('experimentsCreate', 'sample_ids', updateSelected(experiment.sample_ids, row, selected)))
          }}
          striped 
          hover 
          pagination >
        <TableHeaderColumn dataField="id" isKey={true} hidden />
        <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
      </BootstrapTable>
    </div>
  </Grid>
);

export default ExperimentsCreate



























