import React, { Component } from 'react'
import { View } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'

export class Div extends Component {
  render() {
    return (<View {...this.props}/>)
  }
}
export class Svg extends Component {
  render() {
    return (<Svg {...this.props}/>)
  }
}
export class Path extends Component {
  render() {
    return (<Path {...this.props}/>)
  }
}
export class Circle extends Component {
  render() {
    return (<Circle {...this.props}/>)
  }
}
