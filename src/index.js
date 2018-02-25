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
    const nativeEvent = evt.nativeEvent || evt
    this._scrollTop = evt.currentTarget.scrollTop !== undefined
      ? evt.currentTarget.scrollTop : nativeEvent.contentOffset.y
  }
  onDown(evt) {
    const { phase } = this.state
    if(this._willRefresh) return
    if(phase === 'refreshed' || phase === 'refreshing') return
    this._down = true
    const nativeEvent = evt.nativeEvent || evt
    const ey = nativeEvent.touches ? nativeEvent.touches[0].pageY : evt.pageY
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
    const nativeEvent = evt.nativeEvent || evt
    const ey = nativeEvent.touches ? nativeEvent.touches[0].pageY : evt.pageY
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
      as,
      children,
      ...props
    } = this.props
    const PullRefreshComponent = render
    const Container = as
    return (
      <div>
        <Container
          {...props}
          onScroll    ={disabled ? undefined : ::this.onScroll}
          onMouseDown ={disabled ? undefined : ::this.onDown}
          onMouseUp   ={disabled ? undefined : ::this.onUp}
          onMouseMove ={disabled ? undefined : ::this.onMove}
          onTouchStart={disabled ? undefined : ::this.onDown}
          onTouchEnd  ={disabled ? undefined : ::this.onUp}
          onTouchMove ={disabled ? undefined : ::this.onMove}
        >
          { children }
        </Container>
        { render(this.props, this.state) }
      </div>
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
  render: PropTypes.func,
  zIndex: PropTypes.number
}

PullRefresh.defaultProps = {
  as: 'div',
  style: {},
  disabled: false,
  color: '#4285f4',
  bgColor: '#fff',
  render: renderDefault,
  zIndex: undefined
}
