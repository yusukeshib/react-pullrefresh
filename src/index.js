import React, { PropTypes, Component } from 'react'
import defaultStyle from './style'
import PullHelper from './pullhelper'
import { Div, Svg, Path, Circle } from './components'
import transform from './transform'
import animation from './animation'

const STROKEDASHARRAY = [Math.PI * 8]

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
    this.pullhelper = new PullHelper()
  }
  abort() {
    this.pullhelper.abort()
  }
  refresh() {
    const { max } = this.props
    this.pullhelper.pull(max / 0.6 + 1)
  }
  componentDidMount() {
    const { disabled, onRefresh, max } = this.props
    let that = this

    this.pullhelper
      .on('start', function(step) {
        that.setState({
          pulled: false,
          pulling: true
        })
      })
      .on('stepback', function(step, next) {
        next(step * 0.8)
      })
      .on('step', function(step) {
        that.setState({
          step:step
        })
      })
      .on('pull', function(step, next) {
        that.setState({
          pulling:false
        })
        if(!onRefresh || step * 0.6 < max) {
          next()
          return
        }
        that.setState({
          pulled: true,
          loading:true
        })
        onRefresh(_ => {
          that.setState({
            pulled: false,
            loading:false
          })
          next()
        })
      })
      .load()
    if(disabled) {
      this.pullhelper.pause()
    }
    this.updateStyle(this.props, this.state, true)
  }
  updateStyle(nextProps, nextState, force) {
    const { step, pulled, loading } = this.state
    const { offset, zIndex, max, size } = this.props
    let ret = false
    if(
      force ||
      nextProps.size !== size ||
      nextProps.max !== max ||
      nextState.step !== step
    ) {
      const scale = Math.min(1, nextState.step / nextProps.max)
      this.setState({
        styleComponent: {
          ...defaultStyle.component,
          width: nextProps.size,
          height: nextProps.size,
          borderRadius: nextProps.size / 2,
          transform: transform([
            { scaleX: scale },
            { scaleY: scale }
          ])
        }
      })
      ret = true
    }
    if(
      force ||
      nextProps.zIndex !== zIndex ||
      nextProps.offset !== offset ||
      nextProps.max !== max ||
      nextProps.size !== size ||
      nextState.pulled !== pulled ||
      nextState.step !== step
    ) {
      const top = nextState.pulled && nextState.step > 0
        ? nextProps.max - nextProps.size - 6
        : Math.min(nextState.step * 0.6, nextProps.max) - nextProps.size - 6
      this.setState({
        styleContainer: {
          ...defaultStyle.container,
          zIndex: zIndex,
          top: offset + top
        }
      })
      ret = true
    }
    if(
      force ||
      nextProps.zIndex !== zIndex
    ) {
      this.setState({
        styleCover: {
          ...defaultStyle.cover,
          zIndex: nextProps.zIndex
        }
      })
      ret = true
    }
    if(
      force ||
      nextState.loading !== loading
    ) {
      this.setState({
        styleCircle: {
          transformOrigin: 'center',
          ...animation(nextState.loading && 'dash 1.4s ease-in-out infinite')
        }
      })
      ret = true
    }
    if(
      force ||
      nextProps.size !== size ||
      nextState.step !== step ||
      nextProps.max !== max ||
      nextState.loading !== loading
    ) {
      this.setState({
        styleSvg: {
          margin: (nextProps.size - 30) / 2,
          opacity: nextState.step / nextProps.max,
          transform: transform([
            { rotate: `${nextState.step / nextProps.max * 360}deg` }
          ]),
          ...animation(nextState.loading && 'rotating 1.4s ease-in-out infinite')
        }
      })
      ret = true
    }
    return ret
  }
  componentWillReceiveProps(nextProps, nextState) {
    let { children, disabled } = this.props
    if(disabled !== nextProps.disabled) {
      if(nextProps.disabled) {
        this.pullhelper.pause()
      } else {
        this.pullhelper.resume()
      }
    }
  }
  componentWillUpdate(nextProps, nextState) {
    return this.updateStyle(nextProps, nextState)
  }
  componentWillUnmount() {
    this.pullhelper.unload()
  }
  render() {
    const { color, offset, base, children, zIndex, style, size, max } = this.props
    const { styleComponent, styleCover, styleContainer, styleSvg, styleCircle, pulled, stepback, pulling, loading, step } = this.state
    return (
      <Div style={style}>
        { this.pullhelper.render(children) }
        { pulling && <Div style={styleCover} /> }
        { step > 0 &&
            <Div style={styleContainer}>
              <Div style={styleComponent}>
                <Svg
                  style={styleSvg}
                  width={30}
                  height={30}
                  viewBox='0 0 30 30'
                >
                  { !pulled && <Path fill={color} d='M13.3,15L7.1,8.9L0.9,15' /> }
                  <Circle
                    style={styleCircle}
                    stroke={color}
                    strokeDasharray={STROKEDASHARRAY}
                    strokeDashoffset={0}
                    fill='none'
                    strokeWidth={2}
                    cx={15}
                    cy={15}
                    r={8}
                  />
                </Svg>
              </Div>
            </Div>
        }
      </Div>
    )
  }
}

PullRefresh.propTypes = {
  offset: PropTypes.number,
  size: PropTypes.number,
  max: PropTypes.number,
  style: PropTypes.object,
  color: PropTypes.string
}

PullRefresh.defaultProps = {
  color: '#000000',
  offset: 0,
  size: 40,
  max: 100,
  style: {}
}
