
import React, {Component} from 'react'
import { TouchableOpacity, Text, View, WebView } from 'react-native'
import styles from './styles'


class HtmlButton extends Component {
  render () {
    const { children, html, disabled, ...otherProps } = this.props
    return (
      // TouchableWithoutFeedback
      <TouchableOpacity {...otherProps} activeOpacity={disabled ? 1 : 0.7} style={[styles.button, otherProps.style]} onPress={() => { !disabled && otherProps.onPress && otherProps.onPress()}}>


              {/*<View style={styles.wrapper}>
                <View style={styles.numberWrapper}>
                  <Text style={styles.number}>2</Text>
                </View>
                <View style={styles.textWrapper}>
                  {!children && (<Text style={styles.text}>{html}</Text>)}
                  {children}
                </View>
              </View>*/}






        {!children && (<Text style={styles.text}>{html}</Text>)}
        {/*<Text style={styles.text}>{html}</Text>*/}
        {children}
        {/*<View style={styles.button} >
          <WebView
            style={styles.inner}
             scrollEnabled={false}
             source={{html: html}}
             scalesPageToFit={true}
           />
        </View>*/}
      </TouchableOpacity>
    )
  }
}

 // style={{
 //  //  backgroundColor: 'red',
 //  //  height: 100,
 // }}

/*<TouchableWithoutFeedback onPress={this._setModalVisible.bind(this, true)}>
  <View style={styles.button} >
    <WebView
       style={{
         backgroundColor: 'red',
         height: 100,
       }}
       scrollEnabled={false}
       source={{html: '<b>qweqweqweqw</b> qweqweqweqwe qw eqw eqw ewqe  eqww eq'}}
       scalesPageToFit={true}
     />
  </View>
</TouchableWithoutFeedback>*/

export default HtmlButton
