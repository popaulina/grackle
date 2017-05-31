import React from 'react'
import { browserHistory } from 'react-router'
import { logOut } from '../../routes/Login/modules/login'
import './Header.scss'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import BurgerMenu from '../Menu'
import { redirect } from '../../helpers'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export const Header = ({ user, logOut, dispatch }) => (
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
          <Select
            name="form-field-name"
            value="one"
            options={[]}
            onChange={() => {}}
          />
        </div>
        <div> 
          {user ? `Welcome, ${user.email}` : ""}
        </div>
      </div>
    </div>
)

export default connect(
  state => ({ user: state.login.user }),
  dispatch => ({ logOut: () => dispatch(logOut()), dispatch: dispatch })
)(Header)