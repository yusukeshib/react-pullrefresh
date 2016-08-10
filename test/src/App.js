import React, { Component } from 'react'
import './App.css'
import { range } from 'lodash'
import Pull from '../..'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.onPull = this.onPull.bind(this)
	}
	onPull(next) {
		setTimeout(_ => {
			next()
		},2000)
	}
	componentDidMount() {
	}
	render() {
		let { disabled } = this.state
		return (
			<div className='App'>
				<Pull disabled={disabled} size={40} zIndex={1000} max={160} onPull={this.onPull} />
				<button onClick={_=>{
					this.setState({
						disabled:!disabled
					})
				}}>Toggle:{disabled?'disabled':'enabled'}</button>
				<div className='rows'>
					{range(100).map(i => {
						return (
							<div key={i} className='row'>{i}</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default App
