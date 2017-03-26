import React, { Component } from 'react';
import Search from 'react-icons/lib/md/search';
import AppState from '../stores/AppState';
import Newsfeed from 'react-icons/lib/fa/th-large';
import Messages from 'react-icons/lib/fa/envelope-o';
import Friends from 'react-icons/lib/fa/group';
import Safespots from 'react-icons/lib/fa/map-marker';
import Discover from 'react-icons/lib/md/language';
import Offers from 'react-icons/lib/fa/shopping-bag';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  handleLogout = () => {
    console.log('clicked');
    window.sendMessage && window.sendMessage({ type: 'AUTH_LOGOUT' });
  }
  render() {
    const user = AppState.user;
    return (
      <div className="sidebar-inner">
        {/* <div className="form-search search-only">
          <i className="search-icon" style={{padding: 6}}><Search/></i>
          <input
            type="text"
            className="form-control search-query"
            placeholder="Search..."
          />
        </div> */}
        <Link to="/profile" className="ph-top" style={{ color: 'inherit', alignItems: 'center', flexDirection: 'column', marginTop: 30 }}>
          <div style={{ width: 60, height: 60, backgroundImage: `url(${user.avatar})` }} className="ph-avatar"/>
          <div style={{ marginTop: 10, textAlign: 'center', fontWeight: 'bold' }}>My COVE</div>
        </Link>
        {/* <pre>{typeof window.__INITIAL_STATE__ !== 'undefined' ? JSON.stringify(window.__INITIAL_STATE__, null, 4) : '??'}</pre> */}
        <div className="sidebar-menu">
          <Link to="/feed" className="sidebar-menu-item">
            <div className="smi-icon"><Newsfeed/></div>
            <div className="smi-name">Newsfeed</div>
          </Link>
          <Link to="/offers" className="sidebar-menu-item">
            <div className="smi-icon"><Offers/></div>
            <div className="smi-name">Offers</div>
          </Link>
          <Link to="/messages" className="sidebar-menu-item">
            <div className="smi-icon"><Messages/></div>
            <div className="smi-name">Messages</div>
          </Link>
          <Link to="/friends" className="sidebar-menu-item">
            <div className="smi-icon"><Friends/></div>
            <div className="smi-name">Friends</div>
          </Link>
          <Link to="/safespots" className="sidebar-menu-item">
            <div className="smi-icon"><Safespots/></div>
            <div className="smi-name">SafeSpots</div>
          </Link>
          <Link to="/discover" className="sidebar-menu-item">
            <div className="smi-icon"><Discover/></div>
            <div className="smi-name">Discover</div>
          </Link>
        </div>
        <div className="sidebar-footer">
          <button onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}
