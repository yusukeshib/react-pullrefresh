import React, { PropTypes, Component } from 'react'
import defaultStyle from './style'
import PullHelper from './pullhelper'
import { Div, Svg, Path, Circle } from './components'
import transform from './transform'
import animation from './animation'

export default class PullRefresh extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 0
    }
    this.pullhelper = new PullHelper()
  }
  abort() {
    this.pullhelper.abort()
  }
  refresh() {
    const { max } = this.props
    this.pullhelper.pull(max / 0.6 + 1)
  }
  componentDidMount() {
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
            pulled: false,
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
    let { children, disabled } = this.props
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
    const { color, offset, base, children, zIndex, style, size, max } = this.props
    const { pulled, stepback, pulling, loading, step } = this.state
    const scale = Math.min(1, step / max)
    const top = pulled && step > 0 ? max - size - 6 : Math.min(step * 0.6, max) - size - 6
    return (
      <Div style={style}>
        { this.pullhelper.render(children) }
        { pulling && <Div
          style={{
            ...defaultStyle.cover,
            zIndex: zIndex
          }}
        /> }
        { step > 0 &&
        <Div style={{
          ...defaultStyle.container,
          zIndex: zIndex,
          top: offset + top
        }}>
          <Div
            style={{
              ...defaultStyle.component,
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: transform([
                { scaleX: scale },
                { scaleY: scale }
              ])
            }}
          >
            <Svg
              style={{
                margin: (size - 30) / 2,
                opacity: step / max,
                transform: transform([
                  { rotate: `${step / max * 360}deg` }
                ]),
                ...animation(loading && 'rotating 1.4s ease-in-out infinite')
              }}
              width={30}
              height={30}
              viewBox='0 0 30 30'
            >
              { !pulled &&
                  <Path
                    fill={color}
                    d='M13.3,15L7.1,8.9L0.9,15'
                  />
              }
              <Circle
                style={{
                  transformOrigin: 'center',
                  ...animation(loading && 'dash 1.4s ease-in-out infinite')
                }}
                stroke={color}
                strokeDasharray={[Math.PI * 8]}
                strokeDashoffset={0}
                fill='none'
                strokeWidth={2}
                cx={15}
                cy={15}
                r={8}
              />
            </Svg>
          </Div>
        </Div>
        }
      </Div>
    )
  }
}

PullRefresh.propTypes = {
  offset: PropTypes.number,
  size: PropTypes.number,
  max: PropTypes.number,
  style: PropTypes.object,
  color: PropTypes.string
}

PullRefresh.defaultProps = {
  color: '#000000',
  offset: 0,
  size: 40,
  max: 100,
  style: {}
}
