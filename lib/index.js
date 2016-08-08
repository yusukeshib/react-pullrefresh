import React, { Component } from 'react'
import pullhelper from 'pullhelper'
import './rotate.css'

const MAX_DEFAULT = 100

class Pull extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pulled:0
		}
	}
	componentDidMount() {
		let { onPull,max } = this.props
		let maxPull = max || MAX_DEFAULT
		let that= this
		pullhelper
		.on('step',function(pulled) {
			that.setState({
				pulled:pulled
			})
		})
		.on('pull',function(pulled,next) {
			if(!onPull || pulled < maxPull) {
				next()
				return
			}
			that.setState({
				loading:true
			})
			onPull(_ => {
				that.setState({
					loading:false
				})
				next()
			})
		})
		.init()
	}
	render() {
		let { loading,pulled } = this.state
		let { max } = this.props
		let maxPull = max || MAX_DEFAULT
		return (
			<div style={{
				background:'white',
				width:30,
				height:30,
				position:'fixed',
				top:-30+Math.min(pulled,maxPull),
				left:'50%',
				borderRadius:15,
				transform:'translate(-50%,-50%)',
				boxShadow:'0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
			}}>
				<div style={{
					background:`url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0IDI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6bm9uZTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjQsMHYyNEgwVjAiLz48cGF0aCBkPSJNMTIsNmMtMy4zLDAtNiwyLjctNiw2czIuNyw2LDYsNnM2LTIuNyw2LTZoMmMwLDQuNC0zLjYsOC04LDhzLTgtMy42LTgtOHMzLjYtOCw4LTgiLz48L3N2Zz4K) center center no-repeat`,
					width:30,
					height:30,
					opacity:pulled/maxPull,
					transform:`rotate(${pulled/maxPull*360}deg)`,
					animation:loading ? 'rotating 2s linear infinite' : 'none',
				}} />
			</div>
		)
	}
}

export default Pull
