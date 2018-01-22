import EventEmitter from 'event-emitter'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
const loop = async promise => {
  const proc = async () => (await promise()) && (await proc())
  await proc()
}

export default class Spring {
  constructor(tension, friction) {
    this._emitter = new EventEmitter()
    this._tension = tension
    this._friction = friction
    this._value = 0
    this._endValue = 0
    this._loop = false
    this._paused = false
  }
  pause() {
    this._paused = true
  }
  resume() {
    this._paused = false
  }
  set onUpdate(onUpdate) {
    this._onUpdate = onUpdate
  }
  set endValue(value) {
    this._endValue = value
    this.loop()
  }
  async to(value) {
    this._endValue = value
    this.loop()
    await this._wait('end')
  }
  get currentValue() {
    return this._value
  }
  setValue(value) {
    if (this._value !== value) {
      this._value = value
      this._onUpdate(this)
    }
  }
  _emit(type) {
    this._emitter.emit(type)
  }
  async _wait(type) {
    await new Promise(resolve => this._emitter.once(type, resolve))
  }
  loop() {
    if (this._loop) return

    this._emit('start')
    this._loop = true

    const loop = () => {
      if (this._paused) return true
      // TODO: dummy -> use tention,friction
      const dv = (this._endValue - this._value) / 2
      this.setValue(this._value + dv)
      if (Math.abs(dv) > 0.5) {
        requestAnimationFrame(loop)
      } else {
        this.setValue(this._endValue)

        this._loop = false
        this._emit('end')
      }
    }
    requestAnimationFrame(loop)
  }
}
