import { REACT_APP_TURACO_URI } from 'config'
import { get } from '../../../helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SAMPLES_LIST = 'GET_SAMPLES_LIST'
export const GET_SAMPLE = 'GET_SAMPLE'

// ------------------------------------
// Actions
// ------------------------------------
function getList(data) {
  return {type: GET_SAMPLES_LIST, payload: data.samples}
}

export const getSamplesList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/samples`)
      .then((data) => dispatch(getList(data)))
  }
}

function getSingle(data) {
  return { type: GET_SAMPLE, payload: data }
}

export const getSample = (id) => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/samples/${id}`)
      .then((data) => dispatch(getSingle(data)))
  }
}

export const actions = {
  getSamplesList, 
  getSample
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SAMPLES_LIST] : (state, action) => {
    return { ...state, list: action.payload };
  },
  [GET_SAMPLE] : (state, action) => {
    return { ...state, sample: action.payload };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [], sample: null };
export default function samplesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
