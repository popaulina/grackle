import { connectWithLifecycle } from 'react-lifecycle-component'
import { getSample, setSampleEditing, saveSample } from '../modules/samples'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'

import SamplesView from '../components/SamplesView'

const formSelector = createSelector(s => s.form.samplesView, s => s.samples.sample, 
  (form, sample) => {
    if (!form || !form.values || !sample) return {};
    var sampleCopy = { ...sample };
    var formValues = form.values;
    Object.keys(formValues).map(x => sampleCopy[x] = formValues[x]);
    return sampleCopy;
  })

const formInitialStateSelector = createSelector(s => s.samples.sample,
  (sample) => {
    return sample ? { name: sample.name, tags: sample.tags} 
           : { name: "", tags: "" }
  }) 

const mapDispatchToProps = (dispatch, ownProps) => ({
  componentDidMount : () => dispatch(getSample(ownProps.params.id)),
  setEditing : () => dispatch(setSampleEditing()),
  save : (sample) => dispatch(saveSample(sample))
})

const mapStateToProps = (state) => ({
  sample: state.samples.sample,
  editing: state.samples.editing,
  editedSample: formSelector(state),
  initialValues: formInitialStateSelector(state)
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({form: 'samplesView', enableReinitialize : true})(SamplesView))