import React, { Component } from 'react';
import moment from 'moment';
import Clock from 'react-icons/lib/fa/clock-o';
import Compare from 'react-icons/lib/md/compare-arrows';
import Star from 'react-icons/lib/md/star';
import StarO from 'react-icons/lib/md/star-outline';
import Location from 'react-icons/lib/md/add-location';
import Header from './App';
import StarRatingComponent from 'react-star-rating-component';
import { observer } from 'mobx-react';
import TradePlace from './TradePlace'

@observer
export default class FullOffer extends Component {
  constructor() {
    super()
    this.state = {
      place: false
    }
  }
  componentWillUnmount() {
    this.props.tradesStore.clearTrade();
  }
  handleToPlace = () => {
    this.setState({ place: true })
  }
  render() {
    const { tradesStore } = this.props;
    if (!tradesStore.trade) return false;
    if (!this.state.place) {
      return (
        <div>
          <Header title="Offer" close closeAction={() => this.context.router.push('/offers')}/>
          <section className="messages-page">
            <div className="fo-date">
              <span className="fod-icon"><Clock/></span>
              <span className="fod-text">{moment(tradesStore.trade.finishedAt).format('hh:mm:ss')}</span>
            </div>
            <div className="fo-trade">
              <img
                src={tradesStore.trade.offersFrom[0].images[0]}
                className="fot-img"
              />
              <div className="fot-versus">
                <Compare/>
              </div>
              <img
                src={tradesStore.trade.offerTo.images[0]}
                className="fot-img"
              />
            </div>
            <div className="p-header">
              <div className="ph-top">
                <img
                  src={tradesStore.trade.userFrom.avatar}
                  className="ph-avatar"
                />
                <div className="ph-rating">
                  <StarRatingComponent
                    name="ph-rating"
                    starCount={5}
                    editing={false}
                    renderStarIcon={() => <Star/>}
                    value={tradesStore.trade.userFrom.rating}
                  />
                </div>
              </div>
              <div className="ph-bottom">
                <div className="ph-username">{tradesStore.trade.userFrom.username}</div>
                <div className="ph-location">
                  <Location/>
                  <span className="phl-text">{tradesStore.trade.userFrom.location}</span>
                </div>
              </div>
            </div>
            <button onClick={this.handleToPlace} className="btn btn-lg btn-primary btn-block btn-trade">Let's Trade!</button>
          </section>
        </div>
      );
    } else {
      return (
        <TradePlace tradesStore={tradesStore} />
      )
    }
  }
}
FullOffer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
