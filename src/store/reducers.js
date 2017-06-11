import { combineReducers } from 'redux'
import locationReducer from './location'
import loginReducer from '../routes/Login/modules/login'
import organizationsReducer from '../routes/Organizations/modules/organizations'
import {reducer as burgerMenu} from 'redux-burger-menu';
import { reducer as form } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    login: loginReducer,
    organizations: organizationsReducer,
    burgerMenu,
    form,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
