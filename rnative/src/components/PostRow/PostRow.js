import React from 'React'
import { View, Text, StyleSheet, ScrollView, SegmentedControlIOS, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';



const sourse = (src) => {
  if (src === 'sms') return 'at'
  if (src === 'email') return 'at'
  if (src === 'ipad') return 'tablet'
  return 'comments-o'
}

const PostRow = (props) => {
  return <View key={props.id} style={{borderBottomWidth: 1, borderBottomColor:    '#c8c7cc', height: 67, flexDirection: 'row', alignItems: 'center'}}>
    <Text style={{width:38, textAlign: 'center'}}>
      {props.likes}
    </Text>
    <Text style={{width:38, textAlign: 'center'}}>
      <Icon name={sourse(props.sourse)} size={22} color2="#900" />
    </Text>
    <Text style={{flex: 1}}>
      {props.title}
    </Text>
    {props.onPressLike && (
      <Text style={{width:38, textAlign: 'center'}} onPress={() => props.onPressLike()}>
        <Icon name={props.likedByYou ? "thumbs-up" : "thumbs-o-up"} size={22} color2="#900" color={props.likedByYou ? "#f09628" : "#c8c7cc"} />
      </Text>
    )}
  </View>
}

export default PostRow
