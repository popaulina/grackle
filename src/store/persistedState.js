// any state/actions used across pages is stored here
import { get } from '../helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const SET_CURRENT_ORGANIZATION = 'SET_CURRENT_ORGANIZATION'
export const GET_ORGANIZATIONS_LIST = 'GET_ORGANIZATIONS_LIST'
// ------------------------------------
// Actions
// ------------------------------------
export const setActiveOrganization = (org) => {
  return { type: SET_CURRENT_ORGANIZATION, payload: org }
}

function setList(data) {
  return {type: GET_ORGANIZATIONS_LIST, payload: data.organizations};
}

export const getOrganizationsList = () => {
  return function(dispatch) {
    get(`${REACT_APP_TURACO_URI}v3/organizations`)
      .then((data) => dispatch(setList(data)));
  }
}

export const actions = {
  getOrganizationsList, 
  setActiveOrganization
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORGANIZATIONS_LIST] : (state, action) => {
    return { ...state, organization_list: action.payload };
  },
  [SET_CURRENT_ORGANIZATION] : (state, action) => {
    return { ...state, organization_id: action.payload };
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function persistedStateReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
