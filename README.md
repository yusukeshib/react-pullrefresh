# react-pullrefresh

Pull to reflesh material design component.

![](/2017_03_06_13_09_14.gif?raw=true)

#### Install

```sh
npm install react-pullrefresh
```

#### Usage

```javascript
import PullRefresh from 'react-pullrefresh'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.onRefresh = this.onRefresh.bind(this)
  }
  onRefresh(next) {
    // some async process...
    setTimeout(_ => {
      next()
    },2000)
  }
  // Without children PullRefresh element observe document.body's scroll
  render() {
    return (
      <div className='App'>
        <PullRefresh zIndex={10000} size={40} max={100} onRefresh={this.onRefresh}/>
        {range(100).map(i => {
          return (
            <div key={i} className='row'>{i}</div>
          )
        })}
      </div>
    )
  }
  // With scrollable element children, observe children's scrolling.
  render() {
    return (
      <PullRefresh zIndex={10000} size={40} max={100} onRefresh={this.onRefresh}>
        <!-- scrollable child element -->
        <div className='App' style={{ overflow: 'auto', height: '100%' }}>
          {range(100).map(i => {
            return (
              <div key={i} className='row'>{i}</div>
            )
          })}
        </div>
      </PullRefresh>
    )
  }
}

export default App
```

#### Props

##### disabled
default: `false`

Disable component

##### zIndex
default: `undefined`

specify css z-index.

##### size
default: `40`

indicator size.

##### max
default: `100`

max pull down distance.

##### onRefresh

pull event will be fired on touchend,mouseup.  
first argument is callback function, so must be called.  

```javascript
function onRefresh(callback) {
  //...some async function
  callback()
}
```

#### Demo

[https://yusukeshibata.github.io/react-pullrefresh/](https://yusukeshibata.github.io/react-pullrefresh/)


#### License

MIT
