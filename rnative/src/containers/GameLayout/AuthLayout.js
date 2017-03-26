/* @flow */
// import { StyleSheet } from 'react-native'
// import { DEFAULT_BACKGROUND_COLOR } from '@theme/colors'
//
// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: DEFAULT_BACKGROUND_COLOR
//   },
// })

import { Component } from 'react'
import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
import { Text, TextInput, AlertIOS, View, WebView, TouchableWithoutFeedback } from 'react-native'
import _ from 'lodash'
import Button from '@components/Button'
import styles from './AuthLayout.styles'
import Icon from 'react-native-vector-icons/FontAwesome';

import Api from '@utils/Api'


@connect()
export default class AuthLayout extends Component {
  constructor(){
    super()
    this.state = {
      username: 'me@coder24.ru',
      password: 'me@coder24.ru',
      loaded: false,
    }
    this.login = this.login.bind(this)
    this.loadEnd = this.loadEnd.bind(this)

    this.api = new Api({
      base: 'http://i.mgbeta.ru',
      // base: 'https://vote.mgbeta.ru',
      // base: 'http://vote.i.mgbeta.ru',
      prefix: '/api/v1',
    })

  }
  login() {
    this.api.setAuth({
      username: this.state.username,
      password: this.state.password,
    })

    console.log(123123)
  }
  loadEnd() {
    console.log('loadEnd')
    this.setState({loaded: true})
  }
  render(){

    return <View
      style={styles.root}
    >
      <View
        style={styles.statusbar}
      >
        <Text>statusbar</Text>
      </View>

      <View style={styles.navbar}>
        <TouchableWithoutFeedback >
          <View style={styles.navbarLeft}>
            <Text style={{color:'#ffffff'}}>
              <Icon name={"gear"} size={22} color2="#900"/>
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback >
          <View style={styles.navbarCenter} >
            <Text style={{color:'#ffffff'}}>
              Вход
            </Text>
              {/*<Image
                source={require('../NavigationBar/logo.jpg')}
                style={{height: 36}}
                resizeMode="contain"
              />*/}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.navbarRight}>
            <Text style={{color:'#ffffff'}}>
              <Icon name={"gear"} size={22} color2="#900"/>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/*<View
        style={styles.body}
      >
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={(username) => this.setState({username})}
          value={this.state.login}
        />
        <Text>password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button onPress={this.login}>Войти</Button>

      </View>*/}
      <View
        style={styles.webviewBody}
      >
        <If condition={!this.state.loaded}>
          <View
            style={styles.webviewLoading}
          >
            <Text>Загрузка</Text>
          </View>
        </If>
        <WebView
          source={{uri: 'http://i.mgbeta.ru:3000/game'}}
          //automaticallyAdjustContentInsets={false}
          onLoadEnd={this.loadEnd}
          renderError={() => (
            <Text>Ошибка</Text>
          )}
          //renderLoading={() => (
          //  <Text>Загрузка</Text>
          //)}
          scrollEnabled={false}
          bounces={false}
          style={this.state.loaded ? styles.webview : {backgroundColor: 'red', flex: 0}}
        />
      </View>
    </View>
  }
}
