import React from 'react'
import { browserHistory } from 'react-router'
import './Header.scss'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BurgerMenu from '../Menu'

export const Header = ({ user, redirect }) => (
    <div className="header">
      <div className="header-left">
        { user ? 
          <BurgerMenu>
            <a className="menu-item" href="/">Home</a>
            <a className="menu-item" href="/organizations">Organizations</a>
            <a className="menu-item" href="/experiments">Experiments</a>
            <a className="menu-item" href="/samples">Samples</a>
            <hr />
            <a id="logout" className="menu-item" href="/logout">Log Out</a>
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
  null,
  sp => { return {...sp,  
    redirect: function(eventKey) { // todo: add as action
      if (!JSON.parse(localStorage.getItem('user')) && eventKey !== "login") {
        browserHistory.push('login');
        return;
      }
      browserHistory.push(eventKey)
    }
  }}
)(Header)