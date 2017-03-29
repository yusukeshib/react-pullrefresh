import React, { Component } from 'react'
import View from './View'
import PullRefresh from '../src'
import Window from './window'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onRefresh = this.onRefresh.bind(this)
  }
  onRefresh(next) {
    setTimeout(next, 3000)
  }
  render() {
    return (
      <PullRefresh onRefresh={this.onRefresh}>
        <View style={{
          backgroundColor:'#ff0',
          width: Window.innerWidth,
          height: Window.innerHeight
        }}/>
      </PullRefresh>
    )
  }
}
