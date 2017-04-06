import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import defaultStyle from './style'
import AnimationFrame from './animationframe'
import ScrollElement from './scroll'
import transform from './transform'
import { Div, Svg, Circle, Path } from './components'
const global = global || window
import Main from './main'

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  refresh() {
    const { max } = this.props
    this.refs.main.pull(max / 0.6 + 1)
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
        children: React.cloneElement(React.Children.only(props.children), {
          ref: this.refs.main.setElement,
          onTouchStart: this.refs.main.onTouchStart,
          onTouchMove: this.refs.main.onTouchMove,
          onTouchEnd: this.refs.main.onTouchEnd,
          onMouseDown: this.refs.main.onTouchStart,
          onMouseMove: this.refs.main.onTouchMove,
          onMouseLeave: this.refs.main.onTouchEnd,
          onMouseUp: this.refs.main.onTouchEnd,
          onScroll: this.refs.main.onScroll
        })
      })
    }
  }
  render() {
    const { onRefresh, offset, zIndex, max, color, style, size } = this.props
    const { children } = this.state
    return (
      <Div style={{
        ...style,
        ...defaultStyle.container
      }}>
        { children }
        <Main ref='main' offset={offset} size={size} max={max} color={color} onRefresh={onRefresh} />
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
  color: PropTypes.string
}

PullRefresh.defaultProps = {
  color: '#000000',
  offset: 0,
  size: 40,
  max: 100,
  style: {}
}
