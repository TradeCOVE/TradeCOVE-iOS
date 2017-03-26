import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link }  from 'react-router';
import Right from 'react-icons/lib/fa/chevron-right';
import AppState from '../stores/AppState';
import Check from 'react-icons/lib/fa/check-circle';
import Header from './App';
import { when, toJS } from 'mobx';
import find from 'lodash/find';
import cn from 'classnames';
import ReviewTrade from './ReviewTrade';

@observer
export default class CreateTrade extends Component {
  constructor() {
    super();
    this.state = {
      review: false
    }
  }
  componentDidMount() {
    when(
      () => AppState.user._id,
      () => this.props.offersStore.getUserOffers(this.props.userId || AppState.user._id)
    )
  }
  selectOffer = (offer) => {
    const { offersStore } = this.props;
    if (offersStore.selectedOffer && offersStore.selectedOffer._id === offer._id) {
      offersStore.clearSelectedOffer();
    } else {
      offersStore.changeOfferToTrade(offer);
    }
  }
  handlePreview = () => {
    this.setState({ review: true });
  }
  render() {
    const { offersStore } = this.props;
    const offers = offersStore.offers;
    if (!this.state.review) {
      return (
        <div>
          <Header title="Select from your COVE" close
                  closeAction={() => this.context.router.push('/feed')}/>
          <section className="tags-page" style={{marginTop: 60}}>
            <div className="p-list">
              {offers && offers.map((offer) => (
                <button onClick={this.selectOffer.bind(this, offer)}
                        key={offer._id} className={cn({
                  "pl-card": true,
                  "active": find(offersStore.selectedOffer, { '_id': offer._id })
                })}>
                  <div className="plc-img" style={{ backgroundImage: `url(${offer.images && offer.images.length > 0 && offer.images[0]})` }}/>
                  <div className="plc-checked"><Check/></div>
                </button>
              )) || <div className="pl-nf">No offers</div>}
            </div>
            <div className='tags-footer'>
              <div onClick={offersStore.selectedOffer.length > 0 && this.handlePreview} className={cn({
                "btn": true,
                "btn-link": true,
                "next": true,
                "disabled": !offersStore.selectedOffer.length > 0
              })}>
                Review Order<Right/></div>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <ReviewTrade offersStore={offersStore} review={this.state.review}/>
      );
    }
  }
}
CreateTrade.contextTypes = {
  router: React.PropTypes.object.isRequired
};
