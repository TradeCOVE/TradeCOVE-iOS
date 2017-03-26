/* @flow */

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Button.styles'

type Props = {
  children: string,
  onPress: Function
}

const Button = (props: Props) => {
  const { children, onPress = () => {} } = props
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.container}
      activeOpacity={0.5}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button
