import { observable, autorun, toJS, when, action } from 'mobx';
import _ from 'lodash';

export default class UserStore {
  @observable _id = null;
  @observable username = null;
  @observable firstName = null;
  @observable lastName = null;
  @observable gender = null;
  @observable email = null;
  @observable avatar = null;
  @observable about = null;
  @observable rating = null;
  @observable interestIds = null;
  @observable blockedUserIds = null;
  @observable subscriptionToUsers = null;
  @observable token = null;
  @observable interests = null;
  @observable followers = null;
  @observable public = true;
  @observable friendshipRequests = null;

  @observable following = null;
  @observable allInerests = null;
  @observable similarPeople = null;
  @observable searchedSimilarPeople = null;
  @observable searchedFollowers = null;
  @observable searchedFollowing = null;
  @observable otherUser = null;
  @observable requestsToFriend = null;
  timer = null;

  constructor(appState, props) {
    console.log(props);
    this._id = props;
    this.host = appState.host;
    this.token = props.token;
    this.api = appState.api;
    this.initUser(this._id)
    this.api.getUsers().then((data) => {
      this.similarPeople = _.filter(data, (i) => i._id !== this._id)
      this.searchedSimilarPeople = _.filter(data, (i) => i._id !== this._id)
    });
  }
  @action
  searchPeople(value, type) {
    if (type === 'similar') {
      if (value.length > 0) {
        this.searchedSimilarPeople = _.filter(this.similarPeople, (o) => new RegExp(`^${value}`, 'gmi').test(o.username))
      } else {
        this.searchedSimilarPeople = this.similarPeople
      }
    } else if (type === 'followers') {
      if (value.length > 0) {
        this.searchedFollowers = _.filter(this.followers, (o) => new RegExp(`^${value}`, 'gmi').test(o.username))
      } else {
        this.searchedFollowers = this.followers
      }
    } else {
      if (value.length > 0) {
        this.searchedFollowing = _.filter(this.following, (o) => new RegExp(`^${value}`, 'gmi').test(o.username))
      } else {
        this.searchedFollowing = this.following
      }
    }
  }
  uploadAvatar(data) {
    console.log('userstore data', data)
    fetch(`${this.host}/image`, {
      method: 'POST',
      body: data
    }).then((res) => res.json()).then((res) => {
      this.changeAvatar(res.data.url)
    })
  }
  changeAvatar(avatar) {
    this.avatar = avatar;
    this.api.editUser(this._id, { avatar: avatar }).then(() => console.log('avatar saved'))
  }
  getStepsInfo() {
    this.getAllInterests();
  }
  getUserInterests() {
    if (this.interestIds) {
      this.interestsIdtoObject(this.interestIds);
    }
  }
  getAllInterests() {
    this.api.getInterests().then((data) => { this.allInerests = data });
  }
  interestsIdtoObject(array) {
    Promise.resolve(array)
      .map((id) => this.api.getUserInterests(id))
      .then((data) => {
        if (data.length > 0) {
          this.interests = data
        }
      });
  }
  initUser(id) {
    this.api.getUserData(id).then((user) => {
      console.log(user);
      Object.keys(user).forEach((key) => {
        this[key] = user[key];
      });
    });
  }
  getUser(id) {
    this.api.getUserData(id).then((user) => {
      this.otherUser = user;
      return user;
    }).then((user) => {
      Promise.resolve(user.interestIds)
        .map((id) => this.api.getUserInterests(id))
        .then((data) => {
          this.otherUser.interests = data
        });
    });
  }
  clearUser() {
    this.otherUser = null;
  }
  @action
  handleFollow(type, id) {
    const body = { userId: this._id, toUserId: id };
    if (!type) this.api.unsubscribe(body)
          .then((data) => { this.subscriptionToUsers = data.subscriptionToUsers })
    else this.api.subscribe(body)
          .then((data) => { this.subscriptionToUsers = data.subscriptionToUsers });
  }
  @action
  handleChangesFriends(type, id) {
    const body = { userId: this._id, friendshipId: id };
    if (!type) this.api.rejectFriend(body)
    else this.api.acceptFriend(body)
  }
  @action
  blockUser(id) {
    const body = { userId: this._id, blockedUserId: id };
    this.api.blockUser(body)
  }
  @action
  changeField(field, value) {
    clearTimeout(this.timer);
    this[field] = value;
    this.timer = setTimeout(() => {
      this.api.editUser(this._id, { [field]: value }).then(() => console.log('done'))
    }, 800);
  }
  getRequests(id) {
    const body = {  }
    this.api.getUserRequests(body).then((res) => { console.log(res); })
  }
  getFollowers(id) {
    this.api.getFollowers(id)
      .then((data) => {
        this.followers = data;
        this.searchedFollowers = data;
      })
  }
  getRequests() {
    if (this.friendshipRequests) {
      Promise.resolve(this.friendshipRequests)
      .map((id) => this.api.getUserData(id))
      .then((data) => this.requestsToFriend = data);
    }
  }
  getFollowing() {
    if (this.subscriptionToUsers) {
      Promise.resolve(this.subscriptionToUsers)
      .map((id) => this.api.getUserData(id))
      .then((data) => {
        this.following = data;
        this.searchedFollowing = data;
      });
    }
  }
  setRating(rating, id) {
    if (this._id === id) this.rating = rating;
    else this.otherUser.rating = rating;
    this.api.editUser(id, { rating });
  }
  @action
  handlePublicType(type) {
    this.public = type;
  }
  @action
  setInterestIds(interestIds) {
    this.api.editUser(this._id, { interestIds });
  }
  @action
  removeInterest(id) {
    this.interestIds = this.interestIds.filter((i) => i != id);
    this.setInterestIds(this.interestIds);
    this.interestsIdtoObject(this.interestIds);
  }
  @action
  selectInterest(id) {
    this.interestIds.push(id);
    this.setInterestIds(this.interestIds);
    this.interestsIdtoObject(this.interestIds);
  }
}
