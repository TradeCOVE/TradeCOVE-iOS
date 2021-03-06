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
  // navbar: {
  //   flexDirection: 'row',
  //   backgroundColor: '#46b624',
  //   height: 44,
  // },
  // navbarText: {
  //   color: '#ffffff',
  // },
  // navbarLeft: {
  //   justifyContent: 'center',
  //   paddingLeft: 12,
  // },
  // navbarCenter: {
  //   flex: 1,
  //   // textAlign:'center',
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   padding: 12,
  //
  // },
  // navbarCenterLogo: {
  //   padding: 12,
  //   backgroundColor: 'red'
  // },
  // navbarRight: {
  //   justifyContent: 'center',
  //   padding: 12,
  // },
  // navbarRightButton: {
  //   backgroundColor: 'red'
  // },
  // tabs: {
  //   flexDirection: 'row',
  //   backgroundColor: '#46b624',
  //
  //   height: 44,
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  // },
  // tabsInner: {
  //   width: 500
  // },
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c8c7cc',
    paddingLeft: 12,
    paddingRight: 12,

  },
  bodyInner: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // backgroundColor: '#ff0000',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: '#c8c7cc',
    padding: 12,
    // paddingTop: 100,

  },
  bodyInnerInner: {
    // backgroundColor: '#ff0000',
    // width: 400,
    // height: 150,
    paddingBottom: 20,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },

  webview: {
    flex: 1,
    backgroundColor: '#ff0000',
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

  button: {
    marginBottom: 20,
  },
  imageWrapper: {
    marginBottom: 30,
    width: 300,
    //
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
  },
  link: {
    color: '#0000ff',
    fontSize: 16,
    // backgroundColor: '#ff00ff',
    padding: 10,
    // marginBottom: 10,
    textAlign: 'center',

    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#0000ff"
  },

} );
