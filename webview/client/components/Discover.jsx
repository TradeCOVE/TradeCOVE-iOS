import React, { Component } from 'react';
import { Link } from 'react-router';
import Search from 'react-icons/lib/md/search';
import Slider from 'react-slick';
import Header from './App';
import AppState from '../stores/AppState'

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      nearUsers: [],
      nearOffers: [],
      hotItems: [],
    }
  }
  componentDidMount() {
    AppState.api.getDiscover(AppState.user._id).then((res) => {
      console.log(res);
      this.setState({...res})
    })
  }
  render() {
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
      centerMode: false,
      draggable: true,
      lazyLoad: false,
      swipe: true,
      variableWidth: true,
    };
    return (
      <div>
        <Header title="Discover"/>
        <section className="discover-page">
          <div className="form-search search-only d-search">
            <i className="search-icon" style={{padding: 6}}><Search/></i>
            <input
              type="text"
              className="form-control search-query"
              placeholder="Search..."
            />
          </div>
          <div className="d-block" style={{ height: 150 }}>
            <h4>Connect with others</h4>
            {this.state.nearUsers.length > 0 && (
              <Slider {...settings}>
                {this.state.nearUsers.map((slide) => (
                  <div key={slide._id} className="db-pane">
                    <img src={slide.avatar} className="dbp-img"/>
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div className="d-block" style={{ height: 150 }}>
            <h4>Recent trades near you</h4>
            {this.state.nearOffers.length > 0 && (
              <Slider {...settings}>
                {this.state.nearOffers.map((slide) => (
                  <div key={slide._id} className="db-pane">
                    <img src={slide.images[0]} className="dbp-img"/>
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div className="d-block" style={{ height: 150 }}>
            <h4>Hot Items</h4>
            {this.state.hotItems.length > 0 && (
              <Slider {...settings}>
                {this.state.hotItems.map((slide) => (
                  <div key={slide._id} className="db-pane">
                    <img src={slide.images[0]} className="dbp-img"/>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </section>
      </div>
    );
  }
}
