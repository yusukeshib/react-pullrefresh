import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spring from './spring'
import scrollTop from './scrollTop'
import defaultRender from './component'

export const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y: 0,
      yMax: 0,
      refreshing: false,
      refreshed: false
    }
  }
  onDown(evt) {
    const { refreshed, refreshing } = this.state
    if(refreshed || refreshing) return
    this._down = true
    const ey = evt.touches ? evt.touches[0].pageY : evt.pageY
    this._py = ey
  }
  async onUp(evt) {
    const { y, refreshed, refreshing } = this.state
    const { max, onRefresh } = this.props
    if(refreshed || refreshing) return
    this._down = false
    if(y >= max) {
      this._willRefresh = true
      this._spring.endValue = max
      await sleep(400)
      this._spring.pause()
      this._willRefresh = false
      this.setState({
        refreshing: true
      })
      await onRefresh()
      this.setState({
        yMax: 0,
        refreshed: true,
        refreshing: false
      })
      this._spring.resume()
    }
    if(this._y !== 0) {
      this._y = 0
      this._spring.endValue = this._y
    }
  }
  onMove(evt) {
    const { refreshed, refreshing } = this.state
    if(!this._down || refreshed || refreshing) return
    const ey = evt.touches ? evt.touches[0].pageY : evt.pageY
    if(scrollTop(this) <= 0) {
      this._y = this._y + ey - this._py
      this._spring.endValue = this._y
    }
    this._py = ey
  }
  onSpringUpdate(spring) {
    const { yMax, refreshed } = this.state
    const y = spring.currentValue
    this.setState({
      y,
      yMax: this._willRefresh ? Math.max(y, yMax) : y
    })
    if(refreshed && y === 0) this.setState({ refreshed: false })
  }
  componentDidMount() {
    this._y = 0
    this._spring = new Spring(60, 10)
    this._spring.onUpdate = ::this.onSpringUpdate
  }
  render() {
    const { bgColor, color, onRefresh, disabled, as, children, ...props } = this.props
    const Container = as
    return (
      <Container
        {...props}
        onMouseDown ={!disabled && ::this.onDown}
        onMouseUp   ={!disabled && ::this.onUp}
        onMouseMove ={!disabled && ::this.onMove}
        onTouchStart={!disabled && ::this.onDown}
        onTouchEnd  ={!disabled && ::this.onUp}
        onTouchMove ={!disabled && ::this.onMove}
      >
        { defaultRender(this.props, this.state, children) }
      </Container>
    )
  }
}

PullRefresh.propTypes = {
  as: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  onRefresh: PropTypes.func,
  max: PropTypes.number,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  // offset: PropTypes.number,
  // size: PropTypes.number,
  // waitingComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  // pullingComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  // pulledComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  // supportDesktop: PropTypes.bool
}

PullRefresh.defaultProps = {
  as: 'div',
  max: 100,
  style: {},
  disabled: false,
  color: '#787878',
  bgColor: '#fff',
  // offset: 0,
  // size: 40,
  // waitingComponent: undefined,
  // pullingComponent: undefined,
  // pulledComponent: undefined,
  // supportDesktop: false
}
