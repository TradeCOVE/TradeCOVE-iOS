import React, { Component } from 'react';
import Menu from 'react-icons/lib/md/menu';
import Search from 'react-icons/lib/md/search';
import Close from 'react-icons/lib/md/close';
import Back from 'react-icons/lib/fa/arrow-left';
import SidebarContent from './Sidebar';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    }
  }

  onSetOpen = (open) => {
    this.setState({open: open});
  }
  menuButtonClick = (ev) => {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }
  toggleMethod = (ev) => {
    const newState = {};
    newState.open = true;
    this.setState(newState);
  }
  handleToSearch = () => {
    this.context.router.push('/search');
  }
  render() {
    const sidebarContent = <SidebarContent/>;
    const sidebarProps = {
      sidebar: sidebarContent,
      rootClassName: 'root',
      contentClassName: 'content',
      sidebarClassName: 'sidebar',
      overlayClassName: 'overlay',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    }
    return (
      <Sidebar  {...sidebarProps}>
          <header className="header-ios">
           {this.props.leftAction && (
             <button onClick={this.props.leftAction} className="btn btn-link header-menu"><Back/></button>
           ) || (
            //  <Link to="/menu" className="btn btn-link header-menu"><Menu/></Link>
             <button onClick={this.toggleMethod} className="btn btn-link header-menu"><Menu/></button>
           )}
           {this.props.title && <div className="header-title">{this.props.title}</div>}
           {this.props.search && <div className="header-title">
             <div className="form-search search-only" style={{ marginBottom: 0 }}>
               <i className="search-icon" style={{padding: 6}}><Search/></i>
               <input
                 type="text"
                 className="form-control search-query"
                 placeholder="Search..."
                 value={this.props.value}
                 onChange={this.props.onChange}
                 onKeyUp={this.props.onKeyUp}
               />
             </div>
           </div>}
           {this.props.close && (
             <button onClick={this.props.closeAction} className="btn btn-link header-search"><Close/></button>
           ) || (
             <button onClick={this.handleToSearch} className="btn btn-link header-search"><Search/></button>
           )}
          </header>
           {this.props.children}
      </Sidebar>
    );
  }
}
App.contextTypes = {
  router: React.PropTypes.object.isRequired
};
