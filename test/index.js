import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main'

if (module.hot) module.hot.accept()

class Test extends React.Component {
  render() {
    return <Main />
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'))
