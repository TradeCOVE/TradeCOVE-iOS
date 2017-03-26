import React, { Component } from 'react'
import { View, Text, SegmentedControlIOS, ListView, StatusBar, TextInput, AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import Button from '@components/Button'
import styles from './PostForm.styles.js'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  async submit() {
    // console.log('submit', AlertIOS)
    // this.props.test()
    //
    if(!this.state.text){
      return false
    }
    const post = {}
    post[this.context.lang === 'en' ? 'en' : 'ru'] = this.state.text
    this.context.api
    .postCreate(post)
    .then(data => {
      AlertIOS.alert(this.context.word('Thank you'), this.context.word('Your question was sent'))
      this.setState({
        text: ''
      })
    })
    .catch(err => {
      // AlertIOS.alert(this.context.word('Error'), JSON.stringify(err))
    })

    // AlertIOS.alert(
    //   'Alert Title',
    //   'qweqweqweqwe'
    // }
  }
  render() {




    return <View style={styles.root}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{this.context.word('YOUR QUESTION')}</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder={this.context.word('Enter your question...')}
          value={this.state.text}
          onChangeText={(text) => {
            this.setState({text});
          }}
          selectionColor={"green"}
          returnKeyType="send"
          blurOnSubmit={true}
          autoCorrect2={false}
          onFocus={() => this.props.onChange('focus')}
          onBlur={() => this.props.onChange('blur')}
          onSubmitEditing={() => this.submit()}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={{width:200}}>
          <Button style={styles.button} onPress={() => this.submit()}>{this.context.word('Send')}</Button>
        </View>
      </View>
    </View>
  }
}

PostForm.contextTypes = {
  api: React.PropTypes.object,
  lang: React.PropTypes.string,
  word: React.PropTypes.func,
};

// const mapStateToProps = () => ({})
// const mapDispatchToProps = (dispatch) => {
//   return {
//     test: () => {
//       console.log('test123123123')
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
export default PostForm
