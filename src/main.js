import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import defaultStyle from './style'
import AnimationFrame from './animationframe'
import ScrollElement from './scroll'
import transform from './transform'
import { Div, Svg, Circle, Path } from './components'
import Rotatable from './rotatable'
const global = global || window

const STROKEDASHARRAY = [Math.PI * 8]

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y: 0,
      step: 0,
      width: 0
    }
    this._y = 0
    this._step = 0
    this._touch = false
    this._lock = false
    this._loop = this._loop.bind(this)
    this._scrollElement = new ScrollElement()
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onStep = this.onStep.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.setElement = this.setElement.bind(this)
    this._animator = new AnimationFrame()
    this._animator.on('frame', this._loop)
  }
  _loop() {
    const { loading } = this.state
    if(!this._mounted || this._step <= 0) {
      this._lock = false
      this._animator.stop()
      return
    }
    if(loading) {
    } else {
      const nextStep = this._step * 0.8
      this._step = Math.floor(nextStep)
      this.onStep(this._step)
    }
  }
  abort() {
    this._lock = false
    this._step = 0
    this._touch = false
  }
  onPull(step, next) {
    const { max, onRefresh } = this.props
    const that = this
    if(!onRefresh || step * 0.6 < max) {
      that._lock = false
      next()
      return
    }
    that.setState({
      loading:true
    })
    onRefresh(_ => {
      that._lock = false
      if(!that._mounted) return
      that.setState({
        loading:false
      })
      next()
    })
    next()
  }
  pull(step) {
    if(this._lock) return

    this._step = step
    this.onStep(this._step)
    this._lock = true
    this.onPull(this._step, () => {
      this._touch = true
      this._animator.start()
    })
  }
  onTouchStart(evt) {
    const { disabled } = this.props
    if(disabled) return
    if(this._lock) return
    const e = evt.nativeEvent || evt
    this._y = e.touches ? e.touches[0].pageY : e.pageY
    this._started = false
    this._step = -this._scrollElement.scrollTop
    this._touch = true

    if(!e.touches && this._scrollElement.scrollTop === 0) {
      this._started = true
      evt.preventDefault()
      evt.stopPropagation()
      return false
    }
  }
  onTouchEnd(evt) {
    const { disabled } = this.props
    if(disabled) return
    if(this._lock) return
    let that = this
    that._started = false
    that._lock = true
    that.onPull(that._step, () => {
      that._touch = false
      this._animator.start()
    })
    return true
  }
  onTouchMove(evt) {
    const { disabled } = this.props
    if(disabled) return
    if(this._lock) return
    const e = evt.nativeEvent || evt
    let y = e.touches ? e.touches[0].pageY : e.pageY
    let step = this._touch ? this._step + y - this._y : 0
    if(this._touch && step !== this._step) {
      this._step = step
      this._y = y
      if(this._scrollElement.scrollTop === 0) {
        this._started = true
      }
      if(this._started) {
        this.onStep(Math.max(0, this._step))
      }
    }
  }
  refresh() {
    const { max } = this.props
    this.pull(max / 0.6 + 1)
  }
  onStep(step) {
    this.setState({ step })
  }
  componentDidMount() {
    this._mounted = true
  }
  componentWillUnmount() {
    this._mounted = false
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props
    const currentState = this.state
    return false
      || nextState.loading !== currentState.loading
      || nextState.step !== currentState.step
      || nextProps.offset !== currentProps.offset
      || nextProps.zIndex !== currentProps.zIndex
      || nextProps.max !== currentProps.max
      || nextProps.color !== currentProps.color
      || nextProps.size !== currentProps.size
  }
  setElement(element) {
    this._scrollElement.element = element
  }
  onScroll(evt) {
    this._scrollElement.onScroll(evt)
  }
  render() {
    const { offset, zIndex, max, color, size } = this.props
    const { width, step, loading } = this.state
    const top = Math.min(step * 0.6, max) - size - 6
    const scale = Math.min(1, step / max)
    if(step <= 0) return false
    return (
      <Div style={{
        ...defaultStyle.component,
        width: size,
        height: size,
        borderRadius: size / 2,
        zIndex: zIndex,
        padding: (size - 30) / 2,
        top: offset + top,
        transform: transform([
          { scaleX: scale },
          { scaleY: scale }
        ])
      }}>
      <Rotatable offset={step} disabled={!loading}>
      <Svg
        width={30}
        height={30}
        viewBox='0 0 30 30'
      >
        { !this._lock && !loading &&
            <Path
              fill={color}
              d='M13.3,15L7.1,8.9L0.9,15'
            />
        }
        <Circle
          style={{
            transformOrigin: 'center'
          }}
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
      </Rotatable>
    </Div>
    )
  }
}

PullRefresh.propTypes = {
  offset: PropTypes.number,
  size: PropTypes.number,
  max: PropTypes.number,
  color: PropTypes.string
}

PullRefresh.defaultProps = {
  color: '#000000',
  offset: 0,
  size: 40,
  max: 100
}
