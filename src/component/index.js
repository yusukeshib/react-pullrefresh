import React from 'react'
import { clamp } from 'lodash'

export default (props, state, children) => [
  <div
    key='pull'
    style={{
      width: '100%',
      height: clamp(state.y, 0, props.max),
      backgroundColor: state.refreshing ? 'blue' : state.refreshed ? 'green' : state.willRefresh ? 'red' : 'gray',
      overflow: 'hidden',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    { state.refreshing ? 'refreshing...' : state.refreshed ? 'refreshed' : state.willRefresh ? 'willRefresh' : state.y }
  </div>,
  children
]


