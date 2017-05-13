import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';

var SamplesEdit = ({ sample, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
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
    <button type="submit">Submit</button>
  </form>
);

export default reduxForm({ form: 'sampleForm' })(SamplesEdit)