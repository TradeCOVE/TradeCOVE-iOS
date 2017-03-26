import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create( {
  root: {
    backgroundColor: '#ebeef0',
    flex: 1,
  },
  statusbar: {
    backgroundColor: '#46b624',
    height: 20,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#46b624',
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
    flexDirection: 'row',
    backgroundColor: '#46b624',

    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsInner: {
    width: 500
  },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c8c7cc',
    paddingLeft: 12,
    paddingRight: 12,

  },
  reload: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  reloadButton: {
    backgroundColor: '#f09628',
  },
  footer: {
    paddingBottom: 12
  },
  footerButton: {
    backgroundColor: '#f09628',
  },
  keyboardSpace: {
    height: 395
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding:10,
  },

  webview: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#f6f6f6',
  },
  webviewLoading: {
    flex: 1,
  },
  webviewBody: {
    flex: 1,
    backgroundColor: '#ebeef0',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: '#c8c7cc',
  },

} );
