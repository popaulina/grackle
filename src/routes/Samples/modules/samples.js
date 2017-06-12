
import { get, post, put, deleteEntity, redirect } from '../../../helpers'
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

export const getSamplesList = (org) => {
  return function(dispatch) {
    org 
    ? get(`${REACT_APP_TURACO_URI}v3/organizations/${org}/samples`)
        .then((data) => dispatch(setList(data)))
    : get(`${REACT_APP_TURACO_URI}v3/samples`)
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
        var sample = { ...data, tags: data.tags.map((x, i) => ({id: i, text: x.name})) };
        dispatch(setSingle(sample));
      }
    )
  }
}

export const saveSample = (data) => {
  return function(dispatch) {
    if ($.isEmptyObject(data)) dispatch(setSampleEditing());
    var sample = { ...data, tags: data.tags.map(x => x.text).join(" ") };
    post(`${REACT_APP_TURACO_URI}v3/samples/${sample.id}`, sample)
      .then(() => {
        dispatch(getSample(sample.id));
        dispatch(setSampleEditing());
      })
  }
}

export const createSample = (sample) => {
  return function(dispatch) {
    var formData = new FormData();
    formData.append("name", sample.name);
    formData.append("high_label", sample.high_label);
    formData.append("low_label", sample.low_label);
    formData.append("file", sample.file);
    formData.append("tags", sample.tags.map(x => x.text).join(" "))
    put(`${REACT_APP_TURACO_URI}v3/samples`, formData)
      .then((data) => {
        dispatch(setSingle(data));
        redirect(`/samples/${data.id}`);
      })
  }
}

export const setSampleEditing = () => {
  return { type: SET_SAMPLE_EDITING }
}

export const deleteSample = (sample) => {
  return function(dispatch) {
    deleteEntity(`${REACT_APP_TURACO_URI}v3/samples/${sample.id}`)
      .then(() => redirect('/samples'));
  }
}

export const actions = {
  getSamplesList, 
  getSample,
  setSampleEditing,
  saveSample,
  createSample
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
