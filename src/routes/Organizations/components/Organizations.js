import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-bootstrap';
import ListView from '../../../components/ListView';

import './Organizations.scss'

var Organizations = ({ organizations }) => (
  <Grid className="page">
    <ListView entityName={"Organizations"} entities={organizations} columns={{"name" : "Name"}}/>
  </Grid>
);

export default Organizations;