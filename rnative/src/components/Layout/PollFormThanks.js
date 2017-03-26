import React, { Component } from 'react'
import { View, Text, SegmentedControlIOS, ListView, StatusBar, TextInput, AlertIOS , StyleSheet, Modal, WebView, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import Button from '@components/Button'
import HtmlButton from '@components/HtmlButton'


class PollFormThanks extends Component {

  render() {
    const poll = this.props.poll
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    var innerContainerTransparentStyle =  {backgroundColor: '#fff', padding: 20, width: 300, alignSelf: 'center'}
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };


    return (
      <View>
        <Modal
          animationType='none'
          transparent={true}
          visible={true}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              {this.props.children}

            </View>
          </View>
        </Modal>

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


export default PollFormThanks
