import React, { Component } from 'react';
import Slider from 'react-slick';
import StarO from 'react-icons/lib/md/star-outline';
import Star from 'react-icons/lib/md/star';
import Clock from 'react-icons/lib/fa/clock-o';
import Compare from 'react-icons/lib/md/compare-arrows';
import { Link } from 'react-router';
import { find, without } from 'lodash';
import moment from 'moment';
import Header from './App';
import AppState from '../stores/AppState'

export default class Offers extends Component {
  constructor() {
    super();
    this.state = {
      trades: null,
      category: [
        {
          name: 'Sent',
          active: true,
        },
        {
          name: 'Recieved',
          active: false,
        },
        {
          name: 'Completed',
          active: false,
        },
      ]
    }
  }
  componentDidMount() {
    this.getPostsByCategory('sent')
  }
  getPostsByCategory(category) {
    if (category === 'completed') {
      AppState.api.getTradesCompleted(AppState.user._id)
      .then((data) => {
        const accepted = []
        const completed = []
        const expired = []
        data.map((item) => {
          if (item.status === 'ACCEPTED') {
            accepted.push(item)
          } else if (item.status === 'EXPIRED') {
            expired.push(item)
          } else {
            completed.push(item)
          }
        })
        const trades = { accepted, expired, completed }
        console.log(trades);
        this.setState({ trades })
      })
    } else if (category === 'recieved') {
      AppState.api.getTradesRecieved(AppState.user._id)
      .then((trades) => {
        this.setState({ trades })
      })
    } else {
      AppState.api.getTradesSent(AppState.user._id)
      .then((trades) => {
        this.setState({ trades })
      })
    }
  }
  rejectTrade(id) {
    AppState.api.rejectTrade(id, AppState.user._id).then((res) => {
      console.log('rejectTrade', res);
      this.setState({ trades: this.state.trades.filter((item) => item._id !== id) })
    })
  }
  handleSelected(index) {
    const { category } = this.state;
    category.map((e) => e.active = false);
    category[index].active = true;
    this.setState({ trades: null })
    this.getPostsByCategory(category[index].name.toLowerCase());
    setTimeout(() => {
      this.setState({ category });
    }, 200)
  }
  render() {
    const { category, trades } = this.state;
    const settings = {
      dots: false,
      infinite: false,
      arrows: false,
      draggable: true,
      swipe: true,
      variableWidth: true,
    };
    console.log(trades);
    return (
      <div>
        <Header title="Offers"/>
        <section className="feed-page">
          <div className="feed-category">
            <div className="btn-group">
              {category.map((item, index) => (
                <button
                  key={index}
                  onClick={this.handleSelected.bind(this, index)}
                  className={`btn btn-sm btn-default category ${item.active && 'active'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="feed-content">
            {category[0].active && trades && trades.map((trade, index) => (
              <div key={index} className="card offer">
                <div className="offer-body">
                  <div className="ob-head">
                    <img
                      src={trade.offersFrom[0].images[0]}
                      className="offer-img"
                    />
                    <div className="offer-versus">
                      <Compare/>
                    </div>
                    <img
                      src={trade.offerTo.images[0]}
                      className="offer-img"
                    />
                  </div>
                  <div className="ob-info">
                    <div className="obi-left"></div>
                    <div className="obi-right user">{trade.userTo.username}</div>
                  </div>
                </div>
                <div className="offer-buttons">
                  <div className="btn-group">
                    <button className="btn btn-default countdown" disabled>
                      {moment(trade.finishedAt).format('hh:mm:ss')}
                    </button>
                    <button onClick={this.rejectTrade.bind(this, trade._id)}  className="btn btn-default">Cancel</button>
                  </div>
                </div>
              </div>
            ))}
            {category[1].active && trades && trades.map((trade, index) => (
              <div key={index} className="card offer">
                <div className="offer-body">
                  <div className="ob-head">
                    <img
                      src={trade.offersFrom[0].images[0]}
                      className="offer-img"
                    />
                    <div className="offer-versus">
                      <Compare/>
                    </div>
                    <img
                      src={trade.offerTo.images[0]}
                      className="offer-img"
                    />
                  </div>
                  <div className="ob-info">
                    <div className="obi-left user">{trade.userFrom.username}</div>
                    <div className="obi-right date">
                      <span className="obi-icon"><Clock/></span>
                      <span className="obi-text">{moment(trade.finishedAt).format('hh:mm:ss')}</span>
                    </div>
                  </div>
                </div>
                <div className="offer-buttons">
                  <div className="btn-group">
                    <Link to={`offers/${trade._id}`} className="btn btn-default">Accept</Link>
                    <button onClick={this.rejectTrade.bind(this, trade._id)} className="btn btn-default">Decline</button>
                    <button className="btn btn-default">Counter</button>
                  </div>
                </div>
              </div>
            ))}
            {category[2].active && trades && (
              <div className="offers-completed">
                <div className="d-block">
                  <h4>Accepted Offers</h4>
                  <Slider {...settings}>
                    {trades.accepted.length > 0 && trades.accepted.map((trade, index) => (
                      <div key={index}>
                        <div className="card offer" style={{ margin: 5 }}>
                          <div className="offer-body">
                            <div className="ob-head">
                              <img
                                src={trade.offersFrom[0].images[0]}
                                className="offer-img"
                              />
                              <div className="offer-versus">
                                <Compare/>
                              </div>
                              <img
                                src={trade.offerTo.images[0]}
                                className="offer-img"
                              />
                            </div>
                            <div className="ob-info">
                              <div className="obi-left"></div>
                              <div className="obi-right user">{trade.userFrom.username}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="d-block">
                  <h4>Denied/Expired Offers</h4>
                  <Slider {...settings}>
                    {trades.expired.length > 0 && trades.expired.map((trade, index) => (
                      <div key={index}>
                        <div className="card offer" style={{ margin: 5 }}>
                          <div className="offer-body">
                            <div className="ob-head">
                              <img
                                src={trade.offersFrom[0].images[0]}
                                className="offer-img"
                              />
                              <div className="offer-versus">
                                <Compare/>
                              </div>
                              <img
                                src={trade.offerTo.images[0]}
                                className="offer-img"
                              />
                            </div>
                            <div className="ob-info">
                              <div className="obi-left"></div>
                              <div className="obi-right user">{trade.userFrom.username}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="d-block">
                  <h4>Trade History</h4>
                  <Slider {...settings}>
                    {trades.completed.length > 0 && trades.completed.map((trade, index) => (
                      <div key={index}>
                        <div className="card offer" style={{ margin: 5 }}>
                          <div className="offer-body">
                            <div className="ob-head">
                              <img
                                src={trade.offersFrom[0].images[0]}
                                className="offer-img"
                              />
                              <div className="offer-versus">
                                <Compare/>
                              </div>
                              <img
                                src={trade.offerTo.images[0]}
                                className="offer-img"
                              />
                            </div>
                            <div className="ob-info">
                              <div className="obi-left"></div>
                              <div className="obi-right user">{trade.userFrom.username}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
