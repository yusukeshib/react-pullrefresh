import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import './animation.css'
import defaultStyle from './style'
import PullHelper from './pullhelper'

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
  }
  componentDidMount() {
    this.pullhelper = new PullHelper(this.refs.scrollElement)
    const { disabled, onRefresh, max } = this.props
    let that = this

    this.pullhelper
      .on('start', function(step) {
        that.setState({
          pulled: false,
          pulling: true
        })
      })
      .on('stepback', function(step, next) {
        next(step * 0.8)
      })
      .on('step', function(step) {
        that.setState({
          step:step
        })
      })
      .on('pull', function(step, next) {
        that.setState({
          pulling:false
        })
        if(!onRefresh || step < max) {
          next()
          return
        }
        that.setState({
          loading:true
        })
        onRefresh(_ => {
          that.setState({
            pulled: true,
            loading:false
          })
          next()
        })
      })
      .load()
    if(disabled) {
      this.pullhelper.pause()
    }
  }
  componentWillReceiveProps(nextProps) {
    let { disabled } = this.props
    if(disabled !== nextProps.disabled) {
      if(nextProps.disabled) {
        this.pullhelper.pause()
      } else {
        this.pullhelper.resume()
      }
    }
  }
  componentWillUnmount() {
    this.pullhelper.unload()
  }
  render() {
    const { children, zIndex, style, size, max } = this.props
    const { pulled, stepback, pulling, loading, step } = this.state
    const scale = pulled ? Math.min(1, step / max) : 1
    const top = pulled ? max - size - 6 : Math.min(step, max) - size - 6
    return (
      <div>
        { pulling && <div
          style={{
            ...defaultStyle.cover,
            zIndex: zIndex
          }}
        /> }
        <div
          style={{
            ...style,
            ...defaultStyle.component,
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: `translate(-${size / 2}px, 0px) scale(${scale}, ${scale})`,
            zIndex: zIndex,
            ...({ top: top })
          }}
        >
          <svg
            style={{
              margin: (size - 30) / 2,
              opacity: step / max,
              transform: `rotate(${step / max * 360}deg)`,
              ...(loading && { animation: 'rotating 1.4s ease-in-out infinite' })
            }}
            width={30} height={30}
            viewBox='0 0 30 30'
          >
            <circle
              style={{
                stroke: '#787878',
                strokeDasharray: 2 * Math.PI * 10,
                strokeDashoffset: 15,
                transformOrigin: 'center',
                ...(loading && { animation: 'dash 1.4s ease-in-out infinite' })
              }}
              fill='none'
              strokeWidth={2.5}
              cx={15}
              cy={15}
              r={10}
            />
          </svg>
        </div>
        {children && React.cloneElement(React.Children.only(children), {
          ref: 'scrollElement'
        })}
      </div>
    )
  }
}

PullRefresh.propTypes = {
  size: PropTypes.number,
  max: PropTypes.number,
  style: PropTypes.object
}

PullRefresh.defaultProps = {
  size: 40,
  max: 100,
  style: {}
}
