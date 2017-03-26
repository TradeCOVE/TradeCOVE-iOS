import React, { Component } from 'react';
import {Link} from 'react-router';
import Left from 'react-icons/lib/fa/arrow-circle-left';
import Search from 'react-icons/lib/md/search';
import Send from 'react-icons/lib/md/send';
import moment from 'moment';
import AppState from '../stores/AppState';
import { observer } from 'mobx-react';
import { when, toJS } from 'mobx';
import Header from './App';

@observer
export default class FullMessage extends Component {
  componentWillUnmount() {
    this.props.messagesStore.clearMessages();
  }
  handleChangeMessage = (e) => {
    this.props.messagesStore.changeMessage(e.target.value);
  }
  handleSendMessage = () => {
    const { messagesStore } = this.props;
    if (messagesStore.validMessage) {
      messagesStore.sendMessage(messagesStore.user._id);
    }
  }
  handleAccept = (id, tradeId) => {
    AppState.api.setTradeCompleted(tradeId, AppState.user._id).then((res) => {
      this.props.messagesStore.changeMessages(id)
    })
  }
  render() {
    const { messagesStore } = this.props;
    console.log(toJS(messagesStore.messages));
    if (!messagesStore.user) return false;
    return (
      <div>
        <Header title={messagesStore.user && messagesStore.user.username} leftAction={() => this.context.router.push('/messages')}/>
        <section className="messages-page">
          <div className="m-content">
            {messagesStore.messages && messagesStore.messages.map((message) => (
              <div key={message._id} className={`mc-block ${message.from._id === AppState.user._id ? 'me' : 'them'}`}>
                <div className={`mc-block ${message.from._id === AppState.user._id ? 'from-me' : 'from-them'}`}>
                  {message.text}
                  {message.trade && (
                    <div className="m-trade">
                      <div className="mt-date">{moment(message.trade.finishedAt).format('MM/DD/YYYY @ h:mmA')}</div>
                      {message.trade.safespot && ( <b>{message.trade.safespot.title}</b>)}
                      {message.trade.safespot && message.trade.safespot.address && <p>{message.trade.safespot.address}</p>}
                      <button
                        onClick={this.handleAccept.bind(this, message._id, message.trade._id)}
                        className="btn btn-default btn-block btn-sm"
                        disabled={message.trade.status === 'COMPLETED'}
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="m-send">
            <input className="form-control m-textbox" placeholder="Input your message" value={messagesStore.message} onChange={this.handleChangeMessage}/>
            <button className="btn btn-default btn-sub" onClick={this.handleSendMessage} ><Send/></button>
          </div>
        </section>
      </div>
    );
  }
}
FullMessage.contextTypes = {
  router: React.PropTypes.object.isRequired
};
