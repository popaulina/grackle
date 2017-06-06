
import { connectWithLifecycle } from 'react-lifecycle-component'
import { createExperiment } from '../modules/experiments'
import { getSamplesList } from '../../Samples/modules/samples'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'

import ExperimentsCreate from '../components/ExperimentsCreate'

const formSelector = createSelector(s => s.form.experimentsCreate, s => s.organizations.active,
  (form, org) => {
    if (!form || !form.values) return {};
    return { ...form.values, organization_id: org };
  })


const mapDispatchToProps = (dispatch) => ({
  create : (experiment) => dispatch(createExperiment(experiment)),
  dispatch
})

const mapStateToProps = (state) => ({
  experiment: formSelector(state),
  samples: state.samples.list,
  currentOrg: state.organizations.active
})

const mergeProps = (sp, dp) => ({
  ...sp,
  ...dp,
  componentDidMount : () => dp.dispatch(getSamplesList(sp.currentOrg))
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps, mergeProps)
  (reduxForm({ form: 'experimentsCreate', 
               initialValues: {"name": "", "active": false, "tags": [], "sample_ids": [] } })
  (ExperimentsCreate))