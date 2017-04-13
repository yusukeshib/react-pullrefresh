import React, { PropTypes, Component } from 'react'
import { Div } from '../components'
import transform from '../transform'
import './style.css'

export default class Rotatable extends Component {
  shouldComponentUpdate(nextProps) {
    const currentProps = this.props
    return false
      || currentProps.offset !== nextProps.offset
      || currentProps.disabled !== nextProps.disabled
      || currentProps.children !== nextProps.children
  }
  render() {
    const { offset, disabled, children } = this.props
    return (
      <Div
        style={{
          transformOrigin: '15px 15px',
          transform: transform([
            { rotate: `${offset * Math.PI}deg` }
          ]),
          ...(disabled ? {} : { animation: 'infinite-spinning 1s infinite linear' })
        }}
      >
        { children }
      </Div>
    )
  }
}

