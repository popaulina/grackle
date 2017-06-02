
import { get, post, put, deleteEntity, redirect } from '../../../helpers'
import $ from 'jquery'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ORGANIZATIONS_LIST = 'GET_ORGANIZATIONS_LIST'
export const GET_ORGANIZATION = 'GET_ORGANIZATION'
export const SET_ORGANIZATION_EDITING = 'SET_ORGANIZATION_EDITING'
export const GET_ORGANIZATION_USERS = 'GET_ORGANIZATION_USERS'
export const SET_CURRENT_ORGANIZATION = 'SET_CURRENT_ORGANIZATION'
// ------------------------------------
// Actions
// ------------------------------------
export const addUser = (form, id) => {
  return function(dispatch) {
    post(`${REACT_APP_TURACO_URI}v3/organizations/${id}/user`, { email: form.email })
      .then((data) => dispatch(getOrganizationUsers(id)));
  }
}

export const setActiveOrganization = (org) => {
  return { type: SET_CURRENT_ORGANIZATION, payload: org }
}

function setList(data) {
  return {type: GET_ORGANIZATIONS_LIST, payload: data.organizations};
}

function setUsers(data) {
  return { type: GET_ORGANIZATION_USERS, payload: data.users }
}

export const getOrganizationsList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/organizations`)
      .then((data) => dispatch(setList(data)));
  }
}

export const getOrganizationUsers = (id) => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/organizations/${id}/users`)
      .then((data) => dispatch(setUsers(data)));
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
  createOrganization,
  getOrganizationUsers,
  setActiveOrganization
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
  },
  [GET_ORGANIZATION_USERS] : (state, action) => {
    return { ...state, users: action.payload };
  },
  [SET_CURRENT_ORGANIZATION] : (state, action) => {
    return { ...state, active: action.payload };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { list: [], organization: null, editing: false, users: [], active: 0 };
export default function organizationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
