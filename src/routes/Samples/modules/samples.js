import { REACT_APP_TURACO_URI } from 'config'
import { get, post, redirect } from '../../../helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SAMPLES_LIST = 'GET_SAMPLES_LIST'
export const GET_SAMPLE = 'GET_SAMPLE'

// ------------------------------------
// Actions
// ------------------------------------
function setList(data) {
  return {type: GET_SAMPLES_LIST, payload: data.samples}
}

export const getSamplesList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/samples`)
      .then((data) => dispatch(setList(data)))
  }
}

function setSingle(data) {
  return { type: GET_SAMPLE, payload: data }
}

export const getSample = (id) => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/samples/${id}`)
      .then((data) => dispatch(setSingle(data)))
  }
}

export const saveSample = (sample) => {
  debugger;
  return function(dispatch) {
    post(`${REACT_APP_TURACO_URI}v3/samples/${sample.id}`, sample)
      .then(() => dispatch(setSingle(sample)))

    redirect(`samples/{sample.id}`);
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
