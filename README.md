# react-pullrefresh

Pull to reflesh material design component.<br>
react-native is supported.

![](/2017_03_06_13_09_14.gif?raw=true)

## Demo

<https://yusukeshibata.github.io/react-pullrefresh/>

## Install

```sh
npm install react-pullrefresh
```

## Usage

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

### HOC (High Order Component)

```javascript
import PullRefresh, { Indicator } from 'react-pullrefresh'

const PortalIncidator = PortalHoc(Indicator)
// control props namespace for List component.
// add extra onRequestMore and pullFreshProps prop that not conflict with List Component.
function PullRefreshHoc(AnotherComponent) {
  return class _PullRefreshHoc extends React.Component {
    handleRefresh = () => {
      if (typeof this.props.onRequestMore === 'function') {
        const reason = "pullRefresh"
        return this.props.onRequestMore(reason)
      }
    }

    render() {
      // use pullFreshProps props namespace.
      const { pullFreshProps, onRequestMore, ...otherProps  } = this.props;
      const defautWraperComponent = React.Fragment
      const _pullFreshProps = Object.assign(
        // change default wraperComponent to React.Fragment.
        {
          wraperComponent: defautWraperComponent
          IndicatorComponent: PortalIncidator
        },
        pullFreshProps,
        // pullFreshProps should never override AnotherComponent.
        {
          component: AnotherComponent,
          onRefresh: this.handleRefresh
      })
      return (
        <PullRefresh
          // if pass pullFreshProps PullRefresh will ignore other props
          pullFreshProps={_pullFreshProps}
          // otherProps will pass to AnotherComponent
          {...otherProps}
          // if other HOCs(like infinite load) take onRequestMore prop(you can check by Component.propTypes)
          // then pass it.
          // else ignore it
          onRequestMore={onRequestMore}
          />
      )
    }
  }
}


// EnhancedList get extra two prop(onRequestMore, pullFreshProps)
// for pull refresh feature.
export const EnhancedList = PullRefreshHoc(List)

// or more enhance
const enhance = compose(FlipMoveHoc, InfiniteLoadHoc, ...OtherFeatureHocs)
export const MulitiEnhancedList = enhance(EnhancedList)


const handleRequestMore = async (reason) => {
  if (reason === 'pullRefresh') {
    await fetchData({page: 1})
  } else if (reason === 'bottomInfiniteLoad') {
    await fetchData({page: getNextPage()})
  }
}

// List's prop disabled and component not conflict with pullRefresh props.
const pullRefreshProps = {
  color: "#ff0000",
  disabled: false,
  zIndex: 20
}
const list = (
  <EnhancedList
    disabled={true}
    component="ul"
    onRequestMore={handleRequestMore}
    pullRefreshProps={pullRefreshProps}>
    {listItems}
  </EnhancedList>
)
```

#### Behaviour difference between v1/v2

TODO:

#### Props

##### render

TODO:

##### color

default: `#787878`

##### bgColor

default: `#ffffff`

##### disabled

disable component

default: `false`

##### zIndex

specify css z-index.

default: `undefined`

##### onRefresh

```javascript
async function onRefresh() {
  //...some async function
}
```

##### style

container style.

default: `undefined`

#### Removed props

- size
- offset
- max
- waitingComponent
- pullingComponent
- pulledComponent
- supportDesktop

#### License

MIT
