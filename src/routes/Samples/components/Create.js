import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-bootstrap'

import './Samples.scss'

var SamplesView = ({ sample }) => (
  <div className="content">
    <div className="page">
      <div>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="lowLabel">Low Label</label>
        <Field name="lowLabel" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="highLabel">High Label</label>
        <Field name="highLabel" component="input" type="text"/>
      </div>
    </form>
    <Button onClick={handleSubmit} className="submit">Submit</Button>
    </div>
  </div>
);

export default SamplesView