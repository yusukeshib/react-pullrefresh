import { findDOMNode } from 'react-dom'

export default class ScrollElement {
  constructor(element) {
    if(!element) element = document ? document.body : null
    if(element) this._element = findDOMNode(element)
  }
  get element() {
    return this._element
  }
  get dispatcher() {
    if(document && document.body === this._element) return document
    return this._element
  }
  get scrollTop() {
    if(!this._element) return 0
    return this._element.scrollTop
  }
  addScrollEventListener(listener) {
    if(!this.dispatcher) return
    this.dispatcher.addEventListener('scroll', listener)
  }
  removeScrollEventListener(listener) {
    if(!this.dispatcher) return
    this.dispatcher.removeEventListener('scroll', listener)
  }
  addEventListener() {
    if(!this._element) return
    return this._element.addEventListener.apply(this._element, arguments)
  }
  removeEventListener() {
    if(!this._element) return
    return this._element.removeEventListener.apply(this._element, arguments)
  }
}
