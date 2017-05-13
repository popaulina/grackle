import $ from 'jquery';
import { REACT_APP_TURACO_URI } from 'config'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SAMPLES_LIST = 'GET_SAMPLES_LIST'

// ------------------------------------
// Actions
// ------------------------------------
function getList(data) {
  return {type: GET_SAMPLES_LIST, payload: data.samples}
}

export const getSamplesList = (dispatch) => {
  return function(dispatch) {
    $.get({
      url: REACT_APP_TURACO_URI + 'v3/samples',
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", localStorage.token);
      }
    }).then((data) => {
      dispatch(getList(data));
    })
  }
}


export const actions = {
  getSamplesList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SAMPLES_LIST] : (state, action) => {
    return { list: action.payload };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [] };
export default function samplesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
