import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
import { Text, TextInput, AlertIOS, View, WebView, TouchableWithoutFeedback, AsyncStorage, Image } from 'react-native'
import Button from '@components/Button'
import styles from './AuthLayout.styles'


// @connect()
export default class AuthLayout extends Component {

  static contextTypes = {
    api: React.PropTypes.object
  }

  constructor(props, context){
    super()
    this.state = {
      _switch: 'index',
      login: __DEV__ ? 'isuvorov' : null,
      // username: __DEV__ ? 'isuvorov' : null,
      password: __DEV__ ? 'me@coder24.ru' : null,
      loaded: false,
    }
    this.login = this.login.bind(this)
    this.validate = this.validate.bind(this)
    this.signup = this.signup.bind(this)
    this.recovery = this.recovery.bind(this)
    this.loadEnd = this.loadEnd.bind(this)
    this.api = context.api
  }

  login() {
    this.api.authLogin({
      login: this.state.login,
      // username: this.state.login,
      // email: this.state.login,
      password: this.state.password,
    }).then((data) => {
      this.props.onChangeAppState(data)
    }).catch((err) => {
      AlertIOS.alert(
       'Error',
       err.message
      )
    })
  }
  recovery() {
    this.api.authRecovery({
      login: this.state.login,
    }).then((data) => {
      AlertIOS.alert(
       'Successful',
       'We are reset password and send it to your email'
      )
      this.switch('login')
    }).catch((err) => {
      AlertIOS.alert(
       'Error',
       err.message
      )
    })
  }

  signup() {
    this.api.authSignup({
      // login: this.state.login,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      // gender: this.state.gender,
      // firstname: this.state.firstname,
      // lastname: this.state.lastname,
    }).then((data) => {
      this.props.onChangeAppState(data)
    }).catch((err) => {
      AlertIOS.alert(
       'Error',
       err.message
      )
    })
  }


  validate() {
    this.api.authValidate().then((data) => {
      console.log('success', data)
    })
  }

  loadEnd() {
    this.setState({
      loaded: true,
    })
  }


  switch(value) {
    return () => {
      console.log('switch');
      this.setState({
        _switch: value,
        login: '',
        password: '',
        username: '',
        email: '',
      })
    }
  }


  renderIndex(){
    return <View key={0}>
      <Image
        source={require('./trade-logo.png')}
        style={styles.image}
      />
      <Text />
      <View style={styles.button}>
        <Button onPress={this.switch('login')}>Sign in</Button>
      </View>
      <View style={styles.button}>
        <Button onPress={this.switch('signup')}>Sign up</Button>
      </View>
      {/* <View style={styles.button}>
        <Button onPress={this.switch('recovery')}>Forgot your password</Button>
      </View> */}
    </View>
  }

  renderLogin(){
    return <View key={1}>

      <View style={styles.imageWrapper}>
        <Image
          source={require('./trade-logo.png')}
          style={styles.image}
         />
      </View>
      <Text style={styles.text}>Username / Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(login) => this.setState({login})}
        value={this.state.login}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
      />
      <Text></Text>
      <Button onPress={this.login} style={styles.button}>Sign in</Button>
      <Text></Text>
      <Text></Text>
      <Text onPress={this.switch('signup')} style={styles.link}>Sign up</Text>
      <Text onPress={this.switch('recovery')} style={styles.link}>Forgot your password</Text>
    </View>
  }
  renderRecovery(){
    return <View key={2}>

      <Image
        source={require('./trade-logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Username / Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(login) => this.setState({login})}
        value={this.state.login}
      />
      <Text></Text>
      <Button onPress={this.recovery} style={styles.button}>Recovery password</Button>
      <Text></Text>
      <Text></Text>
      <Text onPress={this.switch('signup')} style={styles.link}>Sign up</Text>
      <Text onPress={this.switch('login')} style={styles.link}>Sign in</Text>
    </View>
  }
  renderSignup(){
    return <View key={3}>
      <Image
        source={require('./trade-logo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        secureTextEntry={false}
        style={styles.input}
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
      />
      <Text style={styles.text}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
      />
      <Text></Text>
      <Button onPress={this.signup} style={styles.button}>Sign up</Button>
      <Text></Text>
      <Text></Text>
      <Text onPress={this.switch('login')} style={styles.link}>Sign in</Text>
      <Text onPress={this.switch('recovery')} style={styles.link}>Forgot your password</Text>
    </View>
  }

  renderInner(){
    switch(this.state._switch) {
      case 'login':
        return this.renderLogin()
      case 'signup':
        return this.renderSignup()
      case 'recovery':
        return this.renderRecovery()
      case 'index':
      default:
        return this.renderIndex()

    }
  }

  render(){
    return <View
      style={styles.bodyInner}
    >
      <View style={styles.bodyInnerInner}>
        {this.renderInner()}
      </View>
    </View>
  }
}
