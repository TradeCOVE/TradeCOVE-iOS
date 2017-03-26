import React, { Component } from 'react';
import Header from './App';
import { Link } from 'react-router';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <Header title="Menu"/>
        <div className="profile-page">
          <ul className="nav nav-pills nav-stacked">
            <li role="presentation">
              <Link to="/">Home</Link>
            </li>
            <li role="presentation">
              <Link to="/feed">Newsfeed</Link>
            </li>
            <li role="presentation">
              <Link to="/profile">Profile</Link>
            </li>
            <li role="presentation">
              <Link to="/steps">Interests</Link>
            </li>
            <li role="presentation">
              <Link to="/friends">Friends</Link>
            </li>
            <li role="presentation">
            <Link to="/messages">Messages</Link>
            </li>
            <li role="presentation">
              <Link to="/offers">Offers</Link>
            </li>
            <li role="presentation">
              <Link to="/discover">Discover</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
