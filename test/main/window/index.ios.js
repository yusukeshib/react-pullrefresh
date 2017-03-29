import { Dimensions } from 'react-native'

class Window {
  constructor() {
    const { width, height } = Dimensions.get('window')
    this._width = width
    this._height = height
  }
  get innerWidth() {
    return this._width
  }
  get innerHeight() {
    return this._height
  }
  addEventListener(evt) {
  }
  removeEventListener(evt) {
  }
}

module.exports = new Window()
