import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
import { Text, View, AsyncStorage } from 'react-native'
import _ from 'lodash'
import LayoutWrapper from '@containers/LayoutWrapper'
import WebViewLayout from '@containers/WebViewLayout'
import AuthLayout from '@containers/AuthLayout'
import Api from '@utils/Api'


class AppContainer extends Component {

  static childContextTypes = {
    api: React.PropTypes.object
  }

  getChildContext() {
   return {
     api: this.api,
   }
  }

  constructor(props) {
    super(props)
    this.state = {
      appState: {},
      loaded: false,
      // loaded: true,
    }
    // AsyncStorage.removeItem('appState')
    this.loadAppState()
    this.onChangeAppState = this.onChangeAppState.bind(this)
    this.api = new Api({
      base: __DEV__ ? 'http://trade.i.mgbeta.ru' : 'https://trade.mgbeta.ru',
      // base: __DEV__ ? 'http://trade.i.mgbeta.ru' : 'https://trade.mgbeta.ru',
      // base: 'https://trade.mgbeta.ru',
      // base: 'http://trade.i.mgbeta.ru',
      // base: 'http://782b4c67.ngrok.io',
      prefix: '/api/v1',
    })
  }

  async loadAppState() {
    let appState = {}
    try {
      appState = JSON.parse(await AsyncStorage.getItem('appState')) || {}
    } catch(err) {
    }
    this.setState({
      appState,
      loaded: true,
    })
  }

  async saveAppState(appState) {
    return await AsyncStorage.setItem('appState', JSON.stringify(appState))
  }

  async onChangeAppState(appState) {
    console.log('onChangeAppState');
    await this.saveAppState(appState)
    this.setState({appState})
    console.log(this.state);
  }

  render() {
    if (this.state.appState) {
      this.api.user = this.state.appState.user
      this.api.authToken = this.state.appState.token
    }

    return <LayoutWrapper>
      <If condition={this.state.loaded}>
        <If condition={!this.state.appState.token}>
          <AuthLayout key={1} onChangeAppState={this.onChangeAppState} />
        </If>
        <If condition={this.state.appState.token}>
          <WebViewLayout key={2}  appState={this.state.appState} onChangeAppState={this.onChangeAppState} />
        </If>
      </If>
      <If condition={!this.state.loaded}>
        <Text>Загрузка AsyncStorage</Text>
      </If>
    </LayoutWrapper>
  }
}
// export default connect()(AppContainer)
export default AppContainer
