import { AppRegistry, View, Text, } from 'react-native'
import React, { PureComponent } from 'react'

export default class Pure2 extends PureComponent {
  render () {
    return (
      <View style={{ marginTop: 50 }}>
        <Text>Tim is Using Pure RN with PureComponent 2222</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('Pure2', () => Pure)
