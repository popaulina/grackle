import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'experiments',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Experiments = require('./containers/ExperimentsLayout').default
      const reducer = require('./modules/experiments').default

      /*  Add the reducer to the store on key 'experiments'  */
      injectReducer(store, { key: 'experiments', reducer })

      /*  Return getComponent   */
      cb(null, Experiments)

    /* Webpack named bundle   */
    }, 'experiments')
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], function(require) {
      cb(null, {
        component: require('./containers/ExperimentsContainer').default
      })
    })
  },
  getChildRoutes(nextState, cb) {
    require.ensure(['./containers/ExperimentsContainer'], function(require) {
      cb(null, [
        { path: 'create', component: require('./containers/ExperimentsCreateContainer').default },
        { path: ':id', component: require('./containers/ExperimentsViewContainer').default }
      ])
    })
  }
})
