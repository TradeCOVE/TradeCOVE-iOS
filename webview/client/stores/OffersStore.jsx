import { observable, computed, toJS } from 'mobx';
import AppState from './AppState';
import { find, remove } from 'lodash';

export default class OffersStore {
  @observable offers = null;
  @observable categories = null;

  history = null;

  @observable _id = null;
  @observable images = [];
  @observable userId = null;
  @observable title = null;
  @observable category = null;
  @observable condition = 'New';
  @observable description = null;

  @observable user = null;
  @observable report = null;

  @observable selectedOffer = [];
  @observable acceptTrade = false;
  constructor(props) {
    if (props) {
      if (props.history) {
        this.history = props.history;
      }
      if (props.offerId) {
        this.loadOffer(props.offerId);
      }
    }
    AppState.api.getCategories().then((data) => {
      const first = data.length > 0 ? data[0] : null;
      this.categories = data;
      this.changeCategory(first);
    });
  }
  getUserOffers = (userId) => {
    AppState.api.getUserOffers(userId).then((data) => {
        console.log('user offers', toJS(data));
        this.offers = data
      });
  }
  changeCondition(condition) {
    this.condition = condition;
  }
  changeTitle(title) {
    this.title = title;
  }
  changeReport(report) {
    this.report = report;
  }
  changeOfferToTrade(offer) {
    if (find(this.selectedOffer, { '_id': offer._id })) {
      this.clearSelectedOffer(offer)
    } else {
      this.selectedOffer.push(offer);
    }
  }
  clearSelectedOffer(offer) {
    this.selectedOffer = this.selectedOffer.filter((item) => item._id !== offer._id)
  }
  changeAcceptTrade() {
    this.acceptTrade = !this.acceptTrade;
  }
  sendReport() {
    if (this.validReport) {
      const body = { userId: AppState.user._id, offerId: this._id, text: this.report };
      AppState.api.reportOffer(body).then((res) => { console.log('report', res); })
    }
  }
  changeCategory(category) {
    this.category = category;
    console.log(toJS(this.category));
  }
  changeDescription(description) {
    this.description = description;
  }
  createTrade(router) {
    const ids = this.selectedOffer.map((offer) => offer._id)
    const body = { offersFrom: ids, offerTo: this._id, userId: AppState.user._id }
    AppState.api.createNewTrade(body).then((ers) => {
      console.log(ers);
      router.push('/offers')
    });
  }
  uploadImage(data) {
    console.log('offerstore data', data)
    fetch(`${AppState.host}/image`, {
      method: 'POST',
      body: data
    }).then((res) => res.json()).then((res) => {
      this.changeImages(res.data.url)
    })
  }
  changeImages(image) {
    this.images.push(image);
  }
  removeImage(index) {
    this.images.splice(index, 1);
  }
  loadOffer(id) {
    if (id) {
      AppState.api.getOffer(id)
        .then((offer) => {
          console.log(offer);
          this._id = offer._id;
          this.userId = offer.userId;
          this.images = offer.images;
          this.title = offer.title;
          this.condition = offer.condition;
          this.description = offer.description;
          this.user = offer.user;
          AppState.api.getCategoryId(offer.category)
            .then((data) => {
              this.category = { _id: data._id, title: data.title }
            })
        })
    } else return false;
  }
  clearOffer() {
    this._id = null;
    this.userId = null;
    this.images = null;
    this.title = null;
    this.condition = null;
    this.description = null;
    this.category = null;
  }
  delOffer(offerId, router) {
    AppState.api.removeOffer(offerId)
      .then(() => router.push('/profile'))
  }
  setOffer(userId, offerId) {
    const data = {
      title: this.title,
      user: userId,
      category: this.category._id,
      description: this.description,
      condition: this.condition,
      images: toJS(this.images)
    };
    console.log(data);
    if (offerId) {
      AppState.api.editOffer(offerId, data)
        .then(() => this.history.push('/profile'))
    } else {
      AppState.api.setOffer(data)
        .then((res) => {
          console.log(res);
          this.history.push('/profile')
        })
    }
  }
  @computed get validReport() {
    return this.report && this.report.length > 3;
  }
}
