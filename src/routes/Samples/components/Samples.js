import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-bootstrap';
import ListView from '../../../components/ListView';

import './Samples.scss'

var Samples = React.createClass({
  componentWillMount() {
    this.props.getSamplesList();
  },
  render: function () {
  	return (
	  <Grid className="page">
	    <ListView entityName={"Samples"} entities={this.props.samples} columns={{"name" : "Name"}}/>
	  </Grid>
	)
  }
});

export default Samples;