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
import { getOrganizationsList, setActiveOrganization } from '../../routes/Organizations/modules/organizations'
import { Row, Col } from 'react-bootstrap'

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
          <Row><Col mdOffset={3} md={3}> Organization: </Col>     
          <Col md={4}><Select
            name="form-field-name"
            value={currentOrg}
            options={organizations}
            onChange={(org) => dispatch(setActiveOrganization(org.value))}
            clearable={false}
          /></Col></Row> :
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

const currentOrgSelector = createSelector(organizationsSelector, s => s.organizations.active,
  (organizations, active) => organizations.find(x => x.value === active))

export default connectWithLifecycle(
  state => ({ 
    user: state.login.user,
    organizations: organizationsSelector(state),
    currentOrg: currentOrgSelector(state) 
  }),
  dispatch => ({ 
    logOut: () => dispatch(logOut()), 
    dispatch: dispatch,
    componentWillMount: () => dispatch(getOrganizationsList())
  })
)(Header)