
import { connectWithLifecycle } from 'react-lifecycle-component'
import { createExperiment } from '../modules/experiments'
import { getSamplesList } from '../../Samples/modules/samples'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'

import SamplesCreate from '../components/ExperimentsCreate'

const formSelector = createSelector(s => s.form.experimentsCreate, 
  (form) => {
    if (!form || !form.values) return {};
    return form.values;
  })


const mapDispatchToProps = (dispatch, ownProps) => ({
  create : (experiment) => dispatch(createExperiment(experiment)),
  componentDidMount : () => dispatch(getSamplesList())
})

const mapStateToProps = (state) => ({
  experiment: formSelector(state),
  samples: state.samples.list
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({ form: 'experimentsCreate', 
               initialValues: {"name": "", "active": false, "tags": [], "sample_ids": [] } })
  (SamplesCreate))