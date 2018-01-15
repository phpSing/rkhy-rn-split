import { AppRegistry, View, Text, } from 'react-native'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import {
  is_props_build,
  component_props_title,
  component_props_style
} from './props.json'

export default class ComponentOne extends PureComponent {
  render () {
    const { title, style } = this.props
    return (
      <View style={{ marginTop: 50 }}>
        <Text>{component_props_title || title}</Text>
      </View>
    )
  }
}

ComponentOne.propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOf(['dark', 'light'])
}

ComponentOne.defaultProps = {
  title: 'default title',
  style: 'dark',
}


