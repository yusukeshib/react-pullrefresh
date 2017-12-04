import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import whyDidYouUpdate from 'why-did-you-update'

whyDidYouUpdate(React)
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
