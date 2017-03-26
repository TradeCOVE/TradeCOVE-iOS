import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link }  from 'react-router';
import Star from 'react-icons/lib/md/star';
import Location from 'react-icons/lib/md/add-location';
import Right from 'react-icons/lib/fa/chevron-right';
import StarRatingComponent from 'react-star-rating-component';
import Header from './App';
import cn from 'classnames';
import Slider from 'react-slick';

@observer
export default class ReviewTrade extends Component {
  handleAccept = () => {
    this.props.offersStore.changeAcceptTrade();
  }
  handleSubmit = () => {
    this.props.offersStore.createTrade(this.context.router);
  }
  render() {
    const settings = {
      dots: false,
      arrows: false,
      autoplay: false,
      draggable: true,
      swipe: true,
    };
    const { offersStore, review } = this.props;
    if (!offersStore.user) return false;
    if (review) {
      return (
        <div>
          <Header title="Review your trade" close
                  closeAction={() => this.context.router.push('/feed')}/>
          <section className="tags-page" style={{marginTop: 60}}>
            <div className="fo-trade">
              <h3>You offer:</h3>
              <div className='d-block' style={{ textAlign: 'left' }}>
              {offersStore.selectedOffer.map((item, i) => (
                <img
                  src={item.images[0]}
                  className="fot-img"
                  style={{ width: 150, height: 150, objectFit: 'cover', padding: 10 }}
                />
              ))}
              </div>
              <h3>for and with...</h3>
              <img
                src={offersStore.images[0]}
                className="fot-img"
              />
            </div>
            <div className="p-header">
              <div className="ph-top">
                <img
                  src={offersStore.user.avatar}
                  className="ph-avatar"
                />
                <div className="ph-rating">
                  <StarRatingComponent
                    name="ph-rating"
                    starCount={5}
                    editing={false}
                    renderStarIcon={() => <Star/>}
                    value={offersStore.user.rating}
                  />
                </div>
              </div>
              <div className="ph-bottom">
                <div className="ph-username">{offersStore.user.username}</div>
                <div className="ph-location">
                  <Location/>
                  <span className="phl-text">{offersStore.user.location}</span>
                </div>
              </div>
            </div>
            <div className='tags-footer'>
              <div className="btn btn-link back">
                <input type="checkbox" checked={offersStore.acceptTrade} onClick={this.handleAccept} id="accept"/>
                <label htmlFor="accept">I Accept</label>
              </div>
              <div onClick={offersStore.acceptTrade && this.handleSubmit} className={cn({
                "btn": true,
                "btn-link": true,
                "next": true,
                "disabled": !offersStore.acceptTrade
              })}>
                Submit offer<Right/></div>
            </div>
          </section>
        </div>
      );
    }
  }
}
ReviewTrade.contextTypes = {
  router: React.PropTypes.object.isRequired
};
