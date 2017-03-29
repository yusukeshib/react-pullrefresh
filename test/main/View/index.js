import React, { Component, PropTypes } from 'react'
import layout from '../layout'
import Style from '../style'

class View extends Component {
  render() {
    let { style, children, ...other } = this.props
    const s = { ...layout.default, ...style}
    let o = Style(s)
    return (
      <div style={o} {...other}>
        { children }
      </div>
    )
  }
}
export default View
