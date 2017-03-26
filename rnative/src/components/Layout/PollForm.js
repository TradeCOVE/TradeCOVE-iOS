import React, { Component } from 'react'
import { View, Text, SegmentedControlIOS, ListView, StatusBar, TextInput, AlertIOS , StyleSheet, Modal, WebView, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import Button from '@components/Button'
import HtmlButton from '@components/HtmlButton'
// import styles from './PostForm.styles.js'


class PollForm extends Component {
  constructor() {
    super()
    this.state = {
      animationType: 'fade',
      modalVisible: true,
      // modalVisible: false,
      tick: 0,
    }


  }

  init(props){
    var date = new Date();


    this.active = true;
    this.finishedAt = new Date(props.finishedAt);
    this.startedAt = new Date(props.startedAt);
    this.max = this.finishedAt.getTime() - this.startedAt.getTime();

    var value = date.getTime() - this.startedAt.getTime();
    this.value = value < 0 ? 0 : (value > this.max ? this.max : value);
    if (this.value >= this.max) {
      this.onFinish && this.onFinish()
    }
    this.remain = this.max - this.value;

    // if (this.value == null && this.remain && this.max) {
    //   this.value = this.max - this.remain;
    // }

    // if (this.fixedAt == null && !this.active) {
    //   this.fixedAt = currentDate;
    // }


  }

  onFinish(...args){
    // setTimeout(this._setModalVisible.bind(this, false), 1000)
    this.props.onFinish && this.props.onFinish(...args)
  }
  vote(...args){
    this.onFinish(...args)
    // setTimeout(this._setModalVisible.bind(this, false), 1000)
  }
  componentDidMount(){
    this.interval = setInterval(() => {
      this.setState({tick:this.state.tick + 1})
    }, 1000)
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const poll = this.props.poll
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    var innerContainerTransparentStyle =  {backgroundColor: '#fff', padding: 20}
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };

    const lang = this.context.lang

    let active = Date.now() >= +new Date(this.props.poll.startedAt)
    if(this.props.poll.startedAt == null || this.props.poll.finishedAt == null){
      active = false
    }
    if(active){
      this.init(poll)
    }




    let number1 = Math.round(this.remain / 1000);
    disabled = !active
    // if(number > 30 ){
    //   disabled = true
    // }
    // console.log('active', active, 'disabled', disabled, 'number', number)

    let min = Math.floor(number1 / 60)
    let number = number1 - min * 60 
    if (number < 10) {
      number = '0' + number
    }

    const timer = Date.now()

    return (
      <View>
        <Modal
          animationType='none'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>

              {/*<Timer />*/}

              { active && <Text style={[styles.timer, number1 <= 30 ? {color:'#b00'} : {}]}>
                {min}:{number}
                {/*{this.remain} ||
                {this.value} ||
                {this.max} ||
                12:{this.state.tick}*/}
              </Text> }
              <Text style={styles.question}>{poll.title[lang]}</Text>
              <View style={styles.buttons}>
                { poll.options.map( (option, key) => (
                    <View key={key} style={styles.buttonWrapper}>
                      <HtmlButton disabled={disabled} html={option[lang]} onPress={() => { active && this.vote.bind(this)(key) }} style={styles.button}>
                        <Text style={styles.buttonText}>
                          {option[lang]}
                        </Text>
                      </HtmlButton>
                    </View>
                  ))
                }
              </View>

              {/*<HtmlButton html='<b>qweqweqweqw</b> qweqweqweqwe qw eqw eqw ewqe  eqww eq' onPress={this._setModalVisible.bind(this, false)}/>
              <HtmlButton html='<b>qweqweqweqw</b> qweqweqweqwe qw eqw eqw ewqe  eqww eq' onPress={this._setModalVisible.bind(this, false)}/>
              <HtmlButton html='<b>qweqweqweqw</b> qweqweqweqwe qw eqw eqw ewqe  eqww eq' onPress={this._setModalVisible.bind(this, false)}/>*/}
              {/*<Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>*/}
            </View>
          </View>
        </Modal>
        {/*<Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>*/}
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    // height: 44,
    height: 77,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  buttonWrapper: {
    padding: 5,
    flex:1,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 32,
    paddingBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 44,
    textAlign: 'center',
    paddingBottom: 20,
    color: '#ef9624',

  },
  modalButton: {
    marginTop: 10,
  },
});



PollForm.contextTypes = {
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
export default PollForm
