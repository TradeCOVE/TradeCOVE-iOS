import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Close from 'react-icons/lib/fa/times-circle';
import Left from 'react-icons/lib/fa/chevron-left';
import AppState from '../stores/AppState';
import AddOffer from './AddOffer';
import Header from './App';
import { toJS } from 'mobx'

@observer
export default class FullSingleOffer extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }
  componentDidMount() {
    const { offersStore, offerId, review } = this.props;
    if (offerId) {
      if (!review) {
        offersStore.loadOffer(offerId);
      }
    }
  }
  handlePosting = () => {
    const { offersStore, offerId } = this.props
    if (offerId) offersStore.setOffer(AppState.user._id, offerId);
    else offersStore.setOffer(AppState.user._id);
  }
  handleEdit = () => {
    this.setState({ edit: true });
  }
  handleDelete = () => {
    const { offersStore, offerId } = this.props;
    offersStore.delOffer(offerId, this.context.router);
  }
  render() {
    const { offersStore, backToEdit, offerId, review } = this.props;
    if (!this.state.edit) {
      return (
        <div>
          <Header title={offersStore.title} close closeAction={() => this.context.router.push('/profile')}/>
          <section className="tags-page offer-add">
            <div className="offer-add-photos">
              {offersStore.images.map((img, i) => (
                <div key={i} className="oap-item" style={{ backgroundImage: `url(${img})` }}/>
              ))}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-lg"
                value={offersStore.title}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-lg"
                value={offersStore.category && offersStore.category.title}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-lg"
                value={offersStore.condition}
                disabled
              />
            </div>
            <div className="form-group">
              <textarea className="form-control" value={offersStore.description} rows="5" disabled/>
            </div>
            <div className='tags-footer'>
              {review && <div onClick={backToEdit} className="btn btn-link back"><Left/> Back</div>}
              {offerId && <div onClick={this.handleDelete} className="btn btn-link skip">delete</div>}
              <div
                onClick={offerId && !review && this.handleEdit || offerId && review && this.handlePosting || this.handlePosting}
                className="btn btn-primary"
              >
                {offerId && !review && 'Edit' || offerId && review && 'Post' || 'Post'}
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <AddOffer offersStore={offersStore} edit={this.state.edit} offerId={offerId}/>
      );
    }
  }
}

FullSingleOffer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
