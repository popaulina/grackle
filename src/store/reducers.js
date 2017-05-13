import { combineReducers } from 'redux'
import locationReducer from './location'
import loginReducer from '../routes/Login/modules/login'
import samplesReducer from '../routes/Samples/modules/samples'
import {reducer as burgerMenu} from 'redux-burger-menu';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    login: loginReducer,
    samples: samplesReducer,
    burgerMenu,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
