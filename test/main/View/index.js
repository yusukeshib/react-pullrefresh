import React, { Component, PropTypes } from 'react'

class View extends Component {
  render() {
    let { children, ...other } = this.props
    return (
      <div {...other}>
        { children }
      </div>
    )
  }
}
export default View
