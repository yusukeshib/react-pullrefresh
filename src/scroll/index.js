import { findDOMNode } from 'react-dom'
const Global = window

export default class ScrollElement {
  constructor(element) {
    this.element = element
    this._scrollTop = 0
    this.onScroll = this.onScroll.bind(this)
  }
  set element(element) {
    if(!element) element = Global.document ? Global.document.body : null
    this._element = element
  }
  get element() {
    return Global.document ? findDOMNode(this._element) : this._element
  }
  get scrollTop() {
    if(!this.element) return 0
    return this._scrollTop || this.element.scrollTop || 0
  }
  onScroll(evt) {
    const e = evt.nativeEvent || evt
    this._scrollTop = e.contentOffset ? e.contentOffset.y : e.target.scrollTop
  }
}
