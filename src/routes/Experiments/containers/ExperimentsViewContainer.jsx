import { connectWithLifecycle } from 'react-lifecycle-component'
import { getExperiment, setExperimentEditing, saveExperiment, deleteExperiment } from '../modules/experiments'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'
import { getSamplesList } from '../../Samples/modules/samples'
import { updateSelected } from '../../../helpers'

import ExperimentsView from '../components/ExperimentsView'

const formSelector = createSelector(s => s.form.experimentsView, s => s.experiments.experiment, 
  (form, experiment) => {
    if (!form || !form.values || !experiment) return {};
    var experimentCopy = { ...experiment };
    var formValues = form.values;
    Object.keys(formValues).map(x => experimentCopy[x] = formValues[x]);
    return experimentCopy;
  })

const formInitialStateSelector = createSelector(s => s.experiments.experiment,
  (experiment) => {
    return experiment ? { 
            name: experiment.name, 
            tags: experiment.tags, 
            active: experiment.active, 
            repeats: experiment.repeats,
            sample_ids: experiment.sample_ids || []
          } 
           : { }
  }) 

const sampleSelector = createSelector(s => s.experiments.editing, s => s.samples.list, s => s.experiments.experiment,
  (editing, list, experiment) => {
    if (!list || !experiment || !experiment.sample_ids) return [];
    return editing ? list : list.filter(x => experiment.sample_ids.indexOf(x.id) > -1)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  componentDidMount : () => {
    dispatch(getExperiment(ownProps.params.id));
    dispatch(getSamplesList())
  },
  setEditing : () => dispatch(setExperimentEditing()),
  save : (experiment) => dispatch(saveExperiment(experiment)),
  deleteExperiment : (experiment) => dispatch(deleteExperiment(experiment))
})

const mapStateToProps = (state) => ({
  experiment: state.experiments.experiment,
  editing: state.experiments.editing,
  editedExperiment: formSelector(state),
  initialValues: formInitialStateSelector(state),
  samples: sampleSelector(state)
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({form: 'experimentsView', enableReinitialize : true})(ExperimentsView))