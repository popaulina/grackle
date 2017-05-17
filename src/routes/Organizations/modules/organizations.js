
import { get, post, put, deleteEntity, redirect } from '../../../helpers'
import $ from 'jquery'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ORGANIZATIONS_LIST = 'GET_ORGANIZATIONS_LIST'
export const GET_ORGANIZATION = 'GET_ORGANIZATION'
export const SET_ORGANIZATION_EDITING = 'SET_ORGANIZATION_EDITING'

// ------------------------------------
// Actions
// ------------------------------------
function setList(data) {
  return {type: GET_ORGANIZATIONS_LIST, payload: data.organizations};
}

export const getOrganizationsList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/organizations`)
      .then((data) => dispatch(setList(data)));
  }
}

function setSingle(data) {
  return { type: GET_ORGANIZATION, payload: data }
}

export const getOrganization = (id) => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/organizations/${id}`)
      .then((data) => {
        dispatch(setSingle(data));
      }
    )
  }
}

export const saveOrganization = (data) => {
  return function(dispatch) {
    if ($.isEmptyObject(data)) dispatch(setOrganizationEditing());
    post(`${REACT_APP_TURACO_URI}v3/organizations/${data.id}`, data)
      .then(() => {
        dispatch(getOrganization(data.id));
        dispatch(setOrganizationEditing());
      })
  }
}

export const createOrganization = (organization) => {
  return function(dispatch) {
    put(`${REACT_APP_TURACO_URI}v3/organizations`, organization)
      .then((data) => {
        dispatch(setSingle(data));
        redirect(`/organizations/${data.id}`);
      })
  }
}

export const setOrganizationEditing = () => {
  return { type: SET_ORGANIZATION_EDITING }
}

export const actions = {
  getOrganizationsList, 
  getOrganization,
  setOrganizationEditing,
  saveOrganization,
  createOrganization
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORGANIZATIONS_LIST] : (state, action) => {
    return { ...state, list: action.payload };
  },
  [GET_ORGANIZATION] : (state, action) => {
    return { ...state, organization: action.payload };
  },
  [SET_ORGANIZATION_EDITING] : (state, action) => {
    return { ...state, editing: !state.editing };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [], organization: null, editing: false };
export default function organizationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
