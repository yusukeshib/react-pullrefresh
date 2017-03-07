import EventEmitter from 'event-emitter'
import allOff from 'event-emitter/all-off'

const defaultHandler = {
  pull: next => { next() },
  stepback: (step, next) => {
    next(step / 2)
  }
}

class ScrollElement {
  constructor(element) {
    this._element = element
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

export default class PullHelper {
  constructor(scrollElement) {
    this._scrollElement = new ScrollElement(scrollElement || (document ? document.body : null))
    this._emitter = new EventEmitter()
    this._emitter.on('pull', defaultHandler.pull)
    this._emitter.on('stepback', defaultHandler.stepback)
    this._y = 0
    this._cnt = 0
    this._step = 0
    this._touch = false
    this._lock = false
    this._paused = false
    this._loop = this._loop.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onScroll = this.onScroll.bind(this)
  }
  _loop() {
    var that = this
    if(!that._touch && that._step > 0) {
      this._emitter.emit('stepback', that._step, nextStep => {
        that._step = Math.floor(nextStep)
        this._emitter.emit('step', that._step)
        window.requestAnimationFrame(this._loop)
      })
    }
  }
  pull(step) {
    if(this._lock) return
    this._emitter.emit('start')
    this._lock = true
    this._cnt = 3
    this._step = step
    this._emitter.emit('step', this._step)
    this._emitter.emit('pull', this._step, () => {
      this._lock = false
      this._touch = false
      this._loop()
    })
  }
  onScroll(evt) {
    if(this._cnt > 2) return
    this._cnt = 0
    this._step = 0
    this._emitter.emit('step', 0)
  }
  onTouchStart(evt) {
    if(this._paused) return
    if(this._lock) return
    this._y = evt.touches ? evt.touches[0].clientY : evt.clientY
    this._cnt = 0
    this._step = - this._scrollElement.scrollTop
    this._touch = true
  }
  onTouchEnd(evt) {
    if(this._paused) return
    if(this._lock) return
    let that = this
    that._lock = true
    this._emitter.emit('pull', that._step, () => {
      that._lock = false
      that._touch = false
      that._loop()
    })
    return true
  }
  onTouchMove(evt) {
    if(this._paused) return
    if(this._lock) return
    let y = evt.touches ? evt.touches[0].clientY : evt.clientY
    let step = this._touch ? this._step + y - this._y : 0
    if(this._touch && step !== this._step) {
      this._cnt++
      this._step = step
      this._y = y
      if(this._cnt > 2 && this._scrollElement.scrollTop === 0) {
        this._emitter.emit('start')
      }
      this._emitter.emit('step', Math.max(0, this._step))
    }
    if(this._step > 0) {
      evt.preventDefault()
      evt.stopPropagation()
      return false
    }
  }
  on(type, listener) {
    if(defaultHandler[type]) {
      this._emitter.off(type, defaultHandler[type])
    }
    this._emitter.on(type, listener)
    return this
  }
  isPaused() {
    return this._paused
  }
  get paused() {
    return this._paused
  }
  resume() {
    this._paused = false
    return this
  }
  pause() {
    this._paused = true
    return this
  }
  load() {
    this._scrollElement.addScrollEventListener(this.onScroll, { passive: true })
    this._scrollElement.addEventListener('touchstart', this.onTouchStart, { passive: false })
    this._scrollElement.addEventListener('touchmove', this.onTouchMove, { passive: false })
    this._scrollElement.addEventListener('touchend', this.onTouchEnd, { passive: false })
    this._scrollElement.addEventListener('mousedown', this.onTouchStart, { passive: false })
    this._scrollElement.addEventListener('mousemove', this.onTouchMove, { passive: false })
    this._scrollElement.addEventListener('mouseleave', this.onTouchEnd, { passive: false })
    this._scrollElement.addEventListener('mouseup', this.onTouchEnd, { passive: false })
    return this
  }
  unload() {
    allOff(this._emitter)
    this._scrollElement.removeScrollEventListener(this.onScroll)
    this._scrollElement.removeEventListener('touchstart', this.onTouchStart)
    this._scrollElement.removeEventListener('touchmove', this.onTouchMove)
    this._scrollElement.removeEventListener('touchend', this.onTouchEnd)
    this._scrollElement.removeEventListener('mousedown', this.onTouchStart)
    this._scrollElement.removeEventListener('mousemove', this.onTouchMove)
    this._scrollElement.removeEventListener('mouseleave', this.onTouchEnd)
    this._scrollElement.removeEventListener('mouseup', this.onTouchEnd)
    return this
  }
}
