import React from 'react'
import EventEmitter from 'event-emitter'
import allOff from 'event-emitter/all-off'
import AnimationFrame from '../animationframe'
import ScrollElement from '../scroll'

const defaultHandler = {
  pull: next => { next() },
  stepback: (step, next) => {
    next(step / 2)
  }
}

export default class PullHelper {
  constructor(scrollElement) {
    this.scrollElement = scrollElement
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
  set scrollElement(scrollElement) {
    //allOff(this._emitter)
    this._scrollElement = new ScrollElement(scrollElement)
  }
  get scrollElement() {
    return this._scrollElement.element
  }
  _loop() {
    var that = this
    if(that._step <= 0) {
      this._lock = false
      return
    }
    this._emitter.emit('stepback', that._step, nextStep => {
      that._step = Math.floor(nextStep)
      this._emitter.emit('step', that._step)
      AnimationFrame.request(this._loop)
    })
  }
  abort() {
    this._lock = false
    this._cnt = 0
    this._step = 0
    this._touch = false
  }
  pull(step) {
    if(this._lock) return
    this._emitter.emit('start')
    this._cnt = 3
    this._step = step
    this._emitter.emit('step', this._step)
    this._lock = true
    this._emitter.emit('pull', this._step, () => {
      this._touch = true
      this._loop()
    })
  }
  onScroll(evt) {
    if(this._cnt > 2) return
    this._cnt = 0
    this._step = 0
    this._emitter.emit('step', 0)
  }
  onTouchStart(_evt) {
    if(this._paused) return
    if(this._lock) return
    const evt = _evt.nativeEvent
    this._y = evt.touches ? evt.touches[0].pageY : evt.pageY
    this._started = false
    this._cnt = 0
    this._step = - this._scrollElement.scrollTop
    this._touch = true
  }
  onTouchEnd(evt) {
    if(this._paused) return
    if(this._lock) return
    let that = this
    this._started = false
    this._lock = true
    this._emitter.emit('pull', that._step, () => {
      that._touch = false
      that._loop()
    })
    return true
  }
  onTouchMove(_evt) {
    if(this._paused) return
    if(this._lock) return
    const evt = _evt.nativeEvent
    let y = evt.touches ? evt.touches[0].pageY : evt.pageY
    let step = this._touch ? this._step + y - this._y : 0
    if(this._touch && step !== this._step) {
      this._cnt++
      this._step = step
      this._y = y
      if(this._cnt === 2 && this._scrollElement.scrollTop === 0) {
        this._emitter.emit('start')
        this._started = true
      }
      if(this._started) {
        this._emitter.emit('step', Math.max(0, this._step))
      }
    }
    if(this._started) {
      _evt.preventDefault()
      _evt.stopPropagation()
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
  }
  unload() {
  }
  render(children) {
    if(!children) return false
    if(this._children !== children) {
      this._children = children
      console.log('update render:', this._children, '->', children)
      this._rendered = React.cloneElement(React.Children.only(children), {
        ref: c => this.scrollElement = c,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onMouseDown: this.onTouchStart,
        onMouseMove: this.onTouchMove,
        onMouseLeave: this.onTouchEnd,
        onMouseUp: this.onTouchEnd
      })
    }
    return this._rendered
  }
}
