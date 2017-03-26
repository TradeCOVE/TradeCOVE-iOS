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
// import { connect } from 'react-redux'
// import { Actions } from 'react-native-router-flux'
import { Text, AlertIOS, View } from 'react-native'
import _ from 'lodash'
import styles from './AuthLayout.styles'

// import Layout from '@components/Layout'
// import AuthLayout from '@components/AuthLayout'
// import Api from '@utils/Api'

export default class AuthLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      navIndex: 1,
      lang: 'ru',
      user: null,
      page: 0
    }

    // console.log(global)

  }

  word (key) {
    const messages = {
      'Рус': 'Eng',
      'Send': 'Отправить',
      'YOUR QUESTION': 'ВАШ ВОПРОС',
      'Enter your question...': "Введите текст вопроса...",
      'Last questions': 'Последние вопросы',
      'Popular questions': 'Популярные вопросы',
      'Thank you': 'Спасибо',
      'Your question was sent': 'Ваш вопрос принят',
      'Error': 'Ошибка',
      'Discussed': 'Обсужденные',
      'There is no questions yet': 'Здесь пока нету вопросов',
      'Your vote has been taken': 'Ваш голос был принят',
      'Ask a question': 'Задать вопрос',
      'Homepage': 'Главная',
    }
    return this.state.lang === 'en' ? key : messages[key]
  }
 //  getChildContext() {
 //   return {
 //     api: this.api,
 //     lang: this.state.lang,
 //     word: this.word.bind(this)
 //   };
 // }

  componentDidMount(){
    this.intervalId = setInterval(() => this.update(), 5000)
    this.update()
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  async update() {
    this.update1()
    this.update2()
  }
  async update1() {
    if(this.api && this.api.user){
      this.setState({
        posts:await this.api.postList()
      })
    }
  }
  async update2() {
    if(this.api && this.api.user){
      this.setState({
        screen:await this.api.getScreen(),
        lastPollId: null,
      })
    }
  }

  changePage(page) {
    console.log('changePage(page)', page)
    this.setState({
      page
    })
  }
  toggleLang() {
    const lang = this.state.lang === 'en' ? 'ru' : 'en'
    this.setState({
      lang
    })
  }
  gotoSettings() {
    this.setState({
      user: null
    })
  }
  onLoginClick(i) {

    return (e) => {

      this.api = new Api({
        base: 'https://vote.mgbeta.ru',
        // base: 'http://vote.i.mgbeta.ru',
        prefix: '/api/v1',
        auth: {
          username: 'p' + i,
          password: 'qwe123qwe'
        }
      })
      this.api.chaining.then(e => {
        this.setState({
          user: this.api.user
        })
        this.update()
      })
    }

  }
  updatePost(updatedPost) {
    const posts = _.clone(this.state.posts)
    _.remove(posts, {_id: updatedPost._id})
    posts.push(updatedPost)
    this.setState({
      posts: posts
    }, () => {
      console.log('updatePost', +new Date())

    })
  }
  pollVote(optionIndex = null){
    console.log('pollVote optionIndex', optionIndex)
    const poll = this.state.screen && this.state.screen.data
    if(!poll) {
      console.log('!poll')
      return false
    }
    if(optionIndex === null) {
      console.log('!optionIndex')
      return false
    }
    const optionId = poll.options[optionIndex]._id
    if(!optionId) {
      console.log('!optionId')
      return false
    }
    // console.log('pollVote' + optionId);
    this.api.pollVote(poll._id, optionId).then((data) => {
      this.setState({
        pollThanks: true
      })
      setTimeout(() => {
        this.setState({
          pollThanks: false
        })
      }, 5000)
    }).catch((err) => {
      console.log('POLL ERROR', err)
      this.setState({
        pollThanks: true
      })
      setTimeout(() => {
        this.setState({
          pollThanks: false
        })
      }, 5000)
    })
    this.setState({lastPollId: poll._id})
  }
  async onPressLike(postId) {
    console.log('onPressLike', +new Date())
    const post = _.find(this.state.posts, {_id: postId})
    this.updatePost(Object.assign({}, post, {
      _id: postId,
      likes: post.likes - (post.likedByYou ? 1 : -1),
      likedByYou: !post.likedByYou ,
    }))
    await this.api.postLike(postId, post.likedByYou ? 'remove' : 'add').then((post) => {
      this.updatePost(post)
      // this.update()
    })
  }
  render() {
    const nav = {
      index: this.state.navIndex,
      onChange: (event) => {
        this.setState({navIndex: event.nativeEvent.selectedSegmentIndex});
      }
    }

    let posts
    if(this.state.navIndex == 2){
      posts = _.filter(this.state.posts, (post) => {
        return post.discussedAt
      })
      posts = _.sortBy(posts, (post) => {
        return -(+(new Date(post.discussedAt)))
      })
    }else {
      posts = _.sortBy(this.state.posts, (post) => {
        if(this.state.navIndex == 0) return  -(+(new Date(post.createdAt)))
        return -post.likes
      })
    }



    if (!this.state.user){
      return <AuthLayout
        onLoginClick={this.onLoginClick.bind(this)}
      />
    }
    const props = {}
    props.buttons = [this.word('Last questions'), this.word('Popular questions')];
    if(this.api.user.username == 'p0'){
      props.buttons.push(this.word('Discussed'))
    } else {
      props.onPressLike = this.onPressLike.bind(this)
    }

    let poll = null
    // console.log(poll)
    // console.log('this.api.user', this.api.user)
    //
    if(this.state.screen && this.state.screen.type == 'poll'){
      poll = this.state.screen.data

      if(!(poll.finishedAt == null) && !(poll.startedAt == null)){
        // console.log('inner')
        if(+new Date(poll.finishedAt) < Date.now()){
          poll = null
        }
        // console.log('this.state.lastPoll', this.state.lastPollId, poll && poll._id)
        if(poll && this.state.lastPollId == poll._id){
          poll = null
        }
      }

      if(poll && poll.votes && this.api && this.api.user){
        // console.log('this.api.user._id', this.api.user._id)
        // console.log('poll.votes', poll.votes)
        // console.log('!!poll.votes[this.api.user.id]', !!poll.votes[this.api.user._id])
        if(!!poll.votes[this.api.user._id]){
        // console.log('!!poll.votes[this.api.user.id] ',!!poll.votes[this.api.user._id])
        // console.log('poll bb ', !!poll)
          poll = null
        }
      }

      // if(poll.votes[this.api.user._id]){
      //   console.log('poll.votes[this.api.user._id]', poll.votes[this.api.user._id])
      // }
    }

    // console.log('poll a ', !!poll)
    return <View>
      <Text>asdfsdgdfgg</Text>
    </View>

    return <Layout
      lang={this.state.lang}
      start={this.state.page == 0}
      page={this.state.page}
      changePage={this.changePage.bind(this)}
      posts={posts}
      poll={poll}
      pollVote={this.pollVote.bind(this)}
      pollThanks={this.state.pollThanks}
      gotoSettings={() => this.gotoSettings()}
      toggleLang={() => this.toggleLang()}
      update={() => this.update()}
      nav={nav}
      {...props}
    />


  }


}
//
// AppContainer.childContextTypes = {
//   api: React.PropTypes.object,
//   lang: React.PropTypes.string,
//   word: React.PropTypes.func,
// };
//

// export default connect()(AppContainer)
 // AppContainer
