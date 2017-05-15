import { connectWithLifecycle } from 'react-lifecycle-component'
import { getOrganization, setOrganizationEditing, saveOrganization, deleteOrganization } from '../modules/organizations'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'

import OrganizationsView from '../components/OrganizationsView'

const formSelector = createSelector(s => s.form.organizationsView, s => s.organizations.organization, 
  (form, organization) => {
    if (!form || !form.values || !organization) return {};
    var organizationCopy = { ...organization };
    var formValues = form.values;
    Object.keys(formValues).map(x => organizationCopy[x] = formValues[x]);
    return organizationCopy;
  })

const formInitialStateSelector = createSelector(s => s.organizations.organization,
  (organization) => {
    return organization ? { name: organization.name } : { }
  }) 

const mapDispatchToProps = (dispatch, ownProps) => ({
  componentDidMount : () => dispatch(getOrganization(ownProps.params.id)),
  setEditing : () => dispatch(setOrganizationEditing()),
  save : (organization) => dispatch(saveOrganization(organization))
})

const mapStateToProps = (state) => ({
  organization: state.organizations.organization,
  editing: state.organizations.editing,
  editedOrganization: formSelector(state),
  initialValues: formInitialStateSelector(state)
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({form: 'organizationsView', enableReinitialize : true})(OrganizationsView))