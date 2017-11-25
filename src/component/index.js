import React from 'react'
import { clamp } from 'lodash'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  comp: {
    width: '100%',
    backgroundColor: 'gray',
    overflow: 'hidden',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  refreshing: {
    backgroundColor: 'blue'
  },
  refreshed: {
    backgroundColor: 'green'
  },
  willRefresh: {
    backgroundColor: 'red'
  }
})

export default (props, state, children) => [
  <div
    key='pull'
    className={css(
      styles.comp,
      state.refreshing && styles.refreshing,
      state.refreshed && styles.refreshed,
      state.willRefresh && styles.willRefresh
    )}
    style={{
      height: clamp(state.y, 0, props.max)
    }}
  >
    { state.refreshing && 'refreshing :' }
    { state.refreshed && 'refreshed :' }
    { state.willRefresh && 'willRefresh :' }
    { parseInt(state.y, 10) }
  </div>,
  children
]


