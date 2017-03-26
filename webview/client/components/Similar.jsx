import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Right from 'react-icons/lib/fa/chevron-right';
import Left from 'react-icons/lib/fa/chevron-left';
import UserAdd from 'react-icons/lib/md/person-add';
import UserDel from 'react-icons/lib/md/check';
import Search from 'react-icons/lib/md/search';
import AppState from '../stores/AppState';

import { toJS, when } from 'mobx'

@observer
export default class Similar extends Component {
  handleFollow = (type, id) => {
    AppState.user.handleFollow(type, id);
  }
  handleSearch = (e) => {
    AppState.user.searchPeople(e.target.value, 'similar');
  }
  render() {
    const { user } = AppState;
    return (
      <section className="tags-page">
        <h4>Almost done</h4>
        <h3>Follow people who have similar interests near you...</h3>
        <div className="form-search search-only">
          <i className="search-icon" style={{padding: 6}}><Search/></i>
          <input
            type="text"
            className="form-control search-query"
            placeholder="Search..."
            onChange={this.handleSearch}
          />
        </div>
        <div className="users-container">
          {user.searchedSimilarPeople && user.searchedSimilarPeople.map((usr) => (
              <article key={usr._id} className="similar-people">
                <Link to={`/user/${usr._id}`} style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                  <div
                    style={{ backgroundImage: `url(${usr.avatar})` }}
                    className="sp-avatar"
                  />
                  <div className="sp-username">{usr.username}</div>
                </Link>
                  <button
                    onClick={this.handleFollow.bind(this, user.subscriptionToUsers && user.subscriptionToUsers.includes(usr._id) ? false : true, usr._id)}
                    className={`btn btn-link friend${user.subscriptionToUsers && user.subscriptionToUsers.includes(usr._id) ? ' active' : ''}`}
                  >
                    {user.subscriptionToUsers && user.subscriptionToUsers.includes(usr._id) ? <UserDel/> : <UserAdd/>}
                  </button>
              </article>
          ))}
        </div>

        <div className='tags-footer'>
          <Link to="/steps" className="btn btn-link back"><Left/> Back</Link>
          <Link disabled={user.subscriptionToUsers && user.subscriptionToUsers.length !== 0} to="/profile" className="btn btn-link skip">skip</Link>
          <Link disabled={user.subscriptionToUsers && user.subscriptionToUsers.length === 0} to="/profile" className="btn btn-link next">Finish <Right/></Link>
        </div>
      </section>
    );
  }
}
