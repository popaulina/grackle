import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import ReactAudioPlayer from 'react-audio-player'
import './Samples.scss'
import { WithContext as ReactTags } from 'react-tag-input';

//todo: loading, reset on cancel
var SamplesView = ({ sample, editing, setEditing, deleteSample, save, editedSample, dispatch }) => (
  <Grid className="content">
    <div className="page viewText">
      <div className="title">
        Sample:  
        { editing ? 
              <Field name="name" component="input" type="text"/> :
              <span className="entityName">{sample ? sample.name : ""}</span>
        }
        <Button className="edit btn btn-danger" onClick={() => deleteSample(sample)}> Delete </Button>
        <Button className="edit" onClick={() => setEditing()}> {editing ? "Cancel" : "Edit"}</Button>
        {editing ? <Button className="edit" onClick={() => save(editedSample)}> Save </Button> : ""}
        <hr />
      </div>  
      <Row>
      <Col xs={7} className="info">
        <Row>
          <Col xs={3} className="viewLabel"> High Label: </Col>
          <Col xs={7} className="rightViewLabel verticalLine"> {sample ? sample.high_label : ""} </Col>
        </Row>
        <hr className="info-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Low Label: </Col>
          <Col xs={7} className="rightViewLabel verticalLine"> {sample ? sample.low_label : ""} </Col>
        </Row>
        <hr className="info-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Hypothesis: </Col>
          <Col xs={7} className="rightViewLabel verticalLine"> {sample && sample.hypothesis && sample.hypothesis !== "" ? sample.hypothesis : "none, yet!"} </Col>
        </Row>
        <hr className="info-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Tags: </Col>
          <Col xs={7} className="rightViewLabel verticalLine">
            <ReactTags tags={editedSample ? editedSample.tags : []} readOnly={!editing}
                handleDelete={(tag) => {
                  dispatch(change('samplesView', 'tags', editedSample.tags.filter((x) => x !== editedSample.tags[tag])))}
                }
                handleAddition={(tag) => 
                  dispatch(change('samplesView'), 'tags', editedSample.tags.push({id: editedSample.tags.length + 1, text: tag
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
      <Col xs={4} className="audio">
        <Row>Uploaded Audio: </Row>
        <ReactAudioPlayer
          src={sample ? sample.private_url : ""}
          controls
        />
      </Col>
      </Row>
    </div>
  </Grid>
);

export default SamplesView