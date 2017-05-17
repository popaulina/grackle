import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import ReactAudioPlayer from 'react-audio-player'
import './Experiments.scss'
import { WithContext as ReactTags } from 'react-tag-input';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { updateSelected } from '../../../helpers'

//todo: loading, reset on cancel
var ExperimentsView = ({ experiment, editing, setEditing, deleteExperiment, save, editedExperiment, dispatch, samples }) => (
  <Grid className="content">
    <div className="page viewText">
      <div className="title">
        Experiment:  
        { editing ? 
              <Field name="name" component="input" type="text"/> :
              <span className="entityName">{experiment ? experiment.name : ""}</span>
        }
        <Button onClick={() => deleteExperiment(experiment)}> Delete </Button>
        <Button className="edit" onClick={() => setEditing()}> {editing ? "Cancel" : "Edit"}</Button>
        {editing ? <Button className="edit" onClick={() => save(editedExperiment)}> Save </Button> : ""}
        <hr />
      </div>  
      <Row>
      <Col className="info">
        <Row>
          <Col xs={3} className="viewLabel"> Repeats: </Col>
          <Col xs={7} className="viewLabelRight">
          { editing ? 
              <Field name="repeats" component="input" type="number"/> :
              <span>{experiment ? experiment.repeats : ""} </span>
          }
          </Col>
        </Row>
        <hr className="info-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Active: </Col>
          <Col xs={7} className="viewLabelRight"> 
            <Field name="active" component="input" type="checkbox" disabled={!editing} className="css-checkbox"/>
          </Col>
        </Row>
        <hr className="info-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Tags: </Col>
          <Col xs={7} className="viewLabelRight">
            <ReactTags tags={editedExperiment ? editedExperiment.tags : []} readOnly={!editing}
                handleDelete={(tag) => {
                  dispatch(change('experimentsView', 'tags', editedExperiment.tags.filter((x) => x !== editedExperiment.tags[tag])))}
                }
                handleAddition={(tag) => 
                  dispatch(change('experimentsView'), 'tags', editedExperiment.tags.push({id: editedExperiment.tags.length + 1, text: tag
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
        <hr className="create-hr" />
        <div className="sample-list">
          <Col xs={3}> Samples: </Col>
          { editing ?
            <BootstrapTable 
                data={samples} 
                selectRow={{
                  mode: 'checkbox',
                  clickToSelect: true,
                  selected: editedExperiment.sample_ids,
                  onSelect: (row, selected) => 
                    dispatch(change('experimentsView', 'sample_ids', updateSelected(editedExperiment.sample_ids, row, selected)))
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
      </Col>
      </Row>
    </div>
  </Grid>
);

export default ExperimentsView