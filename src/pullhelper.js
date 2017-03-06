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
    this._enabled = true
  }
  _saveStyle() {
    const { overflowX, overflowY, overflow } = this._element.style
    this._overflowStyle = { overflowX, overflowY, overflow }
    console.log(this._overflowStyle)
  }
  _restoreStyle() {
    if(!this._overflowStyle) return
    const { overflowX, overflowY, overflow } = this._overflowStyle
    this._element.style.overflowX = overflowX
    this._element.style.overflowY = overflowY
    this._element.style.overflow = overflow
    this._overflowStyle = null
  }
  get dispatcher() {
    if(document && document.body === this._element) return document
    return this._element
  }
  set scrollEnabled(enabled) {
    if(!this._element) return
    if(this._enabled === enabled) return
    this._enabled = enabled
    if(enabled) {
      this._restoreStyle()
    } else {
      this._saveStyle()
      this._element.style.overflow = 'hidden'
    }
  }
  get scrollTop() {
    if(!this._element) return 0
    return this._element.scrollTop
  }
  get scrollEnabled() {
    return this._enabled
  }
  addScrollEventListener(listener) {
    if(!this.dispatcher) return
    this.dispatcher.addEventListener('scroll', listener)
  }
  removeScrollEventListener(listener) {
    if(!this.dispatcher) return
    this.dispatcher.removeEventListener('scroll', listener)
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
    //this._scrollElement.scrollEnabled = true
    this._emitter.emit('pull', that._step, () => {
      that._lock = false
      that._touch = false
      that._loop()
    })
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
        //this._scrollElement.scrollEnabled = false
        this._emitter.emit('start')
      }
      this._emitter.emit('step', Math.max(0, this._step))
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
    window.addEventListener('touchstart', this.onTouchStart, { passive: true })
    window.addEventListener('touchmove', this.onTouchMove, { passive: true })
    window.addEventListener('touchend', this.onTouchEnd, { passive: true })
    window.addEventListener('mousedown', this.onTouchStart, { passive: true })
    window.addEventListener('mousemove', this.onTouchMove, { passive: true })
    window.addEventListener('mouseleave', this.onTouchEnd, { passive: true })
    window.addEventListener('mouseup', this.onTouchEnd, { passive: true })
    return this
  }
  unload() {
    allOff(this._emitter)
    this._scrollElement.removeScrollEventListener(this.onScroll)
    window.removeEventListener('touchstart', this.onTouchStart)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
    window.removeEventListener('mousedown', this.onTouchStart)
    window.removeEventListener('mousemove', this.onTouchMove)
    window.removeEventListener('mouseleave', this.onTouchEnd)
    window.removeEventListener('mouseup', this.onTouchEnd)
    return this
  }
}
