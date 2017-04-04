import React, { Component } from 'react'

export class Div extends Component {
  render() {
    return (<div {...this.props}/>)
  }
}
export class Svg extends Component {
  render() {
    return (<svg {...this.props}/>)
  }
}
export class Path extends Component {
  shouldComponentUpdate(nextProps) {
    return false ||
      this.props.fill !== nextProps.fill ||
      this.props.d !== nextProps.d
  }
  render() {
    return (<path {...this.props}/>)
  }
}
export class Circle extends Component {
  shouldComponentUpdate(nextProps) {
    return false ||
      this.props.style !== nextProps.style ||
      this.props.stroke !== nextProps.stroke ||
      this.props.fill !== nextProps.fill ||
      this.props.cx !== nextProps.cx ||
      this.props.cy !== nextProps.cy ||
      this.props.r !== nextProps.r ||
      this.props.strokeWidth !== nextProps.strokeWidth ||
      this.props.strokeDasharray !== nextProps.strokeDasharray ||
      this.props.strokeDashoffset !== nextProps.strokeDashoffset
  }
  render() {
    return (<circle {...this.props}/>)
  }
}
