import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import Main from './main'
import whyDidYouUpdate from 'why-did-you-update'

whyDidYouUpdate(React)

if (module.hot) module.hot.accept()

class Test extends React.Component {
  render() {
    return <Main />
  }
}

ReactDOM.render(<Main/>, document.getElementById('root'))
