# react-pullrefresh

Pull to reflesh navigation helper.

![](/2017_03_06_13_09_14.gif?raw=true)

#### Install

`npm install react-pullrefresh`

#### Usage

```javascript
import Pull from 'react-pullrefresh'

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
  render() {
    return (
      <div className='App'>
        <Pull zIndex={10000} size={30} max={100} onRefresh={this.onRefresh} />
        <div className='rows'>
          {range(100).map(i => {
            return (
              <div key={i} className='row'>{i}</div>
            )
          })}
        </div>
      </div>
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
default: `30`

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
