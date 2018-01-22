import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Easing, Animated, View } from 'react-native'
import {
  Svg as NativeSvg,
  Circle as NativeCircle,
  Path as NativePath
} from 'react-native-svg'

class RotatingSvg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      r: new Animated.Value(0),
      value: 0
    }
  }
  componentDidMount() {
    this.state.r.addListener(r => {
      this.setState({ value: r.value })
    })
    this._animated = Animated.loop(
      Animated.timing(this.state.r, {
        easing: Easing.linear,
        toValue: 270,
        duration: 1400
      })
    )
    this._animated.start()
  }
  componentWillUnmount() {
    this._animated.stop()
  }
  render() {
    const { value } = this.state
    const { style, ...props } = this.props
    return (
      <NativeSvg
        style={{
          ...(style || {}),
          transform: [...(style.transform || []), { rotate: `${value}deg` }]
        }}
        {...props}
      />
    )
  }
}

class DashedCircle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotate: new Animated.Value(0),
      dash: new Animated.Value(62)
    }
  }
  componentDidMount() {
    this.state.rotate.addListener(r => {
      this.setState({ r: r.value })
    })
    this.state.dash.addListener(d => {
      this.setState({ d: d.value })
    })
    this._animated = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.rotate, {
            toValue: 135,
            duration: 700
          }),
          Animated.timing(this.state.rotate, {
            toValue: 450,
            duration: 700
          })
        ]),
        Animated.sequence([
          Animated.timing(this.state.dash, {
            toValue: 62 / 4,
            duration: 700
          }),
          Animated.timing(this.state.dash, {
            toValue: 62,
            duration: 700
          })
        ])
      ])
    )
    this._animated.start()
  }
  componentWillUnmount() {
    this._animated.stop()
  }
  render() {
    const { r, d } = this.state
    const { strokeDasharray, style, ...props } = this.props
    return (
      <NativeCircle
        {...props}
        strokeDashoffset={d}
        strokeDasharray={[62]}
        style={{
          ...(style || {}),
          transform: [...(style.transform || []), { rotate: `${r}deg` }]
        }}
      />
    )
  }
}

const Container = styled(View)`
  position: absolute;
  left: 50%;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  shadow-radius: 2;
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.14;
  shadow-color: #000;
`

export default (props, children) => {
  const { color, bgColor, max, yRefreshing, y, phase } = props
  const p = Math.atan(y / max)
  const pMax = Math.atan(yRefreshing / max)
  const r = Math.PI * 10 * 2
  const Svg = phase === 'refreshing' ? RotatingSvg : NativeSvg
  const Circle = phase === 'refreshing' ? DashedCircle : NativeCircle
  const refreshed = phase === 'refreshed'
  return [
    children,
    <Container
      key="pull"
      style={{
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * max - 10,
        transform: [
          { translateX: -20 },
          { translateY: -40 },
          { scale: refreshed ? p : 1 }
        ],
        backgroundColor: bgColor
      }}
    >
      <Svg
        style={{
          transform: [
            { rotate: `${yRefreshing * 0.05}deg)` },
            // 0 270
            { rotate: `${yRefreshing * 0.05}deg)` }
          ]
        }}
        width={40}
        height={40}
        viewBox="0 0 40 40"
      >
        <Circle
          style={{ opacity: pMax }}
          stroke={color}
          strokeWidth={2.5}
          strokeDasharray={[r * pMax * 0.6, r * (1 - pMax * 0.6)]}
          strokeDashoffset={-r * (1 - pMax * 0.6)}
          fill="none"
          cx={20}
          cy={20}
          r={8.5}
        />
        {phase !== 'refreshing' && (
          <NativePath
            style={{
              opacity: pMax,
              transform: [{ scale: Math.min(pMax, 1) }]
            }}
            fill={color}
            d="M23.5,19l5,5l5-5H23.5z"
          />
        )}
      </Svg>
    </Container>
  ]
}
