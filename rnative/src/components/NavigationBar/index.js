/* @flow */

import React from 'react'
import { StyleSheet, Image, View, Text, Animated } from 'react-native'
import { PRIMARY_COLOR, PRIMARY_COLOR_BLACK } from '@theme/colors'


// navigationBarStyle
// leftButtonStyle
// navigationBarStyle={styles.container}

export const styles = StyleSheet.create({
  // backButtonTextStyle: {
  //
  // },
  leftButtonStyle: {
    color: "#ffffff",
  },
  titleStyle: {
    color: "#ffffff",
  },
  navigationBarStyle: {
    backgroundColor: "#46b624",
    // color: '#ffffff',
  },
})

export const methods = {
  renderTitle: function (childState, index) {
    const title = (this.props.getTitle ? this.props.getTitle(childState) : childState.title) || 'Title';
    // return (
    //  <Animated.Text
    //    key={childState.key}
    //    style={[
    //      this.props.titleStyle,
    //      this.props.navigationState.titleStyle,
    //      childState.titleStyle,
    //      {
    //        opacity: this.props.position.interpolate({
    //          inputRange: [index - 1, index, index + 1],
    //          outputRange: [0, 1, 0],
    //        }),
    //        left: this.props.position.interpolate({
    //          inputRange: [index - 1, index + 1],
    //          outputRange: [200, -200],
    //        }),
    //        right: this.props.position.interpolate({
    //          inputRange: [index - 1, index + 1],
    //          outputRange: [-200, 200],
    //        }),
    //      },
    //    ]}
    //  >
    //    {title}
    //  </Animated.Text>
    // );
    //

    return <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        color: '#ffffff'
      }}>
        {title}
      </Text>
    </View>
  }
}
export default Object.assign({}, styles, methods)
// console.log(styles)
// export default ex
