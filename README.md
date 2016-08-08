react-pullrefresh.js
============

Pull to reflesh navigation helper.

![](/2016_08_08_12_25_46_12_27_22.gif?raw=true)

Install
=======

`npm install react-pullrefresh`

Usage
=====

```javascript
import Pull from 'react-pullrefresh'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.onPull = this.onPull.bind(this)
	}
	onPull(next) {
		// some async process...
		setTimeout(_ => {
			next()
		},2000)
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className='App'>
				<Pull max={100} onPull={this.onPull} />
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

Demo
====
[https://yusukeshibata.github.io/react-pullrefresh/test/build/](https://yusukeshibata.github.io/react-pullrefresh/test/build/)


License
=======
MIT
