import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pull from '../src'
import { range } from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
  }
  onRefresh(next) {
    setTimeout(next, 2000)
  }
  render() {
    return (
      <div className='App'>
        <Pull zIndex={10000} onRefresh={this.onRefresh} />
        <div
          className='rows'
          style={{
            overflow: 'auto',
            height: window.innerHeight
          }}
        >
          {range(100).map(i => {
            return (
              <div key={i} style={{
                borderBottom: '1px solid #ccc'
              }}>{i}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
