import { browserHistory } from 'react-router'
import {action as toggleMenu} from 'redux-burger-menu';
import $ from 'jquery';

export const redirect = (eventKey, dispatch) => { 
  if (!JSON.parse(localStorage.getItem('user')) && eventKey !== "login") {
    browserHistory.push('login');
    return;
  }
  if (dispatch) dispatch(toggleMenu(false));
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

export const put = (url, data) => {
  return url.includes("sample") ?
    $.ajax({
      method: 'put',
      url: url,
      processData: false,
      contentType: false,
      data: data,
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", localStorage.token);
      }
    }) :
    $.ajax({
      method: 'put',
      url: url,
      data: data,
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", localStorage.token);
      }
    })
}

export const deleteEntity = (url) => {
  return $.ajax({
    method: 'delete',
    url: url,
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", localStorage.token);
    }
  })
}

export const updateSelected = (arr, row, selected) => {
  var newArray = arr.slice();
  if (selected) {
    newArray.push(row.id);
    return newArray;
  }
  else {
    newArray.splice(arr.indexOf(row.id), 1);
    return newArray;
  }
}