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
// import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
import { Text, TextInput, AlertIOS, View, WebView } from 'react-native'
import _ from 'lodash'
import Button from '@components/Button'
import styles from './AuthLayout.styles'


export default class AuthLayout extends Component {
  constructor(){
    super()
    this.state = {
      login: 'me@coder24.ru',
      password: 'me@coder24.ru',
    }
    this.login = this.login.bind(this)

  }
  login() {
    console.log(123123)
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
      <View
        style={styles.navbar}
      >
        <Text>NavBar</Text>
      </View>
      <View
        style={styles.body}
      >
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={(login) => this.setState({login})}
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
        <Button onPress={this.validate}>validate</Button>
        {/*<WebView
          source={{uri: 'http://i.mgbeta.ru:3000/'}}
          //automaticallyAdjustContentInsets={false}
          //bounces={false}
          style={styles.webview}
        />*/}
      </View>
    </View>
  }
}
