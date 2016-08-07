import React, { Component } from 'react'
import './App.css'
import { range } from 'lodash'
import Pull from '..'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className='App'>
				<Pull/>
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
