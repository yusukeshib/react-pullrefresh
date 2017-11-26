# react-pullrefresh

Pull to reflesh material design component.  
react-native is supported.

![](/2017_03_06_13_09_14.gif?raw=true)

#### Demo

[https://yusukeshibata.github.io/react-pullrefresh/](https://yusukeshibata.github.io/react-pullrefresh/)


#### Install

  ```sh
  npm install react-pullrefresh
  ```

#### Usage

  ```javascript
  import PullRefresh from 'react-pullrefresh'

  class App extends Component {
    // onRefresh function canbe async/sync
    async onRefresh() {
      await someAsyncFunction()
    }
    // Without children PullRefresh element observe document.body's scroll
    render() {
      return (
          <PullRefresh
            onRefresh={::this.onRefresh}
          >
            {range(100).map(i => {
              return (
                  <div key={i} className='row'>{i}</div>
                  )
            })}
          </PullRefresh>
          )
    }
  }

export default App
```

#### Props

##### color 
default: `#787878`

##### bgColor 
default: `#ffffff`

##### disabled

Disable component

default: `false`

##### zIndex

specify css z-index.

default: `undefined`

##### onRefresh

pull event will be fired on touchend,mouseup.  
first argument is callback function, so must be called.  

```javascript
async function onRefresh() {
  //...some async function
}
```

##### style

container style.

default: `undefined`

#### Removed props

* size
* offset
* max
* waitingComponent
* pullingComponent
* pulledComponent
* supportDesktop

#### License

MIT
