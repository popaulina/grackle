import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-bootstrap';
import ListView from '../../../components/ListView';

import './Experiments.scss'

var Experiments = ({ experiments }) => (
  <Grid className="page">
    <ListView entityName={"Experiments"} entities={experiments} columns={{"name" : "Name"}}/>
  </Grid>
);

export default Experiments;