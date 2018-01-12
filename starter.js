import React, { Component } from 'react'
import{
  AppRegistry,
  View,
  Text,
  DeviceEventEmitter,
} from 'react-native'

class Starter extends Component {
   constructor(props){
    super(props)
    this.state = {
      content: null,
      showModule: false
    }
    DeviceEventEmitter.addListener("callRNModule", (result) => {
      console.log('rkhy: received event callRNModule', result)
      this.setState({
        content:  require('./src/Pure2'),
        showModule: true
      })
    })
    setTimeout(() => {
      console.log('rkhy: 5 seconds delay')
      DeviceEventEmitter.emit('callRNModule')
      // 五秒后, 异步加载
    }, 5000)
   }
   render(){
      let _content = null
      if (this.state.content){
      //  _content = React.createElement(this.state.content, this.props)
       return this.state.content
      } else {
        return (<Text>后台监听者</Text>)
      }
   }
}

export default Starter
// AppRegistry.registerComponent('rkhyrn', () => Starter)
// AppRegistry.registerComponent('PersonSearch', () => Starter)
// AppRegistry.registerComponent('starter', () => Starter)