import React from 'react'
import { browserHistory } from 'react-router'
import { logOut } from '../../routes/Login/modules/login'
import './Header.scss'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import BurgerMenu from '../Menu'
import { redirect } from '../../helpers'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { createSelector } from 'reselect'
import { connectWithLifecycle } from 'react-lifecycle-component'
import { getOrganizationsList } from '../../routes/Organizations/modules/organizations'

export const Header = ({ user, logOut, dispatch, organizations, currentOrg }) => (
    <div className="header">
      <div className="header-left">
        { user ? 
          <BurgerMenu>
            <a className="menu-item" onClick={() => redirect('/', dispatch)}>Home</a>
            <a className="menu-item" onClick={() => redirect('/organizations', dispatch)}>Organizations</a>
            <a className="menu-item" onClick={() => redirect('/experiments', dispatch)}>Experiments</a>
            <a className="menu-item" onClick={() => redirect('/samples', dispatch)}>Samples</a>
            <hr />
            <a id="logout" className="menu-item" onClick={logOut}>Log Out</a>
          </BurgerMenu> :
          <div></div>
        }
        <h1 className="header-text">TalkBirdy</h1>
      </div>
      <div className="header-right" >
        <div className="org-selector">
        { user ? 
          <Select
            name="form-field-name"
            value={organizations[0]}
            options={organizations}
            onChange={() => {}}
          /> :
          <div></div>
        }
        </div>
        <div> 
          {user ? `Welcome, ${user.email}` : ""}
        </div>
      </div>
    </div>
)

const organizationsSelector = createSelector(s => s.organizations.list, 
  (list) => {
    var organizations = list.map(function(x) {return { value: x.id, label: x.name }});
    organizations.unshift({ value: 0, label: "Self"});
    return organizations;
  })

export default connectWithLifecycle(
  state => ({ 
    user: state.login.user,
    organizations: organizationsSelector(state),
    currentOrg: state.organizations.active 
  }),
  dispatch => ({ 
    logOut: () => dispatch(logOut()), 
    dispatch: dispatch,
    componentWillMount: () => dispatch(getOrganizationsList())
  })
)(Header)