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
  render() {
    return (<path {...this.props}/>)
  }
}
export class Circle extends Component {
  render() {
    return (<circle {...this.props}/>)
  }
}
