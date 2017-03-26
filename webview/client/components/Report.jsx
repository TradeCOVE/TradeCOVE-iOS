import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import { Link } from 'react-router';
import Plus from 'react-icons/lib/fa/plus-square';
import Close from 'react-icons/lib/md/close';
import Right from 'react-icons/lib/fa/chevron-right';
import { RadioGroup, Radio } from 'react-radio-group';
import FullSingleOffer from './FullSingleOffer';
import Header from './App';
import { toJS } from 'mobx'

@observer
export default class Report extends Component {
  componentWillUnmount() {
    this.props.offersStore.clearOffer();
  }
  handleChangeReport = (e) => {
    this.props.offersStore.changeReport(e.target.value);
  }
  handleSendReport = () => {
    const { offersStore } = this.props;
    if (offersStore.validReport) {
      offersStore.sendReport();
      this.context.router.push('/profile');
    }
  }
  render() {
      const { offersStore } = this.props;
      return (
        <div>
          <Header title="Report Item" close closeAction={() => this.context.router.push('/profile')}/>
          <section className="tags-page" style={{ marginTop: 60 }}>
            <div className="report-item">
              <img src={offersStore.images && offersStore.images[0]} className="ri-img"/>
              <div className="ri-title">{offersStore.title || 'Loading...'}</div>
              <div className="ri-username">{offersStore.user && offersStore.user.username || 'Loading...'}</div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>Why are reporting this item?</div>
            <div className="form-group">
              <textarea className="form-control" value={offersStore.report} onChange={this.handleChangeReport} rows="5" placeholder="Input text here..."/>
            </div>
            <div className='tags-footer'>
              <div onClick={this.handleSendReport} className="btn btn-link next">Report <Right/></div>
            </div>
          </section>
        </div>
      );
  }
}
Report.contextTypes = {
  router: React.PropTypes.object.isRequired
};
