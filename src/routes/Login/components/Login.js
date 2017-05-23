import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-bootstrap';

import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

import { browserHistory } from 'react-router'


import './Login.scss'

//using turaco for oauth, we need to hit an endpoint to load the login page and authorize the application
//turaco requires paramaters of client_id, response_type, and redirect_uri 
const loginRedirect = 
  REACT_APP_TURACO_URI + 'oauth/authorize?' + 
    $.param({
      client_id: REACT_APP_UID,
      response_type: 'code',
      redirect_uri: window.location.origin + '/login'
    });

function getCode() {
  var url = window.location.href;
  url = url.split("code=");
  if (url.length === 1) return null; // this means we've yet to receive a code and want to log in
  return url[1]; // code for authentication
};

var Login = React.createClass({
  componentWillMount() {
    if (JSON.parse(localStorage.getItem('user'))) browserHistory.push('/');
    if (getCode() !== null) {
      this.props.logIn(getCode())
      browserHistory.push('/');
    }
  },
  redirect() {
    window.location.replace(loginRedirect);
  },
  render: function () {
    return (
      <Grid className="login-page">
        <Row>
          <Col className={"col-md-offset-4 col-md-4"}>
            <div className="form-login">
              <div className="login-lock">
                <Avatar backgroundColor={'#006775'} icon={<LockIcon />} size={60} />
              </div>
              <h4>Welcome to Talk Birdy.</h4>
              <div className="wrapper">
                <span className="group-btn"> 
                    <RaisedButton
                        type="submit"
                        primary
                        label={'Sign In'}
                        fullWidth
                        onClick={this.redirect}
                    />
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});


export default Login;