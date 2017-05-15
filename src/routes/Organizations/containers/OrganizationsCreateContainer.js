import { connectWithLifecycle } from 'react-lifecycle-component'
import { createOrganization } from '../modules/organizations'
import { createSelector } from 'reselect'
import { reduxForm } from 'redux-form'

import OrganizationsCreate from '../components/OrganizationsCreate'

const formSelector = createSelector(s => s.form.organizationsCreate, 
  (form) => {
    if (!form || !form.values) return {};
    return form.values;
  })


const mapDispatchToProps = (dispatch, ownProps) => ({
  create : (organization) => dispatch(createOrganization(organization))
})

const mapStateToProps = (state) => ({
  organization: formSelector(state)
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({ form: 'organizationsCreate', 
               initialValues: { "name": "" } })
  (OrganizationsCreate))