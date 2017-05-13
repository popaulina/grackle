import { connectWithLifecycle } from 'react-lifecycle-component'
import { getSample, saveSample } from '../modules/samples'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import SamplesEdit from '../components/SamplesEdit'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch, ownProps) => ({
  componentDidMount : () => dispatch(getSample(ownProps.params.id))
})

const mapStateToProps = (state) => ({
  sample: state.samples.sample
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)(SamplesEdit)
