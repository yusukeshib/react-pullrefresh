const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))
const loop = async promise => {
  const proc = async () => await promise() && await proc()
  await proc()
}

export default class Spring {
  constructor(tension, friction) {
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
  get currentValue() {
    return this._value
  }
  setValue(value) {
    if(this._value !== value) {
      this._value = value
      this._onUpdate(this)
    }
  }
  async loop() {
    if(this._loop) return
    this._loop = true

    await loop(async () => {
      await sleep(1000 / 60)
      if(this._paused) return true
      // dummy -> use tention,friction
      const dv = (this._endValue - this._value) / 5
      this.setValue(this._value + dv)
      return Math.abs(dv) > 0.1
    })
    this.setValue(this._endValue)

    this._loop = false
  }
}
