import React, { PropTypes, Component } from 'react'
import { Text, View as NativeView, ScrollView as NativeScrollView } from 'react-native'

export default class View extends Component {
  render() {
    const { children, style, ...others } = this.props
    const Comp = style.overflow === 'auto' ? NativeScrollView : NativeView
    const st = Object.keys(style).reduce((v, key) => {
      if(key !== 'overflow') v[key] = style[key]
      return v
    }, {})
    return (
      <Comp style={st} {...others}>
        {children}
      </Comp>
    )
  }
}
