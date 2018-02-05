import { AppRegistry, View, Text, } from 'react-native'
import React, { PureComponent } from 'react'

import Comp from '../Component'

import tracker from '../utils/tracker'

export default class Pure extends PureComponent {
  componentDidMount () {
    tracker && tracker()
  }
  render () {
    return (
      <View style={{ marginTop: 50 }}>
        <Text>Tim is Using Pure RN with PureComponent</Text>
        <Comp title="tim change title"></Comp>
      </View>
    )
  }
}

AppRegistry.registerComponent('Pure', () => Pure)
