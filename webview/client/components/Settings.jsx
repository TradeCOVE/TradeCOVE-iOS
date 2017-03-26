import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Edit from 'react-icons/lib/fa/pencil';
import AppState from '../stores/AppState';
import Header from './App';

@observer
export default class Settings extends Component {
  handleSecureType = (type) => {
    AppState.user.handlePublicType(type);
  }
  handleChangeAbout = (e) => {
    AppState.user.changeField('about', e.target.value);
  }
  handleChangeAvatar = (e) => {
    const data = new FormData();
    data.append('image', e.target.files[0])
    AppState.user.uploadAvatar(data);
  }
  render() {
    const user = AppState.user;
    return (
      <div>
        <Header title="Settings"/>
        <div className="profile-page">
          <div className="p-header">
            <div className="ph-top" style={{ alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ backgroundImage: `url(${user.avatar})` }} className="ph-avatar">
                <div className="file_upload avatar">
                    <button type="button" className="btn btn-link"><Edit/></button>
                    <input type="file" ref="fileUpload" onChange={this.handleChangeAvatar}/>
                </div>
              </div>
              <div style={{ marginTop: 10 }} className="ph-username">{user.username}</div>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
            <div className="form-group">
              <select className="form-control">
                <option>Location</option>
              </select>
            </div>
            <div className="form-group">
              <div className="btn-group btn-group-justified">
                <div className="btn-group">
                  <button onClick={this.handleSecureType.bind(this, true)} type="button" className={`btn btn-default ${user.public && 'active' || ''}`}>Public</button>
                </div>
                <div className="btn-group">
                  <button onClick={this.handleSecureType.bind(this, false)} type="button" className={`btn btn-default ${!user.public && 'active' || ''}`}>Private</button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea onChange={this.handleChangeAbout} className="form-control" rows="3" placeholder="About me" value={user.about || ''}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
