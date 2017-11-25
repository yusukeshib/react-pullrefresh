import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { clamp } from 'lodash'

const styles = StyleSheet.create({
  comp: {
    width: '100%',
    backgroundColor: 'gray',
    overflow: 'hidden',
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
  },
  text: {
    color: 'white'
  }
})

export default (props, state, children) => [
  <View
    key='pull'
    style={StyleSheet.flatten([
      styles.comp,
      state.refreshing && styles.refreshing,
      state.refreshed && styles.refreshed,
      state.willRefresh && styles.willRefresh,
      { height: clamp(state.y, 0, props.max) }
    ])}
  >
    <Text style={styles.text}>
      { state.refreshing && 'refreshing :' }
      { state.refreshed && 'refreshed :' }
      { state.willRefresh && 'willRefresh :' }
      { parseInt(state.y, 10) }
    </Text>
  </View>,
  children
]


