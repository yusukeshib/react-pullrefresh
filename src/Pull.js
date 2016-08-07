import React, { Component } from 'react'
import pullhelper from 'pullhelper'
import pullimg from './pull.svg'
import './rotate.css'

const MAX = 100

class Pull extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pulled:0
		}
	}
	componentDidMount() {
		let that= this
		pullhelper
		.on('step',function(pulled) {
			console.log('pulled:',pulled)
			that.setState({
				pulled:pulled
			})
		})
		.on('pull',function(pulled,next) {
			console.log('pull')
			if(pulled < MAX) {
				next()
				return
			}
			that.setState({
				loading:true
			})
			setTimeout(_=>{
				that.setState({
					loading:false
				})
				next()
			},2000)
		})
		.init()
	}
	render() {
		let { loading,pulled } = this.state
		return (
			<div style={{
				background:'white',
				width:30,
				height:30,
				position:'fixed',
				top:-30+Math.min(pulled,MAX),
				left:'50%',
				borderRadius:15,
				transform:'translate(-50%,-50%)',
				boxShadow:'0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
			}}>
				<div style={{
					background:`url(${pullimg}) center center no-repeat`,
					width:30,
					height:30,
					opacity:pulled/MAX,
					transform:`rotate(${pulled/MAX*360}deg)`,
					animation:loading ? 'rotating 2s linear infinite' : 'none',
				}} />
			</div>
		)
	}
}

export default Pull
