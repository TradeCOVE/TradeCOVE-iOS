import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Star from 'react-icons/lib/md/star';
import AppState from '../stores/AppState';
import Close from 'react-icons/lib/md/close';
import { Modal } from 'react-bootstrap';
import Location from 'react-icons/lib/md/add-location';
import Mail from 'react-icons/lib/fa/envelope-o';
import Flag from 'react-icons/lib/fa/flag-o';
import StarRatingComponent from 'react-star-rating-component';
import Header from './App';
import { range } from 'lodash';
import { Link } from 'react-router'
import { when, toJS } from 'mobx';

@observer
export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      category: [
        {
          name: 'Location',
          active: true,
        },
        {
          name: 'Interests',
          active: false,
        },
        {
          name: 'Friends',
          active: false,
        },
      ]
    }
  }
  componentDidMount() {
    when(
      () => AppState.user._id,
      () => this.props.feedStore.getPostsByCategory(this.state.category[0].name)
    )
  }
  componentWillUnmount() {
    this.props.feedStore.clearFeed();
  }
  handleSelected(index) {
    const { category } = this.state;
    category.map((e) => e.active = false);
    category[index].active = true;
    this.setState({ category });
    this.props.feedStore.getPostsByCategory(category[index].name.toLowerCase());
  }
  handleClose = () => {
    this.setState({ showModal: false });
  }
  handleMoreInfo = (_id) => {
    this.props.feedStore.selectPost(_id);
    this.setState({ showModal: true });
  }
  render() {
    const { category, showModal } = this.state;
    const { feedStore } = this.props;
    return (
      <div>
        <Header title="Newsfeed"/>
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
            {feedStore.posts && feedStore.posts.map((post) => (
              <div key={post._id} className="card">
                <img
                  className="card-image"
                  src={post.images[0]}
                />
                <div className="card-title">{post.title}</div>
                <div className="card-info">
                  <div className="card-user">{post.user.username}</div>
                  <div className="card-rating">
                  <StarRatingComponent
                    name="ph-rating"
                    starCount={5}
                    editing={false}
                    renderStarIcon={() => <Star/>}
                    value={post.user.rating}
                  />
                  </div>
                </div>
                <div className="card-footer">
                  <button onClick={this.handleMoreInfo.bind(this, post._id)} className="btn btn-default btn-sub">More info</button>
                  <Link to={`/newtrade/${post._id}`} className="btn btn-primary">Offer</Link>
                </div>
              </div>
            )) || (
              <div className="card">No offers</div>
            )}
          </div>
        </section>
        <FeedModal store={feedStore} showModal={showModal} close={this.handleClose}/>
      </div>
    );
  }
}
export class FeedModal extends Component {
  render() {
    const { store, showModal, close } = this.props;
    if (!store.selected) return false;
    return (
      <Modal show={showModal} onHide={close}>
        <Modal.Header>
          <Modal.Title>
            {store.selected.title}
            <button onClick={close} className="btn btn-link" style={{ float: 'right', fontSize: 24, marginTop: '-5px', color: 'white' }}><Close/></button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="modal-card" src={store.selected.images[0]}/>
          <div style={{ display: 'table', width: '100%' }}>
            <div style={{ float: 'right', display: 'flex', flexDirection: 'column', height: 110, justifyContent: 'space-around' }}>
              <button className="btn btn-link" style={{ fontSize: 24, color: 'white' }}><Mail/></button>
              <Link to={`/report/${store.selected._id}`} className="btn btn-link" style={{ fontSize: 24, color: 'white' }}><Flag/></Link>
            </div>
            <div className="ph-top">
              <div
                style={{ width: 80, height: 80, backgroundImage: `url(${store.selected.user.avatar})` }}
                className="ph-avatar"
              />
              <div className="ph-rating">
                <StarRatingComponent
                  name="ph-rating"
                  starCount={5}
                  editing={false}
                  renderStarIcon={() => <Star/>}
                  value={store.selected.user.rating}
                />
              </div>
            </div>
            <div className="ph-bottom">
              <div className="ph-username">{store.selected.user.username}</div>
              <div className="ph-location">
                <Location/>
                <span className="phl-text">{store.selected.user.location}</span>
              </div>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 10 }}>
            <textarea className="form-control" value={store.selected.description || 'No description'} rows="5" disabled/>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <div style={{ display:'flex' }}>
          <input
            type="text"
            className="form-control"
            style={{ marginRight: 40 }}
            value={store.selected.condition}
            disabled
          />
          <Link to={`/newtrade/${store.selected._id}`}className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={close}>Offer</Link>
        </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

Feed.contextTypes = {
  router: React.PropTypes.object.isRequired
};
