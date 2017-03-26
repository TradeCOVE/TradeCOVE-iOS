import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Right from 'react-icons/lib/fa/chevron-right';
import AppState from '../stores/AppState';
import _ from 'lodash';
import { toJS } from 'mobx';

@observer
export default class Steps extends Component {
  componentDidMount() {
    AppState.user.getStepsInfo();
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
        <h4>Let's build your profile...</h4>
        <h2>What are you interests?</h2>

        <div className="tags-container">
          {user.allInerests && user.allInerests.map((interest, index) => {
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
          <Link eventName="onTouchTap" to="/similar" className="btn btn-link next">Next <Right/></Link>
        </div>
      </section>
    );
  }
}
