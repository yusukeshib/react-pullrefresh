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
    this.onScroll = this.onScroll.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onSpringUpdate = this.onSpringUpdate.bind(this)
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
    if (this.props.onScroll) {
      this.props.onScroll(evt)
    }
    if (!this.props.disabled) {
      this._scrollTop = evt.currentTarget.scrollTop !== undefined
        ? evt.currentTarget.scrollTop : evt.nativeEvent.contentOffset.y
    }
  }
  onMouseDown(evt) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(evt)
    }
    if (!this.props.disabled && !this.props.disableMouse) {
      this.onDown(evt)
    }
  }
  onTouchStart(evt) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(evt)
    }
    if (!this.props.disabled && !this.props.disableTouch) {
      this.onDown(evt)
    }
  }
  onDown(evt) {
    const { phase } = this.state
    if(this._willRefresh) return
    if(phase === 'refreshed' || phase === 'refreshing') return
    this._down = true
    const ey = evt.nativeEvent.touches ? evt.nativeEvent.touches[0].pageY : evt.pageY
    this._py = ey
  }
  async onMouseUp(evt) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(evt)
    }
    if (!this.props.disabled && !this.props.disableMouse) {
      await this.onUp(evt)
    }
  }
  async onTouchEnd(evt) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(evt)
    }
    if (!this.props.disabled && !this.props.disableTouch) {
      await this.onUp(evt)
    }
  }
  async onUp(evt) {
    const { phase } = this.state
    if(phase === 'refreshed' || phase === 'refreshing') return
    this._down = false
    await this._refresh()
  }
  onMouseMove(evt) {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(evt)
    }
    if (!this.props.disabled && !this.props.disableMouse) {
      this.onMove(evt)
    }
  }
  onTouchMove(evt) {
    if (this.props.onTouchMove) {
      this.props.onTouchMove(evt)
    }
    if (!this.props.disabled && !this.props.disableTouch) {
      this.onMove(evt)
    }
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
    this._spring.onUpdate = this.onSpringUpdate
  }
  render() {
    const {
      zIndex,
      render,
      bgColor,
      color,
      onRefresh,
      disabled,
      disableMouse,
      disableTouch,
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
          onScroll    ={this.onScroll}
          onMouseDown ={this.onMouseDown}
          onMouseUp   ={this.onMouseUp}
          onMouseMove ={this.onMouseMove}
          onTouchStart={this.onTouchStart}
          onTouchEnd  ={this.onTouchEnd}
          onTouchMove ={this.onTouchMove}
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
  as: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
  onRefresh: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  disableMouse: PropTypes.bool,
  disableTouch: PropTypes.bool,
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
  disableMouse: false,
  disableTouch: false,
  color: '#4285f4',
  bgColor: '#fff',
  render: renderDefault,
  zIndex: undefined
}
