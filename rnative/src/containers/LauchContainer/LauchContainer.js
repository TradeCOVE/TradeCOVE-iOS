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

import React, { Component } from 'react'
import { View, Text, SegmentedControlIOS, ListView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import Container from '@components/Container'
import Title from '@components/Title'
import Link from '@components/Link'
import Button from '@components/Button'
import Layout from '@components/Layout'
import PostForm from '@components/PostForm'
import Api from '@utils/Api'

class LauchContainer extends Component {
  constructor(props) {
    super(props)
    this.update()

    this.state = {
      posts: [],
      navIndex: 0,
      lang: 'ru'
    }

    this.api = new Api({
      base: 'http://vote.i.mgbeta.ru',
      prefix: '/api/v1',
      auth: {
        username: 'p1',
        password: 'qwe123qwe'
      }
    })
  }

  getChildContext() {
   return {api: this.api};
 }

  componentDidMount(){
    this.intervalId = setInterval(() => this.update(), 3000)
    this.update()
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  async update() {
    this.setState({
      posts:await this.api.postList()
    })
  }
  render() {
    // return <div>
    //   123123 123123123
    // </div>
    // {/*onChange={(event) => {
    //    this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
    //  }}*/}
    const nav = {
      index: this.state.navIndex,
      onChange: (event) => {
        this.setState({navIndex: event.nativeEvent.selectedSegmentIndex});
      }
    }

    const posts = _.sortBy(this.state.posts, (post) => {
      if(this.state.navIndex == 0) return  -(+(new Date(post.createdAt)))
      return -post.likes
    })

    return <Layout posts={posts} update={this.update} nav={nav}/>
  }
}

LauchContainer.childContextTypes = {
  api: React.PropTypes.object
};

export default connect()(LauchContainer)
