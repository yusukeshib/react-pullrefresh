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
		let { disabled,onPull,max } = this.props
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
		if(disabled) {
			pullhelper.pause()
		}
	}
	componentWillReceiveProps(nextProps) {
		let { disabled } = this.props
		if(disabled !== nextProps.disabled) {
			if(nextProps.disabled) {
				pullhelper.pause()
			} else {
				pullhelper.resume()
			}
		}
	}
	componentWillUnmount() {
		pullhelper.unload()
	}
	render() {
		let { pulling,loading,pulled } = this.state
		let maxPull = this.props.max || MAX_DEFAULT
		let size = this.props.size || 30
		let style = this.props.style || {}
		return (
			<div>
				<div style={{
					display:pulling ? 'block' : 'none',
					position:'fixed',
					top:0,
					left:0,
					right:0,
					bottom:0,
					zIndex:this.props.zIndex,
					userSelect:'none'
				}} />
				<div style={assign({
					background:'white',
					width: size,
					height: size,
					position:'fixed',
					zIndex:this.props.zIndex,
					top:-size+Math.min(pulled,maxPull),
					left:'50%',
					borderRadius:size/2,
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
