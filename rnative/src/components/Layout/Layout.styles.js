/* @flow */

import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: {
     backgroundColor:'#ebeef0',
     flex: 1,
  },
  statusbar: {
    backgroundColor:'#46b624',
    height: 20,
  },
  supernavbar: {
    flexDirection:'row',
    backgroundColor:'#46b624',
    height: 60,
  },

  supernavbarText: {
    color: '#ffffff',
  },
  supernavbarButton: {
    backgroundColor:'#fff',
    color:'#46b624',
  },

  supernavbarLeft: {
    flex: 1,
    paddingLeft: 12,
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    // alignItems: 'left',
    justifyContent: 'center',
  },
  supernavbarCenter: {
    flex: 1,
    // textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,

  },
  supernavbarRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 12,
  },



  navbar: {
    flexDirection:'row',
    backgroundColor:'#46b624',
    height: 44,
  },
  navbarText: {
    color: '#ffffff',
  },
  navbarLeft: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
  navbarCenter: {
    flex: 1,
    // textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,

  },
  navbarCenterLogo: {
    padding: 12,
    backgroundColor: 'red'
  },
  navbarRight: {
    justifyContent: 'center',
    padding: 12,
  },
  navbarRightButton: {
    backgroundColor: 'red'
  },
  tabs: {
    flexDirection:'row',
    backgroundColor:'#46b624',

    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsInner: {
    width: 500
  },
  body: {
    flex: 1,
    backgroundColor:'#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c8c7cc',
    paddingLeft: 12,
    paddingRight: 12,

  },
  imageWrapper: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    // backgroundColor: 'green',
    alignSelf: 'stretch'
  },
  bodyCenter: {
    flex: 1,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bodyCenterText: {
    fontSize: 20,
    color: '#a1a1a3',
  },
  reload: {
    paddingTop:20,
    paddingBottom:20,
  },
  reloadButton: {
    backgroundColor:'#f09628',
  },
  footer: {
    paddingBottom: 12
  },
  footerButton: {
    backgroundColor:'#f09628',
  },
  keyboardSpace: {
    height: 395
  },
});
