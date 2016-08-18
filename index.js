(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("react"));
	else
		root["index"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _pullhelper = __webpack_require__(2);

	var _pullhelper2 = _interopRequireDefault(_pullhelper);

	__webpack_require__(22);

	var _pull = __webpack_require__(26);

	var _pull2 = _interopRequireDefault(_pull);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MAX_DEFAULT = 100;

	var Pull = function (_Component) {
		_inherits(Pull, _Component);

		function Pull(props) {
			_classCallCheck(this, Pull);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pull).call(this, props));

			_this.state = {
				pulled: 0
			};
			return _this;
		}

		_createClass(Pull, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _props = this.props;
				var disabled = _props.disabled;
				var onRefresh = _props.onRefresh;
				var max = _props.max;

				var maxPull = max || MAX_DEFAULT;
				var that = this;
				_pullhelper2.default.on('start', function (pulled) {
					that.setState({
						pulling: true
					});
				}).on('stepback', function (pulled, next) {
					that.setState({
						pulled: pulled
					});
					var nextPulled = Math.min(pulled - Math.min(pulled / 2, 10), max);
					next(nextPulled);
				}).on('step', function (pulled) {
					that.setState({
						pulled: pulled
					});
				}).on('pull', function (pulled, next) {
					that.setState({
						pulling: false
					});
					if (!onRefresh || pulled < maxPull) {
						next();
						return;
					}
					that.setState({
						loading: true
					});
					onRefresh(function (_) {
						that.setState({
							loading: false
						});
						next();
					});
				}).load();
				if (disabled) {
					_pullhelper2.default.pause();
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var disabled = this.props.disabled;

				if (disabled !== nextProps.disabled) {
					if (nextProps.disabled) {
						_pullhelper2.default.pause();
					} else {
						_pullhelper2.default.resume();
					}
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				_pullhelper2.default.unload();
			}
		}, {
			key: 'render',
			value: function render() {
				var _state = this.state;
				var pulling = _state.pulling;
				var loading = _state.loading;
				var pulled = _state.pulled;

				var maxPull = this.props.max || MAX_DEFAULT;
				var size = this.props.size || 30;
				var style = this.props.style || {};
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('div', { style: {
							display: pulling ? 'block' : 'none',
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: this.props.zIndex,
							userSelect: 'none'
						} }),
					_react2.default.createElement(
						'div',
						{ style: _extends({
								background: 'white',
								width: size,
								height: size,
								position: 'fixed',
								zIndex: this.props.zIndex,
								top: -size + Math.min(pulled, maxPull),
								left: '50%',
								borderRadius: size / 2,
								transform: 'translate(-50%,-50%)',
								boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)',
								userSelect: 'none'
							}, style) },
						_react2.default.createElement('div', { style: {
								background: 'url(' + _pull2.default + ') center center no-repeat',
								backgroundSize: '100% 100%',
								width: '100%',
								height: '100%',
								opacity: pulled / maxPull,
								transform: 'rotate(' + pulled / maxPull * 360 + 'deg)',
								animation: loading ? 'rotating 2s linear infinite' : 'none'
							} })
					)
				);
			}
		}]);

		return Pull;
	}(_react.Component);

	Pull.defaultProps = {
		max: MAX_DEFAULT
	};
	exports.default = Pull;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter = __webpack_require__(3);
	var allOff = __webpack_require__(18);
	var emitter = new EventEmitter();
	__webpack_require__(21);

	var _exports = {
		y: 0,
		cnt: 0,
		step: 0,
		touch: false,
		lock: false,
		paused: false
	};

	var loop = function () {
		var that = this;
		if (!that.touch && that.step > 0) {
			emitter.emit('stepback', that.step, function (nextStep) {
				that.step = nextStep;
				emitter.emit('step', that.step);
				window.requestAnimationFrame(loop);
			});
		}
	}.bind(_exports);

	var start = function (evt) {
		if (this.paused) return;
		if (this.lock) {
			evt.preventDefault();
			return;
		}
		this.y = evt.touches ? evt.touches[0].clientY : evt.clientY;
		this.cnt = 0;
		this.step = -document.scrollingElement.scrollTop;
		this.touch = true;
	}.bind(_exports);

	var end = function (evt) {
		if (this.paused) return;
		if (this.lock) {
			evt.preventDefault();
			return;
		}
		var that = this;
		that.lock = true;
		emitter.emit('pull', that.step, function () {
			that.lock = false;
			that.touch = false;
			loop();
		});
	}.bind(_exports);

	var move = function (evt) {
		if (this.paused) return;
		if (this.lock) {
			evt.preventDefault();
			return;
		}
		var y = evt.touches ? evt.touches[0].clientY : evt.clientY;
		var step = this.touch ? this.step + y - this.y : 0;
		if (step > 0) evt.preventDefault();
		if (this.touch && step !== this.step) {
			this.cnt++;
			this.step = step;
			this.y = y;
			if (this.cnt === 1) {
				emitter.emit('start');
			}
			emitter.emit('step', Math.max(0, this.step));
		}
	}.bind(_exports);

	var defaultHandler = {};
	defaultHandler['pull'] = function (next) {
		next();
	}.bind(_exports);
	defaultHandler['stepback'] = function (step, next) {
		var nextStep = Math.floor(step - Math.min(10, step / 2));
		next(nextStep);
	}.bind(_exports);

	emitter.on('pull', defaultHandler['pull']);
	emitter.on('stepback', defaultHandler['stepback']);

	_exports.on = function (type, listener) {
		if (defaultHandler[type]) {
			emitter.off(type, defaultHandler[type]);
		}
		emitter.on(type, listener);
		return _exports;
	};

	_exports.isPaused = function () {
		return this.paused;
	}.bind(_exports);

	_exports.pause = function () {
		this.paused = true;
		return this;
	}.bind(_exports);

	_exports.resume = function () {
		this.paused = false;
		return this;
	}.bind(_exports);

	_exports.load = function () {
		document.body.addEventListener('touchstart', start);
		document.body.addEventListener('touchmove', move);
		document.body.addEventListener('touchend', end);
		document.body.addEventListener('mousedown', start);
		document.body.addEventListener('mousemove', move);
		document.body.addEventListener('mouseleave', end);
		document.body.addEventListener('mouseup', end);
		return _exports;
	};
	_exports.unload = function () {
		allOff(emitter);
		document.body.removeEventListener('touchstart', start);
		document.body.removeEventListener('touchmove', move);
		document.body.removeEventListener('touchend', end);
		document.body.removeEventListener('mousedown', start);
		document.body.removeEventListener('mousemove', move);
		document.body.removeEventListener('mouseleave', end);
		document.body.removeEventListener('mouseup', end);
		return _exports;
	};

	module.exports = _exports;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var d = __webpack_require__(4),
	    callable = __webpack_require__(17),
	    apply = Function.prototype.apply,
	    call = Function.prototype.call,
	    create = Object.create,
	    defineProperty = Object.defineProperty,
	    defineProperties = Object.defineProperties,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    descriptor = { configurable: true, enumerable: false, writable: true },
	    on,
	    _once2,
	    off,
	    emit,
	    methods,
	    descriptors,
	    base;

	on = function on(type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

		return this;
	};

	_once2 = function once(type, listener) {
		var _once, self;

		callable(listener);
		self = this;
		on.call(this, type, _once = function once() {
			off.call(self, type, _once);
			apply.call(listener, this, arguments);
		});

		_once.__eeOnceListener__ = listener;
		return this;
	};

	off = function off(type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
			for (i = 0; candidate = listeners[i]; ++i) {
				if (candidate === listener || candidate.__eeOnceListener__ === listener) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
				}
			}
		} else {
			if (listeners === listener || listeners.__eeOnceListener__ === listener) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function emit(type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}listeners = listeners.slice();
			for (i = 0; listener = listeners[i]; ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
				case 1:
					call.call(listeners, this);
					break;
				case 2:
					call.call(listeners, this, arguments[1]);
					break;
				case 3:
					call.call(listeners, this, arguments[1], arguments[2]);
					break;
				default:
					l = arguments.length;
					args = new Array(l - 1);
					for (i = 1; i < l; ++i) {
						args[i - 1] = arguments[i];
					}
					apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: _once2,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(_once2),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function exports(o) {
		return o == null ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(5),
	    normalizeOpts = __webpack_require__(12),
	    isCallable = __webpack_require__(13),
	    contains = __webpack_require__(14),
	    d;

	d = module.exports = function (dscr, value /*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== 'string') {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set /*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6)() ? Object.assign : __webpack_require__(7);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign,
		    obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return obj.foo + obj.bar + obj.trzy === 'razdwatrzy';
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(8),
	    value = __webpack_require__(11),
	    max = Math.max;

	module.exports = function (dest, src /*, …srcn*/) {
		var error,
		    i,
		    l = max(arguments.length, 2),
		    assign;
		dest = Object(value(dest));
		assign = function assign(key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9)() ? Object.keys : __webpack_require__(10);

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) {
			return false;
		}
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach,
	    create = Object.create;

	var process = function process(src, obj) {
		var key;
		for (key in src) {
			obj[key] = src[key];
		}
	};

	module.exports = function (options /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) {
	  return typeof obj === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(15)() ? String.prototype.contains : __webpack_require__(16);

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return str.contains('dwa') === true && str.contains('foo') === false;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString /*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var value = __webpack_require__(19),
	    hasOwnProperty = Object.prototype.hasOwnProperty;

	module.exports = function (emitter /*, type*/) {
		var type = arguments[1],
		    data;

		value(emitter);

		if (type !== undefined) {
			data = hasOwnProperty.call(emitter, '__ee__') && emitter.__ee__;
			if (!data) return;
			if (data[type]) delete data[type];
			return;
		}
		if (hasOwnProperty.call(emitter, '__ee__')) delete emitter.__ee__;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(20);

	module.exports = function (value) {
		if (!isObject(value)) throw new TypeError(value + " is not an Object");
		return value;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var map = { function: true, object: true };

	module.exports = function (x) {
		return x != null && map[typeof x === 'undefined' ? 'undefined' : _typeof(x)] || false;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	/*! https://mths.be/scrollingelement v1.5.1 by @diegoperini & @mathias | MIT license */
	if (!('scrollingElement' in document)) (function () {

		function computeStyle(element) {
			if (window.getComputedStyle) {
				// Support Firefox < 4 which throws on a single parameter.
				return getComputedStyle(element, null);
			}
			// Support Internet Explorer < 9.
			return element.currentStyle;
		}

		function isBodyElement(element) {
			// The `instanceof` check gives the correct result for e.g. `body` in a
			// non-HTML namespace.
			if (window.HTMLBodyElement) {
				return element instanceof HTMLBodyElement;
			}
			// Fall back to a `tagName` check for old browsers.
			return (/body/i.test(element.tagName)
			);
		}

		function getNextBodyElement(frameset) {
			// We use this function to be correct per spec in case `document.body` is
			// a `frameset` but there exists a later `body`. Since `document.body` is
			// a `frameset`, we know the root is an `html`, and there was no `body`
			// before the `frameset`, so we just need to look at siblings after the
			// `frameset`.
			var current = frameset;
			while (current = current.nextSibling) {
				if (current.nodeType == 1 && isBodyElement(current)) {
					return current;
				}
			}
			// No `body` found.
			return null;
		}

		// Note: standards mode / quirks mode can be toggled at runtime via
		// `document.write`.
		var isCompliantCached;
		var isCompliant = function isCompliant() {
			var isStandardsMode = /^CSS1/.test(document.compatMode);
			if (!isStandardsMode) {
				// In quirks mode, the result is equivalent to the non-compliant
				// standards mode behavior.
				return false;
			}
			if (isCompliantCached === void 0) {
				// When called for the first time, check whether the browser is
				// standard-compliant, and cache the result.
				var iframe = document.createElement('iframe');
				iframe.style.height = '1px';
				(document.body || document.documentElement || document).appendChild(iframe);
				var doc = iframe.contentWindow.document;
				doc.write('<!DOCTYPE html><div style="height:9999em">x</div>');
				doc.close();
				isCompliantCached = doc.documentElement.scrollHeight > doc.body.scrollHeight;
				iframe.parentNode.removeChild(iframe);
			}
			return isCompliantCached;
		};

		function isRendered(style) {
			return style.display != 'none' && !(style.visibility == 'collapse' && /^table-(.+-group|row|column)$/.test(style.display));
		}

		function isScrollable(body) {
			// A `body` element is scrollable if `body` and `html` both have
			// non-`visible` overflow and are both being rendered.
			var bodyStyle = computeStyle(body);
			var htmlStyle = computeStyle(document.documentElement);
			return bodyStyle.overflow != 'visible' && htmlStyle.overflow != 'visible' && isRendered(bodyStyle) && isRendered(htmlStyle);
		}

		var scrollingElement = function scrollingElement() {
			if (isCompliant()) {
				return document.documentElement;
			}
			var body = document.body;
			// Note: `document.body` could be a `frameset` element, or `null`.
			// `tagName` is uppercase in HTML, but lowercase in XML.
			var isFrameset = body && !/body/i.test(body.tagName);
			body = isFrameset ? getNextBodyElement(body) : body;
			// If `body` is itself scrollable, it is not the `scrollingElement`.
			return body && isScrollable(body) ? null : body;
		};

		if (Object.defineProperty) {
			// Support modern browsers that lack a native implementation.
			Object.defineProperty(document, 'scrollingElement', {
				'get': scrollingElement
			});
		} else if (document.__defineGetter__) {
			// Support Firefox ≤ 3.6.9, Safari ≤ 4.1.3.
			document.__defineGetter__('scrollingElement', scrollingElement);
		} else {
			// IE ≤ 4 lacks `attachEvent`, so it only gets this one assignment. IE ≤ 7
			// gets it too, but the value is updated later (see `propertychange`).
			document.scrollingElement = scrollingElement();
			document.attachEvent && document.attachEvent('onpropertychange', function () {
				// This is for IE ≤ 7 only.
				// A `propertychange` event fires when `<body>` is parsed because
				// `document.activeElement` then changes.
				if (window.event.propertyName == 'activeElement') {
					document.scrollingElement = scrollingElement();
				}
			});
		}
	})();

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./rotate.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./rotate.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes rotating {\n  /* Safari and Chrome */\n  from {\n    -ms-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -ms-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes rotating {\n  from {\n    -ms-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -webkit-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -ms-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -webkit-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiIHZpZXdCb3g9IjAgMCAzMCAzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAgMzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTI3LDN2MjRIM1YzIi8+CjxwYXRoIGQ9Ik0xNSw5Yy0zLjMsMC02LDIuNy02LDZzMi43LDYsNiw2czYtMi43LDYtNmgyYzAsNC40LTMuNiw4LTgsOHMtOC0zLjYtOC04czMuNi04LDgtOCIvPgo8L3N2Zz4K"

/***/ }
/******/ ])
});
;