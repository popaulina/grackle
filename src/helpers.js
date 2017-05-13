import { browserHistory } from 'react-router'
import $ from 'jquery';

export const redirect = (eventKey) => { 
  if (!JSON.parse(localStorage.getItem('user')) && eventKey !== "login") {
    browserHistory.push('login');
    return;
  }
  browserHistory.push(eventKey)
}

export const requireAuth = (nextState, replace) => {
  if (!JSON.parse(localStorage.getItem('user')) && window.location.pathname !== "/login") {
    replace({
      pathname: '/login'
    })
  }
}

export const get = (url) => {
  return $.get({
      url: url,
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", localStorage.token);
      }
    })
}

export const post = (url, data) => {
  return $.post({
      url: url,
      data: data,
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", localStorage.token);
      }
    })
}