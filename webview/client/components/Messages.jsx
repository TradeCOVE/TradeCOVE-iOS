import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Right from 'react-icons/lib/fa/chevron-right';
import Left from 'react-icons/lib/fa/chevron-left';
import UserAdd from 'react-icons/lib/fa/user-plus';
import UserDel from 'react-icons/lib/fa/user-times';
import Search from 'react-icons/lib/md/search';
import Header from './App';

@observer
export default class Messages extends Component {
  componentDidMount() {
    this.props.messagesStore.getRooms();
  }
  componentWillUnmount() {
    this.props.messagesStore.clearRooms();
  }
  render() {
    const { messagesStore } = this.props;
    if (!messagesStore.rooms) return false;
    return (
      <div>
        <Header title="Messages"/>
        <section className="messages-page">
          {messagesStore.rooms && messagesStore.rooms.length > 0 && messagesStore.rooms.map((room) => (
            <Link className="msg-link" key={room.user._id} to={`messages/${room.user._id}`}>
              <div className="msg-block">
                <img
                  src={room.user.avatar}
                  className="msg-avatar"
                />
                <div className="msg-info">
                  <div className="msg-username">{room.user.username}</div>
                  <div className="msg-lastmsg">{room.message.text}</div>
                </div>
              </div>
            </Link>
          )) || (
            <div className="msg-block">No messages</div>
          )}
        </section>
      </div>
    );
  }
}
