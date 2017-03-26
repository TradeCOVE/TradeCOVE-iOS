import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Right from 'react-icons/lib/fa/chevron-right';
import AppState from '../stores/AppState';

@observer
export default class EditSteps extends Component {
  componentDidMount() {
    AppState.user.getAllInterests();
  }
  handleSelected = (id) => {
    if (AppState.user.interestIds.includes(id)) {
      AppState.user.removeInterest(id);
    } else {
      AppState.user.selectInterest(id);
    }
  }
  render() {
    const { user } = AppState;
    return (
      <section className="tags-page">
        <h2>Edit you interests...</h2>

        <div className="tags-container">
          {user.allInerests && user.allInerests.map((interest) => {
            return (
              <button
                key={interest._id}
                onClick={this.handleSelected.bind(this, interest._id)}
                className={`btn btn-lg btn-success tag ${user.interestIds.includes(interest._id) && 'active'}`}
              >
                {interest.title}
              </button>
            );
          })}
        </div>

        <div className='tags-footer'>
          <Link to="/profile" className="btn btn-link back">Cancel</Link>
          <Link to="/profile" className="btn btn-link next">MyCOVE <Right/></Link>
        </div>
      </section>
    );
  }
}
