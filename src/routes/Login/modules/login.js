import { REACT_APP_TURACO_URI, REACT_APP_UID, REACT_APP_SECRET } from 'config'
import { browserHistory } from 'react-router'
import { get, post } from '../../../helpers'
import $ from 'jquery'
// ------------------------------------
// Constants
// ------------------------------------
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

// ------------------------------------
// Actions
// ------------------------------------
function authenticate(data) {
  return { type: LOG_IN, payload: data }
}

function getUser(data, dispatch) {
  get(`{REACT_APP_TURACO_URI}v3/users/self`)
    .then((data) => {
      dispatch(authenticate(data))
    })
}

export const logIn = (code) => {
  return function(dispatch) {  
    post(`${REACT_APP_TURACO_URI}oauth/token`,
      {
        client_id: REACT_APP_UID,
        client_secret: REACT_APP_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: window.location.origin + '/login'
      })
    .then((data) => { 
      localStorage.setItem('token', 'Bearer ' + data.access_token);
      getUser(data, dispatch);
    })
  }
}

function resetUser() {
  return { type: LOG_OUT }
}

export const logOut = () => {
  return function(dispatch) {
    dispatch(resetUser());
    browserHistory.push('login');
  }
}

export const actions = {
  logIn,
  logOut
}

const initialState = { user: null };
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_IN] : (state, action) => { 
    return { user: action.payload }  
  },
  [LOG_OUT] : (state, action) => {
    return initialState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
