import React, { Component } from 'react'
import pullhelper from 'pullhelper'
import './rotate.less'
import image from './pull.svg'
import { assign } from 'lodash'

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
		.on('start',function(pulled) {
			that.setState({
				pulling:true
			})
		})
		.on('step',function(pulled) {
			that.setState({
				pulled:pulled
			})
		})
		.on('pull',function(pulled,next) {
			that.setState({
				pulling:false
			})
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
		.load()
	}
	componentWillUnmount() {
		pullhelper.unload()
	}
	render() {
		let { pulling,loading,pulled } = this.state
		let maxPull = this.props.max || MAX_DEFAULT
		let style = this.props.style || {}
		console.log(pulling)
		return (
			<div>
				<div style={{
					display:pulling ? 'block' : 'none',
					position:'fixed',
					top:0,
					left:0,
					right:0,
					bottom:0,
					zIndex:style.zIndex,
					userSelect:'none'
				}} />
				<div style={assign({
					background:'white',
					width: 30,
					height: 30,
					position:'fixed',
					zIndex:style.zIndex,
					top:-30+Math.min(pulled,maxPull),
					left:'50%',
					borderRadius:(style.width||30)/2,
					transform:'translate(-50%,-50%)',
					boxShadow:'0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
					userSelect:'none'
				},style)}>
					<div style={{
						background:`url(${image}) center center no-repeat`,
						backgroundSize:'100% 100%',
						width:'100%',
						height:'100%',
						opacity:pulled/maxPull,
						transform:`rotate(${pulled/maxPull*360}deg)`,
						animation:loading ? 'rotating 2s linear infinite' : 'none',
					}} />
				</div>
			</div>
		)
	}
}

export default Pull
