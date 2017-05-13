import $ from 'jquery';
import { REACT_APP_TURACO_URI, REACT_APP_UID, REACT_APP_SECRET } from 'config'

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN = 'LOG_IN'

// ------------------------------------
// Actions
// ------------------------------------
function authenticate(data) {
  return { type: LOG_IN, payload: data }
}

function getUser(data, dispatch) {
  $.get({
    url: REACT_APP_TURACO_URI + 'v3/users/self',
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", localStorage.token);
    }
  }).then((data) => {
    dispatch(authenticate(data))
  })
}

export const logIn = (code) => {
  return function(dispatch) {  
    $.ajax({
      url: REACT_APP_TURACO_URI + 'oauth/token',
      type: 'post',
      data: {
        client_id: REACT_APP_UID,
        client_secret: REACT_APP_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: window.location.origin + '/login'
      }
    }).then((data) => { 
      localStorage.setItem('token', 'Bearer ' + data.access_token);
      getUser(data, dispatch);
    })
  }
}

export const actions = {
  logIn
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_IN] : (state, action) => { 
    return { user: action.payload }  
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { user: null };
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
