
import { get, post, put, deleteEntity, redirect } from '../../../helpers'
import $ from 'jquery'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_EXPERIMENTS_LIST = 'GET_EXPERIMENTS_LIST'
export const GET_EXPERIMENT = 'GET_EXPERIMENT'
export const SET_EXPERIMENT_EDITING = 'SET_EXPERIMENT_EDITING'

// ------------------------------------
// Actions
// ------------------------------------
function setList(data) {
  return {type: GET_EXPERIMENTS_LIST, payload: data.experiments};
}

export const getExperimentsList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/experiments`)
      .then((data) => dispatch(setList(data)));
  }
}

function setSingle(data) {
  return { type: GET_EXPERIMENT, payload: data }
}

export const getExperiment = (id) => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/experiments/${id}`)
      .then((data) => {
        var experiment = { 
          ...data, 
          tags: data.tags.map((x, i) => ({id: i, text: x.name})),
          sample_ids: data._links.samples.map(x => x.id) 
        };
        dispatch(setSingle(experiment));
      }
    )
  }
}

export const saveExperiment = (exp) => {
  return function(dispatch) {
    if ($.isEmptyObject(exp)) dispatch(setExperimentEditing());
    var experiment = { ...exp, tags: exp.tags.map(x => x.text).join(" ") }
    post(`${REACT_APP_TURACO_URI}v3/experiments/${experiment.id}`, experiment)
      .then((data) => {
        dispatch(getExperiment(data.id));
        dispatch(setExperimentEditing());
        redirect(`/experiments/${data.id}`)
      })
  }
}

export const createExperiment = (experiment) => {
  var experimentCopy = { ...experiment, tags: experiment.tags.map(x => x.text).join(" ") };
  return function(dispatch) {
    put(`${REACT_APP_TURACO_URI}v3/experiments`, experimentCopy)
      .then((data) => {
        dispatch(setSingle(data));
        redirect(`/experiments/${data.id}`);
      })
  }
}

export const setExperimentEditing = () => {
  return { type: SET_EXPERIMENT_EDITING }
}

export const deleteExperiment = (experiment) => {
  return function(dispatch) {
    deleteEntity(`${REACT_APP_TURACO_URI}v3/experiments/${experiment.id}`)
      .then(() => redirect('/experiments'));
  }
}

export const actions = {
  getExperimentsList, 
  getExperiment,
  setExperimentEditing,
  saveExperiment,
  createExperiment
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EXPERIMENTS_LIST] : (state, action) => {
    return { ...state, list: action.payload };
  },
  [GET_EXPERIMENT] : (state, action) => {
    return { ...state, experiment: action.payload };
  },
  [SET_EXPERIMENT_EDITING] : (state, action) => {
    return { ...state, editing: !state.editing };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [], experiment: null, editing: false };
export default function experimentsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
