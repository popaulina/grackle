// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SamplesRoute from './Samples'

function requireAuth(nextState, replace) {
  if (!JSON.parse(localStorage.getItem('user')) && window.location.pathname !== "/login") {
    replace({
      pathname: '/login'
    })
  }
}

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  onEnter : requireAuth,
  childRoutes : [
    LoginRoute(store),
    SamplesRoute(store)
  ]
})

export default createRoutes
