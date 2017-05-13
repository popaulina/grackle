import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'samples',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Samples = require('./containers/SamplesContainer').default
      const reducer = require('./modules/samples').default

      /*  Add the reducer to the store on key 'samples'  */
      injectReducer(store, { key: 'samples', reducer })

      /*  Return getComponent   */
      cb(null, Samples)

    /* Webpack named bundle   */
    }, 'samples')
  }
})