import { action, observable, toJS } from 'mobx';
import _ from 'lodash';
import AppState from './AppState';

export default class FeedStore {
  @observable posts = null;
  @observable selected = null;
  constructor() {
    this.getPostsByCategory();
  }
  getPostsByCategory(category) {
    const body = { userId: AppState.user._id }
    switch (category) {
      case 'friends':
        AppState.api.getFeedFriends(body).then((res) => { console.log('getFeedFriends', toJS(res)); this.posts = res })
        break;
      case 'interests':
        AppState.api.getFeedInterests(body).then((res) => { console.log('getFeedInterests', toJS(res)); this.posts = res })
        break;
      default:
        AppState.api.getFeedLocation(body).then((res) => { console.log('getFeedLocation', toJS(res)); this.posts = res })
        break;
    }
  }
  clearFeed() {
    this.posts = null;
  }
  @action
  selectPost(_id) {
    this.selected = _.find(this.posts, { _id });
    console.log(toJS(this.selected));
  }
}
