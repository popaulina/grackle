import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Button, Grid, Col, Row } from 'react-bootstrap'
import ReactAudioPlayer from 'react-audio-player'
import Dropzone from 'react-dropzone'
import './Samples.scss'
import { WithContext as ReactTags } from 'react-tag-input'

var SamplesCreate = ({ sample, create, dispatch }) => (
  <Grid className="content">
    <div className="page viewText">
      <div className="title">
        Create A Sample
        <Button className="edit" onClick={() => create(sample)}> Save </Button> 
        <hr />
      </div>  
      <Row>
      <Col xs={7} className="info">
        <Row>
          <Col xs={3} className="viewLabel align-baseline"> Name: </Col>
          <Col xs={7}><Field name="name" component="input" type="text" /></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Low Label: </Col>
          <Col xs={7}><Field name="low_label" component="input" type="text" /></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> High Label: </Col>
          <Col xs={7}><Field name="high_label" component="input" type="text" /></Col>
        </Row>
        <hr className="create-hr"/>
        <Row>
          <Col xs={3} className="viewLabel"> Tags: </Col>
          <Col xs={7}>
            <ReactTags tags={sample.tags} 
                handleDelete={(tag) => 
                  dispatch(change('samplesCreate', 'tags', sample.tags.filter((x) => x !== sample.tags[tag])))}
                handleAddition={(tag) => 
                  dispatch(change('samplesCreate'), 'tags', sample.tags.push({id: sample.tags.length + 1, text: tag
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
        <Field name="file" component='input' type="hidden" />

        <Dropzone
            className={"dropZone"}
            multiple={false}
            accept='audio/*'
            onDrop={(upload) => dispatch(change('samplesCreate', 'file', upload[0]))} >
            <div>Click here to upload a file.</div>
        </Dropzone>
        <Row>Uploaded File: {sample.file ? sample.file.name : "No File Uploaded"}</Row>
        <ReactAudioPlayer
          src={sample.file ? sample.file.preview : ""}
          controls />
      </Col>
      </Row>
    </div>
  </Grid>
);

export default SamplesCreate



























