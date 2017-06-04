# react-pullrefresh

Pull to reflesh material design component.  
react-native is supported.

![](/2017_03_06_13_09_14.gif?raw=true)

#### Install

  ```sh
  npm install react-pullrefresh
  ```

#### Usage

  ```javascript
  import PullRefresh from 'react-pullrefresh'

  // custom renderer
  const renderWaitingComponent = (props) => {
    return <div style={{backgroundColor:'#00f', color:'#fff'}}>waiting</div>
  }
  const renderPullingComponent = (props, step) => {
    return <div style={{backgroundColor:'#f00', color:'#fff'}}>{step + '/' + props.max}</div>
  }

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
          <PullRefresh
            zIndex={10000}
            size={40}
            max={100}
            waitingComponent={false}
            pullingComponent={renderPullingComponent}
            onRefresh={this.onRefresh}
            supportDesktop={true}
          >
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

##### offset
default: 0

Y-Offset for layout.

##### color 
default: `#000`

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

##### waitingComponent

Specify component you want to render on waiting state.
If false is specified, nothing rendered.

##### pullingComponent

Specify component you want to render on waiting state.
If false is specified, nothing rendered.

##### supportDesktop
default: `false`
Enable component on desktop if specified.

#### Demo

[https://yusukeshibata.github.io/react-pullrefresh/](https://yusukeshibata.github.io/react-pullrefresh/)


#### License

MIT
