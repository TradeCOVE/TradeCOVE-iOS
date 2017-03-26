import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Star from 'react-icons/lib/md/star';
import Location from 'react-icons/lib/md/add-location';
import Settings from 'react-icons/lib/md/settings';
import Create from 'react-icons/lib/fa/edit';
import Add from 'react-icons/lib/fa/plus-circle';
import UserAdd from 'react-icons/lib/fa/user-plus';
import UserDel from 'react-icons/lib/fa/user-times';
import StarRatingComponent from 'react-star-rating-component';
import AppState from '../stores/AppState';
import Header from './App';
import { Link } from 'react-router';
import { when } from 'mobx'

@observer
export default class Profile extends Component {
  componentWillMount() {
    if (this.props.userId) {
      AppState.user.getUser(this.props.userId)
    }
  }
  componentDidMount() {
    when(
      () => AppState.user._id,
      () => {
        AppState.user.getUserInterests();
        this.props.offersStore.getUserOffers(this.props.userId || AppState.user._id);
      }
    )
  }
  componentWillUnmount() {
    AppState.user.clearUser();
  }
  onStarClick = (nextValue, prevValue, name) => {
    AppState.user.setRating(nextValue, this.props.userId || AppState.user._id);
  }
  handleFollow = (type, id) => {
    AppState.user.handleFollow(type, id);
  }
  render() {
    const { offersStore } = this.props;
    if (this.props.userId && AppState.user.otherUser) {
      return (
        <div>
          <Header title={AppState.user.username}/>
          <UserContent
            myId={AppState.user._id}
            userId={this.props.userId}
            avatar={AppState.user.otherUser.avatar}
            rating={AppState.user.otherUser.rating}
            onStarClick={this.onStarClick}
            subscriptionToUsers={AppState.user.subscriptionToUsers}
            username={AppState.user.otherUser.username}
            about={AppState.user.otherUser.about}
            handleFollow={this.handleFollow}
            interests={AppState.user.otherUser.interests}
            offers={offersStore.offers}
            extended={false}
          />
        </div>
      );
    } else if (!this.props.userId) {
      return (
        <div>
          <Header title="MyCOVE"/>
          <UserContent
            myId={AppState.user._id}
            userId={AppState.user._id}
            avatar={AppState.user.avatar}
            rating={AppState.user.rating}
            onStarClick={this.onStarClick}
            username={AppState.user.username}
            about={AppState.user.about}
            handleFollow={this.handleFollow}
            interests={AppState.user.interests}
            offers={offersStore.offers}
            extended={true}
          />
        </div>
      );
    } else {
      return false;
    }
  }
}

class UserContent extends Component {
  render() {
    const { avatar, rating, onStarClick, username, about, interests, offers, extended, myId, userId, subscriptionToUsers, handleFollow } = this.props;
    return (
      <section className="profile-page">
        <div className="p-header">
          <div className="ph-top">
            <div
              style={{ backgroundImage: `url(${avatar})` }}
              className="ph-avatar"
            />
            <div className="ph-rating">
              <StarRatingComponent
                name="ph-rating"
                starCount={5}
                editing={false}
                renderStarIcon={() => <Star/>}
                value={rating}
              />
            </div>
            {!extended ? subscriptionToUsers.includes(userId) && (
              <button
                onClick={handleFollow.bind(this, false, userId)}
                className={`btn btn-link friend active`}
              >
                <UserDel/>
              </button>
            ) || (
              <button
                onClick={handleFollow.bind(this, true, userId)}
                className={`btn btn-link friend`}
              >
                <UserAdd/>
              </button>
            ) : null}
          </div>
          <div className="ph-bottom">
            <div className="ph-username">{username}</div>
            <div className="ph-location">
              <Location/>
              <span className="phl-text">Indianapolis</span>
            </div>
            {extended && <Link to="/settings" className="btn btn-link ph-settings"><Settings/></Link>}
          </div>
        </div>
        <div className="p-about card">
          {about || "No about info"}
        </div>
        <div className="p-interests">
          <div className="card">
            {interests && interests.length !== 0 && interests.map((interest) => (
              <span key={interest.id} className="interest-item">{interest.title}</span>
            )) || <span>No interests</span>}
          </div>
          {extended && <Link to="/edit" className="btn btn-link p-newinterest"><Create/></Link>}
        </div>
        <div className="p-list">
          {offers && offers.map((offer) => (
            <Link to={`/offer/${offer._id}`} key={offer._id} className="pl-card">
              <div className="plc-img" style={{ backgroundImage: `url(${offer.images && offer.images.length > 0 && offer.images[0]})` }}/>
              <div className="plc-title">{offer.title}</div>
            </Link>
          )) || <div className="pl-nf">No offers</div>}
        </div>
        <div className="p-footer">
          {extended && <Link to="/offers/add" className="btn btn-link"><Add/></Link>}
        </div>
      </section>
    );
  }
}
