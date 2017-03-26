import React, { Component } from 'react';
import StarO from 'react-icons/lib/md/star-outline';
import Star from 'react-icons/lib/md/star';
import Location from 'react-icons/lib/md/add-location';
import Settings from 'react-icons/lib/md/settings';
import Create from 'react-icons/lib/fa/edit';
import Add from 'react-icons/lib/fa/plus-circle';
import {Link} from 'react-router';

export default class Feed extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <section className="profile-page">
        <div className="p-header">
          <div className="ph-top">
            <img
              src="http://dummyimage.com/80x80/dbd/fff"
              className="ph-avatar"
            />
            <div className="ph-rating">
              <Star/><Star/><Star/><Star/><StarO/>
            </div>
          </div>
          <div className="ph-bottom">
            <div className="ph-username">user</div>
            <div className="ph-location">
              <Location/>
              <span className="phl-text">Indianapolis</span>
            </div>
            <Link to="settings" className="btn btn-link ph-settings"><Settings/></Link>
          </div>
        </div>
        <div className="p-about card">
          About me
        </div>
        <div className="p-interests">
          <div className="card">Interests</div>
          <Link to="create" className="btn btn-link p-newinterest"><Create/></Link>
        </div>
        <div className="p-list">
          <div className="pl-card"></div>
          <div className="pl-card"></div>
          <div className="pl-card"></div>
          <div className="pl-card"></div>
          <div className="pl-card"></div>
          <div className="pl-card"></div>
        </div>
        <div className="p-footer">
          <Link to="add" className="btn btn-link"><Add/></Link>
        </div>
      </section>
    );
  }
}
