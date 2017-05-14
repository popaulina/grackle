import { connectWithLifecycle } from 'react-lifecycle-component'
import { createSample } from '../modules/samples'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'

import SamplesCreate from '../components/SamplesCreate'

const formSelector = createSelector(s => s.form.samplesCreate, 
  (form) => {
    if (!form || !form.values) return {};
    return form.values;
  })


const mapDispatchToProps = (dispatch, ownProps) => ({
  create : (sample) => dispatch(createSample(sample))
})

const mapStateToProps = (state) => ({
  sample: formSelector(state)
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({ form: 'samplesCreate', 
               initialValues: {"name": "", "high_label": "", "low_label": "", "tags": [], "file": null} })
  (SamplesCreate))