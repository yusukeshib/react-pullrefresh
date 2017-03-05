import EventEmitter from 'event-emitter'
import allOff from 'event-emitter/all-off'
import 'scrollingelement'

const defaultHandler = {
  pull: next => { next() },
  stepback: (step, next) => {
    next(step / 2)
  }
}

class PullHelper {
  constructor() {
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
  onTouchStart(evt) {
    if(this._paused) return
    if(this._lock) {
      evt.preventDefault()
      return
    }
    this._y = evt.touches ? evt.touches[0].clientY : evt.clientY
    this._cnt = 0
    this._step = - document.scrollingElement.scrollTop
    this._touch = true
  }
  onTouchEnd(evt) {
    if(this._paused) return
    if(this._lock) {
      //evt.preventDefault()
      return
    }
    let that = this
    that._lock = true
    this._emitter.emit('pull', that._step, () => {
      that._lock = false
      that._touch = false
      that._loop()
    })
  }
  onTouchMove(evt) {
    if(this._paused) return
    if(this._lock) {
      evt.preventDefault()
      return
    }
    let y = evt.touches ? evt.touches[0].clientY : evt.clientY
    let step = this._touch ? this._step + y - this._y : 0
    if(step > 0) evt.preventDefault()
    if(this._touch && step !== this._step) {
      this._cnt++
      this._step = step
      this._y = y
      if(this._cnt === 1) this._emitter.emit('start')
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
    document.body.addEventListener('touchstart', this.onTouchStart)
    document.body.addEventListener('touchmove', this.onTouchMove)
    document.body.addEventListener('touchend', this.onTouchEnd)
    document.body.addEventListener('mousedown', this.onTouchStart)
    document.body.addEventListener('mousemove', this.onTouchMove)
    document.body.addEventListener('mouseleave', this.onTouchEnd)
    document.body.addEventListener('mouseup', this.onTouchEnd)
    return this
  }
  unload() {
    allOff(this._emitter)
    document.body.removeEventListener('touchstart', this.onTouchStart)
    document.body.removeEventListener('touchmove', this.onTouchMove)
    document.body.removeEventListener('touchend', this.onTouchEnd)
    document.body.removeEventListener('mousedown', this.onTouchStart)
    document.body.removeEventListener('mousemove', this.onTouchMove)
    document.body.removeEventListener('mouseleave', this.onTouchEnd)
    document.body.removeEventListener('mouseup', this.onTouchEnd)
    return this
  }
}

module.exports = PullHelper
