import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import AppState from '../stores/AppState';
import UserAdd from 'react-icons/lib/fa/user-plus';
import UserDel from 'react-icons/lib/fa/minus-circle';
import Search from 'react-icons/lib/md/search';
import { reject, find, without } from 'lodash';
import { when } from 'mobx';
import Header from './App';

@observer
export default class Friends extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      category: [
        {
          name: 'Followers',
          active: true,
        },
        {
          name: 'Following',
          active: false,
        },
      ]
    }
  }
  componentDidMount() {
    when(
      () => AppState.user.subscriptionToUsers,
      () => {
        AppState.user.getFollowers(AppState.user._id);
        AppState.user.getRequests();
        AppState.user.getFollowing();
      }
    )
  }
  handleSelectCategory(index) {
    const { category } = this.state;
    category.map((e) => e.active = false);
    category[index].active = true;
    this.setState({ category });
  }
  handleChangesFriends = (type, userId) => {
    AppState.user.handleChangesFriends(type, userId);
  }
  handleBlockUser = (userId) => {
    AppState.user.blockUser(userId);
  }
  handleChangeEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }
  handleSearch = (type) => (e) => {
    AppState.user.searchPeople(e.target.value, type);
  }
  render() {
    const { category, edit } = this.state;
    const user = AppState.user;
    return (
      <div>
        <Header title="Friends"/>
        <section className="feed-page">
          <div className="feed-category">

            <div className="btn-group">
              {category.map((item, index) => (
                <button
                  key={index}
                  onClick={this.handleSelectCategory.bind(this, index)}
                  className={`btn btn-sm btn-default category ${item.active && 'active'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

          </div>
          <div className="feed-content" style={{ margin: 20 }}>

            <div className="form-search search-only">
              <i className="search-icon" style={{ padding: 6 }}><Search/></i>
              <input
                type="text"
                className="form-control search-query"
                placeholder="Search..."
                onChange={this.handleSearch(category[0].active && 'followers' || 'following')}
              />
            </div>
            <div className="users-container">
              {category[0].active && (
                <div style={{ margin: '20px 0 0' }}>
                  {user.requestsToFriend && user.requestsToFriend.length > 0 && (
                    <div>
                      <div className="user-subcategory">Follow Request(s):</div>
                      {user.requestsToFriend.map((usr, index) => (
                        <article className="similar-people" key={usr._id}>
                          <Link to={`/user/${usr._id}`} style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                            <img
                              src={usr.avatar}
                              className="sp-avatar"
                            />
                            <div className="sp-username">{usr.username}</div>
                          </Link>
                          <div style={{ display: 'flex', marginLeft: 'auto' }}>
                            <button
                              onClick={this.handleChangesFriends.bind(this, true, usr._id)}
                              className={`btn btn-link friend`}
                            >
                              <UserAdd/>
                            </button>
                            <button
                              onClick={this.handleChangesFriends.bind(this, false, usr._id)}
                              className={`btn btn-link friend`}
                            >
                              <UserDel/>
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                  <div className="user-subcategory">Followers
                    <button className={`btn btn-sm btn-sub btn-default${edit && ' active' || ''}`} onClick={this.handleChangeEdit}>Edit</button>
                  </div>
                  {user.searchedFollowers && user.searchedFollowers.map((usr, index) => (
                    <article className="similar-people" key={usr._id}>
                      <Link to={`/user/${usr._id}`} style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                        <img
                          src={usr.avatar}
                          className="sp-avatar"
                        />
                        <div className="sp-username">{usr.username}</div>
                      </Link>
                      {edit && (
                        <button
                          onClick={this.handleBlockUser.bind(this, usr._id)}
                          className={`btn btn-link friend`}
                          style={{ color: 'red' }}
                        >
                          <UserDel/>
                        </button>
                      )}
                    </article>
                  )) || (
                    <div style={{ padding: 30 }}>No followers</div>
                  )}
                </div>
              ) || (
                <div style={{ margin: '20px 0 0' }}>
                  <div className="user-subcategory">Following
                    <button className={`btn btn-sm btn-sub btn-default${edit && ' active' || ''}`} onClick={this.handleChangeEdit}>Edit</button>
                  </div>
                  {user.searchedFollowing && user.searchedFollowing.map((usr, index) => (
                    <article className="similar-people" key={usr._id}>
                      <Link to={`/user/${usr._id}`} style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
                        <img
                          src={usr.avatar}
                          className="sp-avatar"
                        />
                        <div className="sp-username">{usr.username}</div>
                      </Link>
                      {edit && (
                        <button
                          onClick={this.handleBlockUser.bind(this, usr._id)}
                          className={`btn btn-link friend`}
                          style={{ color: 'red' }}
                        >
                          <UserDel/>
                        </button>
                      )}
                    </article>
                  )) || (
                    <div style={{ padding: 30 }}>No following</div>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>
      </div>
    );
  }
}
