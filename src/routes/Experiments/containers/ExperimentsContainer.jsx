import { connectWithLifecycle } from 'react-lifecycle-component'
import { getExperimentsList } from '../modules/experiments'
import { createSelector } from 'reselect'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Experiments from '../components/Experiments'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const expListSelector = createSelector(s => s.experiments.list, s => s.persistedState.organization_id,
	(list, activeOrg) => list.filter(x => x.organization_id === activeOrg))

const mapStateToProps = (state) => ({
  experiments: expListSelector(state)
})

const mergeProps = (sp, dp) => ({
	...sp,
	...dp,
	componentDidMount : () => dp.dispatch(getExperimentsList())
})

export default connectWithLifecycle(mapStateToProps, null, mergeProps)(Experiments)
