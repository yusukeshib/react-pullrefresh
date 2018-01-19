import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spring from './spring'
import renderDefault from './component'

const MAX = 100
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      y: 0,
      yRefreshing: 0,
      max: MAX,
      phase: ''
    }
  }
  async refresh() {
    this.setState({
      phase: 'willRefresh'
    })
    await sleep(0)
    await this._refresh()
  }
  async _refresh() {
    const { max, phase } = this.state
    const { onRefresh } = this.props
    if(phase === 'willRefresh') {
      this._willRefresh = true
      await this._spring.to(max)
      this._spring.pause()
      this._willRefresh = false
      this.setState({
        phase: 'refreshing'
      })
      await onRefresh()
      this.setState({
        yRefreshing: 0,
        phase: 'refreshed'
      })
      this._spring.resume()
    }
    this._y = 0
    this._spring.endValue = this._y
  }
  onScroll(evt) {
    this._scrollTop = evt.currentTarget.scrollTop !== undefined
      ? evt.currentTarget.scrollTop : evt.nativeEvent.contentOffset.y
  }
  onDown(evt) {
    const { phase } = this.state
    if(this._willRefresh) return
    if(phase === 'refreshed' || phase === 'refreshing') return
    this._down = true
    const ey = evt.nativeEvent.touches ? evt.nativeEvent.touches[0].pageY : evt.pageY
    this._py = ey
  }
  async onUp(evt) {
    const { phase } = this.state
    if(phase === 'refreshed' || phase === 'refreshing') return
    this._down = false
    await this._refresh()
  }
  onMove(evt) {
    const { phase } = this.state
    if(this._willRefresh || !this._down) return
    if(phase === 'refreshed' || phase === 'refreshing') return
    const ey = evt.nativeEvent.touches ? evt.nativeEvent.touches[0].pageY : evt.pageY
    if(this._scrollTop <= 0) {
      this._y = this._y + ey - this._py
      this._spring.endValue = this._y
    }
    this._py = ey
  }
  onSpringUpdate(spring) {
    const { max, yRefreshing, phase } = this.state
    const y = spring.currentValue
    this.setState({
      y,
      yRefreshing: this._willRefresh ? Math.max(y, yRefreshing) : y
    })
    if(phase !== 'refreshed' && phase !== 'refreshing') {
      const newPhase =  y >= max ? 'willRefresh' : ''
      if(phase !== newPhase) this.setState({ phase: newPhase })
    }
    if(phase === 'refreshed' && y === 0) {
      this.setState({ phase: '' })
    }
  }
  componentDidMount() {
    this._y = 0
    this._scrollTop = 0
    this._spring = new Spring(60, 10)
    this._spring.onUpdate = ::this.onSpringUpdate
  }
  render() {
    const {
      zIndex,
      render,
      bgColor,
      color,
      onRefresh,
      disabled,
      typeName,
      as,
      children,
      onScroll,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onTouchStart,
      onTouchEnd,
      onTouchMove,
      ...props
    } = this.props
    const PullRefreshComponent = render
    const Container = as
    const Wraper = typeName === null ? React.Fragment : typeName
    return (
      <Wraper>
        <Container
          ref='container'
          {...props}
          onScroll    ={(!disabled && ::this.onScroll) || onScroll}
          onMouseDown ={(!disabled && ::this.onDown) || onMouseDown}
          onMouseUp   ={(!disabled && ::this.onUp) || onMouseUp}
          onMouseMove ={(!disabled && ::this.onMove) || onMouseMove}
          onTouchStart={(!disabled && ::this.onDown) || onTouchStart}
          onTouchEnd  ={(!disabled && ::this.onUp) || onTouchEnd}
          onTouchMove ={(!disabled && ::this.onMove) || onTouchMove}
        >
          { children }
        </Container>
        { render(this.props, this.state) }
      </Wraper>
    )
  }
}

PullRefresh.propTypes = {
  typeName: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  as: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  onRefresh: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  render: PropTypes.func,
  zIndex: PropTypes.number
}

PullRefresh.defaultProps = {
  typeName: 'div',
  as: 'div',
  style: {},
  disabled: false,
  color: '#4285f4',
  bgColor: '#fff',
  render: renderDefault,
  zIndex: undefined
}
