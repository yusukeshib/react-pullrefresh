import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import './animation.css'
import defaultStyle from './style'
import PullHelper from './pullhelper'
import { view, svg, path, circle } from './components'
import transform from './transform'

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
  }
  componentDidMount() {
    this.pullhelper = new PullHelper(findDOMNode(this.refs.scrollElement))
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
        if(!onRefresh || step * 0.6 < max) {
          next()
          return
        }
        that.setState({
          pulled: true,
          loading:true
        })
        onRefresh(_ => {
          that.setState({
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
    const { base, children, zIndex, style, size, max } = this.props
    const { pulled, stepback, pulling, loading, step } = this.state
    const scale = pulled ? Math.min(1, step / max) : 1
    const top = pulled && step > 0 ? max - size - 6 : Math.min(step * 0.6, max) - size - 6
    return (
      <div style={style}>
        {children && React.cloneElement(React.Children.only(children), {
          ref: 'scrollElement'
        })}
        { pulling && <div
          style={{
            ...defaultStyle.cover,
            zIndex: zIndex
          }}
        /> }
        <div style={{
          ...defaultStyle.container,
          zIndex: zIndex,
          top: top,
        }}>
          <div
            style={{
              ...style,
              ...defaultStyle.component,
              height: size,
              borderRadius: size / 2,
              transform: transform([
                { translateY: pulled && !loading ? -30 : 0 },
                { scaleX: scale },
                { scaleY: scale }
              ]),
              ...(pulled && loading && { animation: 'pulled 0.4s ease-out forwards' })
            }}
          >
            <svg
              style={{
                margin: (size - 30) / 2,
                opacity: step / max,
                transform: transform([
                  { rotate: `${step / max * 360}deg` }
                ]),
                ...(loading && { animation: 'rotating 1.4s ease-in-out infinite' })
              }}
              width={30}
              height={30}
              viewBox='0 0 30 30'
            >
              { !pulled &&
                  <path
                    fill='#000'
                    d='M13.3,15L7.1,8.9L0.9,15'
                  />
              }
              <circle
                style={{
                  transformOrigin: 'center',
                  ...(loading && { animation: 'dash 1.4s ease-in-out infinite' })
                }}
                stroke='#000'
                strokeDasharray={Math.PI * 8}
                strokeDashoffset={0}
                fill='none'
                strokeWidth={2}
                cx={15}
                cy={15}
                r={8}
              />
            </svg>
          </div>
        </div>
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
  max: 120,
  style: {}
}
