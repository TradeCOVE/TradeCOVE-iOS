import { observable, action, computed, toJS } from 'mobx';
import AppState from './AppState';

export default class MessagesStore {
  @observable rooms = null;
  @observable messages = null;
  @observable user = null;
  @observable message = null;
  constructor(id) {
    if (id) {
      this.getMessageUser(id);
      this.getMessages(id);
    }
  }
  getRooms() {
    AppState.api.getMessageRooms({ userId: AppState.user._id })
      .then((res) => {
        console.log('rooms', toJS(res))
        this.rooms = res
      })
  }
  changeMessages(id) {
    console.log('111', toJS(this.messages));
    const messages = this.messages.map((item) => {
      if (item._id === id) {
        item.trade.status = 'COMPLETED'
      }
      return item
    })
    this.messages = messages
    console.log('222', toJS(this.messages));
  }
  getMessages(id) {
    AppState.api.getMessages(id, AppState.user._id)
      .then((res) => {
        console.log('messages', toJS(res))
        this.messages = res
      })
  }
  getMessageUser(id) {
    AppState.api.getUserData(id).then((res) => {
      console.log('user', toJS(res))
      this.user = res
    })
  }
  sendMessage(id) {
    const body = { from: AppState.user._id, to: id, text: this.message }
    if (this.validMessage) {
      AppState.api.sendMessage(body).then((res) => {
        console.log('new msg', res);
        this.messages.push(res);
        this.message = null;
      })
    }
  }
  changeMessage(message) {
    this.message = message;
  }
  clearMessages() {
    this.messages = null;
    this.user = null;
  }
  clearRooms() {
    this.rooms = null;
  }
  @computed get validMessage() {
    return this.message && this.message.length > 1;
  }
}
