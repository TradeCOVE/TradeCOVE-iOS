import { observable, toJS } from 'mobx';
import AppState from './AppState';

export default class TradesStore {
  @observable trade = null;
  @observable places = null;
  constructor(props) {
    if (props) {
      if (props.id) {
        this.getOneTrade(props.id)
      }
    }
  }
  getPlaces() {
    AppState.api.getSafespots(AppState.user._id).then((res) => {
      console.log(res);
      this.places = res;
    })
  }
  setFavorite(placeId) {
    AppState.api.addFavorite(AppState.user._id, placeId)
  }
  removeFavorite(id) {
    AppState.api.deleteFavorite(id)
  }
  acceptTrade(router, body) {
    AppState.api.acceptTrade(this.trade._id, AppState.user._id, body).then((res) => {
      console.log('acceptTrade', res);
      router.push('/offers');
    })
  }
  rejectTrade(id) {
    AppState.api.rejectTrade(id, AppState.user._id).then((res) => {
      console.log('rejectTrade', res);
      this.trades = this.trades.filter((item) => item._id !== id)
    })
  }
  getOneTrade(id) {
    AppState.api.getTrade(id).then((res) => { console.log('getTrade', toJS(res)); this.trade = res });
  }
  clearTrade() {
    this.trade = null;
  }
}
