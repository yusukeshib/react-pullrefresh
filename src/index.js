import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spring from './spring'
import scrollTop from './scrollTop'
import renderDefault from './component'

const MAX = 100

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y: 0,
      yRefreshing: 0,
      max: MAX,
      refreshing: false,
      refreshed: false
    }
  }
  onDown(evt) {
    const { refreshed, refreshing } = this.state
    if(this._willRefresh || refreshed || refreshing) return
    this._down = true
    const ey = evt.touches ? evt.touches[0].pageY : evt.pageY
    this._py = ey
  }
  async onUp(evt) {
    const { max, willRefresh, refreshed, refreshing } = this.state
    const { onRefresh } = this.props
    if(refreshed || refreshing) return
    this._down = false
    if(willRefresh) {
      this._willRefresh = true
      await this._spring.to(max)
      this._spring.pause()
      this._willRefresh = false
      this.setState({
        willRefresh: false,
        refreshing: true
      })
      await onRefresh()
      this.setState({
        yRefreshing: 0,
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
    if(this._willRefresh || !this._down || refreshed || refreshing) return
    const ey = evt.touches ? evt.touches[0].pageY : evt.pageY
    if(scrollTop(this) <= 0) {
      this._y = this._y + ey - this._py
      this._spring.endValue = this._y
    }
    this._py = ey
  }
  onSpringUpdate(spring) {
    const { max, yRefreshing, refreshed } = this.state
    const y = spring.currentValue
    this.setState({
      y,
      willRefresh: y >= max,
      yRefreshing: this._willRefresh ? Math.max(y, yRefreshing) : y
    })
    if(refreshed && y === 0) this.setState({ refreshed: false })
  }
  componentDidMount() {
    this._y = 0
    this._spring = new Spring(60, 10)
    this._spring.onUpdate = ::this.onSpringUpdate
  }
  render() {
    const { render, bgColor, color, onRefresh, disabled, as, children, ...props } = this.props
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
        { render(this.props, this.state, children) }
      </Container>
    )
  }
}

PullRefresh.propTypes = {
  as: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  onRefresh: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  render: PropTypes.func
  // max: PropTypes.number,
  // offset: PropTypes.number,
  // size: PropTypes.number,
  // waitingComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  // pullingComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  // pulledComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  // supportDesktop: PropTypes.bool
}

PullRefresh.defaultProps = {
  as: 'div',
  style: {},
  disabled: false,
  color: '#787878',
  bgColor: '#fff',
  render: renderDefault
  // max: 100,
  // offset: 0,
  // size: 40,
  // waitingComponent: undefined,
  // pullingComponent: undefined,
  // pulledComponent: undefined,
  // supportDesktop: false
}
