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
      willRefresh: false,
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
    const { refreshed, refreshing, willRefresh } = this.state
    const { max, onRefresh } = this.props
    if(refreshed || refreshing) return
    this._down = false
    if(willRefresh) {
      this._spring.endValue = max
      await sleep(400)
      this._spring.pause()
      this.setState({ willRefresh: false, refreshing: true })
      await onRefresh()
      this.setState({ refreshed: true, refreshing: false })
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
    const { willRefresh, refreshing, refreshed } = this.state
    const { max } = this.props
    const y = spring.currentValue
    this.setState({ y })
    if(refreshed && y === 0) this.setState({ refreshed: false })
    if(!refreshed && !refreshing) {
      const refresh = y >= max
      if(refresh !== willRefresh) this.setState({ willRefresh: refresh })
    }
  }
  componentDidMount() {
    this._y = 0
    this._spring = new Spring(60, 10)
    this._spring.onUpdate = ::this.onSpringUpdate
  }
  render() {
    const { onRefresh, disabled, as, children, ...props } = this.props
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
  disabled: PropTypes.bool
  // offset: PropTypes.number,
  // color: PropTypes.string,
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
  disabled: false
  // color: '#000000',
  // offset: 0,
  // size: 40,
  // waitingComponent: undefined,
  // pullingComponent: undefined,
  // pulledComponent: undefined,
  // supportDesktop: false
}
