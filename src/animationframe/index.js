import ee from 'event-emitter'

export default class AnimationFrame {
  static request(fn) {
    return requestAnimationFrame(fn)
  }
  static cancel(id) {
    return cancelAnimationFrame(id)
  }
  constructor() {
    this._lastTime = 0
    this._active = false
    this._framerate = 30
    this._emitter = ee({})
    this._loop = this._loop.bind(this)
  }
  _loop() {
    if(!this._active) return
    this._id = AnimationFrame.request(this._loop)
    let now = Date.now()
    let elapsed = now - this._then
    if(elapsed > 1000 / this.framerate) {
      this._then = now - (elapsed % (1000 / this.framerate))
      this._emitter.emit('frame')
    }
  }
  on(type, listener) {
    this._emitter.on(type, listener)
    return this
  }
  off(type, listener) {
    this._emitter.off(type, listener)
    return this
  }
  start() {
    this._active = true
    this._then = Date.now()
    this._loop()
    return this
  }
  stop() {
    this._active = false
    AnimationFrame.cancel(this._id)
    return this
  }
  get framerate() {
    return this._framerate
  }
  set framerate(framerate) {
    this._framerate = framerate
  }
}
