import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-bootstrap';
import ListView from '../../../components/ListView';

import './Samples.scss'

var Samples = ({ samples }) => (
  <Grid className="page">
    <ListView entityName={"Samples"} entities={samples} columns={{"name" : "Name"}}/>
  </Grid>
);

export default Samples;