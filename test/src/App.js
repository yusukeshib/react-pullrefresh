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
		return (
			<div className='App'>
				<Pull style={{
					width:40,
					height:40,
					zIndex:10
				}} max={160} onPull={this.onPull} />
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
