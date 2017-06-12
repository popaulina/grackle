
import { get, post, put, deleteEntity, redirect } from '../../../helpers'
import $ from 'jquery'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ORGANIZATION = 'GET_ORGANIZATION'
export const SET_ORGANIZATION_EDITING = 'SET_ORGANIZATION_EDITING'
export const GET_ORGANIZATION_USERS = 'GET_ORGANIZATION_USERS'
// ------------------------------------
// Actions
// ------------------------------------
export const addUser = (form, id) => {
  return function(dispatch) {
    post(`${REACT_APP_TURACO_URI}v3/organizations/${id}/user`, { email: form.email })
      .then((data) => dispatch(getOrganizationUsers(id)));
  }
}

function setUsers(data) {
  return { type: GET_ORGANIZATION_USERS, payload: data.users }
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
  getOrganization,
  setOrganizationEditing,
  saveOrganization,
  createOrganization,
  getOrganizationUsers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORGANIZATION] : (state, action) => {
    return { ...state, organization: action.payload };
  },
  [SET_ORGANIZATION_EDITING] : (state, action) => {
    return { ...state, editing: !state.editing };
  },
  [GET_ORGANIZATION_USERS] : (state, action) => {
    return { ...state, users: action.payload };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { organization: null, editing: false, users: [] };
export default function organizationsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
