import { toJS, computed, observable, action } from 'mobx';
import _ from 'lodash';

export default class TestStore {
  @observable news = null;
  constructor(data) {
    this.news = data;
  }

  @action
  editComment = (postId, commentId, text) => {
    const curNews = _.find(this.news, { id: postId });
    const curComm = _.find(curNews.comments, { id: commentId });
    curComm.text = text;
    console.log(toJS(curNews));
    console.log(toJS(curComm));
  }
}
