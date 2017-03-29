import React, { Component } from 'react'
import { View } from 'react-native'
import NativeSvg, { Path as NativePath, Circle as NativeCircle } from 'react-native-svg'

export class Div extends Component {
  render() {
    return (<View {...this.props}/>)
  }
}
export class Svg extends Component {
  render() {
    return (<NativeSvg {...this.props}/>)
  }
}
export class Path extends Component {
  render() {
    return (<NativePath {...this.props}/>)
  }
}
export class Circle extends Component {
  render() {
    return (<NativeCircle {...this.props}/>)
  }
}
