pullhelper.js
============

Pull to reflesh navigation helper.

![](/2016_08_08_12_25_46_12_27_22.gif?raw=true)

Install
=======

`npm install pullhelper`

Usage
=====

```javascript
var pullhelper = require('pullhelper')
pullhelper
.on('step',function(step) {
})
.on('pull',function(step,next) {
	if(step < 100) {
		next()
		return
	}
	//...
	next()
})
.init()
```

Demo
====
Demo using with react.js.  
[https://yusukeshibata.github.io/pullhelper/](https://yusukeshibata.github.io/pullhelper/)


License
=======
MIT
