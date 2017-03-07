import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Pull from '../src'
import { range } from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.refs.pull.refresh()
  }
  onRefresh(next) {
    console.log('onRefresh called')
    setTimeout(next, 2000)
  }
  componentDidMount() {
    this.refs.pull.refresh()
  }
  render() {
    return (
      <Pull
        ref='pull'
        offset={80}
        zIndex={10000}
        onRefresh={this.onRefresh}
      >
        <div
          style={{
            marginTop: 80,
            overflow: 'auto',
            height: window.innerHeight
          }}
        >
          {range(100).map(i => {
            return (
              <div key={i} style={{
                backgroundColor: '#eee',
                padding: 10,
                borderBottom: '1px solid #ccc'
              }}>{i}</div>
            )
          })}
          <div
            onClick={this.onClick}
            style={{
              position: 'fixed',
              right: 40,
              top: 20,
              background: '#ccc',
              color: '#000',
              fontSize: 12,
              padding: 10
            }}>
            Click to refresh
          </div>
        </div>
      </Pull>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
