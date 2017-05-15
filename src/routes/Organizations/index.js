import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'organizations',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Samples = require('./containers/OrganizationsLayout').default
      const reducer = require('./modules/organizations').default

      /*  Add the reducer to the store on key 'organizations'  */
      injectReducer(store, { key: 'organizations', reducer })

      /*  Return getComponent   */
      cb(null, Samples)

    /* Webpack named bundle   */
    }, 'organizations')
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, {
        component: require('./containers/OrganizationsContainer').default
      })
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure(['./containers/OrganizationsContainer'], function(require) {
      cb(null, [
        { path: 'create', component: require('./containers/OrganizationsCreateContainer').default },
        { path: ':id', component: require('./containers/OrganizationsViewContainer').default }
      ])
    })
  }
})
