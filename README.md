pullhelper.js
============

Pull to reflesh navigation helper.

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
