import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { Link } from 'react-router';
import Plus from 'react-icons/lib/fa/plus-square';
import Close from 'react-icons/lib/md/close';
import Right from 'react-icons/lib/fa/chevron-right';
import { RadioGroup, Radio } from 'react-radio-group';
import FullSingleOffer from './FullSingleOffer';
import Header from './App';

@observer
export default class AddOffer extends Component {
  constructor() {
    super();
    this.state = {
      review: false
    }
  }
  handleCondition = (value) => {
    this.props.offersStore.changeCondition(value);
  }
  handleChangeTitle = (e) => {
    this.props.offersStore.changeTitle(e.target.value);
  }
  handleChangeCategory = (e) => {
    const data = {
      _id: e.target.value,
      title: e.target[e.target.selectedIndex].text
    };
    this.props.offersStore.changeCategory(data);
  }
  handleChangeDescription = (e) => {
    this.props.offersStore.changeDescription(e.target.value);
  }
  handleToReview = () => {
    this.setState({ review: true });
  }
  handleFromReview = () => {
    this.setState({ review: false });
  }
  handleLoadImage = (e) => {
    const data = new FormData();
    data.append('image', e.target.files[0])
    this.props.offersStore.uploadImage(data);
  }
  handleRemoveImage = (index) => {
    this.props.offersStore.removeImage(index);
  }
  render() {
    const { offersStore } = this.props;
    if (!this.state.review) {
      return (
        <div>
          <Header title="New offer" close closeAction={() => this.context.router.push('/profile')}/>
          <section className="tags-page offer-add">
            <div className="offer-add-photos">
              {offersStore.images.map((image, i) => (
                <div className="oap-item" key={i} style={{ backgroundImage: `url(${image})` }}>
                  <div className="oap-remove" onClick={this.handleRemoveImage.bind(this, i)}><Close/></div>
                </div>
              ))}
              <div className="file_upload">
                  <button type="button" className="btn btn-link"><Plus/></button>
                  <input type="file" ref="fileUpload" onChange={this.handleLoadImage}/>
              </div>
            </div>
            <div className="help-add-photos">Add up to 5 photos</div>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-lg"
                placeholder="Title"
                value={offersStore.title}
                onChange={this.handleChangeTitle}
              />
            </div>
            <div className="form-group">
              <select className="form-control" onChange={this.handleChangeCategory}>
                {offersStore.categories && offersStore.categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.title}</option>
                )) || <option>No categories</option>}
              </select>
            </div>
            <RadioGroup className="condition-box" name="condition" selectedValue={offersStore.condition} onChange={this.handleCondition}>
              <div className="help-condition-item">Condition:</div>
              <label>
                <Radio value="New"/><span>New</span>
              </label>
              <label>
                <Radio value="Used"/><span>Used</span>
              </label>
            </RadioGroup>
            <div className="form-group">
              <textarea className="form-control" value={offersStore.description} onChange={this.handleChangeDescription} rows="5" placeholder="Description"/>
            </div>
            <div className='tags-footer'>
              <div onClick={this.handleToReview} className="btn btn-link next">Review <Right/></div>
            </div>
          </section>
        </div>
      );
    } else {
      return (
          <FullSingleOffer offersStore={offersStore} offerId={this.props.offerId} review={this.state.review} backToEdit={this.handleFromReview}/>
      );
    }
  }
}
AddOffer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
