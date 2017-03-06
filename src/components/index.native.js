import React, { Component } from 'react'
import { View } from 'react-native'
import Svg, { Path, Circle } from 'react-native-svg'

export class div extends Component {
  render() {
    return (<View {...this.props}/>)
  }
}
export class svg extends Component {
  render() {
    return (<Svg {...this.props}/>)
  }
}
export class path extends Component {
  render() {
    return (<Path {...this.props}/>)
  }
}
export class circle extends Component {
  render() {
    return (<Circle {...this.props}/>)
  }
}
