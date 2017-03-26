import { Component } from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import styles from './LayoutWrapper.styles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class LayoutWrapper extends Component {

  render() {
    const title = this.props.title || 'The Title'
    return <View
      style={styles.root}
    >
      <View
        style={styles.statusbar}
      >
      </View>
      {/* <View style={styles.navbar}>
        <TouchableWithoutFeedback >
          <View style={styles.navbarLeft}>
            <Text style={{color:'#ffffff'}}>
              <Icon name={"gear"} size={22} color2="#900"/>
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback >
          <View style={styles.navbarCenter} >
            <Text style={{color:'#ffffff'}}>
              {title}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.navbarRight}>
            <Text style={{color:'#ffffff'}}>
              <Icon name={"gear"} size={22} color2="#900"/>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View> */}
      <View
        style={styles.body}
      >
        {this.props.children}
      </View>
    </View>
  }
}
