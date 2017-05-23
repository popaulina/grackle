import { addUser } from '../modules/organizations'
import { connectWithLifecycle } from 'react-lifecycle-component'
import { reduxForm } from 'redux-form'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import AddUserForm from '../components/AddUserForm'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
	addUser
}

const mapStateToProps = (state) => ({
  id: state.organizations.organization ? state.organizations.organization.id : -1,
  email: state.form.addUser ? state.form.addUser.values : {},
  state
})

export default connectWithLifecycle(mapStateToProps, mapDispatchToProps)
  (reduxForm({form: 'addUser', initialValues: {email: ""}})(AddUserForm))