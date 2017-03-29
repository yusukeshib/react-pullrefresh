import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Main from './main'

export default class Test extends Component {
  render() {
    return (<Main/>)
  }
}

AppRegistry.registerComponent('test', () => Test)
