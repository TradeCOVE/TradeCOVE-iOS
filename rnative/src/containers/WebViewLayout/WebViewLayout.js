import { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, WebView } from 'react-native'
import styles from './WebViewLayout.styles'
import LayoutWrapper from '../LayoutWrapper'
import Api from '@utils/Api'

export class WebViewLayoutError extends Component {
  render() {
    return <View
      style={styles.webviewLoading}
    >
      <Text>Ошибка!!</Text>
    </View>
  }
}

export class WebViewLayoutLoading extends Component {
  render() {
    return <View
      style={styles.webviewLoading}
    >
      <Text>Загрузка</Text>
    </View>
  }
}

export default class WebViewLayout extends Component {

  static contextTypes = {
    api: React.PropTypes.object
  }

  constructor(props, context) {
    super()
    const ts = Date.now()
    this.state = {
      loaded: true,
      // url: __DEV__ ? `http://y.mgbeta.ru:3001/#/`,
      url: __DEV__ ? `http://y.mgbeta.ru:3001?ts=${ts}` : `https://trade2.mgbeta.ru?ts=${ts}`,
      // url: `https://trade2.mgbeta.ru?ts=${ts}`,
    }
    console.log('webview url', this.state.url);
    this.api = context.api
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this)

  }


  sendCoordinates() {
    this.api.setCoordinates({
      lat: 53,
      lng: 49,
    })
    .then(() => {
      console.log('sendCoordinates');
    })
    .catch((err) => {
      console.log('sendCoordinatesv err', err);
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.sendCoordinates()
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // getMessageFromNavigationState
  getMessage(navState) {
    try {
      const encMessage = navState.url.split('#')[1]
      const message = JSON.parse(decodeURIComponent(encMessage).split('#')[1])
      return message
    } catch (err) {
      return null
    }
  }

  onNavigationStateChange(navState) {
    const message = this.getMessage(navState)
    if(message && message.type == 'AUTH_LOGOUT') {
      console.log('AUTH_LOGOUT');
      this.props.onChangeAppState({})
    }
  }

  render() {
    const appstate = {
      userId: this.props.appState.user._id,
      token: this.props.appState.token,
      apiUrl: this.api.base + this.api.prefix,
      user: this.props.appState.user,
      // qweqweqw: 12312312,
      // qweqweqw123: 12312312,
      // qweqweqwdfsdf: 12312312,
      // qweqweqwsdfdfsdfsdf: 12312312,
      // qweqweqwsdfsdfsfdsfd: 12312312,
      // user: this.props.appState.user,
    }
    let jsCode = `
      window.sendMessage = function(message) {
        window.location.hash = [Date.now(), JSON.stringify(message)].join("#");
      };
      window.__INITIAL_STATE__ = ${JSON.stringify({appstate})}
    `;


          //
          // document.querySelector('body').style.backgroundColor = 'red';
    return <View style={{flex:1}}>
      <If condition={!this.state.loaded}>
        <WebViewLayoutLoading />
      </If>
      {/* <Text>!!!</Text> */}
      <WebView
        source={{ uri: this.state.url }}
        // source={{uri: 'http://i.mgbeta.ru:8082/#/steps'}}
        // automaticallyAdjustContentInsets={false}
        onLoadEnd={this.loadEnd}
        // onError={(err) => console.log('errrrr', err)}
        renderError={() => (<WebViewLayoutError />)}
        // scrollEnabled={false}
        // bounces={false}
        automaticallyAdjustContentInsets={false}
        startInLoadingState={false}
        onNavigationStateChange={this.onNavigationStateChange}
        injectedJavaScript={jsCode}
        javaScriptEnabledAndroid={true}
        //
        style={styles.webview}
      />
      {/* <View style={styles.webview}>
        <Text>ViewViewViewView</Text>
      </View> */}
    </View>
  }
}
    //
    //
    // return <View>
    //     <Text style={{display: 'block'}}>Native View</Text>
    //     <Text style={{display: 'block'}}>{this.state.message}</Text>
    //     <Text style={{display: 'block'}}>Web View</Text>
    //     <WebView
    //       automaticallyAdjustContentInsets={false}
    //       style={{height: 400}}
    //       html={html}
    //       onNavigationStateChange={this.onNavigationStateChange}
    //       startInLoadingState={false}
    //     />
    //   </View>
    // }
