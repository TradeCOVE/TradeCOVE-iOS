import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';
import Header from './App';
import AppState from '../stores/AppState'
import StarRatingComponent from 'react-star-rating-component';
import { FeedModal } from './Feed'
import Star from 'react-icons/lib/md/star';

@observer
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: null,
      results: [],
      showModal: false,
    }
  }
  handleChange = (e) => {
    this.setState({ query: e.target.value })
  }
  handleSearch = (e) => {
    if (e.keyCode === 13) {
      AppState.api.searchPostsOnFeed(this.state.query).then((results) => {
        console.log(results);
        this.setState({ results })
      })
    }
  }
  handleClose = () => {
    this.setState({ showModal: false });
  }
  handleMoreInfo = (_id) => {
    this.props.feedStore.selectPost(_id);
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div>
        <Header
          search
          close
          closeAction={() => this.context.router.push('/feed')}
          value={this.state.query}
          onChange={this.handleChange}
          onKeyUp={this.handleSearch}
        />
        <section className="discover-page" style={{ marginTop: 80 }}>
          {this.state.results.length > 0 && this.state.results.map((post) => (
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
                {/* <button onClick={this.handleMoreInfo.bind(this, post._id)} className="btn btn-default btn-sub">More info</button> */}
                <Link to={`/newtrade/${post._id}`} className="btn btn-primary btn-block">Offer</Link>
              </div>
            </div>
          ))}
        </section>
        {/* <FeedModal store={this.props.feedStore} showModal={this.state.showModal} close={this.handleClose}/> */}
      </div>
    );
  }
}
Search.contextTypes = {
  router: React.PropTypes.object.isRequired
};
