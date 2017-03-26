/* @flow */

import React from 'react'
import { Navigator } from 'react-native'
import { Router, Route, Schema } from 'react-native-router-flux'
import { styles, methods } from '@components/NavigationBar'
import LauchContainer from '@containers/LauchContainer'
import CounterContainer from '@containers/CounterContainer'
import PostsContainer from '@containers/PostsContainer'
import AppContainer from '@containers/AppContainer'

import AuthLayout from '@containers/AuthLayout'
import WebViewLayout from '@containers/WebViewLayout'




const routes = (
  <Router {...styles} {...methods}>
    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
    <Route name="auth" component={AuthLayout} title="AuthLayout" />
    <Route name="webview" component={WebViewLayout} title="WebViewLayout" />
    {/* <Route name="counter" component={CounterContainer} title="Counter" />
    <Route name="users" component={CounterContainer} title="Users" />
    <Route name="posts" component={PostsContainer} title="Posts" /> */}
  </Router>
)

export default routes
