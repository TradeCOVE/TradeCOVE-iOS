/* @flow */

import React from 'react'
import { View, Text, StyleSheet, ScrollView, SegmentedControlIOS, Image, TextInput, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '@components/Button'
import SegmentedButton from '@components/SegmentedButton'
import PostForm from '@components/PostForm'
import PollForm from './PollForm'
import PollFormThanks from './PollFormThanks'
import PostRow from '@components/PostRow'
import styles from './Layout.styles.js'


class Layout extends React.Component {
  constructor(){
    super()
    this.state = {
      keyboard: false
    }

  }

  onChange(e){
    this.setState({
      keyboard:  e === 'focus'
    })
  }
  render(){
    // console.log(buttons)

    const props = this.props
    const posts = props.posts
    return <View style={styles.root}>
      <View style={styles.statusbar} />
      <View style={styles.supernavbar}>
        <TouchableWithoutFeedback onLongPress={this.props.gotoSettings} delayLongPress={10000}>
          <View style={styles.supernavbarLeft}>
            {this.context.lang === 'en' ? (
              <Image
                source={require('../NavigationBar/logo-en.png')}
                style={{height: 36, width:144}}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('../NavigationBar/logo.jpg')}
                style={{height: 36, width:144}}
                resizeMode="contain"
              />
            ) }
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.props.update} >
          <View style={styles.supernavbarCenter} >
            {
              this.props.start && <SegmentedButton
                  style={styles.supernavbarButton}
                  onPress={() => this.props.changePage(1)}
                >
                  {this.context.word('Ask a question')}
                </SegmentedButton>
            }
            {
              !this.props.start &&
              <SegmentedButton
                style={styles.supernavbarButton}
                onPress={() => this.props.changePage(0)}
              >
                {this.context.word('Homepage')}
              </SegmentedButton>
            }
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={props.toggleLang} >
          <View style={styles.supernavbarRight}>
              <Text style={{color:'#ffffff'}}> { this.context.word('Рус') }</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/*<View style={styles.navbar}>
        <TouchableWithoutFeedback onPress={this.props.gotoSettings} >
          <View style={styles.navbarLeft}>
            <Text style={{color:'#ffffff'}}>
              <Icon name={"gear"} size={22} color2="#900"/>
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.props.update} >
          <View style={styles.navbarCenter} >
              <Image
                source={require('../NavigationBar/logo.jpg')}
                style={{height: 36}}
                resizeMode="contain"
              />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={props.toggleLang} >
          <View style={styles.navbarRight}>
              <Text style={{color:'#ffffff'}}> { this.context.word('Рус') }</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>*/}
      {/*style={{flexDirection: 'row', height: 100, padding: 20}}*/}
      {/*{
        !this.props.start && <View  style={styles.tabs} >
        <View style={styles.tabsInner}>
          <SegmentedControlIOS
            tintColor="#ffffff"
            values={props.buttons || ['1', '2']}
            selectedIndex={props.nav.index}
            onChange={props.nav.onChange}
           />
        </View>
        </View>
      }*/}
      {/*<View style={styles.reload}>
        <Button style={styles.reloadButton} onPress={() => {}}>Показать новые вопросы (12)
          <Icon name="rocket" size={30} color="#900" />
        </Button>
      </View>*/}
      {
        this.props.start && (
          <View style={styles.body}>
             {/*<View style={styles.bodyCenter}>*/}
              <View style={styles.imageWrapper}>
              {this.context.lang === 'en' ? (
                <Image
                  style={styles.image}
                  source={require('./start-en.png')}
                  style={{ width:800, height: 473}}
                  __style={{height: 36, width:144}}
                  __resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.image}
                  source={require('./start-ru.png')}
                  style={{ width:800, height: 473}}
                  __style={{height: 36, width:144}}
                  __resizeMode="contain"
                />
              ) }
              </View>
            {/*</View>*/}
          </View>
        )
      }
      {
        !this.props.start && !!posts.length && <ScrollView style={styles.body}>
          {posts.map(post => <PostRow key={post._id} {...post} title={this.context.lang === 'en' ? post.en : post.ru} onPressLike={props.onPressLike ? () => props.onPressLike(post._id) : null } />)}
        </ScrollView>
      }
      {
        !this.props.start && !posts.length && <View style={styles.body}>
          <View style={styles.bodyCenter}>
            <Text style={styles.bodyCenterText}>
              {/*{ this.context.word('There is no questions yet') }*/}
            </Text>
          </View>
        </View>
      }

      {
        !this.props.start && props.onPressLike && (
          <View style={styles.footer}>
            <PostForm
              lang={this.props.lang}
              onChange={this.onChange.bind(this)}
            />
          </View>
        )
      }
      { this.state.keyboard && (
        <View style={styles.keyboardSpace} />
      )}
      { this.props.poll && (
        <PollForm poll={this.props.poll}  onFinish={this.props.pollVote}  />
      )}
      { this.props.pollThanks && (
        <PollFormThanks >
          <Text style={{textAlign:'center', fontSize: 36}}>{this.context.word('Thank you')}</Text>
          <Text style={{textAlign:'center', fontSize: 24}}>{this.context.word('Your vote has been taken')}</Text>
        </PollFormThanks>
      )}
    </View>
  }
}


Layout.contextTypes = {
  api: React.PropTypes.object,
  lang: React.PropTypes.string,
  word: React.PropTypes.func,
};


export default Layout
