import { findDOMNode } from 'react-dom'
const global = global || window

export default class ScrollElement {
  constructor(element) {
    this.element = element
    this._scrollTop = 0
    this.onScroll = this.onScroll.bind(this)
  }
  set element(element) {
    if(!element) element = global.document ? global.document.body : null
    this._element = element
  }
  get element() {
    return findDOMNode(this._element)
  }
  get scrollTop() {
    if(!this.element) return 0
    return this._scrollTop || this.element.scrollTop || 0
  }
  onScroll(evt) {
    const offset = evt.nativeEvent.contentOffset
    this._scrollTop = offset.y
  }
}
