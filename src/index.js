import React, { Component } from 'react'
import PropTypes from 'prop-types'
import defaultStyle from './style'
import AnimationFrame from './animationframe'
import ScrollElement from './scroll'
import transform from './transform'
import { Div, Svg, Circle, Path } from './components'
import Main from './main'

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  refresh() {
    const { max } = this.props
    if(this._main) this._main.pull(max / 0.6 + 1)
  }
  componentDidMount() {
    this.updateChildren()
  }
  componentWillReceiveProps(nextProps, nextState) {
    this.updateChildren(nextProps)
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props
    const currentState = this.state
    return false
      || nextState.children !== currentState.children
      || nextProps.onRefresh !== currentProps.onRefresh
      || nextProps.offset !== currentProps.offset
      || nextProps.zIndex !== currentProps.zIndex
      || nextProps.max !== currentProps.max
      || nextProps.color !== currentProps.color
      || nextProps.size !== currentProps.size
      || nextProps.style !== currentProps.style
  }
  updateChildren(nextProps) {
    const currentProps = this.props
    if(
      !nextProps ||
      nextProps.children &&
      nextProps.children !== currentProps.children
    ) {
      const props = nextProps || currentProps
      this.setState({
        children: React.cloneElement(React.Children.only(props.children), this._main && {
          ref: this._main.setElement,
          onTouchStart: this._main.onTouchStart,
          onTouchMove: this._main.onTouchMove,
          onTouchEnd: this._main.onTouchEnd,
          onMouseDown: this._main.onTouchStart,
          onMouseMove: this._main.onTouchMove,
          onMouseLeave: this._main.onTouchEnd,
          onMouseUp: this._main.onTouchEnd,
          onScroll: this._main.onScroll
        })
      })
    }
  }
  render() {
    const { waitingComponent, pullingComponent, disabled, onRefresh, offset, zIndex, max, color, style, size } = this.props
    const { children } = this.state
    return (
      <Div style={{
        ...style,
        ...defaultStyle.container
      }}>
        { children }
        { !disabled && <Main
          ref={c => this._main = c}
          offset={offset}
          size={size}
          max={max}
          color={color}
          onRefresh={onRefresh}
          waitingComponent={waitingComponent}
          pullingComponent={pullingComponent}
        />
        }
      </Div>
    )
  }
}

PullRefresh.propTypes = {
  onRefresh: PropTypes.func,
  offset: PropTypes.number,
  size: PropTypes.number,
  max: PropTypes.number,
  style: PropTypes.object,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  waitingComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
  pullingComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.bool ]),
}

PullRefresh.defaultProps = {
  color: '#000000',
  offset: 0,
  size: 40,
  max: 100,
  style: {},
  disabled: false,
  waitingComponent: undefined,
  pullingComponent: undefined,
}
