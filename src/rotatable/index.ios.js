import React, { PropTypes, Component } from 'react'
import { Easing, Animated } from 'react-native'
import transform from '../transform'

export default class Rotatable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      growAnimation: new Animated.Value(0)
    }
    this.spin()
  }
  spin() {
    this.state.growAnimation.setValue(0)
    Animated.timing(this.state.growAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start((animation) => {
      if(animation.finished) this.spin()
    })
  };
  shouldComponentUpdate(nextProps) {
    const currentProps = this.props
    return false
      || currentProps.offset !== nextProps.offset
      || currentProps.disabled !== nextProps.disabled
      || currentProps.children !== nextProps.children
  }
  render() {
    const { growAnimation } = this.state
    const { offset, disabled, children } = this.props
    return (
      <Animated.View
        style={{
          transform: disabled
          ?
          transform([
            { rotate: `${offset * Math.PI}deg` }
          ])
          :
          [{
            rotate: growAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }]
        }}
      >
        { children }
      </Animated.View>
    )
  }
}

