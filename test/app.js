import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pull from '../src'
import { range } from 'lodash'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Pull zIndex={10000} size={30} max={100} onRefresh={this.onRefresh} />
        <div className='rows'>
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
