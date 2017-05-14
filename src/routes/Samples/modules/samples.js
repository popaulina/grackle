import { REACT_APP_TURACO_URI } from 'config'
import { get, post, redirect } from '../../../helpers'
import $ from 'jquery'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SAMPLES_LIST = 'GET_SAMPLES_LIST'
export const GET_SAMPLE = 'GET_SAMPLE'
export const SET_SAMPLE_EDITING = 'SET_SAMPLE_EDITING'

// ------------------------------------
// Actions
// ------------------------------------
function setList(data) {
  return {type: GET_SAMPLES_LIST, payload: data.samples};
}

export const getSamplesList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/samples`)
      .then((data) => dispatch(setList(data)));
  }
}

function setSingle(data) {
  return { type: GET_SAMPLE, payload: data }
}

export const getSample = (id) => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/samples/${id}`)
      .then((data) => {
        var sample = data;
        sample.tags = sample.tags.join(', ');
        dispatch(setSingle(sample));
      }
    )
  }
}

export const saveSample = (sample) => {
  return function(dispatch) {
    if ($.isEmptyObject(sample)) dispatch(setSampleEditing());
    post(`${REACT_APP_TURACO_URI}v3/samples/${sample.id}`, sample)
      .then(() => {
        dispatch(getSample(sample.id));
        dispatch(setSampleEditing());
      })
  }
}

export const setSampleEditing = () => {
  return { type: SET_SAMPLE_EDITING }
}

export const actions = {
  getSamplesList, 
  getSample,
  setSampleEditing,
  saveSample
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
  },
  [SET_SAMPLE_EDITING] : (state, action) => {
    return { ...state, editing: !state.editing };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [], sample: null, editing: false };
export default function samplesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
