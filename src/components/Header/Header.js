import React from 'react'
import { browserHistory } from 'react-router'
import { logOut } from '../../routes/Login/modules/login'
import './Header.scss'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BurgerMenu from '../Menu'
import { redirect } from '../../helpers'

export const Header = ({ user, logOut }) => (
    <div className="header">
      <div className="header-left">
        { user ? 
          <BurgerMenu>
            <a className="menu-item" onClick={() => redirect('/')}>Home</a>
            <a className="menu-item" onClick={() => redirect('/organizations')}>Organizations</a>
            <a className="menu-item" onClick={() => redirect('/experiments')}>Experiments</a>
            <a className="menu-item" onClick={() => redirect('/samples')}>Samples</a>
            <hr />
            <a id="logout" className="menu-item" onClick={logOut}>Log Out</a>
          </BurgerMenu> :
          <div></div>
        }
        <h1 className="header-text">TalkBirdy</h1>
      </div>
      <div className="header-right" >
        <div> 
          {user ? `Welcome, ${user.email}` : ""}
        </div>
      </div>
    </div>
)

export default connect(
  state => ({ user: state.login.user }),
  { logOut }
)(Header)