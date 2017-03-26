import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import FastClick from 'fastclick';

import AppState from './stores/AppState';
import OffersStore from './stores/OffersStore';
import FeedStore from './stores/FeedStore';
import MessagesStore from './stores/MessagesStore';
import TradesStore from './stores/TradesStore';

import Steps from './components/Steps';
import Search from './components/Search';
import EditSteps from './components/EditSteps';
import Report from './components/Report';
import Similar from './components/Similar';
import Settings from './components/Settings';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Offers from './components/Offers';
import FullOffer from './components/FullOffer';
import CreateTrade from './components/CreateTrade';
import FullSingleOffer from './components/FullSingleOffer';
import AddOffer from './components/AddOffer';
import Friends from './components/Friends';
import Discover from './components/Discover';
import Messages from './components/Messages';
import Safespots from './components/Safespots';
import FullMessage from './components/FullMessage';
import NoMatch from './components/NotFound';
import { when } from 'mobx';
const data = {
  appState: window.__INITIAL_STATE__.appstate,
}

FastClick.attach(document.body);
AppState.createDataStores(data);

class Home extends Component {
  constructor() {
    super();
    this.user = AppState.user;
  }
  componentWillMount() {
    when(
      () => this.user.interestIds,
      () => {
        if(this.user.interestIds.length > 0) {
          this.context.router.push('/feed');
        } else {
          this.context.router.push('/steps');
        }
      }
    )
  }
  render() {
    return (
      <div style={{
        marginTop: 60
      }}>
        <div style={{
          fontSize: 24,
          textAlign: 'center'
        }}>Loading...</div>
      </div>
    );
  }
}
Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

render((
    <Router history={hashHistory}>
      <Route path="/steps" component={Steps}/>
      <Route path="/edit" component={EditSteps}/>
      <Route path="/offers/add" component={({history}) => {
        const offersStore = new OffersStore({history});
        return <AddOffer offersStore={offersStore} />;
      }}/>
      <Route path="/similar" component={Similar}/>
      <Route path="/" component={Home}/>
      <Route path="/feed"  component={() => {
        const feedStore = new FeedStore();
        return <Feed feedStore={feedStore} />;
      }}/>
      <Route path="/profile" component={() => {
        const offersStore = new OffersStore();
        return <Profile offersStore={offersStore} />;
      }}/>
      <Route path="/friends" component={Friends}/>
      <Route path="/discover" component={Discover}/>
      <Route path="/search"  component={() => {
        const feedStore = new FeedStore();
        return <Search feedStore={feedStore} />;
      }}/>
      <Route path="/offers" component={() => {
        const tradesStore = new TradesStore();
        return <Offers tradesStore={tradesStore} />;
      }}/>
      <Route path="/messages" component={() => {
        const messagesStore = new MessagesStore();
        return <Messages messagesStore={messagesStore} />;
      }}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/safespots" component={() => {
        const tradesStore = new TradesStore();
        return <Safespots tradesStore={tradesStore} />;
      }}/>
      <Route path="/report/:id" component={({params}) => {
        const offersStore = new OffersStore({offerId: params.id});
        return <Report offersStore={offersStore} />;
      }}/>
      <Route path="/newtrade/:id" component={({params}) => {
        const offersStore = new OffersStore({offerId: params.id});
        return <CreateTrade offersStore={offersStore} />;
      }}/>
      <Route path="/user/:id" component={({params}) => {
        const offersStore = new OffersStore();
        return <Profile offersStore={offersStore} userId={params.id} />;
      }}/>
      <Route path="/offers/:id" component={({params}) => {
        const tradesStore = new TradesStore({id: params.id});
        return <FullOffer tradesStore={tradesStore} />;
      }}/>
      <Route path="/messages/:id" component={({params}) => {
        const messagesStore = new MessagesStore(params.id);
        return <FullMessage messagesStore={messagesStore} />;
      }}/>
      <Route path="/offer/:id" component={({params, history}) => {
        const offersStore = new OffersStore({history});
        return <FullSingleOffer offerId={params.id} offersStore={offersStore} />;
      }}/>
      <Route path="*" component={NoMatch}/>
    </Router>
), document.getElementById('root'))
