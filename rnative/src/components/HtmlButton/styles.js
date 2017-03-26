/* @flow */

import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    // paddingLeft: 4,
    // paddingRight: 4,
    // backgroundColor: '#f09628',
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#f09628',
  },
  button: {
    paddingLeft: 4,
    paddingRight: 4,
    // backgroundColor: '#f09628',
    backgroundColor:'#46b624',
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#f09628',
  },
  inner: {
    height: 100,
    backgroundColor: '#f09628',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  numberWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  number: {
    fontSize: 33,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  textWrapper: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 19,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
})
