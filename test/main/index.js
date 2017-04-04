import React, { Component } from 'react'
import View from './View'
import PullRefresh from 'react-pullrefresh'
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
      <PullRefresh offset={80} onRefresh={this.onRefresh}>
        <View style={{
          overflow: 'auto',
          backgroundColor:'#ff0',
          width: Window.innerWidth,
          height: Window.innerHeight
        }}>
          <View style={{
            backgroundColor:'#f00',
            width: Window.innerWidth,
            height: Window.innerHeight*3
          }}/>
        </View>
      </PullRefresh>
    )
  }
}
