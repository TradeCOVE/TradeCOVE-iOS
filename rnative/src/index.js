import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-native-router-flux'
import ignoreYellowBoxes from '@utils/ignoreYellowBoxes'
import routes from '@routes/app'
import createStore from '@store/create'

ignoreYellowBoxes()
import AppContainer from '@containers/AppContainer'
import AuthLayout from '@containers/AuthLayout'
import GameLayout from '@containers/GameLayout'
import WebViewLayout from '@containers/WebViewLayout'


import {Component} from 'react'
import { View, WebView, Text, StyleSheet, ScrollView, SegmentedControlIOS, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';



const Kernel = () => (
  <Provider store={createStore()}>
    <AppContainer />
    {/* <AuthLayout /> */}
    {/* <WebViewLayout /> */}
    {/* <GameLayout /> */}
    {/*<AppContainer />*/}
    {/* {routes} */}
  </Provider>
)

export default Kernel
