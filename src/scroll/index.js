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
    this._element = global.document ? findDOMNode(element) : element
  }
  get element() {
    return this._element
  }
  get scrollTop() {
    if(!this._element) return 0
    return this._scrollTop || this._element.scrollTop || 0
  }
  onScroll(evt) {
    const offset = evt.nativeEvent.contentOffset
    this._scrollTop = offset.y
  }
}
