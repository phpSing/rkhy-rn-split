import { AppRegistry, View, Text, } from 'react-native'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class ComponentOne extends PureComponent {
  render () {
    const { title, style } = this.props
    return (
      <View style={{ marginTop: 50 }}>
        <Text>{title}</Text>
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


