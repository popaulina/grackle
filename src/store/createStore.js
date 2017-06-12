import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

const storeInitialState = {
  login: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  persistedState: {
    organization_id: JSON.parse(localStorage.getItem('organization_id')) || 0,
    organization_list: JSON.parse(localStorage.getItem('organization_list')) || []
  }
}

export default (initialState = storeInitialState) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  store.subscribe(() => {
    const { login, persistedState } = store.getState();
    localStorage.setItem('user', JSON.stringify(login.user));
    localStorage.setItem('organization_id', JSON.stringify(persistedState.organization_id));
    localStorage.setItem('organization_list', JSON.stringify(persistedState.organization_list));
  });

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
