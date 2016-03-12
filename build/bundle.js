/******/ (function(modules) { // webpackBootstrap
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

	var _Rx = __webpack_require__(1);

	var startButton = document.querySelector('#start');
	var stopButton = document.querySelector('#stop');
	var resetButton = document.querySelector('#reset');
	var halfButton = document.querySelector('#half');
	var quarterButton = document.querySelector('#quarter');

	var start$ = _Rx.Observable.fromEvent(startButton, 'click');
	var stop$ = _Rx.Observable.fromEvent(stopButton, 'click');
	var half$ = _Rx.Observable.fromEvent(halfButton, 'click');
	var quarter$ = _Rx.Observable.fromEvent(quarterButton, 'click');
	var reset$ = _Rx.Observable.fromEvent(resetButton, 'click');

	var interval$ = _Rx.Observable.interval(1000);
	var intervalThatStop$ = interval$.takeUntil(stop$);

	var data = {
		count: 0
	};
	var inc = function inc(acc) {
		return { count: acc.count + 1 };
	};
	var reset = function reset() {
		return data;
	};
	var incOrRest$ = _Rx.Observable.merge(intervalThatStop$.mapTo(inc), reset$.mapTo(reset));

	//OR
	var starters$ = _Rx.Observable.merge(start$.mapTo(1000), half$.mapTo(500), quarter$.mapTo(250)).share();

	var intervalActions = function intervalActions(time) {
		return(
			//OR
			_Rx.Observable.merge(_Rx.Observable.interval(time).takeUntil(stop$).mapTo(inc), reset$.mapTo(reset))
		);
	};

	var timer$ = starters$.switchMap(intervalActions).startWith(data).scan(function (accumulator, current) {
		return current(accumulator);
	}); //current is inc() or reset()

	var input = document.querySelector('#input');
	var input$ = _Rx.Observable.fromEvent(input, 'input').map(function (e) {
		return e.target.value;
	});

	//the entire combined stream is completed only when the input$ and timer$ are completed
	// timer$
	// 	.do(x => console.log(x))
	// 	.combineLatest( //require the two streams are kicked started
	// 		input$.do(x => console.log(x)),
	// 		(timer, input) => ({ //transform stream, the same as map()
	// 			count: timer.count,
	// 			text: input
	// 		})
	// 	)
	// 	.do(x => console.log(x)) //log the intermediate stream values
	// 	.takeWhile(data => data.count < 4) //stop the stream conditionally
	// 	.filter(data => data.count === parseInt(data.text, 10)) //filter stream
	// 	.reduce((accumulator, current) => accumulator + 1, 0) //accumulating data before complete
	// 	.subscribe(
	// 		x => console.log(x),
	// 		err => console.log(err),
	// 		() => console.log('complete')
	// 	);

	//when the timer$ is completed, the latest value from input$ is taken and the whole combined stream is completed
	var runningGame$ = timer$.do(function (x) {
		return console.log(x);
	}).takeWhile(function (data) {
		return data.count < 4;
	}) //stop the stream conditionally
	.withLatestFrom( //require the two streams are kicked started
	input$.do(function (x) {
		return console.log(x);
	}), function (timer, input) {
		return { //transform stream, the same as map()
			count: timer.count,
			text: input
		};
	}).share(); //allow all subscriptions shareing the same stream, instead of creating one for each subscriber

	starters$.subscribe(function () {
		input.focus();
		input.value = '';
		document.querySelector('#score').innerHTML = '';
	});

	runningGame$.repeat().subscribe(function () {
		return input.value = '';
	});

	runningGame$.filter(function (data) {
		return data.count === parseInt(data.text, 10);
	}) //filter stream
	.reduce(function (accumulator, current) {
		return accumulator + 1;
	}, 0) //accumulating data before complete
	.repeat() //restart and re-subscribe the whole stream, and never hit complete                                                     
	.subscribe(function (x) {
		document.querySelector('#score').innerHTML = '' + x;
	}, function (err) {
		return console.log(err);
	}, function () {
		return console.log('complete');
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UnsubscriptionError = exports.ObjectUnsubscribedError = exports.ArgumentOutOfRangeError = exports.EmptyError = exports.Notification = exports.ConnectableObservable = exports.BehaviorSubject = exports.ReplaySubject = exports.AsyncSubject = exports.Symbol = exports.Subscription = exports.Subscriber = exports.Operator = exports.Observable = exports.Scheduler = exports.Subject = undefined;

	var _Subject = __webpack_require__(2);

	var _Observable = __webpack_require__(3);

	__webpack_require__(20);

	__webpack_require__(30);

	__webpack_require__(33);

	__webpack_require__(35);

	__webpack_require__(37);

	__webpack_require__(40);

	__webpack_require__(42);

	__webpack_require__(44);

	__webpack_require__(45);

	__webpack_require__(48);

	__webpack_require__(54);

	__webpack_require__(55);

	__webpack_require__(57);

	__webpack_require__(59);

	__webpack_require__(60);

	__webpack_require__(72);

	__webpack_require__(75);

	__webpack_require__(77);

	__webpack_require__(79);

	__webpack_require__(82);

	__webpack_require__(84);

	__webpack_require__(86);

	__webpack_require__(88);

	__webpack_require__(90);

	__webpack_require__(92);

	__webpack_require__(94);

	__webpack_require__(101);

	__webpack_require__(103);

	__webpack_require__(105);

	__webpack_require__(106);

	__webpack_require__(107);

	__webpack_require__(109);

	__webpack_require__(112);

	__webpack_require__(115);

	__webpack_require__(117);

	__webpack_require__(119);

	__webpack_require__(121);

	__webpack_require__(123);

	__webpack_require__(125);

	__webpack_require__(127);

	__webpack_require__(129);

	__webpack_require__(131);

	__webpack_require__(133);

	__webpack_require__(135);

	__webpack_require__(137);

	__webpack_require__(139);

	__webpack_require__(142);

	__webpack_require__(148);

	__webpack_require__(150);

	__webpack_require__(152);

	__webpack_require__(154);

	__webpack_require__(156);

	__webpack_require__(158);

	__webpack_require__(160);

	__webpack_require__(162);

	__webpack_require__(164);

	__webpack_require__(166);

	__webpack_require__(167);

	__webpack_require__(168);

	__webpack_require__(169);

	__webpack_require__(170);

	__webpack_require__(171);

	__webpack_require__(172);

	__webpack_require__(175);

	__webpack_require__(177);

	__webpack_require__(179);

	__webpack_require__(182);

	__webpack_require__(183);

	__webpack_require__(185);

	__webpack_require__(186);

	__webpack_require__(188);

	__webpack_require__(190);

	__webpack_require__(192);

	__webpack_require__(194);

	__webpack_require__(196);

	__webpack_require__(198);

	__webpack_require__(200);

	__webpack_require__(202);

	__webpack_require__(204);

	__webpack_require__(206);

	__webpack_require__(208);

	__webpack_require__(210);

	__webpack_require__(212);

	__webpack_require__(215);

	__webpack_require__(217);

	__webpack_require__(219);

	__webpack_require__(221);

	__webpack_require__(224);

	__webpack_require__(226);

	__webpack_require__(228);

	__webpack_require__(230);

	__webpack_require__(232);

	__webpack_require__(234);

	__webpack_require__(236);

	__webpack_require__(238);

	__webpack_require__(240);

	__webpack_require__(242);

	__webpack_require__(244);

	__webpack_require__(246);

	__webpack_require__(248);

	__webpack_require__(250);

	__webpack_require__(252);

	__webpack_require__(254);

	__webpack_require__(255);

	var _Operator = __webpack_require__(144);

	var _Subscription = __webpack_require__(10);

	var _Subscriber = __webpack_require__(8);

	var _AsyncSubject = __webpack_require__(39);

	var _ReplaySubject = __webpack_require__(97);

	var _BehaviorSubject = __webpack_require__(181);

	var _ConnectableObservable = __webpack_require__(100);

	var _Notification = __webpack_require__(53);

	var _EmptyError = __webpack_require__(141);

	var _ArgumentOutOfRangeError = __webpack_require__(223);

	var _ObjectUnsubscribedError = __webpack_require__(19);

	var _asap = __webpack_require__(63);

	var _queue = __webpack_require__(98);

	var _rxSubscriber = __webpack_require__(15);

	/* tslint:enable:no-unused-variable */
	/* tslint:disable:no-var-keyword */
	var Scheduler = {
	    asap: _asap.asap,
	    queue: _queue.queue
	};
	var _Symbol = {
	    rxSubscriber: _rxSubscriber.rxSubscriber
	};
	/* tslint:enable:no-var-keyword */
	exports.Subject = _Subject.Subject;
	exports.Scheduler = Scheduler;
	exports.Observable = _Observable.Observable;
	exports.Operator = _Operator.Operator;
	exports.Subscriber = _Subscriber.Subscriber;
	exports.Subscription = _Subscription.Subscription;
	exports.Symbol = _Symbol;
	exports.AsyncSubject = _AsyncSubject.AsyncSubject;
	exports.ReplaySubject = _ReplaySubject.ReplaySubject;
	exports.BehaviorSubject = _BehaviorSubject.BehaviorSubject;
	exports.ConnectableObservable = _ConnectableObservable.ConnectableObservable;
	exports.Notification = _Notification.Notification;
	exports.EmptyError = _EmptyError.EmptyError;
	exports.ArgumentOutOfRangeError = _ArgumentOutOfRangeError.ArgumentOutOfRangeError;
	exports.ObjectUnsubscribedError = _ObjectUnsubscribedError.ObjectUnsubscribedError;
	exports.UnsubscriptionError = _Subscription.UnsubscriptionError;
	//# sourceMappingURL=Rx.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Subject = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable3 = __webpack_require__(3);

	var _Subscriber = __webpack_require__(8);

	var _Subscription = __webpack_require__(10);

	var _SubjectSubscription = __webpack_require__(17);

	var _rxSubscriber = __webpack_require__(15);

	var _throwError = __webpack_require__(18);

	var _ObjectUnsubscribedError = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Subject = exports.Subject = function (_Observable) {
	    _inherits(Subject, _Observable);

	    function Subject(destination, source) {
	        _classCallCheck(this, Subject);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Subject).call(this));

	        _this.destination = destination;
	        _this.source = source;
	        _this.observers = [];
	        _this.isUnsubscribed = false;
	        _this.isStopped = false;
	        _this.hasErrored = false;
	        _this.dispatching = false;
	        _this.hasCompleted = false;
	        return _this;
	    }

	    _createClass(Subject, [{
	        key: 'lift',
	        value: function lift(operator) {
	            var subject = new Subject(this.destination || this, this);
	            subject.operator = operator;
	            return subject;
	        }
	    }, {
	        key: 'add',
	        value: function add(subscription) {
	            _Subscription.Subscription.prototype.add.call(this, subscription);
	        }
	    }, {
	        key: 'remove',
	        value: function remove(subscription) {
	            _Subscription.Subscription.prototype.remove.call(this, subscription);
	        }
	    }, {
	        key: 'unsubscribe',
	        value: function unsubscribe() {
	            _Subscription.Subscription.prototype.unsubscribe.call(this);
	        }
	    }, {
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            if (this.source) {
	                return this.source.subscribe(subscriber);
	            } else {
	                if (subscriber.isUnsubscribed) {
	                    return;
	                } else if (this.hasErrored) {
	                    return subscriber.error(this.errorValue);
	                } else if (this.hasCompleted) {
	                    return subscriber.complete();
	                }
	                this.throwIfUnsubscribed();
	                var subscription = new _SubjectSubscription.SubjectSubscription(this, subscriber);
	                this.observers.push(subscriber);
	                return subscription;
	            }
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            this.source = null;
	            this.isStopped = true;
	            this.observers = null;
	            this.destination = null;
	        }
	    }, {
	        key: 'next',
	        value: function next(value) {
	            this.throwIfUnsubscribed();
	            if (this.isStopped) {
	                return;
	            }
	            this.dispatching = true;
	            this._next(value);
	            this.dispatching = false;
	            if (this.hasErrored) {
	                this._error(this.errorValue);
	            } else if (this.hasCompleted) {
	                this._complete();
	            }
	        }
	    }, {
	        key: 'error',
	        value: function error(err) {
	            this.throwIfUnsubscribed();
	            if (this.isStopped) {
	                return;
	            }
	            this.isStopped = true;
	            this.hasErrored = true;
	            this.errorValue = err;
	            if (this.dispatching) {
	                return;
	            }
	            this._error(err);
	        }
	    }, {
	        key: 'complete',
	        value: function complete() {
	            this.throwIfUnsubscribed();
	            if (this.isStopped) {
	                return;
	            }
	            this.isStopped = true;
	            this.hasCompleted = true;
	            if (this.dispatching) {
	                return;
	            }
	            this._complete();
	        }
	    }, {
	        key: 'asObservable',
	        value: function asObservable() {
	            var observable = new SubjectObservable(this);
	            return observable;
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            if (this.destination) {
	                this.destination.next(value);
	            } else {
	                this._finalNext(value);
	            }
	        }
	    }, {
	        key: '_finalNext',
	        value: function _finalNext(value) {
	            var index = -1;
	            var observers = this.observers.slice(0);
	            var len = observers.length;
	            while (++index < len) {
	                observers[index].next(value);
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            if (this.destination) {
	                this.destination.error(err);
	            } else {
	                this._finalError(err);
	            }
	        }
	    }, {
	        key: '_finalError',
	        value: function _finalError(err) {
	            var index = -1;
	            var observers = this.observers;
	            // optimization to block our SubjectSubscriptions from
	            // splicing themselves out of the observers list one by one.
	            this.observers = null;
	            this.isUnsubscribed = true;
	            if (observers) {
	                var len = observers.length;
	                while (++index < len) {
	                    observers[index].error(err);
	                }
	            }
	            this.isUnsubscribed = false;
	            this.unsubscribe();
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            if (this.destination) {
	                this.destination.complete();
	            } else {
	                this._finalComplete();
	            }
	        }
	    }, {
	        key: '_finalComplete',
	        value: function _finalComplete() {
	            var index = -1;
	            var observers = this.observers;
	            // optimization to block our SubjectSubscriptions from
	            // splicing themselves out of the observers list one by one.
	            this.observers = null;
	            this.isUnsubscribed = true;
	            if (observers) {
	                var len = observers.length;
	                while (++index < len) {
	                    observers[index].complete();
	                }
	            }
	            this.isUnsubscribed = false;
	            this.unsubscribe();
	        }
	    }, {
	        key: 'throwIfUnsubscribed',
	        value: function throwIfUnsubscribed() {
	            if (this.isUnsubscribed) {
	                (0, _throwError.throwError)(new _ObjectUnsubscribedError.ObjectUnsubscribedError());
	            }
	        }
	    }, {
	        key: _rxSubscriber.rxSubscriber,
	        value: function value() {
	            return new _Subscriber.Subscriber(this);
	        }
	    }]);

	    return Subject;
	}(_Observable3.Observable);

	Subject.create = function (destination, source) {
	    return new Subject(destination, source);
	};

	var SubjectObservable = function (_Observable2) {
	    _inherits(SubjectObservable, _Observable2);

	    function SubjectObservable(source) {
	        _classCallCheck(this, SubjectObservable);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SubjectObservable).call(this));

	        _this2.source = source;
	        return _this2;
	    }

	    return SubjectObservable;
	}(_Observable3.Observable);
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Observable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _root = __webpack_require__(4);

	var _SymbolShim = __webpack_require__(6);

	var _toSubscriber = __webpack_require__(7);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */

	var Observable = exports.Observable = function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is
	     * called when the Observable is initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be called to notify
	     * of a successful completion.
	     */

	    function Observable(subscribe) {
	        _classCallCheck(this, Observable);

	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @returns {Observable} a new observable with the Operator applied
	     * @description creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     */


	    _createClass(Observable, [{
	        key: 'lift',
	        value: function lift(operator) {
	            var observable = new Observable();
	            observable.source = this;
	            observable.operator = operator;
	            return observable;
	        }
	        /**
	         * @method subscribe
	         * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	         *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	         * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	         *  the error will be thrown as unhandled
	         * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	         * @returns {Subscription} a subscription reference to the registered handlers
	         * @description registers handlers for handling emitted values, error and completions from the observable, and
	         *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	         */

	    }, {
	        key: 'subscribe',
	        value: function subscribe(observerOrNext, error, complete) {
	            var operator = this.operator;

	            var subscriber = (0, _toSubscriber.toSubscriber)(observerOrNext, error, complete);
	            if (operator) {
	                subscriber.add(this._subscribe(operator.call(subscriber)));
	            } else {
	                subscriber.add(this._subscribe(subscriber));
	            }
	            if (subscriber.syncErrorThrowable) {
	                subscriber.syncErrorThrowable = false;
	                if (subscriber.syncErrorThrown) {
	                    throw subscriber.syncErrorValue;
	                }
	            }
	            return subscriber;
	        }
	        /**
	         * @method forEach
	         * @param {Function} next a handler for each value emitted by the observable
	         * @param {any} [thisArg] a `this` context for the `next` handler function
	         * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	         * @returns {Promise} a promise that either resolves on observable completion or
	         *  rejects with the handled error
	         */

	    }, {
	        key: 'forEach',
	        value: function forEach(next, thisArg, PromiseCtor) {
	            if (!PromiseCtor) {
	                if (_root.root.Rx && _root.root.Rx.config && _root.root.Rx.config.Promise) {
	                    PromiseCtor = _root.root.Rx.config.Promise;
	                } else if (_root.root.Promise) {
	                    PromiseCtor = _root.root.Promise;
	                }
	            }
	            if (!PromiseCtor) {
	                throw new Error('no Promise impl found');
	            }
	            var source = this;
	            return new PromiseCtor(function (resolve, reject) {
	                source.subscribe(function (value) {
	                    var result = (0, _tryCatch.tryCatch)(next).call(thisArg, value);
	                    if (result === _errorObject.errorObject) {
	                        reject(_errorObject.errorObject.e);
	                    }
	                }, reject, resolve);
	            });
	        }
	    }, {
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            return this.source.subscribe(subscriber);
	        }
	        /**
	         * @method Symbol.observable
	         * @returns {Observable} this instance of the observable
	         * @description an interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	         */

	    }, {
	        key: _SymbolShim.SymbolShim.observable,
	        value: function value() {
	            return this;
	        }
	    }]);

	    return Observable;
	}();
	// HACK: Since TypeScript inherits static properties too, we have to
	// fight against TypeScript here so Subject can have a different static create signature
	/**
	 * @static
	 * @method create
	 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	 * @returns {Observable} a new cold observable
	 * @description creates a new cold Observable by calling the Observable constructor
	 */


	Observable.create = function (subscribe) {
	    return new Observable(subscribe);
	};
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	var root = exports.root = objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self || objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window;
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global === 'undefined' ? 'undefined' : _typeof(global)] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module), (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SymbolShim = exports.ensureObservable = exports.ensureIterator = exports.ensureFor = undefined;
	exports.polyfillSymbol = polyfillSymbol;
	exports.ensureSymbol = ensureSymbol;
	exports.symbolForPolyfill = symbolForPolyfill;

	var _root = __webpack_require__(4);

	function polyfillSymbol(root) {
	    var _Symbol = ensureSymbol(root);
	    ensureIterator(_Symbol, root);
	    ensureObservable(_Symbol);
	    ensureFor(_Symbol);
	    return _Symbol;
	}
	function ensureFor(_Symbol2) {
	    if (!_Symbol2.for) {
	        _Symbol2.for = symbolForPolyfill;
	    }
	}
	exports.ensureFor = ensureFor;
	var id = 0;
	function ensureSymbol(root) {
	    if (!root.Symbol) {
	        root.Symbol = function symbolFuncPolyfill(description) {
	            return '@@Symbol(' + description + '):' + id++;
	        };
	    }
	    return root.Symbol;
	}
	function symbolForPolyfill(key) {
	    return '@@' + key;
	}
	function ensureIterator(_Symbol3, root) {
	    if (!_Symbol3.iterator) {
	        if (typeof _Symbol3.for === 'function') {
	            _Symbol3.iterator = _Symbol3.for('iterator');
	        } else if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	            // Bug for mozilla version
	            _Symbol3.iterator = '@@iterator';
	        } else if (root.Map) {
	            // es6-shim specific logic
	            var keys = Object.getOwnPropertyNames(root.Map.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (key !== 'entries' && key !== 'size' && root.Map.prototype[key] === root.Map.prototype['entries']) {
	                    _Symbol3.iterator = key;
	                    break;
	                }
	            }
	        } else {
	            _Symbol3.iterator = '@@iterator';
	        }
	    }
	}
	exports.ensureIterator = ensureIterator;
	function ensureObservable(_Symbol4) {
	    if (!_Symbol4.observable) {
	        if (typeof _Symbol4.for === 'function') {
	            _Symbol4.observable = _Symbol4.for('observable');
	        } else {
	            _Symbol4.observable = '@@observable';
	        }
	    }
	}
	exports.ensureObservable = ensureObservable;
	var SymbolShim = exports.SymbolShim = polyfillSymbol(_root.root);
	//# sourceMappingURL=SymbolShim.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.toSubscriber = toSubscriber;

	var _Subscriber = __webpack_require__(8);

	var _rxSubscriber = __webpack_require__(15);

	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver && (typeof nextOrObserver === 'undefined' ? 'undefined' : _typeof(nextOrObserver)) === 'object') {
	        if (nextOrObserver instanceof _Subscriber.Subscriber) {
	            return nextOrObserver;
	        } else if (typeof nextOrObserver[_rxSubscriber.rxSubscriber] === 'function') {
	            return nextOrObserver[_rxSubscriber.rxSubscriber]();
	        }
	    }
	    return new _Subscriber.Subscriber(nextOrObserver, error, complete);
	}
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Subscriber = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _isFunction = __webpack_require__(9);

	var _Subscription2 = __webpack_require__(10);

	var _rxSubscriber = __webpack_require__(15);

	var _Observer = __webpack_require__(16);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Subscriber = exports.Subscriber = function (_Subscription) {
	    _inherits(Subscriber, _Subscription);

	    function Subscriber(destinationOrNext, error, complete) {
	        _classCallCheck(this, Subscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Subscriber).call(this));

	        _this.syncErrorValue = null;
	        _this.syncErrorThrown = false;
	        _this.syncErrorThrowable = false;
	        _this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                _this.destination = _Observer.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    _this.destination = _Observer.empty;
	                    break;
	                }
	                if ((typeof destinationOrNext === 'undefined' ? 'undefined' : _typeof(destinationOrNext)) === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        _this.destination = destinationOrNext;
	                    } else {
	                        _this.syncErrorThrowable = true;
	                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                _this.syncErrorThrowable = true;
	                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
	                break;
	        }
	        return _this;
	    }

	    _createClass(Subscriber, [{
	        key: 'next',
	        value: function next(value) {
	            if (!this.isStopped) {
	                this._next(value);
	            }
	        }
	    }, {
	        key: 'error',
	        value: function error(err) {
	            if (!this.isStopped) {
	                this.isStopped = true;
	                this._error(err);
	            }
	        }
	    }, {
	        key: 'complete',
	        value: function complete() {
	            if (!this.isStopped) {
	                this.isStopped = true;
	                this._complete();
	            }
	        }
	    }, {
	        key: 'unsubscribe',
	        value: function unsubscribe() {
	            if (this.isUnsubscribed) {
	                return;
	            }
	            this.isStopped = true;
	            _get(Object.getPrototypeOf(Subscriber.prototype), 'unsubscribe', this).call(this);
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.destination.next(value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.destination.error(err);
	            this.unsubscribe();
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.destination.complete();
	            this.unsubscribe();
	        }
	    }, {
	        key: _rxSubscriber.rxSubscriber,
	        value: function value() {
	            return this;
	        }
	    }], [{
	        key: 'create',
	        value: function create(next, error, complete) {
	            var subscriber = new Subscriber(next, error, complete);
	            subscriber.syncErrorThrowable = false;
	            return subscriber;
	        }
	    }]);

	    return Subscriber;
	}(_Subscription2.Subscription);

	var SafeSubscriber = function (_Subscriber) {
	    _inherits(SafeSubscriber, _Subscriber);

	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _classCallCheck(this, SafeSubscriber);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SafeSubscriber).call(this));

	        _this2._parent = _parent;
	        var next = void 0;
	        var context = _this2;
	        if ((0, _isFunction.isFunction)(observerOrNext)) {
	            next = observerOrNext;
	        } else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	        }
	        _this2._context = context;
	        _this2._next = next;
	        _this2._error = error;
	        _this2._complete = complete;
	        return _this2;
	    }

	    _createClass(SafeSubscriber, [{
	        key: 'next',
	        value: function next(value) {
	            if (!this.isStopped && this._next) {
	                var _parent = this._parent;

	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._next, value);
	                } else if (this.__tryOrSetError(_parent, this._next, value)) {
	                    this.unsubscribe();
	                }
	            }
	        }
	    }, {
	        key: 'error',
	        value: function error(err) {
	            if (!this.isStopped) {
	                var _parent = this._parent;

	                if (this._error) {
	                    if (!_parent.syncErrorThrowable) {
	                        this.__tryOrUnsub(this._error, err);
	                        this.unsubscribe();
	                    } else {
	                        this.__tryOrSetError(_parent, this._error, err);
	                        this.unsubscribe();
	                    }
	                } else if (!_parent.syncErrorThrowable) {
	                    this.unsubscribe();
	                    throw err;
	                } else {
	                    _parent.syncErrorValue = err;
	                    _parent.syncErrorThrown = true;
	                    this.unsubscribe();
	                }
	            }
	        }
	    }, {
	        key: 'complete',
	        value: function complete() {
	            if (!this.isStopped) {
	                var _parent = this._parent;

	                if (this._complete) {
	                    if (!_parent.syncErrorThrowable) {
	                        this.__tryOrUnsub(this._complete);
	                        this.unsubscribe();
	                    } else {
	                        this.__tryOrSetError(_parent, this._complete);
	                        this.unsubscribe();
	                    }
	                } else {
	                    this.unsubscribe();
	                }
	            }
	        }
	    }, {
	        key: '__tryOrUnsub',
	        value: function __tryOrUnsub(fn, value) {
	            try {
	                fn.call(this._context, value);
	            } catch (err) {
	                this.unsubscribe();
	                throw err;
	            }
	        }
	    }, {
	        key: '__tryOrSetError',
	        value: function __tryOrSetError(parent, fn, value) {
	            try {
	                fn.call(this._context, value);
	            } catch (err) {
	                parent.syncErrorValue = err;
	                parent.syncErrorThrown = true;
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var _parent = this._parent;

	            this._context = null;
	            this._parent = null;
	            _parent.unsubscribe();
	        }
	    }]);

	    return SafeSubscriber;
	}(Subscriber);
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isFunction = isFunction;
	function isFunction(x) {
	    return typeof x === 'function';
	}
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UnsubscriptionError = exports.Subscription = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isArray = __webpack_require__(11);

	var _isObject = __webpack_require__(12);

	var _isFunction = __webpack_require__(9);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Subscription = exports.Subscription = function () {
	    function Subscription(_unsubscribe) {
	        _classCallCheck(this, Subscription);

	        this.isUnsubscribed = false;
	        if (_unsubscribe) {
	            this._unsubscribe = _unsubscribe;
	        }
	    }

	    _createClass(Subscription, [{
	        key: 'unsubscribe',
	        value: function unsubscribe() {
	            var hasErrors = false;
	            var errors = void 0;
	            if (this.isUnsubscribed) {
	                return;
	            }
	            this.isUnsubscribed = true;
	            var _unsubscribe = this._unsubscribe;
	            var _subscriptions = this._subscriptions;

	            this._subscriptions = null;
	            if ((0, _isFunction.isFunction)(_unsubscribe)) {
	                var trial = (0, _tryCatch.tryCatch)(_unsubscribe).call(this);
	                if (trial === _errorObject.errorObject) {
	                    hasErrors = true;
	                    (errors = errors || []).push(_errorObject.errorObject.e);
	                }
	            }
	            if ((0, _isArray.isArray)(_subscriptions)) {
	                var index = -1;
	                var len = _subscriptions.length;
	                while (++index < len) {
	                    var sub = _subscriptions[index];
	                    if ((0, _isObject.isObject)(sub)) {
	                        var _trial = (0, _tryCatch.tryCatch)(sub.unsubscribe).call(sub);
	                        if (_trial === _errorObject.errorObject) {
	                            hasErrors = true;
	                            errors = errors || [];
	                            var err = _errorObject.errorObject.e;
	                            if (err instanceof UnsubscriptionError) {
	                                errors = errors.concat(err.errors);
	                            } else {
	                                errors.push(err);
	                            }
	                        }
	                    }
	                }
	            }
	            if (hasErrors) {
	                throw new UnsubscriptionError(errors);
	            }
	        }
	    }, {
	        key: 'add',
	        value: function add(subscription) {
	            // return early if:
	            //  1. the subscription is null
	            //  2. we're attempting to add our this
	            //  3. we're attempting to add the static `empty` Subscription
	            if (!subscription || subscription === this || subscription === Subscription.EMPTY) {
	                return;
	            }
	            var sub = subscription;
	            switch (typeof subscription === 'undefined' ? 'undefined' : _typeof(subscription)) {
	                case 'function':
	                    sub = new Subscription(subscription);
	                case 'object':
	                    if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                        break;
	                    } else if (this.isUnsubscribed) {
	                        sub.unsubscribe();
	                    } else {
	                        (this._subscriptions || (this._subscriptions = [])).push(sub);
	                    }
	                    break;
	                default:
	                    throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
	            }
	        }
	    }, {
	        key: 'remove',
	        value: function remove(subscription) {
	            // return early if:
	            //  1. the subscription is null
	            //  2. we're attempting to remove ourthis
	            //  3. we're attempting to remove the static `empty` Subscription
	            if (subscription == null || subscription === this || subscription === Subscription.EMPTY) {
	                return;
	            }
	            var subscriptions = this._subscriptions;
	            if (subscriptions) {
	                var subscriptionIndex = subscriptions.indexOf(subscription);
	                if (subscriptionIndex !== -1) {
	                    subscriptions.splice(subscriptionIndex, 1);
	                }
	            }
	        }
	    }]);

	    return Subscription;
	}();

	Subscription.EMPTY = function (empty) {
	    empty.isUnsubscribed = true;
	    return empty;
	}(new Subscription());

	var UnsubscriptionError = exports.UnsubscriptionError = function (_Error) {
	    _inherits(UnsubscriptionError, _Error);

	    function UnsubscriptionError(errors) {
	        _classCallCheck(this, UnsubscriptionError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnsubscriptionError).call(this, 'unsubscriptoin error(s)'));

	        _this.errors = errors;
	        _this.name = 'UnsubscriptionError';
	        return _this;
	    }

	    return UnsubscriptionError;
	}(Error);
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = exports.isArray = Array.isArray || function (x) {
	  return x && typeof x.length === 'number';
	};
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.isObject = isObject;
	function isObject(x) {
	    return x != null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
	}
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.tryCatch = tryCatch;

	var _errorObject = __webpack_require__(14);

	var tryCatchTarget = void 0;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    } catch (e) {
	        _errorObject.errorObject.e = e;
	        return _errorObject.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// typeof any so that it we don't have to cast when comparing a result to the error object
	var errorObject = exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rxSubscriber = undefined;

	var _SymbolShim = __webpack_require__(6);

	/**
	 * rxSubscriber symbol is a symbol for retreiving an "Rx safe" Observer from an object
	 * "Rx safety" can be defined as an object that has all of the traits of an Rx Subscriber,
	 * including the ability to add and remove subscriptions to the subscription chain and
	 * guarantees involving event triggering (can't "next" after unsubscription, etc).
	 */
	var rxSubscriber = exports.rxSubscriber = _SymbolShim.SymbolShim.for('rxSubscriber');
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var empty = exports.empty = {
	    isUnsubscribed: true,
	    next: function next(value) {},
	    error: function error(err) {
	        throw err;
	    },
	    complete: function complete() {}
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SubjectSubscription = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Subscription2 = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SubjectSubscription = exports.SubjectSubscription = function (_Subscription) {
	    _inherits(SubjectSubscription, _Subscription);

	    function SubjectSubscription(subject, observer) {
	        _classCallCheck(this, SubjectSubscription);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SubjectSubscription).call(this));

	        _this.subject = subject;
	        _this.observer = observer;
	        _this.isUnsubscribed = false;
	        return _this;
	    }

	    _createClass(SubjectSubscription, [{
	        key: 'unsubscribe',
	        value: function unsubscribe() {
	            if (this.isUnsubscribed) {
	                return;
	            }
	            this.isUnsubscribed = true;
	            var subject = this.subject;
	            var observers = subject.observers;
	            this.subject = null;
	            if (!observers || observers.length === 0 || subject.isUnsubscribed) {
	                return;
	            }
	            var subscriberIndex = observers.indexOf(this.observer);
	            if (subscriberIndex !== -1) {
	                observers.splice(subscriberIndex, 1);
	            }
	        }
	    }]);

	    return SubjectSubscription;
	}(_Subscription2.Subscription);
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.throwError = throwError;
	function throwError(e) {
	  throw e;
	}
	//# sourceMappingURL=throwError.js.map

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * an error thrown when an action is invalid because the object
	 * has been unsubscribed
	 */

	var ObjectUnsubscribedError = exports.ObjectUnsubscribedError = function (_Error) {
	    _inherits(ObjectUnsubscribedError, _Error);

	    function ObjectUnsubscribedError() {
	        _classCallCheck(this, ObjectUnsubscribedError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectUnsubscribedError).call(this, 'object unsubscribed'));

	        _this.name = 'ObjectUnsubscribedError';
	        return _this;
	    }

	    return ObjectUnsubscribedError;
	}(Error);
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _combineLatest = __webpack_require__(21);

	_Observable.Observable.combineLatest = _combineLatest.combineLatestStatic;
	var _void = exports._void = undefined;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CombineLatestSubscriber = exports.CombineLatestOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.combineLatest = combineLatest;
	exports.combineLatestStatic = combineLatestStatic;

	var _ArrayObservable = __webpack_require__(22);

	var _isArray = __webpack_require__(11);

	var _isScheduler = __webpack_require__(25);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Combines the values from this observable with values from observables passed as arguments. This is done by subscribing
	 * to each observable, in order, and collecting an array of each of the most recent values any time any of the observables
	 * emits, then either taking that array and passing it as arguments to an option `project` function and emitting the return
	 * value of that, or just emitting the array of recent values directly if there is no `project` function.
	 * @param {...Observable} observables the observables to combine the source with
	 * @param {function} [project] an optional function to project the values from the combined recent values into a new value for emission.
	 * @returns {Observable} an observable of other projected values from the most recent values from each observable, or an array of each of
	 * the most recent values from each observable.
	 */
	function combineLatest() {
	    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
	        observables[_key] = arguments[_key];
	    }

	    var project = null;
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && (0, _isArray.isArray)(observables[0])) {
	        observables = observables[0];
	    }
	    observables.unshift(this);
	    return new _ArrayObservable.ArrayObservable(observables).lift(new CombineLatestOperator(project));
	}
	/* tslint:enable:max-line-length */
	function combineLatestStatic() {
	    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        observables[_key2] = arguments[_key2];
	    }

	    var project = null;
	    var scheduler = null;
	    if ((0, _isScheduler.isScheduler)(observables[observables.length - 1])) {
	        scheduler = observables.pop();
	    }
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && (0, _isArray.isArray)(observables[0])) {
	        observables = observables[0];
	    }
	    return new _ArrayObservable.ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
	}

	var CombineLatestOperator = exports.CombineLatestOperator = function () {
	    function CombineLatestOperator(project) {
	        _classCallCheck(this, CombineLatestOperator);

	        this.project = project;
	    }

	    _createClass(CombineLatestOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new CombineLatestSubscriber(subscriber, this.project);
	        }
	    }]);

	    return CombineLatestOperator;
	}();

	var CombineLatestSubscriber = exports.CombineLatestSubscriber = function (_OuterSubscriber) {
	    _inherits(CombineLatestSubscriber, _OuterSubscriber);

	    function CombineLatestSubscriber(destination, project) {
	        _classCallCheck(this, CombineLatestSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CombineLatestSubscriber).call(this, destination));

	        _this.project = project;
	        _this.active = 0;
	        _this.values = [];
	        _this.observables = [];
	        _this.toRespond = [];
	        return _this;
	    }

	    _createClass(CombineLatestSubscriber, [{
	        key: '_next',
	        value: function _next(observable) {
	            var toRespond = this.toRespond;
	            toRespond.push(toRespond.length);
	            this.observables.push(observable);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var observables = this.observables;
	            var len = observables.length;
	            if (len === 0) {
	                this.destination.complete();
	            } else {
	                this.active = len;
	                for (var i = 0; i < len; i++) {
	                    var observable = observables[i];
	                    this.add((0, _subscribeToResult.subscribeToResult)(this, observable, observable, i));
	                }
	            }
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(unused) {
	            if ((this.active -= 1) === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            var values = this.values;
	            values[outerIndex] = innerValue;
	            var toRespond = this.toRespond;
	            if (toRespond.length > 0) {
	                var found = toRespond.indexOf(outerIndex);
	                if (found !== -1) {
	                    toRespond.splice(found, 1);
	                }
	            }
	            if (toRespond.length === 0) {
	                if (this.project) {
	                    this._tryProject(values);
	                } else {
	                    this.destination.next(values);
	                }
	            }
	        }
	    }, {
	        key: '_tryProject',
	        value: function _tryProject(values) {
	            var result = void 0;
	            try {
	                result = this.project.apply(this, values);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(result);
	        }
	    }]);

	    return CombineLatestSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ArrayObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _ScalarObservable = __webpack_require__(23);

	var _EmptyObservable = __webpack_require__(24);

	var _isScheduler = __webpack_require__(25);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArrayObservable = exports.ArrayObservable = function (_Observable) {
	    _inherits(ArrayObservable, _Observable);

	    function ArrayObservable(array, scheduler) {
	        _classCallCheck(this, ArrayObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayObservable).call(this));

	        _this.array = array;
	        _this.scheduler = scheduler;
	        if (!scheduler && array.length === 1) {
	            _this._isScalar = true;
	            _this.value = array[0];
	        }
	        return _this;
	    }

	    _createClass(ArrayObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var index = 0;
	            var array = this.array;
	            var count = array.length;
	            var scheduler = this.scheduler;
	            if (scheduler) {
	                return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                    array: array, index: index, count: count, subscriber: subscriber
	                });
	            } else {
	                for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
	                    subscriber.next(array[i]);
	                }
	                subscriber.complete();
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(array, scheduler) {
	            return new ArrayObservable(array, scheduler);
	        }
	    }, {
	        key: 'of',
	        value: function of() {
	            for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
	                array[_key] = arguments[_key];
	            }

	            var scheduler = array[array.length - 1];
	            if ((0, _isScheduler.isScheduler)(scheduler)) {
	                array.pop();
	            } else {
	                scheduler = null;
	            }
	            var len = array.length;
	            if (len > 1) {
	                return new ArrayObservable(array, scheduler);
	            } else if (len === 1) {
	                return new _ScalarObservable.ScalarObservable(array[0], scheduler);
	            } else {
	                return new _EmptyObservable.EmptyObservable(scheduler);
	            }
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var array = state.array;
	            var index = state.index;
	            var count = state.count;
	            var subscriber = state.subscriber;

	            if (index >= count) {
	                subscriber.complete();
	                return;
	            }
	            subscriber.next(array[index]);
	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            state.index = index + 1;
	            this.schedule(state);
	        }
	    }]);

	    return ArrayObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=ArrayObservable.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ScalarObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ScalarObservable = exports.ScalarObservable = function (_Observable) {
	    _inherits(ScalarObservable, _Observable);

	    function ScalarObservable(value, scheduler) {
	        _classCallCheck(this, ScalarObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScalarObservable).call(this));

	        _this.value = value;
	        _this.scheduler = scheduler;
	        _this._isScalar = true;
	        return _this;
	    }

	    _createClass(ScalarObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var value = this.value;
	            var scheduler = this.scheduler;
	            if (scheduler) {
	                return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                    done: false, value: value, subscriber: subscriber
	                });
	            } else {
	                subscriber.next(value);
	                if (!subscriber.isUnsubscribed) {
	                    subscriber.complete();
	                }
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(value, scheduler) {
	            return new ScalarObservable(value, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var done = state.done;
	            var value = state.value;
	            var subscriber = state.subscriber;

	            if (done) {
	                subscriber.complete();
	                return;
	            }
	            subscriber.next(value);
	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            state.done = true;
	            this.schedule(state);
	        }
	    }]);

	    return ScalarObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=ScalarObservable.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EmptyObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EmptyObservable = exports.EmptyObservable = function (_Observable) {
	    _inherits(EmptyObservable, _Observable);

	    function EmptyObservable(scheduler) {
	        _classCallCheck(this, EmptyObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EmptyObservable).call(this));

	        _this.scheduler = scheduler;
	        return _this;
	    }

	    _createClass(EmptyObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var scheduler = this.scheduler;
	            if (scheduler) {
	                return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	            } else {
	                subscriber.complete();
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(scheduler) {
	            return new EmptyObservable(scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(_ref) {
	            var subscriber = _ref.subscriber;

	            subscriber.complete();
	        }
	    }]);

	    return EmptyObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isScheduler = isScheduler;
	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	//# sourceMappingURL=isScheduler.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OuterSubscriber = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Subscriber2 = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OuterSubscriber = exports.OuterSubscriber = function (_Subscriber) {
	    _inherits(OuterSubscriber, _Subscriber);

	    function OuterSubscriber() {
	        _classCallCheck(this, OuterSubscriber);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(OuterSubscriber).apply(this, arguments));
	    }

	    _createClass(OuterSubscriber, [{
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.destination.next(innerValue);
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(error, innerSub) {
	            this.destination.error(error);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            this.destination.complete();
	        }
	    }]);

	    return OuterSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.subscribeToResult = subscribeToResult;

	var _root = __webpack_require__(4);

	var _isArray = __webpack_require__(11);

	var _isPromise = __webpack_require__(28);

	var _Observable = __webpack_require__(3);

	var _SymbolShim = __webpack_require__(6);

	var _InnerSubscriber = __webpack_require__(29);

	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new _InnerSubscriber.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.isUnsubscribed) {
	        return;
	    }
	    if (result instanceof _Observable.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return;
	        } else {
	            return result.subscribe(destination);
	        }
	    }
	    if ((0, _isArray.isArray)(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    } else if ((0, _isPromise.isPromise)(result)) {
	        result.then(function (value) {
	            if (!destination.isUnsubscribed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) {
	            return destination.error(err);
	        }).then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            _root.root.setTimeout(function () {
	                throw err;
	            });
	        });
	        return destination;
	    } else if (typeof result[_SymbolShim.SymbolShim.iterator] === 'function') {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var item = _step.value;

	                destination.next(item);
	                if (destination.isUnsubscribed) {
	                    break;
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        if (!destination.isUnsubscribed) {
	            destination.complete();
	        }
	    } else if (typeof result[_SymbolShim.SymbolShim.observable] === 'function') {
	        var obs = result[_SymbolShim.SymbolShim.observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error('invalid observable');
	        } else {
	            return obs.subscribe(new _InnerSubscriber.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    } else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	}
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isPromise = isPromise;
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	//# sourceMappingURL=isPromise.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.InnerSubscriber = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Subscriber2 = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InnerSubscriber = exports.InnerSubscriber = function (_Subscriber) {
	    _inherits(InnerSubscriber, _Subscriber);

	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _classCallCheck(this, InnerSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InnerSubscriber).call(this));

	        _this.parent = parent;
	        _this.outerValue = outerValue;
	        _this.outerIndex = outerIndex;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(InnerSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	        }
	    }, {
	        key: '_error',
	        value: function _error(error) {
	            this.parent.notifyError(error, this);
	            this.unsubscribe();
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.parent.notifyComplete(this);
	            this.unsubscribe();
	        }
	    }]);

	    return InnerSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _concat = __webpack_require__(31);

	_Observable.Observable.concat = _concat.concatStatic;
	var _void = exports._void = undefined;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.concat = concat;
	exports.concatStatic = concatStatic;

	var _isScheduler = __webpack_require__(25);

	var _ArrayObservable = __webpack_require__(22);

	var _mergeAll = __webpack_require__(32);

	/**
	 * Joins this observable with multiple other observables by subscribing to them one at a time, starting with the source,
	 * and merging their results into the returned observable. Will wait for each observable to complete before moving
	 * on to the next.
	 * @params {...Observable} the observables to concatenate
	 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
	 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
	 */
	function concat() {
	    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
	        observables[_key] = arguments[_key];
	    }

	    return concatStatic.apply(undefined, [this].concat(observables));
	}
	/**
	 * Joins multiple observables together by subscribing to them one at a time and merging their results
	 * into the returned observable. Will wait for each observable to complete before moving on to the next.
	 * @params {...Observable} the observables to concatenate
	 * @params {Scheduler} [scheduler] an optional scheduler to schedule each observable subscription on.
	 * @returns {Observable} All values of each passed observable merged into a single observable, in order, in serial fashion.
	 */
	function concatStatic() {
	    var scheduler = null;

	    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        observables[_key2] = arguments[_key2];
	    }

	    var args = observables;
	    if ((0, _isScheduler.isScheduler)(args[observables.length - 1])) {
	        scheduler = args.pop();
	    }
	    return new _ArrayObservable.ArrayObservable(observables, scheduler).lift(new _mergeAll.MergeAllOperator(1));
	}
	//# sourceMappingURL=concat.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MergeAllSubscriber = exports.MergeAllOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.mergeAll = mergeAll;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function mergeAll() {
	    var concurrent = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];

	    return this.lift(new MergeAllOperator(concurrent));
	}

	var MergeAllOperator = exports.MergeAllOperator = function () {
	    function MergeAllOperator(concurrent) {
	        _classCallCheck(this, MergeAllOperator);

	        this.concurrent = concurrent;
	    }

	    _createClass(MergeAllOperator, [{
	        key: 'call',
	        value: function call(observer) {
	            return new MergeAllSubscriber(observer, this.concurrent);
	        }
	    }]);

	    return MergeAllOperator;
	}();

	var MergeAllSubscriber = exports.MergeAllSubscriber = function (_OuterSubscriber) {
	    _inherits(MergeAllSubscriber, _OuterSubscriber);

	    function MergeAllSubscriber(destination, concurrent) {
	        _classCallCheck(this, MergeAllSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MergeAllSubscriber).call(this, destination));

	        _this.concurrent = concurrent;
	        _this.hasCompleted = false;
	        _this.buffer = [];
	        _this.active = 0;
	        return _this;
	    }

	    _createClass(MergeAllSubscriber, [{
	        key: '_next',
	        value: function _next(observable) {
	            if (this.active < this.concurrent) {
	                this.active++;
	                this.add((0, _subscribeToResult.subscribeToResult)(this, observable));
	            } else {
	                this.buffer.push(observable);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.hasCompleted = true;
	            if (this.active === 0 && this.buffer.length === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            var buffer = this.buffer;
	            this.remove(innerSub);
	            this.active--;
	            if (buffer.length > 0) {
	                this._next(buffer.shift());
	            } else if (this.active === 0 && this.hasCompleted) {
	                this.destination.complete();
	            }
	        }
	    }]);

	    return MergeAllSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _merge = __webpack_require__(34);

	_Observable.Observable.merge = _merge.mergeStatic;
	var _void = exports._void = undefined;
	//# sourceMappingURL=merge.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.merge = merge;
	exports.mergeStatic = mergeStatic;

	var _ArrayObservable = __webpack_require__(22);

	var _mergeAll = __webpack_require__(32);

	var _isScheduler = __webpack_require__(25);

	/**
	 * Creates a result Observable which emits values from every given input Observable.
	 *
	 * <img src="./img/merge.png" width="100%">
	 *
	 * @param {Observable} input Observables
	 * @returns {Observable} an Observable that emits items that are the result of every input Observable.
	 */
	function merge() {
	    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
	        observables[_key] = arguments[_key];
	    }

	    observables.unshift(this);
	    return mergeStatic.apply(this, observables);
	}
	function mergeStatic() {
	    var concurrent = Number.POSITIVE_INFINITY;
	    var scheduler = null;

	    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        observables[_key2] = arguments[_key2];
	    }

	    var last = observables[observables.length - 1];
	    if ((0, _isScheduler.isScheduler)(last)) {
	        scheduler = observables.pop();
	        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
	            concurrent = observables.pop();
	        }
	    } else if (typeof last === 'number') {
	        concurrent = observables.pop();
	    }
	    if (observables.length === 1) {
	        return observables[0];
	    }
	    return new _ArrayObservable.ArrayObservable(observables, scheduler).lift(new _mergeAll.MergeAllOperator(concurrent));
	}
	//# sourceMappingURL=merge.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _race = __webpack_require__(36);

	_Observable.Observable.race = _race.raceStatic;
	var _void = exports._void = undefined;
	//# sourceMappingURL=race.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RaceSubscriber = exports.RaceOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.race = race;
	exports.raceStatic = raceStatic;

	var _isArray = __webpack_require__(11);

	var _ArrayObservable = __webpack_require__(22);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that mirrors the first source Observable to emit an item
	 * from the combination of this Observable and supplied Observables
	 * @param {...Observables} ...observables sources used to race for which Observable emits first.
	 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
	 */
	function race() {
	    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
	        observables[_key] = arguments[_key];
	    }

	    // if the only argument is an array, it was most likely called with
	    // `pair([obs1, obs2, ...])`
	    if (observables.length === 1 && (0, _isArray.isArray)(observables[0])) {
	        observables = observables[0];
	    }
	    observables.unshift(this);
	    return raceStatic.apply(this, observables);
	}
	/**
	 * Returns an Observable that mirrors the first source Observable to emit an item.
	 * @param {...Observables} ...observables sources used to race for which Observable emits first.
	 * @returns {Observable} an Observable that mirrors the output of the first Observable to emit an item.
	 */
	function raceStatic() {
	    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        observables[_key2] = arguments[_key2];
	    }

	    // if the only argument is an array, it was most likely called with
	    // `pair([obs1, obs2, ...])`
	    if (observables.length === 1) {
	        if ((0, _isArray.isArray)(observables[0])) {
	            observables = observables[0];
	        } else {
	            return observables[0];
	        }
	    }
	    return new _ArrayObservable.ArrayObservable(observables).lift(new RaceOperator());
	}

	var RaceOperator = exports.RaceOperator = function () {
	    function RaceOperator() {
	        _classCallCheck(this, RaceOperator);
	    }

	    _createClass(RaceOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new RaceSubscriber(subscriber);
	        }
	    }]);

	    return RaceOperator;
	}();

	var RaceSubscriber = exports.RaceSubscriber = function (_OuterSubscriber) {
	    _inherits(RaceSubscriber, _OuterSubscriber);

	    function RaceSubscriber(destination) {
	        _classCallCheck(this, RaceSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RaceSubscriber).call(this, destination));

	        _this.hasFirst = false;
	        _this.observables = [];
	        _this.subscriptions = [];
	        return _this;
	    }

	    _createClass(RaceSubscriber, [{
	        key: '_next',
	        value: function _next(observable) {
	            this.observables.push(observable);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var observables = this.observables;
	            var len = observables.length;
	            if (len === 0) {
	                this.destination.complete();
	            } else {
	                for (var i = 0; i < len; i++) {
	                    var observable = observables[i];
	                    var subscription = (0, _subscribeToResult.subscribeToResult)(this, observable, observable, i);
	                    this.subscriptions.push(subscription);
	                    this.add(subscription);
	                }
	                this.observables = null;
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            if (!this.hasFirst) {
	                this.hasFirst = true;
	                for (var i = 0; i < this.subscriptions.length; i++) {
	                    if (i !== outerIndex) {
	                        var subscription = this.subscriptions[i];
	                        subscription.unsubscribe();
	                        this.remove(subscription);
	                    }
	                }
	                this.subscriptions = null;
	            }
	            this.destination.next(innerValue);
	        }
	    }]);

	    return RaceSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=race.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _BoundCallbackObservable = __webpack_require__(38);

	_Observable.Observable.bindCallback = _BoundCallbackObservable.BoundCallbackObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=bindCallback.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BoundCallbackObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _AsyncSubject = __webpack_require__(39);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BoundCallbackObservable = exports.BoundCallbackObservable = function (_Observable) {
	    _inherits(BoundCallbackObservable, _Observable);

	    function BoundCallbackObservable(callbackFunc, selector, args, scheduler) {
	        _classCallCheck(this, BoundCallbackObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BoundCallbackObservable).call(this));

	        _this.callbackFunc = callbackFunc;
	        _this.selector = selector;
	        _this.args = args;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    /* tslint:enable:max-line-length */


	    _createClass(BoundCallbackObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var callbackFunc = this.callbackFunc;
	            var args = this.args;
	            var scheduler = this.scheduler;
	            var subject = this.subject;
	            if (!scheduler) {
	                if (!subject) {
	                    subject = this.subject = new _AsyncSubject.AsyncSubject();
	                    var handler = function handlerFn() {
	                        var source = handlerFn.source;
	                        var selector = source.selector;
	                        var subject = source.subject;

	                        for (var _len = arguments.length, innerArgs = Array(_len), _key = 0; _key < _len; _key++) {
	                            innerArgs[_key] = arguments[_key];
	                        }

	                        if (selector) {
	                            var _result = (0, _tryCatch.tryCatch)(selector).apply(this, innerArgs);
	                            if (_result === _errorObject.errorObject) {
	                                subject.error(_errorObject.errorObject.e);
	                            } else {
	                                subject.next(_result);
	                                subject.complete();
	                            }
	                        } else {
	                            subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
	                            subject.complete();
	                        }
	                    };
	                    // use named function instance to avoid closure.
	                    handler.source = this;
	                    var result = (0, _tryCatch.tryCatch)(callbackFunc).apply(this, args.concat(handler));
	                    if (result === _errorObject.errorObject) {
	                        subject.error(_errorObject.errorObject.e);
	                    }
	                }
	                return subject.subscribe(subscriber);
	            } else {
	                return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(callbackFunc) {
	            var selector = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
	            var scheduler = arguments[2];

	            return function () {
	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                    args[_key2] = arguments[_key2];
	                }

	                return new BoundCallbackObservable(callbackFunc, selector, args, scheduler);
	            };
	        }
	    }]);

	    return BoundCallbackObservable;
	}(_Observable2.Observable);

	function dispatch(state) {
	    var self = this;
	    var source = state.source;
	    var subscriber = state.subscriber;
	    var callbackFunc = source.callbackFunc;
	    var args = source.args;
	    var scheduler = source.scheduler;

	    var subject = source.subject;
	    if (!subject) {
	        subject = source.subject = new _AsyncSubject.AsyncSubject();
	        var handler = function handlerFn() {
	            var source = handlerFn.source;
	            var selector = source.selector;
	            var subject = source.subject;

	            for (var _len3 = arguments.length, innerArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                innerArgs[_key3] = arguments[_key3];
	            }

	            if (selector) {
	                var _result2 = (0, _tryCatch.tryCatch)(selector).apply(this, innerArgs);
	                if (_result2 === _errorObject.errorObject) {
	                    self.add(scheduler.schedule(dispatchError, 0, { err: _errorObject.errorObject.e, subject: subject }));
	                } else {
	                    self.add(scheduler.schedule(dispatchNext, 0, { value: _result2, subject: subject }));
	                }
	            } else {
	                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
	                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
	            }
	        };
	        // use named function to pass values in without closure
	        handler.source = source;
	        var result = (0, _tryCatch.tryCatch)(callbackFunc).apply(this, args.concat(handler));
	        if (result === _errorObject.errorObject) {
	            subject.error(_errorObject.errorObject.e);
	        }
	    }
	    self.add(subject.subscribe(subscriber));
	}
	function dispatchNext(_ref) {
	    var value = _ref.value;
	    var subject = _ref.subject;

	    subject.next(value);
	    subject.complete();
	}
	function dispatchError(_ref2) {
	    var err = _ref2.err;
	    var subject = _ref2.subject;

	    subject.error(err);
	}
	//# sourceMappingURL=BoundCallbackObservable.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsyncSubject = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Subject2 = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AsyncSubject = exports.AsyncSubject = function (_Subject) {
	    _inherits(AsyncSubject, _Subject);

	    function AsyncSubject() {
	        var _Object$getPrototypeO;

	        _classCallCheck(this, AsyncSubject);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AsyncSubject)).call.apply(_Object$getPrototypeO, [this].concat(args)));

	        _this.value = null;
	        _this.hasNext = false;
	        return _this;
	    }

	    _createClass(AsyncSubject, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            if (this.hasCompleted && this.hasNext) {
	                subscriber.next(this.value);
	            }
	            return _get(Object.getPrototypeOf(AsyncSubject.prototype), '_subscribe', this).call(this, subscriber);
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.value = value;
	            this.hasNext = true;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var index = -1;
	            var observers = this.observers;
	            var len = observers.length;
	            // optimization to block our SubjectSubscriptions from
	            // splicing themselves out of the observers list one by one.
	            this.isUnsubscribed = true;
	            if (this.hasNext) {
	                while (++index < len) {
	                    var o = observers[index];
	                    o.next(this.value);
	                    o.complete();
	                }
	            } else {
	                while (++index < len) {
	                    observers[index].complete();
	                }
	            }
	            this.isUnsubscribed = false;
	            this.unsubscribe();
	        }
	    }]);

	    return AsyncSubject;
	}(_Subject2.Subject);
	//# sourceMappingURL=AsyncSubject.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _BoundNodeCallbackObservable = __webpack_require__(41);

	_Observable.Observable.bindNodeCallback = _BoundNodeCallbackObservable.BoundNodeCallbackObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=bindNodeCallback.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BoundNodeCallbackObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _AsyncSubject = __webpack_require__(39);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BoundNodeCallbackObservable = exports.BoundNodeCallbackObservable = function (_Observable) {
	    _inherits(BoundNodeCallbackObservable, _Observable);

	    function BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler) {
	        _classCallCheck(this, BoundNodeCallbackObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BoundNodeCallbackObservable).call(this));

	        _this.callbackFunc = callbackFunc;
	        _this.selector = selector;
	        _this.args = args;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    /* tslint:enable:max-line-length */


	    _createClass(BoundNodeCallbackObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var callbackFunc = this.callbackFunc;
	            var args = this.args;
	            var scheduler = this.scheduler;
	            var subject = this.subject;
	            if (!scheduler) {
	                if (!subject) {
	                    subject = this.subject = new _AsyncSubject.AsyncSubject();
	                    var handler = function handlerFn() {
	                        var source = handlerFn.source;
	                        var selector = source.selector;
	                        var subject = source.subject;

	                        for (var _len = arguments.length, innerArgs = Array(_len), _key = 0; _key < _len; _key++) {
	                            innerArgs[_key] = arguments[_key];
	                        }

	                        var err = innerArgs.shift();
	                        if (err) {
	                            subject.error(err);
	                        } else if (selector) {
	                            var _result = (0, _tryCatch.tryCatch)(selector).apply(this, innerArgs);
	                            if (_result === _errorObject.errorObject) {
	                                subject.error(_errorObject.errorObject.e);
	                            } else {
	                                subject.next(_result);
	                                subject.complete();
	                            }
	                        } else {
	                            subject.next(innerArgs.length === 1 ? innerArgs[0] : innerArgs);
	                            subject.complete();
	                        }
	                    };
	                    // use named function instance to avoid closure.
	                    handler.source = this;
	                    var result = (0, _tryCatch.tryCatch)(callbackFunc).apply(this, args.concat(handler));
	                    if (result === _errorObject.errorObject) {
	                        subject.error(_errorObject.errorObject.e);
	                    }
	                }
	                return subject.subscribe(subscriber);
	            } else {
	                return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber });
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(callbackFunc) {
	            var selector = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
	            var scheduler = arguments[2];

	            return function () {
	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                    args[_key2] = arguments[_key2];
	                }

	                return new BoundNodeCallbackObservable(callbackFunc, selector, args, scheduler);
	            };
	        }
	    }]);

	    return BoundNodeCallbackObservable;
	}(_Observable2.Observable);

	function dispatch(state) {
	    var self = this;
	    var source = state.source;
	    var subscriber = state.subscriber;
	    var callbackFunc = source.callbackFunc;
	    var args = source.args;
	    var scheduler = source.scheduler;

	    var subject = source.subject;
	    if (!subject) {
	        subject = source.subject = new _AsyncSubject.AsyncSubject();
	        var handler = function handlerFn() {
	            var source = handlerFn.source;
	            var selector = source.selector;
	            var subject = source.subject;

	            for (var _len3 = arguments.length, innerArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                innerArgs[_key3] = arguments[_key3];
	            }

	            var err = innerArgs.shift();
	            if (err) {
	                subject.error(err);
	            } else if (selector) {
	                var _result2 = (0, _tryCatch.tryCatch)(selector).apply(this, innerArgs);
	                if (_result2 === _errorObject.errorObject) {
	                    self.add(scheduler.schedule(dispatchError, 0, { err: _errorObject.errorObject.e, subject: subject }));
	                } else {
	                    self.add(scheduler.schedule(dispatchNext, 0, { value: _result2, subject: subject }));
	                }
	            } else {
	                var value = innerArgs.length === 1 ? innerArgs[0] : innerArgs;
	                self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
	            }
	        };
	        // use named function to pass values in without closure
	        handler.source = source;
	        var result = (0, _tryCatch.tryCatch)(callbackFunc).apply(this, args.concat(handler));
	        if (result === _errorObject.errorObject) {
	            subject.error(_errorObject.errorObject.e);
	        }
	    }
	    self.add(subject.subscribe(subscriber));
	}
	function dispatchNext(_ref) {
	    var value = _ref.value;
	    var subject = _ref.subject;

	    subject.next(value);
	    subject.complete();
	}
	function dispatchError(_ref2) {
	    var err = _ref2.err;
	    var subject = _ref2.subject;

	    subject.error(err);
	}
	//# sourceMappingURL=BoundNodeCallbackObservable.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _DeferObservable = __webpack_require__(43);

	_Observable.Observable.defer = _DeferObservable.DeferObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=defer.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DeferObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DeferObservable = exports.DeferObservable = function (_Observable) {
	    _inherits(DeferObservable, _Observable);

	    function DeferObservable(observableFactory) {
	        _classCallCheck(this, DeferObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DeferObservable).call(this));

	        _this.observableFactory = observableFactory;
	        return _this;
	    }

	    _createClass(DeferObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var result = (0, _tryCatch.tryCatch)(this.observableFactory)();
	            if (result === _errorObject.errorObject) {
	                subscriber.error(_errorObject.errorObject.e);
	            } else {
	                result.subscribe(subscriber);
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(observableFactory) {
	            return new DeferObservable(observableFactory);
	        }
	    }]);

	    return DeferObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=DeferObservable.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _EmptyObservable = __webpack_require__(24);

	_Observable.Observable.empty = _EmptyObservable.EmptyObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=empty.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _ForkJoinObservable = __webpack_require__(46);

	_Observable.Observable.forkJoin = _ForkJoinObservable.ForkJoinObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=forkJoin.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ForkJoinObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _Subscriber2 = __webpack_require__(8);

	var _PromiseObservable = __webpack_require__(47);

	var _EmptyObservable = __webpack_require__(24);

	var _isPromise = __webpack_require__(28);

	var _isArray = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ForkJoinObservable = exports.ForkJoinObservable = function (_Observable) {
	    _inherits(ForkJoinObservable, _Observable);

	    function ForkJoinObservable(sources, resultSelector) {
	        _classCallCheck(this, ForkJoinObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ForkJoinObservable).call(this));

	        _this.sources = sources;
	        _this.resultSelector = resultSelector;
	        return _this;
	    }

	    _createClass(ForkJoinObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var sources = this.sources;
	            var len = sources.length;
	            var context = { completed: 0, total: len, values: emptyArray(len), selector: this.resultSelector };
	            for (var i = 0; i < len; i++) {
	                var source = sources[i];
	                if ((0, _isPromise.isPromise)(source)) {
	                    source = new _PromiseObservable.PromiseObservable(source);
	                }
	                source.subscribe(new AllSubscriber(subscriber, i, context));
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create() {
	            for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	                sources[_key] = arguments[_key];
	            }

	            if (sources === null || arguments.length === 0) {
	                return new _EmptyObservable.EmptyObservable();
	            }
	            var resultSelector = null;
	            if (typeof sources[sources.length - 1] === 'function') {
	                resultSelector = sources.pop();
	            }
	            // if the first and only other argument besides the resultSelector is an array
	            // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
	            if (sources.length === 1 && (0, _isArray.isArray)(sources[0])) {
	                sources = sources[0];
	            }
	            if (sources.length === 0) {
	                return new _EmptyObservable.EmptyObservable();
	            }
	            return new ForkJoinObservable(sources, resultSelector);
	        }
	    }]);

	    return ForkJoinObservable;
	}(_Observable2.Observable);

	var AllSubscriber = function (_Subscriber) {
	    _inherits(AllSubscriber, _Subscriber);

	    function AllSubscriber(destination, index, context) {
	        _classCallCheck(this, AllSubscriber);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AllSubscriber).call(this, destination));

	        _this2.index = index;
	        _this2.context = context;
	        _this2._value = null;
	        return _this2;
	    }

	    _createClass(AllSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this._value = value;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var destination = this.destination;
	            if (this._value == null) {
	                destination.complete();
	            }
	            var context = this.context;
	            context.completed++;
	            context.values[this.index] = this._value;
	            var values = context.values;
	            if (context.completed !== values.length) {
	                return;
	            }
	            if (values.every(hasValue)) {
	                var value = context.selector ? context.selector.apply(this, values) : values;
	                destination.next(value);
	            }
	            destination.complete();
	        }
	    }]);

	    return AllSubscriber;
	}(_Subscriber2.Subscriber);

	function hasValue(x) {
	    return x !== null;
	}
	function emptyArray(len) {
	    var arr = [];
	    for (var i = 0; i < len; i++) {
	        arr.push(null);
	    }
	    return arr;
	}
	//# sourceMappingURL=ForkJoinObservable.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PromiseObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _root = __webpack_require__(4);

	var _Observable2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PromiseObservable = exports.PromiseObservable = function (_Observable) {
	    _inherits(PromiseObservable, _Observable);

	    function PromiseObservable(promise) {
	        var scheduler = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	        _classCallCheck(this, PromiseObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PromiseObservable).call(this));

	        _this.promise = promise;
	        _this.scheduler = scheduler;
	        return _this;
	    }

	    _createClass(PromiseObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var _this2 = this;

	            var promise = this.promise;
	            var scheduler = this.scheduler;
	            if (scheduler == null) {
	                if (this._isScalar) {
	                    if (!subscriber.isUnsubscribed) {
	                        subscriber.next(this.value);
	                        subscriber.complete();
	                    }
	                } else {
	                    promise.then(function (value) {
	                        _this2.value = value;
	                        _this2._isScalar = true;
	                        if (!subscriber.isUnsubscribed) {
	                            subscriber.next(value);
	                            subscriber.complete();
	                        }
	                    }, function (err) {
	                        if (!subscriber.isUnsubscribed) {
	                            subscriber.error(err);
	                        }
	                    }).then(null, function (err) {
	                        // escape the promise trap, throw unhandled errors
	                        _root.root.setTimeout(function () {
	                            throw err;
	                        });
	                    });
	                }
	            } else {
	                if (this._isScalar) {
	                    if (!subscriber.isUnsubscribed) {
	                        return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
	                    }
	                } else {
	                    promise.then(function (value) {
	                        _this2.value = value;
	                        _this2._isScalar = true;
	                        if (!subscriber.isUnsubscribed) {
	                            subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
	                        }
	                    }, function (err) {
	                        if (!subscriber.isUnsubscribed) {
	                            subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
	                        }
	                    }).then(null, function (err) {
	                        // escape the promise trap, throw unhandled errors
	                        _root.root.setTimeout(function () {
	                            throw err;
	                        });
	                    });
	                }
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(promise) {
	            var scheduler = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	            return new PromiseObservable(promise, scheduler);
	        }
	    }]);

	    return PromiseObservable;
	}(_Observable2.Observable);

	function dispatchNext(_ref) {
	    var value = _ref.value;
	    var subscriber = _ref.subscriber;

	    if (!subscriber.isUnsubscribed) {
	        subscriber.next(value);
	        subscriber.complete();
	    }
	}
	function dispatchError(_ref2) {
	    var err = _ref2.err;
	    var subscriber = _ref2.subscriber;

	    if (!subscriber.isUnsubscribed) {
	        subscriber.error(err);
	    }
	}
	//# sourceMappingURL=PromiseObservable.js.map

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _FromObservable = __webpack_require__(49);

	_Observable.Observable.from = _FromObservable.FromObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=from.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FromObservable = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isArray = __webpack_require__(11);

	var _isFunction = __webpack_require__(9);

	var _isPromise = __webpack_require__(28);

	var _isScheduler = __webpack_require__(25);

	var _PromiseObservable = __webpack_require__(47);

	var _IteratorObservable = __webpack_require__(50);

	var _ArrayObservable = __webpack_require__(22);

	var _ArrayLikeObservable = __webpack_require__(51);

	var _SymbolShim = __webpack_require__(6);

	var _Observable2 = __webpack_require__(3);

	var _observeOn = __webpack_require__(52);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var isArrayLike = function isArrayLike(x) {
	    return x && typeof x.length === 'number';
	};

	var FromObservable = exports.FromObservable = function (_Observable) {
	    _inherits(FromObservable, _Observable);

	    function FromObservable(ish, scheduler) {
	        _classCallCheck(this, FromObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FromObservable).call(this, null));

	        _this.ish = ish;
	        _this.scheduler = scheduler;
	        return _this;
	    }

	    _createClass(FromObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var ish = this.ish;
	            var scheduler = this.scheduler;
	            if (scheduler == null) {
	                return ish[_SymbolShim.SymbolShim.observable]().subscribe(subscriber);
	            } else {
	                return ish[_SymbolShim.SymbolShim.observable]().subscribe(new _observeOn.ObserveOnSubscriber(subscriber, scheduler, 0));
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(ish, mapFnOrScheduler, thisArg, lastScheduler) {
	            var scheduler = null;
	            var mapFn = null;
	            if ((0, _isFunction.isFunction)(mapFnOrScheduler)) {
	                scheduler = lastScheduler || null;
	                mapFn = mapFnOrScheduler;
	            } else if ((0, _isScheduler.isScheduler)(scheduler)) {
	                scheduler = mapFnOrScheduler;
	            }
	            if (ish != null) {
	                if (typeof ish[_SymbolShim.SymbolShim.observable] === 'function') {
	                    if (ish instanceof _Observable2.Observable && !scheduler) {
	                        return ish;
	                    }
	                    return new FromObservable(ish, scheduler);
	                } else if ((0, _isArray.isArray)(ish)) {
	                    return new _ArrayObservable.ArrayObservable(ish, scheduler);
	                } else if ((0, _isPromise.isPromise)(ish)) {
	                    return new _PromiseObservable.PromiseObservable(ish, scheduler);
	                } else if (typeof ish[_SymbolShim.SymbolShim.iterator] === 'function' || typeof ish === 'string') {
	                    return new _IteratorObservable.IteratorObservable(ish, null, null, scheduler);
	                } else if (isArrayLike(ish)) {
	                    return new _ArrayLikeObservable.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
	                }
	            }
	            throw new TypeError((ish !== null && (typeof ish === 'undefined' ? 'undefined' : _typeof(ish)) || ish) + ' is not observable');
	        }
	    }]);

	    return FromObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=FromObservable.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IteratorObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _root = __webpack_require__(4);

	var _isObject = __webpack_require__(12);

	var _tryCatch = __webpack_require__(13);

	var _Observable2 = __webpack_require__(3);

	var _isFunction = __webpack_require__(9);

	var _SymbolShim = __webpack_require__(6);

	var _errorObject = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IteratorObservable = exports.IteratorObservable = function (_Observable) {
	    _inherits(IteratorObservable, _Observable);

	    function IteratorObservable(iterator, project, thisArg, scheduler) {
	        _classCallCheck(this, IteratorObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IteratorObservable).call(this));

	        if (iterator == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        if ((0, _isObject.isObject)(project)) {
	            _this.thisArg = project;
	            _this.scheduler = thisArg;
	        } else if ((0, _isFunction.isFunction)(project)) {
	            _this.project = project;
	            _this.thisArg = thisArg;
	            _this.scheduler = scheduler;
	        } else if (project != null) {
	            throw new Error('When provided, `project` must be a function.');
	        }
	        _this.iterator = getIterator(iterator);
	        return _this;
	    }

	    _createClass(IteratorObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var index = 0;
	            var iterator = this.iterator;
	            var project = this.project;
	            var thisArg = this.thisArg;
	            var scheduler = this.scheduler;

	            if (scheduler) {
	                return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                    index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
	                });
	            } else {
	                do {
	                    var result = iterator.next();
	                    if (result.done) {
	                        subscriber.complete();
	                        break;
	                    } else if (project) {
	                        result = (0, _tryCatch.tryCatch)(project).call(thisArg, result.value, index++);
	                        if (result === _errorObject.errorObject) {
	                            subscriber.error(_errorObject.errorObject.e);
	                            break;
	                        }
	                        subscriber.next(result);
	                    } else {
	                        subscriber.next(result.value);
	                    }
	                    if (subscriber.isUnsubscribed) {
	                        break;
	                    }
	                } while (true);
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(iterator, project, thisArg, scheduler) {
	            return new IteratorObservable(iterator, project, thisArg, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var index = state.index;
	            var hasError = state.hasError;
	            var thisArg = state.thisArg;
	            var project = state.project;
	            var iterator = state.iterator;
	            var subscriber = state.subscriber;

	            if (hasError) {
	                subscriber.error(state.error);
	                return;
	            }
	            var result = iterator.next();
	            if (result.done) {
	                subscriber.complete();
	                return;
	            }
	            if (project) {
	                result = (0, _tryCatch.tryCatch)(project).call(thisArg, result.value, index);
	                if (result === _errorObject.errorObject) {
	                    state.error = _errorObject.errorObject.e;
	                    state.hasError = true;
	                } else {
	                    subscriber.next(result);
	                    state.index = index + 1;
	                }
	            } else {
	                subscriber.next(result.value);
	                state.index = index + 1;
	            }
	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            this.schedule(state);
	        }
	    }]);

	    return IteratorObservable;
	}(_Observable2.Observable);

	var StringIterator = function () {
	    function StringIterator(str) {
	        var idx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var len = arguments.length <= 2 || arguments[2] === undefined ? str.length : arguments[2];

	        _classCallCheck(this, StringIterator);

	        this.str = str;
	        this.idx = idx;
	        this.len = len;
	    }

	    _createClass(StringIterator, [{
	        key: _SymbolShim.SymbolShim.iterator,
	        value: function value() {
	            return this;
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            return this.idx < this.len ? {
	                done: false,
	                value: this.str.charAt(this.idx++)
	            } : {
	                done: true,
	                value: undefined
	            };
	        }
	    }]);

	    return StringIterator;
	}();

	var ArrayIterator = function () {
	    function ArrayIterator(arr) {
	        var idx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var len = arguments.length <= 2 || arguments[2] === undefined ? toLength(arr) : arguments[2];

	        _classCallCheck(this, ArrayIterator);

	        this.arr = arr;
	        this.idx = idx;
	        this.len = len;
	    }

	    _createClass(ArrayIterator, [{
	        key: _SymbolShim.SymbolShim.iterator,
	        value: function value() {
	            return this;
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            return this.idx < this.len ? {
	                done: false,
	                value: this.arr[this.idx++]
	            } : {
	                done: true,
	                value: undefined
	            };
	        }
	    }]);

	    return ArrayIterator;
	}();

	function getIterator(obj) {
	    var i = obj[_SymbolShim.SymbolShim.iterator];
	    if (!i && typeof obj === 'string') {
	        return new StringIterator(obj);
	    }
	    if (!i && obj.length !== undefined) {
	        return new ArrayIterator(obj);
	    }
	    if (!i) {
	        throw new TypeError('Object is not iterable');
	    }
	    return obj[_SymbolShim.SymbolShim.iterator]();
	}
	var maxSafeInteger = Math.pow(2, 53) - 1;
	function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) {
	        return 0;
	    }
	    if (len === 0 || !numberIsFinite(len)) {
	        return len;
	    }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) {
	        return 0;
	    }
	    if (len > maxSafeInteger) {
	        return maxSafeInteger;
	    }
	    return len;
	}
	function numberIsFinite(value) {
	    return typeof value === 'number' && _root.root.isFinite(value);
	}
	function sign(value) {
	    var valueAsNumber = +value;
	    if (valueAsNumber === 0) {
	        return valueAsNumber;
	    }
	    if (isNaN(valueAsNumber)) {
	        return valueAsNumber;
	    }
	    return valueAsNumber < 0 ? -1 : 1;
	}
	//# sourceMappingURL=IteratorObservable.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ArrayLikeObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _ScalarObservable = __webpack_require__(23);

	var _EmptyObservable = __webpack_require__(24);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArrayLikeObservable = exports.ArrayLikeObservable = function (_Observable) {
	    _inherits(ArrayLikeObservable, _Observable);

	    function ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler) {
	        _classCallCheck(this, ArrayLikeObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayLikeObservable).call(this));

	        _this.arrayLike = arrayLike;
	        _this.scheduler = scheduler;
	        if (!mapFn && !scheduler && arrayLike.length === 1) {
	            _this._isScalar = true;
	            _this.value = arrayLike[0];
	        }
	        if (mapFn) {
	            _this.mapFn = mapFn.bind(thisArg);
	        }
	        return _this;
	    }

	    _createClass(ArrayLikeObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var index = 0;
	            var arrayLike = this.arrayLike;
	            var mapFn = this.mapFn;
	            var scheduler = this.scheduler;

	            var length = arrayLike.length;
	            if (scheduler) {
	                return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
	                    arrayLike: arrayLike, index: index, length: length, mapFn: mapFn, subscriber: subscriber
	                });
	            } else {
	                for (var i = 0; i < length && !subscriber.isUnsubscribed; i++) {
	                    var result = mapFn ? mapFn(arrayLike[i], i) : arrayLike[i];
	                    subscriber.next(result);
	                }
	                subscriber.complete();
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(arrayLike, mapFn, thisArg, scheduler) {
	            var length = arrayLike.length;
	            if (length === 0) {
	                return new _EmptyObservable.EmptyObservable();
	            } else if (length === 1 && !mapFn) {
	                return new _ScalarObservable.ScalarObservable(arrayLike[0], scheduler);
	            } else {
	                return new ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler);
	            }
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var arrayLike = state.arrayLike;
	            var index = state.index;
	            var length = state.length;
	            var mapFn = state.mapFn;
	            var subscriber = state.subscriber;

	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            if (index >= length) {
	                subscriber.complete();
	                return;
	            }
	            var result = mapFn ? mapFn(arrayLike[index], index) : arrayLike[index];
	            subscriber.next(result);
	            state.index = index + 1;
	            this.schedule(state);
	        }
	    }]);

	    return ArrayLikeObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ObserveOnSubscriber = exports.ObserveOnOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.observeOn = observeOn;

	var _Subscriber2 = __webpack_require__(8);

	var _Notification = __webpack_require__(53);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function observeOn(scheduler) {
	    var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}

	var ObserveOnOperator = exports.ObserveOnOperator = function () {
	    function ObserveOnOperator(scheduler) {
	        var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	        _classCallCheck(this, ObserveOnOperator);

	        this.scheduler = scheduler;
	        this.delay = delay;
	    }

	    _createClass(ObserveOnOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ObserveOnSubscriber(subscriber, this.scheduler, this.delay);
	        }
	    }]);

	    return ObserveOnOperator;
	}();

	var ObserveOnSubscriber = exports.ObserveOnSubscriber = function (_Subscriber) {
	    _inherits(ObserveOnSubscriber, _Subscriber);

	    function ObserveOnSubscriber(destination, scheduler) {
	        var delay = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	        _classCallCheck(this, ObserveOnSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObserveOnSubscriber).call(this, destination));

	        _this.scheduler = scheduler;
	        _this.delay = delay;
	        return _this;
	    }

	    _createClass(ObserveOnSubscriber, [{
	        key: 'scheduleMessage',
	        value: function scheduleMessage(notification) {
	            this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.scheduleMessage(_Notification.Notification.createNext(value));
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.scheduleMessage(_Notification.Notification.createError(err));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.scheduleMessage(_Notification.Notification.createComplete());
	        }
	    }], [{
	        key: 'dispatch',
	        value: function dispatch(_ref) {
	            var notification = _ref.notification;
	            var destination = _ref.destination;

	            notification.observe(destination);
	        }
	    }]);

	    return ObserveOnSubscriber;
	}(_Subscriber2.Subscriber);

	var ObserveOnMessage = function ObserveOnMessage(notification, destination) {
	    _classCallCheck(this, ObserveOnMessage);

	    this.notification = notification;
	    this.destination = destination;
	};
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Notification = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Notification = exports.Notification = function () {
	    function Notification(kind, value, exception) {
	        _classCallCheck(this, Notification);

	        this.kind = kind;
	        this.value = value;
	        this.exception = exception;
	        this.hasValue = kind === 'N';
	    }

	    _createClass(Notification, [{
	        key: 'observe',
	        value: function observe(observer) {
	            switch (this.kind) {
	                case 'N':
	                    return observer.next && observer.next(this.value);
	                case 'E':
	                    return observer.error && observer.error(this.exception);
	                case 'C':
	                    return observer.complete && observer.complete();
	            }
	        }
	    }, {
	        key: 'do',
	        value: function _do(next, error, complete) {
	            var kind = this.kind;
	            switch (kind) {
	                case 'N':
	                    return next && next(this.value);
	                case 'E':
	                    return error && error(this.exception);
	                case 'C':
	                    return complete && complete();
	            }
	        }
	    }, {
	        key: 'accept',
	        value: function accept(nextOrObserver, error, complete) {
	            if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	                return this.observe(nextOrObserver);
	            } else {
	                return this.do(nextOrObserver, error, complete);
	            }
	        }
	    }, {
	        key: 'toObservable',
	        value: function toObservable() {
	            var kind = this.kind;
	            switch (kind) {
	                case 'N':
	                    return _Observable.Observable.of(this.value);
	                case 'E':
	                    return _Observable.Observable.throw(this.exception);
	                case 'C':
	                    return _Observable.Observable.empty();
	            }
	        }
	    }], [{
	        key: 'createNext',
	        value: function createNext(value) {
	            if (typeof value !== 'undefined') {
	                return new Notification('N', value);
	            }
	            return this.undefinedValueNotification;
	        }
	    }, {
	        key: 'createError',
	        value: function createError(err) {
	            return new Notification('E', undefined, err);
	        }
	    }, {
	        key: 'createComplete',
	        value: function createComplete() {
	            return this.completeNotification;
	        }
	    }]);

	    return Notification;
	}();

	Notification.completeNotification = new Notification('C');
	Notification.undefinedValueNotification = new Notification('N', undefined);
	//# sourceMappingURL=Notification.js.map

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _ArrayObservable = __webpack_require__(22);

	_Observable.Observable.fromArray = _ArrayObservable.ArrayObservable.create;
	_Observable.Observable.of = _ArrayObservable.ArrayObservable.of;
	var _void = exports._void = undefined;
	//# sourceMappingURL=fromArray.js.map

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _FromEventObservable = __webpack_require__(56);

	_Observable.Observable.fromEvent = _FromEventObservable.FromEventObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FromEventObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _Subscription = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function isNodeStyleEventEmmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
	}
	function isJQueryStyleEventEmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
	}
	function isNodeList(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
	}
	function isHTMLCollection(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
	}
	function isEventTarget(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
	}

	var FromEventObservable = exports.FromEventObservable = function (_Observable) {
	    _inherits(FromEventObservable, _Observable);

	    function FromEventObservable(sourceObj, eventName, selector) {
	        _classCallCheck(this, FromEventObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FromEventObservable).call(this));

	        _this.sourceObj = sourceObj;
	        _this.eventName = eventName;
	        _this.selector = selector;
	        return _this;
	    }

	    _createClass(FromEventObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var sourceObj = this.sourceObj;
	            var eventName = this.eventName;
	            var selector = this.selector;
	            var handler = selector ? function () {
	                var result = (0, _tryCatch.tryCatch)(selector).apply(undefined, arguments);
	                if (result === _errorObject.errorObject) {
	                    subscriber.error(_errorObject.errorObject.e);
	                } else {
	                    subscriber.next(result);
	                }
	            } : function (e) {
	                return subscriber.next(e);
	            };
	            FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
	        }
	    }], [{
	        key: 'create',
	        value: function create(sourceObj, eventName, selector) {
	            return new FromEventObservable(sourceObj, eventName, selector);
	        }
	    }, {
	        key: 'setupSubscription',
	        value: function setupSubscription(sourceObj, eventName, handler, subscriber) {
	            var unsubscribe = void 0;
	            if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
	                for (var i = 0, len = sourceObj.length; i < len; i++) {
	                    FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
	                }
	            } else if (isEventTarget(sourceObj)) {
	                sourceObj.addEventListener(eventName, handler);
	                unsubscribe = function unsubscribe() {
	                    return sourceObj.removeEventListener(eventName, handler);
	                };
	            } else if (isJQueryStyleEventEmitter(sourceObj)) {
	                sourceObj.on(eventName, handler);
	                unsubscribe = function unsubscribe() {
	                    return sourceObj.off(eventName, handler);
	                };
	            } else if (isNodeStyleEventEmmitter(sourceObj)) {
	                sourceObj.addListener(eventName, handler);
	                unsubscribe = function unsubscribe() {
	                    return sourceObj.removeListener(eventName, handler);
	                };
	            }
	            subscriber.add(new _Subscription.Subscription(unsubscribe));
	        }
	    }]);

	    return FromEventObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=FromEventObservable.js.map

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _FromEventPatternObservable = __webpack_require__(58);

	_Observable.Observable.fromEventPattern = _FromEventPatternObservable.FromEventPatternObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=fromEventPattern.js.map

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FromEventPatternObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _Subscription = __webpack_require__(10);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FromEventPatternObservable = exports.FromEventPatternObservable = function (_Observable) {
	    _inherits(FromEventPatternObservable, _Observable);

	    function FromEventPatternObservable(addHandler, removeHandler, selector) {
	        _classCallCheck(this, FromEventPatternObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FromEventPatternObservable).call(this));

	        _this.addHandler = addHandler;
	        _this.removeHandler = removeHandler;
	        _this.selector = selector;
	        return _this;
	    }

	    _createClass(FromEventPatternObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var addHandler = this.addHandler;
	            var removeHandler = this.removeHandler;
	            var selector = this.selector;
	            var handler = selector ? function (e) {
	                var result = (0, _tryCatch.tryCatch)(selector).apply(null, arguments);
	                if (result === _errorObject.errorObject) {
	                    subscriber.error(result.e);
	                } else {
	                    subscriber.next(result);
	                }
	            } : function (e) {
	                subscriber.next(e);
	            };
	            var result = (0, _tryCatch.tryCatch)(addHandler)(handler);
	            if (result === _errorObject.errorObject) {
	                subscriber.error(result.e);
	            }
	            subscriber.add(new _Subscription.Subscription(function () {
	                //TODO: determine whether or not to forward to error handler
	                removeHandler(handler);
	            }));
	        }
	    }], [{
	        key: 'create',
	        value: function create(addHandler, removeHandler, selector) {
	            return new FromEventPatternObservable(addHandler, removeHandler, selector);
	        }
	    }]);

	    return FromEventPatternObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=FromEventPatternObservable.js.map

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _PromiseObservable = __webpack_require__(47);

	_Observable.Observable.fromPromise = _PromiseObservable.PromiseObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=fromPromise.js.map

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _IntervalObservable = __webpack_require__(61);

	_Observable.Observable.interval = _IntervalObservable.IntervalObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=interval.js.map

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IntervalObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isNumeric = __webpack_require__(62);

	var _Observable2 = __webpack_require__(3);

	var _asap = __webpack_require__(63);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IntervalObservable = exports.IntervalObservable = function (_Observable) {
	    _inherits(IntervalObservable, _Observable);

	    function IntervalObservable() {
	        var period = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	        _classCallCheck(this, IntervalObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IntervalObservable).call(this));

	        _this.period = period;
	        _this.scheduler = scheduler;
	        if (!(0, _isNumeric.isNumeric)(period) || period < 0) {
	            _this.period = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            _this.scheduler = _asap.asap;
	        }
	        return _this;
	    }

	    _createClass(IntervalObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var index = 0;
	            var period = this.period;
	            var scheduler = this.scheduler;
	            subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
	                index: index, subscriber: subscriber, period: period
	            }));
	        }
	    }], [{
	        key: 'create',
	        value: function create() {
	            var period = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	            return new IntervalObservable(period, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var index = state.index;
	            var subscriber = state.subscriber;
	            var period = state.period;

	            subscriber.next(index);
	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            state.index += 1;
	            this.schedule(state, period);
	        }
	    }]);

	    return IntervalObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=IntervalObservable.js.map

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isNumeric = isNumeric;

	var _isArray = __webpack_require__(11);

	function isNumeric(val) {
	    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	    // subtraction forces infinities to NaN
	    // adding 1 corrects loss of precision from parseFloat (#15100)
	    return !(0, _isArray.isArray)(val) && val - parseFloat(val) + 1 >= 0;
	}
	;
	//# sourceMappingURL=isNumeric.js.map

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.asap = undefined;

	var _AsapScheduler = __webpack_require__(64);

	var asap = exports.asap = new _AsapScheduler.AsapScheduler();
	//# sourceMappingURL=asap.js.map

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsapScheduler = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AsapAction = __webpack_require__(65);

	var _QueueScheduler2 = __webpack_require__(70);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AsapScheduler = exports.AsapScheduler = function (_QueueScheduler) {
	    _inherits(AsapScheduler, _QueueScheduler);

	    function AsapScheduler() {
	        _classCallCheck(this, AsapScheduler);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(AsapScheduler).apply(this, arguments));
	    }

	    _createClass(AsapScheduler, [{
	        key: 'scheduleNow',
	        value: function scheduleNow(work, state) {
	            return new _AsapAction.AsapAction(this, work).schedule(state);
	        }
	    }]);

	    return AsapScheduler;
	}(_QueueScheduler2.QueueScheduler);
	//# sourceMappingURL=AsapScheduler.js.map

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsapAction = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Immediate = __webpack_require__(66);

	var _FutureAction2 = __webpack_require__(69);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AsapAction = exports.AsapAction = function (_FutureAction) {
	    _inherits(AsapAction, _FutureAction);

	    function AsapAction() {
	        _classCallCheck(this, AsapAction);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(AsapAction).apply(this, arguments));
	    }

	    _createClass(AsapAction, [{
	        key: '_schedule',
	        value: function _schedule(state) {
	            var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            if (delay > 0) {
	                return _get(Object.getPrototypeOf(AsapAction.prototype), '_schedule', this).call(this, state, delay);
	            }
	            this.delay = delay;
	            this.state = state;
	            var scheduler = this.scheduler;

	            scheduler.actions.push(this);
	            if (!scheduler.scheduledId) {
	                scheduler.scheduledId = _Immediate.Immediate.setImmediate(function () {
	                    scheduler.scheduledId = null;
	                    scheduler.flush();
	                });
	            }
	            return this;
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var scheduler = this.scheduler;
	            var scheduledId = scheduler.scheduledId;
	            var actions = scheduler.actions;

	            _get(Object.getPrototypeOf(AsapAction.prototype), '_unsubscribe', this).call(this);
	            if (actions.length === 0) {
	                scheduler.active = false;
	                if (scheduledId != null) {
	                    scheduler.scheduledId = null;
	                    _Immediate.Immediate.clearImmediate(scheduledId);
	                }
	            }
	        }
	    }]);

	    return AsapAction;
	}(_FutureAction2.FutureAction);
	//# sourceMappingURL=AsapAction.js.map

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(clearImmediate, setImmediate) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Immediate = exports.ImmediateDefinition = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */


	var _root = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImmediateDefinition = exports.ImmediateDefinition = function () {
	    function ImmediateDefinition(root) {
	        _classCallCheck(this, ImmediateDefinition);

	        this.root = root;
	        if (root.setImmediate && typeof root.setImmediate === 'function') {
	            this.setImmediate = root.setImmediate.bind(root);
	            this.clearImmediate = root.clearImmediate.bind(root);
	        } else {
	            this.nextHandle = 1;
	            this.tasksByHandle = {};
	            this.currentlyRunningATask = false;
	            // Don't get fooled by e.g. browserify environments.
	            if (this.canUseProcessNextTick()) {
	                // For Node.js before 0.9
	                this.setImmediate = this.createProcessNextTickSetImmediate();
	            } else if (this.canUsePostMessage()) {
	                // For non-IE10 modern browsers
	                this.setImmediate = this.createPostMessageSetImmediate();
	            } else if (this.canUseMessageChannel()) {
	                // For web workers, where supported
	                this.setImmediate = this.createMessageChannelSetImmediate();
	            } else if (this.canUseReadyStateChange()) {
	                // For IE 6–8
	                this.setImmediate = this.createReadyStateChangeSetImmediate();
	            } else {
	                // For older browsers
	                this.setImmediate = this.createSetTimeoutSetImmediate();
	            }
	            var ci = function clearImmediate(handle) {
	                delete clearImmediate.instance.tasksByHandle[handle];
	            };
	            ci.instance = this;
	            this.clearImmediate = ci;
	        }
	    }

	    _createClass(ImmediateDefinition, [{
	        key: 'identify',
	        value: function identify(o) {
	            return this.root.Object.prototype.toString.call(o);
	        }
	    }, {
	        key: 'canUseProcessNextTick',
	        value: function canUseProcessNextTick() {
	            return this.identify(this.root.process) === '[object process]';
	        }
	    }, {
	        key: 'canUseMessageChannel',
	        value: function canUseMessageChannel() {
	            return Boolean(this.root.MessageChannel);
	        }
	    }, {
	        key: 'canUseReadyStateChange',
	        value: function canUseReadyStateChange() {
	            var document = this.root.document;
	            return Boolean(document && 'onreadystatechange' in document.createElement('script'));
	        }
	    }, {
	        key: 'canUsePostMessage',
	        value: function canUsePostMessage() {
	            var root = this.root;
	            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	            // where `root.postMessage` means something completely different and can't be used for this purpose.
	            if (root.postMessage && !root.importScripts) {
	                var postMessageIsAsynchronous = true;
	                var oldOnMessage = root.onmessage;
	                root.onmessage = function () {
	                    postMessageIsAsynchronous = false;
	                };
	                root.postMessage('', '*');
	                root.onmessage = oldOnMessage;
	                return postMessageIsAsynchronous;
	            }
	            return false;
	        }
	        // This function accepts the same arguments as setImmediate, but
	        // returns a function that requires no arguments.

	    }, {
	        key: 'partiallyApplied',
	        value: function partiallyApplied(handler) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            var fn = function result() {
	                var handler = result.handler;
	                var args = result.args;

	                if (typeof handler === 'function') {
	                    handler.apply(undefined, args);
	                } else {
	                    new Function('' + handler)();
	                }
	            };
	            fn.handler = handler;
	            fn.args = args;
	            return fn;
	        }
	    }, {
	        key: 'addFromSetImmediateArguments',
	        value: function addFromSetImmediateArguments(args) {
	            this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
	            return this.nextHandle++;
	        }
	    }, {
	        key: 'createProcessNextTickSetImmediate',
	        value: function createProcessNextTickSetImmediate() {
	            var fn = function setImmediate() {
	                var instance = setImmediate.instance;

	                var handle = instance.addFromSetImmediateArguments(arguments);
	                instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
	                return handle;
	            };
	            fn.instance = this;
	            return fn;
	        }
	    }, {
	        key: 'createPostMessageSetImmediate',
	        value: function createPostMessageSetImmediate() {
	            // Installs an event handler on `global` for the `message` event: see
	            // * https://developer.mozilla.org/en/DOM/window.postMessage
	            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	            var root = this.root;
	            var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
	            var onGlobalMessage = function globalMessageHandler(event) {
	                var instance = globalMessageHandler.instance;
	                if (event.source === root && typeof event.data === 'string' && event.data.indexOf(messagePrefix) === 0) {
	                    instance.runIfPresent(+event.data.slice(messagePrefix.length));
	                }
	            };
	            onGlobalMessage.instance = this;
	            root.addEventListener('message', onGlobalMessage, false);
	            var fn = function setImmediate() {
	                var messagePrefix = setImmediate.messagePrefix;
	                var instance = setImmediate.instance;

	                var handle = instance.addFromSetImmediateArguments(arguments);
	                instance.root.postMessage(messagePrefix + handle, '*');
	                return handle;
	            };
	            fn.instance = this;
	            fn.messagePrefix = messagePrefix;
	            return fn;
	        }
	    }, {
	        key: 'runIfPresent',
	        value: function runIfPresent(handle) {
	            // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
	            // So if we're currently running a task, we'll need to delay this invocation.
	            if (this.currentlyRunningATask) {
	                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	                // 'too much recursion' error.
	                this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
	            } else {
	                var task = this.tasksByHandle[handle];
	                if (task) {
	                    this.currentlyRunningATask = true;
	                    try {
	                        task();
	                    } finally {
	                        this.clearImmediate(handle);
	                        this.currentlyRunningATask = false;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'createMessageChannelSetImmediate',
	        value: function createMessageChannelSetImmediate() {
	            var _this = this;

	            var channel = new this.root.MessageChannel();
	            channel.port1.onmessage = function (event) {
	                var handle = event.data;
	                _this.runIfPresent(handle);
	            };
	            var fn = function setImmediate() {
	                var channel = setImmediate.channel;
	                var instance = setImmediate.instance;

	                var handle = instance.addFromSetImmediateArguments(arguments);
	                channel.port2.postMessage(handle);
	                return handle;
	            };
	            fn.channel = channel;
	            fn.instance = this;
	            return fn;
	        }
	    }, {
	        key: 'createReadyStateChangeSetImmediate',
	        value: function createReadyStateChangeSetImmediate() {
	            var fn = function setImmediate() {
	                var instance = setImmediate.instance;
	                var root = instance.root;
	                var doc = root.document;
	                var html = doc.documentElement;
	                var handle = instance.addFromSetImmediateArguments(arguments);
	                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	                var script = doc.createElement('script');
	                script.onreadystatechange = function () {
	                    instance.runIfPresent(handle);
	                    script.onreadystatechange = null;
	                    html.removeChild(script);
	                    script = null;
	                };
	                html.appendChild(script);
	                return handle;
	            };
	            fn.instance = this;
	            return fn;
	        }
	    }, {
	        key: 'createSetTimeoutSetImmediate',
	        value: function createSetTimeoutSetImmediate() {
	            var fn = function setImmediate() {
	                var instance = setImmediate.instance;
	                var handle = instance.addFromSetImmediateArguments(arguments);
	                instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
	                return handle;
	            };
	            fn.instance = this;
	            return fn;
	        }
	    }]);

	    return ImmediateDefinition;
	}();

	var Immediate = exports.Immediate = new ImmediateDefinition(_root.root);
	//# sourceMappingURL=Immediate.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67).clearImmediate, __webpack_require__(67).setImmediate))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {"use strict";

	var nextTick = __webpack_require__(68).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function () {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function () {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout = exports.clearInterval = function (timeout) {
	  timeout.close();
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function () {};
	Timeout.prototype.close = function () {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function (item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function (item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function (item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout) item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67).setImmediate, __webpack_require__(67).clearImmediate))

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FutureAction = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _root = __webpack_require__(4);

	var _Subscription2 = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FutureAction = exports.FutureAction = function (_Subscription) {
	    _inherits(FutureAction, _Subscription);

	    function FutureAction(scheduler, work) {
	        _classCallCheck(this, FutureAction);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FutureAction).call(this));

	        _this.scheduler = scheduler;
	        _this.work = work;
	        return _this;
	    }

	    _createClass(FutureAction, [{
	        key: 'execute',
	        value: function execute() {
	            if (this.isUnsubscribed) {
	                throw new Error('How did did we execute a canceled Action?');
	            }
	            this.work(this.state);
	        }
	    }, {
	        key: 'schedule',
	        value: function schedule(state) {
	            var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            if (this.isUnsubscribed) {
	                return this;
	            }
	            return this._schedule(state, delay);
	        }
	    }, {
	        key: '_schedule',
	        value: function _schedule(state) {
	            var _this2 = this;

	            var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            this.delay = delay;
	            this.state = state;
	            var id = this.id;
	            if (id != null) {
	                this.id = undefined;
	                _root.root.clearTimeout(id);
	            }
	            this.id = _root.root.setTimeout(function () {
	                _this2.id = null;
	                var scheduler = _this2.scheduler;

	                scheduler.actions.push(_this2);
	                scheduler.flush();
	            }, delay);
	            return this;
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var id = this.id;
	            var scheduler = this.scheduler;
	            var actions = scheduler.actions;

	            var index = actions.indexOf(this);
	            if (id != null) {
	                this.id = null;
	                _root.root.clearTimeout(id);
	            }
	            if (index !== -1) {
	                actions.splice(index, 1);
	            }
	            this.work = null;
	            this.state = null;
	            this.scheduler = null;
	        }
	    }]);

	    return FutureAction;
	}(_Subscription2.Subscription);
	//# sourceMappingURL=FutureAction.js.map

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.QueueScheduler = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _QueueAction = __webpack_require__(71);

	var _FutureAction = __webpack_require__(69);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QueueScheduler = exports.QueueScheduler = function () {
	    function QueueScheduler() {
	        _classCallCheck(this, QueueScheduler);

	        this.active = false;
	        this.actions = [];
	        this.scheduledId = null;
	    }

	    _createClass(QueueScheduler, [{
	        key: 'now',
	        value: function now() {
	            return Date.now();
	        }
	    }, {
	        key: 'flush',
	        value: function flush() {
	            if (this.active || this.scheduledId) {
	                return;
	            }
	            this.active = true;
	            var actions = this.actions;
	            for (var action; action = actions.shift();) {
	                action.execute();
	            }
	            this.active = false;
	        }
	    }, {
	        key: 'schedule',
	        value: function schedule(work) {
	            var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var state = arguments[2];

	            return delay <= 0 ? this.scheduleNow(work, state) : this.scheduleLater(work, delay, state);
	        }
	    }, {
	        key: 'scheduleNow',
	        value: function scheduleNow(work, state) {
	            return new _QueueAction.QueueAction(this, work).schedule(state);
	        }
	    }, {
	        key: 'scheduleLater',
	        value: function scheduleLater(work, delay, state) {
	            return new _FutureAction.FutureAction(this, work).schedule(state, delay);
	        }
	    }]);

	    return QueueScheduler;
	}();
	//# sourceMappingURL=QueueScheduler.js.map

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.QueueAction = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _FutureAction2 = __webpack_require__(69);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QueueAction = exports.QueueAction = function (_FutureAction) {
	    _inherits(QueueAction, _FutureAction);

	    function QueueAction() {
	        _classCallCheck(this, QueueAction);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(QueueAction).apply(this, arguments));
	    }

	    _createClass(QueueAction, [{
	        key: '_schedule',
	        value: function _schedule(state) {
	            var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            if (delay > 0) {
	                return _get(Object.getPrototypeOf(QueueAction.prototype), '_schedule', this).call(this, state, delay);
	            }
	            this.delay = delay;
	            this.state = state;
	            var scheduler = this.scheduler;
	            scheduler.actions.push(this);
	            scheduler.flush();
	            return this;
	        }
	    }]);

	    return QueueAction;
	}(_FutureAction2.FutureAction);
	//# sourceMappingURL=QueueAction.js.map

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _NeverObservable = __webpack_require__(73);

	_Observable.Observable.never = _NeverObservable.NeverObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=never.js.map

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NeverObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _noop = __webpack_require__(74);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NeverObservable = exports.NeverObservable = function (_Observable) {
	    _inherits(NeverObservable, _Observable);

	    function NeverObservable() {
	        _classCallCheck(this, NeverObservable);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(NeverObservable).call(this));
	    }

	    _createClass(NeverObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            (0, _noop.noop)();
	        }
	    }], [{
	        key: 'create',
	        value: function create() {
	            return new NeverObservable();
	        }
	    }]);

	    return NeverObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=NeverObservable.js.map

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.noop = noop;
	/* tslint:disable:no-empty */
	function noop() {}
	//# sourceMappingURL=noop.js.map

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _RangeObservable = __webpack_require__(76);

	_Observable.Observable.range = _RangeObservable.RangeObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=range.js.map

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RangeObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RangeObservable = exports.RangeObservable = function (_Observable) {
	    _inherits(RangeObservable, _Observable);

	    function RangeObservable(start, end, scheduler) {
	        _classCallCheck(this, RangeObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RangeObservable).call(this));

	        _this.start = start;
	        _this.end = end;
	        _this.scheduler = scheduler;
	        return _this;
	    }

	    _createClass(RangeObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var index = 0;
	            var start = this.start;
	            var end = this.end;
	            var scheduler = this.scheduler;
	            if (scheduler) {
	                return scheduler.schedule(RangeObservable.dispatch, 0, {
	                    index: index, end: end, start: start, subscriber: subscriber
	                });
	            } else {
	                do {
	                    if (index++ >= end) {
	                        subscriber.complete();
	                        break;
	                    }
	                    subscriber.next(start++);
	                    if (subscriber.isUnsubscribed) {
	                        break;
	                    }
	                } while (true);
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create() {
	            var start = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var end = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var scheduler = arguments[2];

	            return new RangeObservable(start, end, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var start = state.start;
	            var index = state.index;
	            var end = state.end;
	            var subscriber = state.subscriber;

	            if (index >= end) {
	                subscriber.complete();
	                return;
	            }
	            subscriber.next(start);
	            if (subscriber.isUnsubscribed) {
	                return;
	            }
	            state.index = index + 1;
	            state.start = start + 1;
	            this.schedule(state);
	        }
	    }]);

	    return RangeObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=RangeObservable.js.map

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _ErrorObservable = __webpack_require__(78);

	_Observable.Observable.throw = _ErrorObservable.ErrorObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=throw.js.map

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ErrorObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ErrorObservable = exports.ErrorObservable = function (_Observable) {
	    _inherits(ErrorObservable, _Observable);

	    function ErrorObservable(error, scheduler) {
	        _classCallCheck(this, ErrorObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorObservable).call(this));

	        _this.error = error;
	        _this.scheduler = scheduler;
	        return _this;
	    }

	    _createClass(ErrorObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var error = this.error;
	            var scheduler = this.scheduler;
	            if (scheduler) {
	                return scheduler.schedule(ErrorObservable.dispatch, 0, {
	                    error: error, subscriber: subscriber
	                });
	            } else {
	                subscriber.error(error);
	            }
	        }
	    }], [{
	        key: 'create',
	        value: function create(error, scheduler) {
	            return new ErrorObservable(error, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(_ref) {
	            var error = _ref.error;
	            var subscriber = _ref.subscriber;

	            subscriber.error(error);
	        }
	    }]);

	    return ErrorObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=ErrorObservable.js.map

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _TimerObservable = __webpack_require__(80);

	_Observable.Observable.timer = _TimerObservable.TimerObservable.create;
	var _void = exports._void = undefined;
	//# sourceMappingURL=timer.js.map

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TimerObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isNumeric = __webpack_require__(62);

	var _Observable2 = __webpack_require__(3);

	var _asap = __webpack_require__(63);

	var _isScheduler = __webpack_require__(25);

	var _isDate = __webpack_require__(81);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TimerObservable = exports.TimerObservable = function (_Observable) {
	    _inherits(TimerObservable, _Observable);

	    function TimerObservable() {
	        var dueTime = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var period = arguments[1];
	        var scheduler = arguments[2];

	        _classCallCheck(this, TimerObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimerObservable).call(this));

	        _this.period = -1;
	        _this.dueTime = 0;
	        if ((0, _isNumeric.isNumeric)(period)) {
	            _this.period = Number(period) < 1 && 1 || Number(period);
	        } else if ((0, _isScheduler.isScheduler)(period)) {
	            scheduler = period;
	        }
	        if (!(0, _isScheduler.isScheduler)(scheduler)) {
	            scheduler = _asap.asap;
	        }
	        _this.scheduler = scheduler;
	        _this.dueTime = (0, _isDate.isDate)(dueTime) ? +dueTime - _this.scheduler.now() : dueTime;
	        return _this;
	    }

	    _createClass(TimerObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var index = 0;
	            var period = this.period;
	            var dueTime = this.dueTime;
	            var scheduler = this.scheduler;

	            return scheduler.schedule(TimerObservable.dispatch, dueTime, {
	                index: index, period: period, subscriber: subscriber
	            });
	        }
	    }], [{
	        key: 'create',
	        value: function create() {
	            var dueTime = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var period = arguments[1];
	            var scheduler = arguments[2];

	            return new TimerObservable(dueTime, period, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var index = state.index;
	            var period = state.period;
	            var subscriber = state.subscriber;

	            var action = this;
	            subscriber.next(index);
	            if (subscriber.isUnsubscribed) {
	                return;
	            } else if (period === -1) {
	                return subscriber.complete();
	            }
	            state.index = index + 1;
	            action.schedule(state, period);
	        }
	    }]);

	    return TimerObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=TimerObservable.js.map

/***/ },
/* 81 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isDate = isDate;
	function isDate(value) {
	    return value instanceof Date && !isNaN(+value);
	}
	//# sourceMappingURL=isDate.js.map

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _zip = __webpack_require__(83);

	_Observable.Observable.zip = _zip.zipStatic;
	var _void = exports._void = undefined;
	//# sourceMappingURL=zip.js.map

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ZipSubscriber = exports.ZipOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.zipProto = zipProto;
	exports.zipStatic = zipStatic;

	var _ArrayObservable = __webpack_require__(22);

	var _isArray = __webpack_require__(11);

	var _Subscriber2 = __webpack_require__(8);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	var _SymbolShim = __webpack_require__(6);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function zipProto() {
	    for (var _len = arguments.length, observables = Array(_len), _key = 0; _key < _len; _key++) {
	        observables[_key] = arguments[_key];
	    }

	    observables.unshift(this);
	    return zipStatic.apply(this, observables);
	}
	/* tslint:enable:max-line-length */
	function zipStatic() {
	    for (var _len2 = arguments.length, observables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        observables[_key2] = arguments[_key2];
	    }

	    var project = observables[observables.length - 1];
	    if (typeof project === 'function') {
	        observables.pop();
	    }
	    return new _ArrayObservable.ArrayObservable(observables).lift(new ZipOperator(project));
	}

	var ZipOperator = exports.ZipOperator = function () {
	    function ZipOperator(project) {
	        _classCallCheck(this, ZipOperator);

	        this.project = project;
	    }

	    _createClass(ZipOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ZipSubscriber(subscriber, this.project);
	        }
	    }]);

	    return ZipOperator;
	}();

	var ZipSubscriber = exports.ZipSubscriber = function (_Subscriber) {
	    _inherits(ZipSubscriber, _Subscriber);

	    function ZipSubscriber(destination, project) {
	        var values = arguments.length <= 2 || arguments[2] === undefined ? Object.create(null) : arguments[2];

	        _classCallCheck(this, ZipSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ZipSubscriber).call(this, destination));

	        _this.index = 0;
	        _this.iterators = [];
	        _this.active = 0;
	        _this.project = typeof project === 'function' ? project : null;
	        _this.values = values;
	        return _this;
	    }

	    _createClass(ZipSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var iterators = this.iterators;
	            var index = this.index++;
	            if ((0, _isArray.isArray)(value)) {
	                iterators.push(new StaticArrayIterator(value));
	            } else if (typeof value[_SymbolShim.SymbolShim.iterator] === 'function') {
	                iterators.push(new StaticIterator(value[_SymbolShim.SymbolShim.iterator]()));
	            } else {
	                iterators.push(new ZipBufferIterator(this.destination, this, value, index));
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var iterators = this.iterators;
	            var len = iterators.length;
	            this.active = len;
	            for (var i = 0; i < len; i++) {
	                var iterator = iterators[i];
	                if (iterator.stillUnsubscribed) {
	                    this.add(iterator.subscribe(iterator, i));
	                } else {
	                    this.active--; // not an observable
	                }
	            }
	        }
	    }, {
	        key: 'notifyInactive',
	        value: function notifyInactive() {
	            this.active--;
	            if (this.active === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'checkIterators',
	        value: function checkIterators() {
	            var iterators = this.iterators;
	            var len = iterators.length;
	            var destination = this.destination;
	            // abort if not all of them have values
	            for (var i = 0; i < len; i++) {
	                var iterator = iterators[i];
	                if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
	                    return;
	                }
	            }
	            var shouldComplete = false;
	            var args = [];
	            for (var _i = 0; _i < len; _i++) {
	                var _iterator = iterators[_i];
	                var result = _iterator.next();
	                // check to see if it's completed now that you've gotten
	                // the next value.
	                if (_iterator.hasCompleted()) {
	                    shouldComplete = true;
	                }
	                if (result.done) {
	                    destination.complete();
	                    return;
	                }
	                args.push(result.value);
	            }
	            if (this.project) {
	                this._tryProject(args);
	            } else {
	                destination.next(args);
	            }
	            if (shouldComplete) {
	                destination.complete();
	            }
	        }
	    }, {
	        key: '_tryProject',
	        value: function _tryProject(args) {
	            var result = void 0;
	            try {
	                result = this.project.apply(this, args);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(result);
	        }
	    }]);

	    return ZipSubscriber;
	}(_Subscriber2.Subscriber);

	var StaticIterator = function () {
	    function StaticIterator(iterator) {
	        _classCallCheck(this, StaticIterator);

	        this.iterator = iterator;
	        this.nextResult = iterator.next();
	    }

	    _createClass(StaticIterator, [{
	        key: 'hasValue',
	        value: function hasValue() {
	            return true;
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var result = this.nextResult;
	            this.nextResult = this.iterator.next();
	            return result;
	        }
	    }, {
	        key: 'hasCompleted',
	        value: function hasCompleted() {
	            var nextResult = this.nextResult;
	            return nextResult && nextResult.done;
	        }
	    }]);

	    return StaticIterator;
	}();

	var StaticArrayIterator = function () {
	    function StaticArrayIterator(array) {
	        _classCallCheck(this, StaticArrayIterator);

	        this.array = array;
	        this.index = 0;
	        this.length = 0;
	        this.length = array.length;
	    }

	    _createClass(StaticArrayIterator, [{
	        key: _SymbolShim.SymbolShim.iterator,
	        value: function value() {
	            return this;
	        }
	    }, {
	        key: 'next',
	        value: function next(value) {
	            var i = this.index++;
	            var array = this.array;
	            return i < this.length ? { value: array[i], done: false } : { done: true };
	        }
	    }, {
	        key: 'hasValue',
	        value: function hasValue() {
	            return this.array.length > this.index;
	        }
	    }, {
	        key: 'hasCompleted',
	        value: function hasCompleted() {
	            return this.array.length === this.index;
	        }
	    }]);

	    return StaticArrayIterator;
	}();

	var ZipBufferIterator = function (_OuterSubscriber) {
	    _inherits(ZipBufferIterator, _OuterSubscriber);

	    function ZipBufferIterator(destination, parent, observable, index) {
	        _classCallCheck(this, ZipBufferIterator);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ZipBufferIterator).call(this, destination));

	        _this2.parent = parent;
	        _this2.observable = observable;
	        _this2.index = index;
	        _this2.stillUnsubscribed = true;
	        _this2.buffer = [];
	        _this2.isComplete = false;
	        return _this2;
	    }

	    _createClass(ZipBufferIterator, [{
	        key: _SymbolShim.SymbolShim.iterator,
	        value: function value() {
	            return this;
	        }
	        // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
	        //    this is legit because `next()` will never be called by a subscription in this case.

	    }, {
	        key: 'next',
	        value: function next() {
	            var buffer = this.buffer;
	            if (buffer.length === 0 && this.isComplete) {
	                return { done: true };
	            } else {
	                return { value: buffer.shift(), done: false };
	            }
	        }
	    }, {
	        key: 'hasValue',
	        value: function hasValue() {
	            return this.buffer.length > 0;
	        }
	    }, {
	        key: 'hasCompleted',
	        value: function hasCompleted() {
	            return this.buffer.length === 0 && this.isComplete;
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            if (this.buffer.length > 0) {
	                this.isComplete = true;
	                this.parent.notifyInactive();
	            } else {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.buffer.push(innerValue);
	            this.parent.checkIterators();
	        }
	    }, {
	        key: 'subscribe',
	        value: function subscribe(value, index) {
	            return (0, _subscribeToResult.subscribeToResult)(this, this.observable, this, index);
	        }
	    }]);

	    return ZipBufferIterator;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=zip.js.map

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _buffer = __webpack_require__(85);

	_Observable.Observable.prototype.buffer = _buffer.buffer;
	var _void = exports._void = undefined;
	//# sourceMappingURL=buffer.js.map

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.buffer = buffer;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Buffers the incoming observable values until the passed `closingNotifier`
	 * emits a value, at which point it emits the buffer on the returned observable
	 * and starts a new buffer internally, awaiting the next time `closingNotifier`
	 * emits.
	 *
	 * <img src="./img/buffer.png" width="100%">
	 *
	 * @param {Observable<any>} closingNotifier an Observable that signals the
	 * buffer to be emitted} from the returned observable.
	 * @returns {Observable<T[]>} an Observable of buffers, which are arrays of
	 * values.
	 */
	function buffer(closingNotifier) {
	    return this.lift(new BufferOperator(closingNotifier));
	}

	var BufferOperator = function () {
	    function BufferOperator(closingNotifier) {
	        _classCallCheck(this, BufferOperator);

	        this.closingNotifier = closingNotifier;
	    }

	    _createClass(BufferOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new BufferSubscriber(subscriber, this.closingNotifier);
	        }
	    }]);

	    return BufferOperator;
	}();

	var BufferSubscriber = function (_OuterSubscriber) {
	    _inherits(BufferSubscriber, _OuterSubscriber);

	    function BufferSubscriber(destination, closingNotifier) {
	        _classCallCheck(this, BufferSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferSubscriber).call(this, destination));

	        _this.buffer = [];
	        _this.add((0, _subscribeToResult.subscribeToResult)(_this, closingNotifier));
	        return _this;
	    }

	    _createClass(BufferSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.buffer.push(value);
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            var buffer = this.buffer;
	            this.buffer = [];
	            this.destination.next(buffer);
	        }
	    }]);

	    return BufferSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=buffer.js.map

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _bufferCount = __webpack_require__(87);

	_Observable.Observable.prototype.bufferCount = _bufferCount.bufferCount;
	var _void = exports._void = undefined;
	//# sourceMappingURL=bufferCount.js.map

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.bufferCount = bufferCount;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Buffers a number of values from the source observable by `bufferSize` then
	 * emits the buffer and clears it, and starts a new buffer each
	 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
	 * `null`, then new buffers are started immediately at the start of the source
	 * and when each buffer closes and is emitted.
	 *
	 * <img src="./img/bufferCount.png" width="100%">
	 *
	 * @param {number} bufferSize the maximum size of the buffer emitted.
	 * @param {number} [startBufferEvery] optional interval at which to start a new
	 * buffer. (e.g. if `startBufferEvery` is `2`, then a new buffer will be started
	 * on every other value from the source.) A new buffer is started at the
	 * beginning of the source by default.
	 * @returns {Observable<T[]>} an Observable of arrays of buffered values.
	 */
	function bufferCount(bufferSize) {
	    var startBufferEvery = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
	}

	var BufferCountOperator = function () {
	    function BufferCountOperator(bufferSize, startBufferEvery) {
	        _classCallCheck(this, BufferCountOperator);

	        this.bufferSize = bufferSize;
	        this.startBufferEvery = startBufferEvery;
	    }

	    _createClass(BufferCountOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery);
	        }
	    }]);

	    return BufferCountOperator;
	}();

	var BufferCountSubscriber = function (_Subscriber) {
	    _inherits(BufferCountSubscriber, _Subscriber);

	    function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
	        _classCallCheck(this, BufferCountSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferCountSubscriber).call(this, destination));

	        _this.bufferSize = bufferSize;
	        _this.startBufferEvery = startBufferEvery;
	        _this.buffers = [[]];
	        _this.count = 0;
	        return _this;
	    }

	    _createClass(BufferCountSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var count = this.count += 1;
	            var destination = this.destination;
	            var bufferSize = this.bufferSize;
	            var startBufferEvery = this.startBufferEvery == null ? bufferSize : this.startBufferEvery;
	            var buffers = this.buffers;
	            var len = buffers.length;
	            var remove = -1;
	            if (count % startBufferEvery === 0) {
	                buffers.push([]);
	            }
	            for (var i = 0; i < len; i++) {
	                var buffer = buffers[i];
	                buffer.push(value);
	                if (buffer.length === bufferSize) {
	                    remove = i;
	                    destination.next(buffer);
	                }
	            }
	            if (remove !== -1) {
	                buffers.splice(remove, 1);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var destination = this.destination;
	            var buffers = this.buffers;
	            while (buffers.length > 0) {
	                var buffer = buffers.shift();
	                if (buffer.length > 0) {
	                    destination.next(buffer);
	                }
	            }
	            _get(Object.getPrototypeOf(BufferCountSubscriber.prototype), '_complete', this).call(this);
	        }
	    }]);

	    return BufferCountSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=bufferCount.js.map

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _bufferTime = __webpack_require__(89);

	_Observable.Observable.prototype.bufferTime = _bufferTime.bufferTime;
	var _void = exports._void = undefined;
	//# sourceMappingURL=bufferTime.js.map

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.bufferTime = bufferTime;

	var _Subscriber2 = __webpack_require__(8);

	var _asap = __webpack_require__(63);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Buffers values from the source for a specific time period. Optionally allows
	 * new buffers to be set up at an interval.
	 *
	 * <img src="./img/bufferTime.png" width="100%">
	 *
	 * @param {number} bufferTimeSpan the amount of time to fill each buffer for
	 * before emitting them and clearing them.
	 * @param {number} [bufferCreationInterval] the interval at which to start new
	 * buffers.
	 * @param {Scheduler} [scheduler] (optional, defaults to `asap` scheduler) The
	 * scheduler on which to schedule the intervals that determine buffer
	 * boundaries.
	 * @returns {Observable<T[]>} an observable of arrays of buffered values.
	 */
	function bufferTime(bufferTimeSpan) {
	    var bufferCreationInterval = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _asap.asap : arguments[2];

	    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler));
	}

	var BufferTimeOperator = function () {
	    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, scheduler) {
	        _classCallCheck(this, BufferTimeOperator);

	        this.bufferTimeSpan = bufferTimeSpan;
	        this.bufferCreationInterval = bufferCreationInterval;
	        this.scheduler = scheduler;
	    }

	    _createClass(BufferTimeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.scheduler);
	        }
	    }]);

	    return BufferTimeOperator;
	}();

	var BufferTimeSubscriber = function (_Subscriber) {
	    _inherits(BufferTimeSubscriber, _Subscriber);

	    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, scheduler) {
	        _classCallCheck(this, BufferTimeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferTimeSubscriber).call(this, destination));

	        _this.bufferTimeSpan = bufferTimeSpan;
	        _this.bufferCreationInterval = bufferCreationInterval;
	        _this.scheduler = scheduler;
	        _this.buffers = [];
	        var buffer = _this.openBuffer();
	        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
	            var closeState = { subscriber: _this, buffer: buffer };
	            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
	            _this.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
	            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
	        } else {
	            var timeSpanOnlyState = { subscriber: _this, buffer: buffer, bufferTimeSpan: bufferTimeSpan };
	            _this.add(scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
	        }
	        return _this;
	    }

	    _createClass(BufferTimeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var buffers = this.buffers;
	            var len = buffers.length;
	            for (var i = 0; i < len; i++) {
	                buffers[i].push(value);
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.buffers.length = 0;
	            _get(Object.getPrototypeOf(BufferTimeSubscriber.prototype), '_error', this).call(this, err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var buffers = this.buffers;
	            var destination = this.destination;

	            while (buffers.length > 0) {
	                destination.next(buffers.shift());
	            }
	            _get(Object.getPrototypeOf(BufferTimeSubscriber.prototype), '_complete', this).call(this);
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            this.buffers = null;
	        }
	    }, {
	        key: 'openBuffer',
	        value: function openBuffer() {
	            var buffer = [];
	            this.buffers.push(buffer);
	            return buffer;
	        }
	    }, {
	        key: 'closeBuffer',
	        value: function closeBuffer(buffer) {
	            this.destination.next(buffer);
	            var buffers = this.buffers;
	            buffers.splice(buffers.indexOf(buffer), 1);
	        }
	    }]);

	    return BufferTimeSubscriber;
	}(_Subscriber2.Subscriber);

	function dispatchBufferTimeSpanOnly(state) {
	    var subscriber = state.subscriber;
	    var prevBuffer = state.buffer;
	    if (prevBuffer) {
	        subscriber.closeBuffer(prevBuffer);
	    }
	    state.buffer = subscriber.openBuffer();
	    if (!subscriber.isUnsubscribed) {
	        this.schedule(state, state.bufferTimeSpan);
	    }
	}
	function dispatchBufferCreation(state) {
	    var bufferCreationInterval = state.bufferCreationInterval;
	    var bufferTimeSpan = state.bufferTimeSpan;
	    var subscriber = state.subscriber;
	    var scheduler = state.scheduler;

	    var buffer = subscriber.openBuffer();
	    var action = this;
	    if (!subscriber.isUnsubscribed) {
	        action.add(scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, buffer: buffer }));
	        action.schedule(state, bufferCreationInterval);
	    }
	}
	function dispatchBufferClose(_ref) {
	    var subscriber = _ref.subscriber;
	    var buffer = _ref.buffer;

	    subscriber.closeBuffer(buffer);
	}
	//# sourceMappingURL=bufferTime.js.map

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _bufferToggle = __webpack_require__(91);

	_Observable.Observable.prototype.bufferToggle = _bufferToggle.bufferToggle;
	var _void = exports._void = undefined;
	//# sourceMappingURL=bufferToggle.js.map

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.bufferToggle = bufferToggle;

	var _Subscriber4 = __webpack_require__(8);

	var _Subscription = __webpack_require__(10);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Buffers values from the source by opening the buffer via signals from an
	 * Observable provided to `openings`, and closing and sending the buffers when
	 * an Observable returned by the `closingSelector` emits.
	 *
	 * <img src="./img/bufferToggle.png" width="100%">
	 *
	 * @param {Observable<O>} openings An observable of notifications to start new
	 * buffers.
	 * @param {Function} closingSelector a function that takes the value emitted by
	 * the `openings` observable and returns an Observable, which, when it emits,
	 * signals that the associated buffer should be emitted and cleared.
	 * @returns {Observable<T[]>} an observable of arrays of buffered values.
	 */
	function bufferToggle(openings, closingSelector) {
	    return this.lift(new BufferToggleOperator(openings, closingSelector));
	}

	var BufferToggleOperator = function () {
	    function BufferToggleOperator(openings, closingSelector) {
	        _classCallCheck(this, BufferToggleOperator);

	        this.openings = openings;
	        this.closingSelector = closingSelector;
	    }

	    _createClass(BufferToggleOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector);
	        }
	    }]);

	    return BufferToggleOperator;
	}();

	var BufferToggleSubscriber = function (_Subscriber) {
	    _inherits(BufferToggleSubscriber, _Subscriber);

	    function BufferToggleSubscriber(destination, openings, closingSelector) {
	        _classCallCheck(this, BufferToggleSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferToggleSubscriber).call(this, destination));

	        _this.openings = openings;
	        _this.closingSelector = closingSelector;
	        _this.contexts = [];
	        _this.add(_this.openings.subscribe(new BufferToggleOpeningsSubscriber(_this)));
	        return _this;
	    }

	    _createClass(BufferToggleSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var contexts = this.contexts;
	            var len = contexts.length;
	            for (var i = 0; i < len; i++) {
	                contexts[i].buffer.push(value);
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            var contexts = this.contexts;
	            while (contexts.length > 0) {
	                var context = contexts.shift();
	                context.subscription.unsubscribe();
	                context.buffer = null;
	                context.subscription = null;
	            }
	            this.contexts = null;
	            _get(Object.getPrototypeOf(BufferToggleSubscriber.prototype), '_error', this).call(this, err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var contexts = this.contexts;
	            while (contexts.length > 0) {
	                var context = contexts.shift();
	                this.destination.next(context.buffer);
	                context.subscription.unsubscribe();
	                context.buffer = null;
	                context.subscription = null;
	            }
	            this.contexts = null;
	            _get(Object.getPrototypeOf(BufferToggleSubscriber.prototype), '_complete', this).call(this);
	        }
	    }, {
	        key: 'openBuffer',
	        value: function openBuffer(value) {
	            var closingSelector = this.closingSelector;
	            var contexts = this.contexts;
	            var closingNotifier = (0, _tryCatch.tryCatch)(closingSelector)(value);
	            if (closingNotifier === _errorObject.errorObject) {
	                this._error(_errorObject.errorObject.e);
	            } else {
	                var context = {
	                    buffer: [],
	                    subscription: new _Subscription.Subscription()
	                };
	                contexts.push(context);
	                var subscriber = new BufferToggleClosingsSubscriber(this, context);
	                var subscription = closingNotifier.subscribe(subscriber);
	                context.subscription.add(subscription);
	                this.add(subscription);
	            }
	        }
	    }, {
	        key: 'closeBuffer',
	        value: function closeBuffer(context) {
	            var contexts = this.contexts;
	            if (contexts === null) {
	                return;
	            }
	            var buffer = context.buffer;
	            var subscription = context.subscription;

	            this.destination.next(buffer);
	            contexts.splice(contexts.indexOf(context), 1);
	            this.remove(subscription);
	            subscription.unsubscribe();
	        }
	    }]);

	    return BufferToggleSubscriber;
	}(_Subscriber4.Subscriber);

	var BufferToggleOpeningsSubscriber = function (_Subscriber2) {
	    _inherits(BufferToggleOpeningsSubscriber, _Subscriber2);

	    function BufferToggleOpeningsSubscriber(parent) {
	        _classCallCheck(this, BufferToggleOpeningsSubscriber);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferToggleOpeningsSubscriber).call(this, null));

	        _this2.parent = parent;
	        return _this2;
	    }

	    _createClass(BufferToggleOpeningsSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.parent.openBuffer(value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.parent.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            // noop
	        }
	    }]);

	    return BufferToggleOpeningsSubscriber;
	}(_Subscriber4.Subscriber);

	var BufferToggleClosingsSubscriber = function (_Subscriber3) {
	    _inherits(BufferToggleClosingsSubscriber, _Subscriber3);

	    function BufferToggleClosingsSubscriber(parent, context) {
	        _classCallCheck(this, BufferToggleClosingsSubscriber);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferToggleClosingsSubscriber).call(this, null));

	        _this3.parent = parent;
	        _this3.context = context;
	        return _this3;
	    }

	    _createClass(BufferToggleClosingsSubscriber, [{
	        key: '_next',
	        value: function _next() {
	            this.parent.closeBuffer(this.context);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.parent.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.parent.closeBuffer(this.context);
	        }
	    }]);

	    return BufferToggleClosingsSubscriber;
	}(_Subscriber4.Subscriber);
	//# sourceMappingURL=bufferToggle.js.map

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _bufferWhen = __webpack_require__(93);

	_Observable.Observable.prototype.bufferWhen = _bufferWhen.bufferWhen;
	var _void = exports._void = undefined;
	//# sourceMappingURL=bufferWhen.js.map

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.bufferWhen = bufferWhen;

	var _Subscription = __webpack_require__(10);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Opens a buffer immediately, then closes the buffer when the observable
	 * returned by calling `closingSelector` emits a value. It that immediately
	 * opens a new buffer and repeats the process.
	 *
	 * <img src="./img/bufferWhen.png" width="100%">
	 *
	 * @param {function} closingSelector a function that takes no arguments and
	 * returns an Observable that signals buffer closure.
	 * @returns {Observable<T[]>} an observable of arrays of buffered values.
	 */
	function bufferWhen(closingSelector) {
	    return this.lift(new BufferWhenOperator(closingSelector));
	}

	var BufferWhenOperator = function () {
	    function BufferWhenOperator(closingSelector) {
	        _classCallCheck(this, BufferWhenOperator);

	        this.closingSelector = closingSelector;
	    }

	    _createClass(BufferWhenOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new BufferWhenSubscriber(subscriber, this.closingSelector);
	        }
	    }]);

	    return BufferWhenOperator;
	}();

	var BufferWhenSubscriber = function (_OuterSubscriber) {
	    _inherits(BufferWhenSubscriber, _OuterSubscriber);

	    function BufferWhenSubscriber(destination, closingSelector) {
	        _classCallCheck(this, BufferWhenSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BufferWhenSubscriber).call(this, destination));

	        _this.closingSelector = closingSelector;
	        _this.subscribing = false;
	        _this.openBuffer();
	        return _this;
	    }

	    _createClass(BufferWhenSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.buffer.push(value);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var buffer = this.buffer;
	            if (buffer) {
	                this.destination.next(buffer);
	            }
	            _get(Object.getPrototypeOf(BufferWhenSubscriber.prototype), '_complete', this).call(this);
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            this.buffer = null;
	            this.subscribing = false;
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.openBuffer();
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            if (this.subscribing) {
	                this.complete();
	            } else {
	                this.openBuffer();
	            }
	        }
	    }, {
	        key: 'openBuffer',
	        value: function openBuffer() {
	            var closingSubscription = this.closingSubscription;

	            if (closingSubscription) {
	                this.remove(closingSubscription);
	                closingSubscription.unsubscribe();
	            }
	            var buffer = this.buffer;
	            if (this.buffer) {
	                this.destination.next(buffer);
	            }
	            this.buffer = [];
	            var closingNotifier = (0, _tryCatch.tryCatch)(this.closingSelector)();
	            if (closingNotifier === _errorObject.errorObject) {
	                this.error(_errorObject.errorObject.e);
	            } else {
	                closingSubscription = new _Subscription.Subscription();
	                this.closingSubscription = closingSubscription;
	                this.add(closingSubscription);
	                this.subscribing = true;
	                closingSubscription.add((0, _subscribeToResult.subscribeToResult)(this, closingNotifier));
	                this.subscribing = false;
	            }
	        }
	    }]);

	    return BufferWhenSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=bufferWhen.js.map

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _cache = __webpack_require__(95);

	_Observable.Observable.prototype.cache = _cache.cache;
	var _void = exports._void = undefined;
	//# sourceMappingURL=cache.js.map

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cache = cache;

	var _publishReplay = __webpack_require__(96);

	function cache() {
	    var bufferSize = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];
	    var windowTime = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];
	    var scheduler = arguments[2];

	    return _publishReplay.publishReplay.call(this, bufferSize, windowTime, scheduler).refCount();
	}
	//# sourceMappingURL=cache.js.map

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.publishReplay = publishReplay;

	var _ReplaySubject = __webpack_require__(97);

	var _multicast = __webpack_require__(99);

	function publishReplay() {
	    var bufferSize = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];
	    var windowTime = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];
	    var scheduler = arguments[2];

	    return _multicast.multicast.call(this, new _ReplaySubject.ReplaySubject(bufferSize, windowTime, scheduler));
	}
	//# sourceMappingURL=publishReplay.js.map

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ReplaySubject = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Subject2 = __webpack_require__(2);

	var _queue = __webpack_require__(98);

	var _observeOn = __webpack_require__(52);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReplaySubject = exports.ReplaySubject = function (_Subject) {
	    _inherits(ReplaySubject, _Subject);

	    function ReplaySubject() {
	        var bufferSize = arguments.length <= 0 || arguments[0] === undefined ? Number.POSITIVE_INFINITY : arguments[0];
	        var windowTime = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];
	        var scheduler = arguments[2];

	        _classCallCheck(this, ReplaySubject);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReplaySubject).call(this));

	        _this.events = [];
	        _this.scheduler = scheduler;
	        _this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
	        _this._windowTime = windowTime < 1 ? 1 : windowTime;
	        return _this;
	    }

	    _createClass(ReplaySubject, [{
	        key: '_next',
	        value: function _next(value) {
	            var now = this._getNow();
	            this.events.push(new ReplayEvent(now, value));
	            this._trimBufferThenGetEvents(now);
	            _get(Object.getPrototypeOf(ReplaySubject.prototype), '_next', this).call(this, value);
	        }
	    }, {
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var events = this._trimBufferThenGetEvents(this._getNow());
	            var scheduler = this.scheduler;
	            if (scheduler) {
	                subscriber.add(subscriber = new _observeOn.ObserveOnSubscriber(subscriber, scheduler));
	            }
	            var index = -1;
	            var len = events.length;
	            while (++index < len && !subscriber.isUnsubscribed) {
	                subscriber.next(events[index].value);
	            }
	            return _get(Object.getPrototypeOf(ReplaySubject.prototype), '_subscribe', this).call(this, subscriber);
	        }
	    }, {
	        key: '_getNow',
	        value: function _getNow() {
	            return (this.scheduler || _queue.queue).now();
	        }
	    }, {
	        key: '_trimBufferThenGetEvents',
	        value: function _trimBufferThenGetEvents(now) {
	            var bufferSize = this.bufferSize;
	            var _windowTime = this._windowTime;
	            var events = this.events;
	            var eventsCount = events.length;
	            var spliceCount = 0;
	            // Trim events that fall out of the time window.
	            // Start at the front of the list. Break early once
	            // we encounter an event that falls within the window.
	            while (spliceCount < eventsCount) {
	                if (now - events[spliceCount].time < _windowTime) {
	                    break;
	                }
	                spliceCount += 1;
	            }
	            if (eventsCount > bufferSize) {
	                spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
	            }
	            if (spliceCount > 0) {
	                events.splice(0, spliceCount);
	            }
	            return events;
	        }
	    }]);

	    return ReplaySubject;
	}(_Subject2.Subject);

	var ReplayEvent = function ReplayEvent(time, value) {
	    _classCallCheck(this, ReplayEvent);

	    this.time = time;
	    this.value = value;
	};
	//# sourceMappingURL=ReplaySubject.js.map

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.queue = undefined;

	var _QueueScheduler = __webpack_require__(70);

	var queue = exports.queue = new _QueueScheduler.QueueScheduler();
	//# sourceMappingURL=queue.js.map

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.multicast = multicast;

	var _ConnectableObservable = __webpack_require__(100);

	/**
	 * Returns an Observable that emits the results of invoking a specified selector on items
	 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
	 *
	 * <img src="./img/multicast.png" width="100%">
	 *
	 * @param {Function} selector - a function that can use the multicasted source stream
	 * as many times as needed, without causing multiple subscriptions to the source stream.
	 * Subscribers to the given source will receive all notifications of the source from the
	 * time of the subscription forward.
	 * @returns {Observable} an Observable that emits the results of invoking the selector
	 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
	 * the underlying stream.
	 */
	function multicast(subjectOrSubjectFactory) {
	    var subjectFactory = void 0;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    } else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    return new _ConnectableObservable.ConnectableObservable(this, subjectFactory);
	}
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ConnectableObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable3 = __webpack_require__(3);

	var _Subscriber2 = __webpack_require__(8);

	var _Subscription2 = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ConnectableObservable = exports.ConnectableObservable = function (_Observable) {
	    _inherits(ConnectableObservable, _Observable);

	    function ConnectableObservable(source, subjectFactory) {
	        _classCallCheck(this, ConnectableObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectableObservable).call(this));

	        _this.source = source;
	        _this.subjectFactory = subjectFactory;
	        return _this;
	    }

	    _createClass(ConnectableObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            return this.getSubject().subscribe(subscriber);
	        }
	    }, {
	        key: 'getSubject',
	        value: function getSubject() {
	            var subject = this.subject;
	            if (subject && !subject.isUnsubscribed) {
	                return subject;
	            }
	            return this.subject = this.subjectFactory();
	        }
	    }, {
	        key: 'connect',
	        value: function connect() {
	            var source = this.source;
	            var subscription = this.subscription;
	            if (subscription && !subscription.isUnsubscribed) {
	                return subscription;
	            }
	            subscription = source.subscribe(this.getSubject());
	            subscription.add(new ConnectableSubscription(this));
	            return this.subscription = subscription;
	        }
	    }, {
	        key: 'refCount',
	        value: function refCount() {
	            return new RefCountObservable(this);
	        }
	        /**
	         * This method is opened for `ConnectableSubscription`.
	         * Not to call from others.
	         */

	    }, {
	        key: '_closeSubscription',
	        value: function _closeSubscription() {
	            this.subject = null;
	            this.subscription = null;
	        }
	    }]);

	    return ConnectableObservable;
	}(_Observable3.Observable);

	var ConnectableSubscription = function (_Subscription) {
	    _inherits(ConnectableSubscription, _Subscription);

	    function ConnectableSubscription(connectable) {
	        _classCallCheck(this, ConnectableSubscription);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectableSubscription).call(this));

	        _this2.connectable = connectable;
	        return _this2;
	    }

	    _createClass(ConnectableSubscription, [{
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var connectable = this.connectable;
	            connectable._closeSubscription();
	            this.connectable = null;
	        }
	    }]);

	    return ConnectableSubscription;
	}(_Subscription2.Subscription);

	var RefCountObservable = function (_Observable2) {
	    _inherits(RefCountObservable, _Observable2);

	    function RefCountObservable(connectable) {
	        var refCount = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	        _classCallCheck(this, RefCountObservable);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(RefCountObservable).call(this));

	        _this3.connectable = connectable;
	        _this3.refCount = refCount;
	        return _this3;
	    }

	    _createClass(RefCountObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var connectable = this.connectable;
	            var refCountSubscriber = new RefCountSubscriber(subscriber, this);
	            var subscription = connectable.subscribe(refCountSubscriber);
	            if (!subscription.isUnsubscribed && ++this.refCount === 1) {
	                refCountSubscriber.connection = this.connection = connectable.connect();
	            }
	            return subscription;
	        }
	    }]);

	    return RefCountObservable;
	}(_Observable3.Observable);

	var RefCountSubscriber = function (_Subscriber) {
	    _inherits(RefCountSubscriber, _Subscriber);

	    function RefCountSubscriber(destination, refCountObservable) {
	        _classCallCheck(this, RefCountSubscriber);

	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(RefCountSubscriber).call(this, null));

	        _this4.destination = destination;
	        _this4.refCountObservable = refCountObservable;
	        _this4.connection = refCountObservable.connection;
	        destination.add(_this4);
	        return _this4;
	    }

	    _createClass(RefCountSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.destination.next(value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this._resetConnectable();
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this._resetConnectable();
	            this.destination.complete();
	        }
	    }, {
	        key: '_resetConnectable',
	        value: function _resetConnectable() {
	            var observable = this.refCountObservable;
	            var obsConnection = observable.connection;
	            var subConnection = this.connection;
	            if (subConnection && subConnection === obsConnection) {
	                observable.refCount = 0;
	                obsConnection.unsubscribe();
	                observable.connection = null;
	                this.unsubscribe();
	            }
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var observable = this.refCountObservable;
	            if (observable.refCount === 0) {
	                return;
	            }
	            if (--observable.refCount === 0) {
	                var obsConnection = observable.connection;
	                var subConnection = this.connection;
	                if (subConnection && subConnection === obsConnection) {
	                    obsConnection.unsubscribe();
	                    observable.connection = null;
	                }
	            }
	        }
	    }]);

	    return RefCountSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _catch2 = __webpack_require__(102);

	_Observable.Observable.prototype.catch = _catch2._catch;
	var _void = exports._void = undefined;
	//# sourceMappingURL=catch.js.map

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports._catch = _catch;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 */
	function _catch(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return operator.caught = caught;
	}

	var CatchOperator = function () {
	    function CatchOperator(selector) {
	        _classCallCheck(this, CatchOperator);

	        this.selector = selector;
	    }

	    _createClass(CatchOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new CatchSubscriber(subscriber, this.selector, this.caught);
	        }
	    }]);

	    return CatchOperator;
	}();

	var CatchSubscriber = function (_Subscriber) {
	    _inherits(CatchSubscriber, _Subscriber);

	    function CatchSubscriber(destination, selector, caught) {
	        _classCallCheck(this, CatchSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CatchSubscriber).call(this, destination));

	        _this.selector = selector;
	        _this.caught = caught;
	        return _this;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`.


	    _createClass(CatchSubscriber, [{
	        key: 'error',
	        value: function error(err) {
	            if (!this.isStopped) {
	                var result = void 0;
	                try {
	                    result = this.selector(err, this.caught);
	                } catch (err) {
	                    this.destination.error(err);
	                    return;
	                }
	                this._innerSub(result);
	            }
	        }
	    }, {
	        key: '_innerSub',
	        value: function _innerSub(result) {
	            this.unsubscribe();
	            this.destination.remove(this);
	            result.subscribe(this.destination);
	        }
	    }]);

	    return CatchSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=catch.js.map

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _combineAll = __webpack_require__(104);

	_Observable.Observable.prototype.combineAll = _combineAll.combineAll;
	var _void = exports._void = undefined;
	//# sourceMappingURL=combineAll.js.map

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.combineAll = combineAll;

	var _combineLatest = __webpack_require__(21);

	/**
	 * Takes an Observable of Observables, and collects all observables from it. Once the outer observable
	 * completes, it subscribes to all collected observables and "combines" their values, such that:
	 *  - every time an observable emits, the returned observable emits
	 *  - when the returned observable emits, it emits all of the most recent values by:
	 *    - if a `project` function is provided, it is called with each recent value from each observable in whatever order they arrived,
	 *      and the result of the `project` function is what is emitted by the returned observable
	 *    - if there is no `project` function, an array of all of the most recent values is emitted by the returned observable.
	 * @param {function} [project] an optional function to map the most recent values from each observable into a new result. Takes each of the
	 *   most recent values from each collected observable as arguments, in order.
	 * @returns {Observable} an observable of projected results or arrays of recent values.
	 */
	function combineAll(project) {
	  return this.lift(new _combineLatest.CombineLatestOperator(project));
	}
	//# sourceMappingURL=combineAll.js.map

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _combineLatest = __webpack_require__(21);

	_Observable.Observable.prototype.combineLatest = _combineLatest.combineLatest;
	var _void = exports._void = undefined;
	//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _concat = __webpack_require__(31);

	_Observable.Observable.prototype.concat = _concat.concat;
	var _void = exports._void = undefined;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _concatAll = __webpack_require__(108);

	_Observable.Observable.prototype.concatAll = _concatAll.concatAll;
	var _void = exports._void = undefined;
	//# sourceMappingURL=concatAll.js.map

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.concatAll = concatAll;

	var _mergeAll = __webpack_require__(32);

	/**
	 * Joins every Observable emitted by the source (an Observable of Observables), in a serial
	 * fashion. Subscribing to each one only when the previous one has completed, and merging
	 * all of their values into the returned observable.
	 *
	 * __Warning:__ If the source Observable emits Observables quickly and endlessly, and the
	 * Observables it emits generally complete slower than the source emits, you can run into
	 * memory issues as the incoming observables collect in an unbounded buffer.
	 *
	 * @returns {Observable} an observable of values merged from the incoming observables.
	 */
	function concatAll() {
	  return this.lift(new _mergeAll.MergeAllOperator(1));
	}
	//# sourceMappingURL=concatAll.js.map

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _concatMap = __webpack_require__(110);

	_Observable.Observable.prototype.concatMap = _concatMap.concatMap;
	var _void = exports._void = undefined;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.concatMap = concatMap;

	var _mergeMap = __webpack_require__(111);

	/**
	 * Maps values from the source observable into new Observables, then merges them in a serialized fashion,
	 * waiting for each one to complete before merging the next.
	 *
	 * __Warning:__ if incoming values arrive endlessly and faster than the observables they're being mapped
	 * to can complete, it will result in memory issues as created observables amass in an unbounded buffer
	 * waiting for their turn to be subscribed to.
	 *
	 * @param {function} project a function to map incoming values into Observables to be concatenated. accepts
	 * the `value` and the `index` as arguments.
	 * @param {function} [resultSelector] an optional result selector that is applied to values before they're
	 * merged into the returned observable. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @returns {Observable} an observable of values merged from the projected Observables as they were subscribed to,
	 * one at a time. Optionally, these values may have been projected from a passed `projectResult` argument.
	 */
	function concatMap(project, resultSelector) {
	  return this.lift(new _mergeMap.MergeMapOperator(project, resultSelector, 1));
	}
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MergeMapSubscriber = exports.MergeMapOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.mergeMap = mergeMap;

	var _subscribeToResult = __webpack_require__(27);

	var _OuterSubscriber2 = __webpack_require__(26);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits items based on applying a function that you supply to each item emitted by the
	 * source Observable, where that function returns an Observable, and then merging those resulting Observables and
	 * emitting the results of this merger.
	 *
	 * <img src="./img/mergeMap.png" width="100%">
	 *
	 * @param {Function} a function that, when applied to an item emitted by the source Observable, returns an Observable.
	 * @returns {Observable} an Observable that emits the result of applying the transformation function to each item
	 * emitted by the source Observable and merging the results of the Observables obtained from this transformation
	 */
	function mergeMap(project, resultSelector) {
	    var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

	    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
	}

	var MergeMapOperator = exports.MergeMapOperator = function () {
	    function MergeMapOperator(project, resultSelector) {
	        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

	        _classCallCheck(this, MergeMapOperator);

	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }

	    _createClass(MergeMapOperator, [{
	        key: 'call',
	        value: function call(observer) {
	            return new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent);
	        }
	    }]);

	    return MergeMapOperator;
	}();

	var MergeMapSubscriber = exports.MergeMapSubscriber = function (_OuterSubscriber) {
	    _inherits(MergeMapSubscriber, _OuterSubscriber);

	    function MergeMapSubscriber(destination, project, resultSelector) {
	        var concurrent = arguments.length <= 3 || arguments[3] === undefined ? Number.POSITIVE_INFINITY : arguments[3];

	        _classCallCheck(this, MergeMapSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MergeMapSubscriber).call(this, destination));

	        _this.project = project;
	        _this.resultSelector = resultSelector;
	        _this.concurrent = concurrent;
	        _this.hasCompleted = false;
	        _this.buffer = [];
	        _this.active = 0;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(MergeMapSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (this.active < this.concurrent) {
	                this._tryNext(value);
	            } else {
	                this.buffer.push(value);
	            }
	        }
	    }, {
	        key: '_tryNext',
	        value: function _tryNext(value) {
	            var result = void 0;
	            var index = this.index++;
	            try {
	                result = this.project(value, index);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.active++;
	            this._innerSub(result, value, index);
	        }
	    }, {
	        key: '_innerSub',
	        value: function _innerSub(ish, value, index) {
	            this.add((0, _subscribeToResult.subscribeToResult)(this, ish, value, index));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.hasCompleted = true;
	            if (this.active === 0 && this.buffer.length === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            if (this.resultSelector) {
	                this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            } else {
	                this.destination.next(innerValue);
	            }
	        }
	    }, {
	        key: '_notifyResultSelector',
	        value: function _notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
	            var result = void 0;
	            try {
	                result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(result);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            var buffer = this.buffer;
	            this.remove(innerSub);
	            this.active--;
	            if (buffer.length > 0) {
	                this._next(buffer.shift());
	            } else if (this.active === 0 && this.hasCompleted) {
	                this.destination.complete();
	            }
	        }
	    }]);

	    return MergeMapSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=mergeMap.js.map

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _concatMapTo = __webpack_require__(113);

	_Observable.Observable.prototype.concatMapTo = _concatMapTo.concatMapTo;
	var _void = exports._void = undefined;
	//# sourceMappingURL=concatMapTo.js.map

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.concatMapTo = concatMapTo;

	var _mergeMapTo = __webpack_require__(114);

	/**
	 * Maps values from the source to a specific observable, and merges them together in a serialized fashion.
	 *
	 * @param {Observable} observable the observable to map each source value to
	 * @param {function} [resultSelector] an optional result selector that is applied to values before they're
	 * merged into the returned observable. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @returns {Observable} an observable of values merged together by joining the passed observable
	 * with itself, one after the other, for each value emitted from the source.
	 */
	function concatMapTo(observable, resultSelector) {
	  return this.lift(new _mergeMapTo.MergeMapToOperator(observable, resultSelector, 1));
	}
	//# sourceMappingURL=concatMapTo.js.map

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MergeMapToSubscriber = exports.MergeMapToOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.mergeMapTo = mergeMapTo;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function mergeMapTo(observable, resultSelector) {
	    var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

	    return this.lift(new MergeMapToOperator(observable, resultSelector, concurrent));
	}
	// TODO: Figure out correct signature here: an Operator<Observable<T>, R2>
	//       needs to implement call(observer: Subscriber<R2>): Subscriber<Observable<T>>

	var MergeMapToOperator = exports.MergeMapToOperator = function () {
	    function MergeMapToOperator(ish, resultSelector) {
	        var concurrent = arguments.length <= 2 || arguments[2] === undefined ? Number.POSITIVE_INFINITY : arguments[2];

	        _classCallCheck(this, MergeMapToOperator);

	        this.ish = ish;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }

	    _createClass(MergeMapToOperator, [{
	        key: 'call',
	        value: function call(observer) {
	            return new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent);
	        }
	    }]);

	    return MergeMapToOperator;
	}();

	var MergeMapToSubscriber = exports.MergeMapToSubscriber = function (_OuterSubscriber) {
	    _inherits(MergeMapToSubscriber, _OuterSubscriber);

	    function MergeMapToSubscriber(destination, ish, resultSelector) {
	        var concurrent = arguments.length <= 3 || arguments[3] === undefined ? Number.POSITIVE_INFINITY : arguments[3];

	        _classCallCheck(this, MergeMapToSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MergeMapToSubscriber).call(this, destination));

	        _this.ish = ish;
	        _this.resultSelector = resultSelector;
	        _this.concurrent = concurrent;
	        _this.hasCompleted = false;
	        _this.buffer = [];
	        _this.active = 0;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(MergeMapToSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (this.active < this.concurrent) {
	                var resultSelector = this.resultSelector;
	                var index = this.index++;
	                var ish = this.ish;
	                var destination = this.destination;
	                this.active++;
	                this._innerSub(ish, destination, resultSelector, value, index);
	            } else {
	                this.buffer.push(value);
	            }
	        }
	    }, {
	        key: '_innerSub',
	        value: function _innerSub(ish, destination, resultSelector, value, index) {
	            this.add((0, _subscribeToResult.subscribeToResult)(this, ish, value, index));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.hasCompleted = true;
	            if (this.active === 0 && this.buffer.length === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            var resultSelector = this.resultSelector;
	            var destination = this.destination;

	            if (resultSelector) {
	                this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
	            } else {
	                destination.next(innerValue);
	            }
	        }
	    }, {
	        key: 'trySelectResult',
	        value: function trySelectResult(outerValue, innerValue, outerIndex, innerIndex) {
	            var resultSelector = this.resultSelector;
	            var destination = this.destination;

	            var result = void 0;
	            try {
	                result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            } catch (err) {
	                destination.error(err);
	                return;
	            }
	            destination.next(result);
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(err) {
	            this.destination.error(err);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            var buffer = this.buffer;
	            this.remove(innerSub);
	            this.active--;
	            if (buffer.length > 0) {
	                this._next(buffer.shift());
	            } else if (this.active === 0 && this.hasCompleted) {
	                this.destination.complete();
	            }
	        }
	    }]);

	    return MergeMapToSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=mergeMapTo.js.map

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _count = __webpack_require__(116);

	_Observable.Observable.prototype.count = _count.count;
	var _void = exports._void = undefined;
	//# sourceMappingURL=count.js.map

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.count = count;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an observable of a single number that represents the number of items that either:
	 * Match a provided predicate function, _or_ if a predicate is not provided, the number
	 * represents the total count of all items in the source observable. The count is emitted
	 * by the returned observable when the source observable completes.
	 * @param {function} [predicate] a boolean function to select what values are to be counted.
	 * it is provided with arguments of:
	 *   - `value`: the value from the source observable
	 *   - `index`: the "index" of the value from the source observable
	 *   - `source`: the source observable instance itself.
	 * @returns {Observable} an observable of one number that represents the count as described
	 * above
	 */
	function count(predicate) {
	    return this.lift(new CountOperator(predicate, this));
	}

	var CountOperator = function () {
	    function CountOperator(predicate, source) {
	        _classCallCheck(this, CountOperator);

	        this.predicate = predicate;
	        this.source = source;
	    }

	    _createClass(CountOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new CountSubscriber(subscriber, this.predicate, this.source);
	        }
	    }]);

	    return CountOperator;
	}();

	var CountSubscriber = function (_Subscriber) {
	    _inherits(CountSubscriber, _Subscriber);

	    function CountSubscriber(destination, predicate, source) {
	        _classCallCheck(this, CountSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CountSubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.source = source;
	        _this.count = 0;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(CountSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (this.predicate) {
	                this._tryPredicate(value);
	            } else {
	                this.count++;
	            }
	        }
	    }, {
	        key: '_tryPredicate',
	        value: function _tryPredicate(value) {
	            var result = void 0;
	            try {
	                result = this.predicate(value, this.index++, this.source);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            if (result) {
	                this.count++;
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.destination.next(this.count);
	            this.destination.complete();
	        }
	    }]);

	    return CountSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=count.js.map

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _dematerialize = __webpack_require__(118);

	_Observable.Observable.prototype.dematerialize = _dematerialize.dematerialize;
	var _void = exports._void = undefined;
	//# sourceMappingURL=dematerialize.js.map

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.dematerialize = dematerialize;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that transforms Notification objects into the items or notifications they represent.
	 * @returns {Observable} an Observable that emits items and notifications embedded in Notification objects emitted by the source Observable.
	 */
	function dematerialize() {
	    return this.lift(new DeMaterializeOperator());
	}

	var DeMaterializeOperator = function () {
	    function DeMaterializeOperator() {
	        _classCallCheck(this, DeMaterializeOperator);
	    }

	    _createClass(DeMaterializeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DeMaterializeSubscriber(subscriber);
	        }
	    }]);

	    return DeMaterializeOperator;
	}();

	var DeMaterializeSubscriber = function (_Subscriber) {
	    _inherits(DeMaterializeSubscriber, _Subscriber);

	    function DeMaterializeSubscriber(destination) {
	        _classCallCheck(this, DeMaterializeSubscriber);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DeMaterializeSubscriber).call(this, destination));
	    }

	    _createClass(DeMaterializeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            value.observe(this.destination);
	        }
	    }]);

	    return DeMaterializeSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=dematerialize.js.map

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _debounce = __webpack_require__(120);

	_Observable.Observable.prototype.debounce = _debounce.debounce;
	var _void = exports._void = undefined;
	//# sourceMappingURL=debounce.js.map

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.debounce = debounce;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns the source Observable delayed by the computed debounce duration,
	 * with the duration lengthened if a new source item arrives before the delay
	 * duration ends.
	 * In practice, for each item emitted on the source, this operator holds the
	 * latest item, waits for a silence as long as the `durationSelector` specifies,
	 * and only then emits the latest source item on the result Observable.
	 * @param {function} durationSelector function for computing the timeout duration for each item.
	 * @returns {Observable} an Observable the same as source Observable, but drops items.
	 */
	function debounce(durationSelector) {
	    return this.lift(new DebounceOperator(durationSelector));
	}

	var DebounceOperator = function () {
	    function DebounceOperator(durationSelector) {
	        _classCallCheck(this, DebounceOperator);

	        this.durationSelector = durationSelector;
	    }

	    _createClass(DebounceOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DebounceSubscriber(subscriber, this.durationSelector);
	        }
	    }]);

	    return DebounceOperator;
	}();

	var DebounceSubscriber = function (_OuterSubscriber) {
	    _inherits(DebounceSubscriber, _OuterSubscriber);

	    function DebounceSubscriber(destination, durationSelector) {
	        _classCallCheck(this, DebounceSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebounceSubscriber).call(this, destination));

	        _this.durationSelector = durationSelector;
	        _this.hasValue = false;
	        _this.durationSubscription = null;
	        return _this;
	    }

	    _createClass(DebounceSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            try {
	                var result = this.durationSelector.call(this, value);
	                if (result) {
	                    this._tryNext(value, result);
	                }
	            } catch (err) {
	                this.destination.error(err);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.emitValue();
	            this.destination.complete();
	        }
	    }, {
	        key: '_tryNext',
	        value: function _tryNext(value, duration) {
	            var subscription = this.durationSubscription;
	            this.value = value;
	            this.hasValue = true;
	            if (subscription) {
	                subscription.unsubscribe();
	                this.remove(subscription);
	            }
	            subscription = (0, _subscribeToResult.subscribeToResult)(this, duration);
	            if (!subscription.isUnsubscribed) {
	                this.add(this.durationSubscription = subscription);
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.emitValue();
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            this.emitValue();
	        }
	    }, {
	        key: 'emitValue',
	        value: function emitValue() {
	            if (this.hasValue) {
	                var value = this.value;
	                var subscription = this.durationSubscription;
	                if (subscription) {
	                    this.durationSubscription = null;
	                    subscription.unsubscribe();
	                    this.remove(subscription);
	                }
	                this.value = null;
	                this.hasValue = false;
	                _get(Object.getPrototypeOf(DebounceSubscriber.prototype), '_next', this).call(this, value);
	            }
	        }
	    }]);

	    return DebounceSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=debounce.js.map

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _debounceTime = __webpack_require__(122);

	_Observable.Observable.prototype.debounceTime = _debounceTime.debounceTime;
	var _void = exports._void = undefined;
	//# sourceMappingURL=debounceTime.js.map

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.debounceTime = debounceTime;

	var _Subscriber2 = __webpack_require__(8);

	var _asap = __webpack_require__(63);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns the source Observable delayed by the computed debounce duration,
	 * with the duration lengthened if a new source item arrives before the delay
	 * duration ends.
	 * In practice, for each item emitted on the source, this operator holds the
	 * latest item, waits for a silence for the `dueTime` length, and only then
	 * emits the latest source item on the result Observable.
	 * Optionally takes a scheduler for manging timers.
	 * @param {number} dueTime the timeout value for the window of time required to not drop the item.
	 * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
	 * @returns {Observable} an Observable the same as source Observable, but drops items.
	 */
	function debounceTime(dueTime) {
	    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
	}

	var DebounceTimeOperator = function () {
	    function DebounceTimeOperator(dueTime, scheduler) {
	        _classCallCheck(this, DebounceTimeOperator);

	        this.dueTime = dueTime;
	        this.scheduler = scheduler;
	    }

	    _createClass(DebounceTimeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler);
	        }
	    }]);

	    return DebounceTimeOperator;
	}();

	var DebounceTimeSubscriber = function (_Subscriber) {
	    _inherits(DebounceTimeSubscriber, _Subscriber);

	    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
	        _classCallCheck(this, DebounceTimeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebounceTimeSubscriber).call(this, destination));

	        _this.dueTime = dueTime;
	        _this.scheduler = scheduler;
	        _this.debouncedSubscription = null;
	        _this.lastValue = null;
	        _this.hasValue = false;
	        return _this;
	    }

	    _createClass(DebounceTimeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.clearDebounce();
	            this.lastValue = value;
	            this.hasValue = true;
	            this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.debouncedNext();
	            this.destination.complete();
	        }
	    }, {
	        key: 'debouncedNext',
	        value: function debouncedNext() {
	            this.clearDebounce();
	            if (this.hasValue) {
	                this.destination.next(this.lastValue);
	                this.lastValue = null;
	                this.hasValue = false;
	            }
	        }
	    }, {
	        key: 'clearDebounce',
	        value: function clearDebounce() {
	            var debouncedSubscription = this.debouncedSubscription;
	            if (debouncedSubscription !== null) {
	                this.remove(debouncedSubscription);
	                debouncedSubscription.unsubscribe();
	                this.debouncedSubscription = null;
	            }
	        }
	    }]);

	    return DebounceTimeSubscriber;
	}(_Subscriber2.Subscriber);

	function dispatchNext(subscriber) {
	    subscriber.debouncedNext();
	}
	//# sourceMappingURL=debounceTime.js.map

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _defaultIfEmpty = __webpack_require__(124);

	_Observable.Observable.prototype.defaultIfEmpty = _defaultIfEmpty.defaultIfEmpty;
	var _void = exports._void = undefined;
	//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.defaultIfEmpty = defaultIfEmpty;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits the elements of the source or a specified default value if empty.
	 * @param {any} defaultValue the default value used if source is empty; defaults to null.
	 * @returns {Observable} an Observable of the items emitted by the where empty values are replaced by the specified default value or null.
	 */
	function defaultIfEmpty() {
	    var defaultValue = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	    return this.lift(new DefaultIfEmptyOperator(defaultValue));
	}

	var DefaultIfEmptyOperator = function () {
	    function DefaultIfEmptyOperator(defaultValue) {
	        _classCallCheck(this, DefaultIfEmptyOperator);

	        this.defaultValue = defaultValue;
	    }

	    _createClass(DefaultIfEmptyOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DefaultIfEmptySubscriber(subscriber, this.defaultValue);
	        }
	    }]);

	    return DefaultIfEmptyOperator;
	}();

	var DefaultIfEmptySubscriber = function (_Subscriber) {
	    _inherits(DefaultIfEmptySubscriber, _Subscriber);

	    function DefaultIfEmptySubscriber(destination, defaultValue) {
	        _classCallCheck(this, DefaultIfEmptySubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DefaultIfEmptySubscriber).call(this, destination));

	        _this.defaultValue = defaultValue;
	        _this.isEmpty = true;
	        return _this;
	    }

	    _createClass(DefaultIfEmptySubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.isEmpty = false;
	            this.destination.next(value);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            if (this.isEmpty) {
	                this.destination.next(this.defaultValue);
	            }
	            this.destination.complete();
	        }
	    }]);

	    return DefaultIfEmptySubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=defaultIfEmpty.js.map

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _delay = __webpack_require__(126);

	_Observable.Observable.prototype.delay = _delay.delay;
	var _void = exports._void = undefined;
	//# sourceMappingURL=delay.js.map

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.delay = delay;

	var _asap = __webpack_require__(63);

	var _isDate = __webpack_require__(81);

	var _Subscriber2 = __webpack_require__(8);

	var _Notification = __webpack_require__(53);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that delays the emission of items from the source Observable
	 * by a given timeout or until a given Date.
	 * @param {number|Date} delay the timeout value or date until which the emission of the source items is delayed.
	 * @param {Scheduler} [scheduler] the Scheduler to use for managing the timers that handle the timeout for each item.
	 * @returns {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
	 */
	function delay(delay) {
	    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	    var absoluteDelay = (0, _isDate.isDate)(delay);
	    var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
	    return this.lift(new DelayOperator(delayFor, scheduler));
	}

	var DelayOperator = function () {
	    function DelayOperator(delay, scheduler) {
	        _classCallCheck(this, DelayOperator);

	        this.delay = delay;
	        this.scheduler = scheduler;
	    }

	    _createClass(DelayOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DelaySubscriber(subscriber, this.delay, this.scheduler);
	        }
	    }]);

	    return DelayOperator;
	}();

	var DelaySubscriber = function (_Subscriber) {
	    _inherits(DelaySubscriber, _Subscriber);

	    function DelaySubscriber(destination, delay, scheduler) {
	        _classCallCheck(this, DelaySubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DelaySubscriber).call(this, destination));

	        _this.delay = delay;
	        _this.scheduler = scheduler;
	        _this.queue = [];
	        _this.active = false;
	        _this.errored = false;
	        return _this;
	    }

	    _createClass(DelaySubscriber, [{
	        key: '_schedule',
	        value: function _schedule(scheduler) {
	            this.active = true;
	            this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
	                source: this, destination: this.destination, scheduler: scheduler
	            }));
	        }
	    }, {
	        key: 'scheduleNotification',
	        value: function scheduleNotification(notification) {
	            if (this.errored === true) {
	                return;
	            }
	            var scheduler = this.scheduler;
	            var message = new DelayMessage(scheduler.now() + this.delay, notification);
	            this.queue.push(message);
	            if (this.active === false) {
	                this._schedule(scheduler);
	            }
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.scheduleNotification(_Notification.Notification.createNext(value));
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.errored = true;
	            this.queue = [];
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.scheduleNotification(_Notification.Notification.createComplete());
	        }
	    }], [{
	        key: 'dispatch',
	        value: function dispatch(state) {
	            var source = state.source;
	            var queue = source.queue;
	            var scheduler = state.scheduler;
	            var destination = state.destination;
	            while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
	                queue.shift().notification.observe(destination);
	            }
	            if (queue.length > 0) {
	                var _delay = Math.max(0, queue[0].time - scheduler.now());
	                this.schedule(state, _delay);
	            } else {
	                source.active = false;
	            }
	        }
	    }]);

	    return DelaySubscriber;
	}(_Subscriber2.Subscriber);

	var DelayMessage = function DelayMessage(time, notification) {
	    _classCallCheck(this, DelayMessage);

	    this.time = time;
	    this.notification = notification;
	};
	//# sourceMappingURL=delay.js.map

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _delayWhen = __webpack_require__(128);

	_Observable.Observable.prototype.delayWhen = _delayWhen.delayWhen;
	var _void = exports._void = undefined;
	//# sourceMappingURL=delayWhen.js.map

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.delayWhen = delayWhen;

	var _Subscriber2 = __webpack_require__(8);

	var _Observable2 = __webpack_require__(3);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that delays the emission of items from the source Observable
	 * by a subscription delay and a delay selector function for each element.
	 * @param {Function} selector function to retrieve a sequence indicating the delay for each given element.
	 * @param {Observable} sequence indicating the delay for the subscription to the source.
	 * @returns {Observable} an Observable that delays the emissions of the source Observable by the specified timeout or Date.
	 */
	function delayWhen(delayDurationSelector, subscriptionDelay) {
	    if (subscriptionDelay) {
	        return new SubscriptionDelayObservable(this, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
	    }
	    return this.lift(new DelayWhenOperator(delayDurationSelector));
	}

	var DelayWhenOperator = function () {
	    function DelayWhenOperator(delayDurationSelector) {
	        _classCallCheck(this, DelayWhenOperator);

	        this.delayDurationSelector = delayDurationSelector;
	    }

	    _createClass(DelayWhenOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DelayWhenSubscriber(subscriber, this.delayDurationSelector);
	        }
	    }]);

	    return DelayWhenOperator;
	}();

	var DelayWhenSubscriber = function (_OuterSubscriber) {
	    _inherits(DelayWhenSubscriber, _OuterSubscriber);

	    function DelayWhenSubscriber(destination, delayDurationSelector) {
	        _classCallCheck(this, DelayWhenSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DelayWhenSubscriber).call(this, destination));

	        _this.delayDurationSelector = delayDurationSelector;
	        _this.completed = false;
	        _this.delayNotifierSubscriptions = [];
	        _this.values = [];
	        return _this;
	    }

	    _createClass(DelayWhenSubscriber, [{
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.destination.next(outerValue);
	            this.removeSubscription(innerSub);
	            this.tryComplete();
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(error, innerSub) {
	            this._error(error);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            var value = this.removeSubscription(innerSub);
	            if (value) {
	                this.destination.next(value);
	            }
	            this.tryComplete();
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            try {
	                var delayNotifier = this.delayDurationSelector(value);
	                if (delayNotifier) {
	                    this.tryDelay(delayNotifier, value);
	                }
	            } catch (err) {
	                this.destination.error(err);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.completed = true;
	            this.tryComplete();
	        }
	    }, {
	        key: 'removeSubscription',
	        value: function removeSubscription(subscription) {
	            subscription.unsubscribe();
	            var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
	            var value = null;
	            if (subscriptionIdx !== -1) {
	                value = this.values[subscriptionIdx];
	                this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
	                this.values.splice(subscriptionIdx, 1);
	            }
	            return value;
	        }
	    }, {
	        key: 'tryDelay',
	        value: function tryDelay(delayNotifier, value) {
	            var notifierSubscription = (0, _subscribeToResult.subscribeToResult)(this, delayNotifier, value);
	            this.add(notifierSubscription);
	            this.delayNotifierSubscriptions.push(notifierSubscription);
	            this.values.push(value);
	        }
	    }, {
	        key: 'tryComplete',
	        value: function tryComplete() {
	            if (this.completed && this.delayNotifierSubscriptions.length === 0) {
	                this.destination.complete();
	            }
	        }
	    }]);

	    return DelayWhenSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);

	var SubscriptionDelayObservable = function (_Observable) {
	    _inherits(SubscriptionDelayObservable, _Observable);

	    function SubscriptionDelayObservable(source, subscriptionDelay) {
	        _classCallCheck(this, SubscriptionDelayObservable);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SubscriptionDelayObservable).call(this));

	        _this2.source = source;
	        _this2.subscriptionDelay = subscriptionDelay;
	        return _this2;
	    }

	    _createClass(SubscriptionDelayObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
	        }
	    }]);

	    return SubscriptionDelayObservable;
	}(_Observable2.Observable);

	var SubscriptionDelaySubscriber = function (_Subscriber) {
	    _inherits(SubscriptionDelaySubscriber, _Subscriber);

	    function SubscriptionDelaySubscriber(parent, source) {
	        _classCallCheck(this, SubscriptionDelaySubscriber);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(SubscriptionDelaySubscriber).call(this));

	        _this3.parent = parent;
	        _this3.source = source;
	        _this3.sourceSubscribed = false;
	        return _this3;
	    }

	    _createClass(SubscriptionDelaySubscriber, [{
	        key: '_next',
	        value: function _next(unused) {
	            this.subscribeToSource();
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.unsubscribe();
	            this.parent.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.subscribeToSource();
	        }
	    }, {
	        key: 'subscribeToSource',
	        value: function subscribeToSource() {
	            if (!this.sourceSubscribed) {
	                this.sourceSubscribed = true;
	                this.unsubscribe();
	                this.source.subscribe(this.parent);
	            }
	        }
	    }]);

	    return SubscriptionDelaySubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=delayWhen.js.map

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _distinctUntilChanged = __webpack_require__(130);

	_Observable.Observable.prototype.distinctUntilChanged = _distinctUntilChanged.distinctUntilChanged;
	var _void = exports._void = undefined;
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.distinctUntilChanged = distinctUntilChanged;

	var _Subscriber2 = __webpack_require__(8);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function distinctUntilChanged(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}

	var DistinctUntilChangedOperator = function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        _classCallCheck(this, DistinctUntilChangedOperator);

	        this.compare = compare;
	        this.keySelector = keySelector;
	    }

	    _createClass(DistinctUntilChangedOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector);
	        }
	    }]);

	    return DistinctUntilChangedOperator;
	}();

	var DistinctUntilChangedSubscriber = function (_Subscriber) {
	    _inherits(DistinctUntilChangedSubscriber, _Subscriber);

	    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	        _classCallCheck(this, DistinctUntilChangedSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DistinctUntilChangedSubscriber).call(this, destination));

	        _this.keySelector = keySelector;
	        _this.hasKey = false;
	        if (typeof compare === 'function') {
	            _this.compare = compare;
	        }
	        return _this;
	    }

	    _createClass(DistinctUntilChangedSubscriber, [{
	        key: 'compare',
	        value: function compare(x, y) {
	            return x === y;
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            var keySelector = this.keySelector;
	            var key = value;
	            if (keySelector) {
	                key = (0, _tryCatch.tryCatch)(this.keySelector)(value);
	                if (key === _errorObject.errorObject) {
	                    return this.destination.error(_errorObject.errorObject.e);
	                }
	            }
	            var result = false;
	            if (this.hasKey) {
	                result = (0, _tryCatch.tryCatch)(this.compare)(this.key, key);
	                if (result === _errorObject.errorObject) {
	                    return this.destination.error(_errorObject.errorObject.e);
	                }
	            } else {
	                this.hasKey = true;
	            }
	            if (Boolean(result) === false) {
	                this.key = key;
	                this.destination.next(value);
	            }
	        }
	    }]);

	    return DistinctUntilChangedSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _do2 = __webpack_require__(132);

	_Observable.Observable.prototype.do = _do2._do;
	var _void = exports._void = undefined;
	//# sourceMappingURL=do.js.map

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports._do = _do;

	var _Subscriber2 = __webpack_require__(8);

	var _noop = __webpack_require__(74);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called
	 * for every item emitted by the source.
	 * This operator is useful for debugging your observables for the correct values or performing other side effects.
	 * @param {Observer|function} [nextOrObserver] a normal observer callback or callback for onNext.
	 * @param {function} [error] callback for errors in the source.
	 * @param {function} [complete] callback for the completion of the source.
	 * @reurns {Observable} a mirrored Observable with the specified Observer or callback attached for each item.
	 */
	function _do(nextOrObserver, error, complete) {
	    var next = void 0;
	    if (nextOrObserver && (typeof nextOrObserver === 'undefined' ? 'undefined' : _typeof(nextOrObserver)) === 'object') {
	        next = nextOrObserver.next;
	        error = nextOrObserver.error;
	        complete = nextOrObserver.complete;
	    } else {
	        next = nextOrObserver;
	    }
	    return this.lift(new DoOperator(next || _noop.noop, error || _noop.noop, complete || _noop.noop));
	}

	var DoOperator = function () {
	    function DoOperator(next, error, complete) {
	        _classCallCheck(this, DoOperator);

	        this.next = next;
	        this.error = error;
	        this.complete = complete;
	    }

	    _createClass(DoOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new DoSubscriber(subscriber, this.next, this.error, this.complete);
	        }
	    }]);

	    return DoOperator;
	}();

	var DoSubscriber = function (_Subscriber) {
	    _inherits(DoSubscriber, _Subscriber);

	    function DoSubscriber(destination, next, error, complete) {
	        _classCallCheck(this, DoSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DoSubscriber).call(this, destination));

	        _this.__next = next;
	        _this.__error = error;
	        _this.__complete = complete;
	        return _this;
	    }
	    // NOTE: important, all try catch blocks below are there for performance
	    // reasons. tryCatcher approach does not benefit this operator.


	    _createClass(DoSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            try {
	                this.__next(value);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            try {
	                this.__error(err);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            try {
	                this.__complete();
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.complete();
	        }
	    }]);

	    return DoSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=do.js.map

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _expand = __webpack_require__(134);

	_Observable.Observable.prototype.expand = _expand.expand;
	var _void = exports._void = undefined;
	//# sourceMappingURL=expand.js.map

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ExpandSubscriber = exports.ExpandOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.expand = expand;

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable where for each item in the source Observable, the supplied function is applied to each item,
	 * resulting in a new value to then be applied again with the function.
	 * @param {function} project the function for projecting the next emitted item of the Observable.
	 * @param {number} [concurrent] the max number of observables that can be created concurrently. defaults to infinity.
	 * @param {Scheduler} [scheduler] The Scheduler to use for managing the expansions.
	 * @returns {Observable} an Observable containing the expansions of the source Observable.
	 */
	function expand(project) {
	    var concurrent = arguments.length <= 1 || arguments[1] === undefined ? Number.POSITIVE_INFINITY : arguments[1];
	    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
	    return this.lift(new ExpandOperator(project, concurrent, scheduler));
	}

	var ExpandOperator = exports.ExpandOperator = function () {
	    function ExpandOperator(project, concurrent, scheduler) {
	        _classCallCheck(this, ExpandOperator);

	        this.project = project;
	        this.concurrent = concurrent;
	        this.scheduler = scheduler;
	    }

	    _createClass(ExpandOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler);
	        }
	    }]);

	    return ExpandOperator;
	}();

	var ExpandSubscriber = exports.ExpandSubscriber = function (_OuterSubscriber) {
	    _inherits(ExpandSubscriber, _OuterSubscriber);

	    function ExpandSubscriber(destination, project, concurrent, scheduler) {
	        _classCallCheck(this, ExpandSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExpandSubscriber).call(this, destination));

	        _this.project = project;
	        _this.concurrent = concurrent;
	        _this.scheduler = scheduler;
	        _this.index = 0;
	        _this.active = 0;
	        _this.hasCompleted = false;
	        if (concurrent < Number.POSITIVE_INFINITY) {
	            _this.buffer = [];
	        }
	        return _this;
	    }

	    _createClass(ExpandSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var destination = this.destination;
	            if (destination.isUnsubscribed) {
	                this._complete();
	                return;
	            }
	            var index = this.index++;
	            if (this.active < this.concurrent) {
	                destination.next(value);
	                var result = (0, _tryCatch.tryCatch)(this.project)(value, index);
	                if (result === _errorObject.errorObject) {
	                    destination.error(_errorObject.errorObject.e);
	                } else if (!this.scheduler) {
	                    this.subscribeToProjection(result, value, index);
	                } else {
	                    var state = { subscriber: this, result: result, value: value, index: index };
	                    this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
	                }
	            } else {
	                this.buffer.push(value);
	            }
	        }
	    }, {
	        key: 'subscribeToProjection',
	        value: function subscribeToProjection(result, value, index) {
	            this.active++;
	            this.add((0, _subscribeToResult.subscribeToResult)(this, result, value, index));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.hasCompleted = true;
	            if (this.hasCompleted && this.active === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this._next(innerValue);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            var buffer = this.buffer;
	            this.remove(innerSub);
	            this.active--;
	            if (buffer && buffer.length > 0) {
	                this._next(buffer.shift());
	            }
	            if (this.hasCompleted && this.active === 0) {
	                this.destination.complete();
	            }
	        }
	    }], [{
	        key: 'dispatch',
	        value: function dispatch(_ref) {
	            var subscriber = _ref.subscriber;
	            var result = _ref.result;
	            var value = _ref.value;
	            var index = _ref.index;

	            subscriber.subscribeToProjection(result, value, index);
	        }
	    }]);

	    return ExpandSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=expand.js.map

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _filter = __webpack_require__(136);

	_Observable.Observable.prototype.filter = _filter.filter;
	var _void = exports._void = undefined;
	//# sourceMappingURL=filter.js.map

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.filter = filter;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Similar to the well-known `Array.prototype.filter` method, this operator filters values down to a set
	 * allowed by a `select` function
	 *
	 * @param {Function} select a function that is used to select the resulting values
	 *  if it returns `true`, the value is emitted, if `false` the value is not passed to the resulting observable
	 * @param {any} [thisArg] an optional argument to determine the value of `this` in the `select` function
	 * @returns {Observable} an observable of values allowed by the select function
	 */
	function filter(select, thisArg) {
	    return this.lift(new FilterOperator(select, thisArg));
	}

	var FilterOperator = function () {
	    function FilterOperator(select, thisArg) {
	        _classCallCheck(this, FilterOperator);

	        this.select = select;
	        this.thisArg = thisArg;
	    }

	    _createClass(FilterOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new FilterSubscriber(subscriber, this.select, this.thisArg);
	        }
	    }]);

	    return FilterOperator;
	}();

	var FilterSubscriber = function (_Subscriber) {
	    _inherits(FilterSubscriber, _Subscriber);

	    function FilterSubscriber(destination, select, thisArg) {
	        _classCallCheck(this, FilterSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FilterSubscriber).call(this, destination));

	        _this.select = select;
	        _this.thisArg = thisArg;
	        _this.count = 0;
	        _this.select = select;
	        return _this;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.


	    _createClass(FilterSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var result = void 0;
	            try {
	                result = this.select.call(this.thisArg, value, this.count++);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            if (result) {
	                this.destination.next(value);
	            }
	        }
	    }]);

	    return FilterSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=filter.js.map

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _finally2 = __webpack_require__(138);

	_Observable.Observable.prototype.finally = _finally2._finally;
	var _void = exports._void = undefined;
	//# sourceMappingURL=finally.js.map

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports._finally = _finally;

	var _Subscriber2 = __webpack_require__(8);

	var _Subscription = __webpack_require__(10);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} finallySelector function to be called when source terminates.
	 * @returns {Observable} an Observable that mirrors the source, but will call the specified function on termination.
	 */
	function _finally(finallySelector) {
	    return this.lift(new FinallyOperator(finallySelector));
	}

	var FinallyOperator = function () {
	    function FinallyOperator(finallySelector) {
	        _classCallCheck(this, FinallyOperator);

	        this.finallySelector = finallySelector;
	    }

	    _createClass(FinallyOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new FinallySubscriber(subscriber, this.finallySelector);
	        }
	    }]);

	    return FinallyOperator;
	}();

	var FinallySubscriber = function (_Subscriber) {
	    _inherits(FinallySubscriber, _Subscriber);

	    function FinallySubscriber(destination, finallySelector) {
	        _classCallCheck(this, FinallySubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FinallySubscriber).call(this, destination));

	        _this.add(new _Subscription.Subscription(finallySelector));
	        return _this;
	    }

	    return FinallySubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=finally.js.map

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _first = __webpack_require__(140);

	_Observable.Observable.prototype.first = _first.first;
	var _void = exports._void = undefined;
	//# sourceMappingURL=first.js.map

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.first = first;

	var _Subscriber2 = __webpack_require__(8);

	var _EmptyError = __webpack_require__(141);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits the first item of the source Observable that matches the specified condition.
	 * Throws an error if matching element is not found.
	 * @param {function} predicate function called with each item to test for condition matching.
	 * @returns {Observable} an Observable of the first item that matches the condition.
	 */
	function first(predicate, resultSelector, defaultValue) {
	    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
	}

	var FirstOperator = function () {
	    function FirstOperator(predicate, resultSelector, defaultValue, source) {
	        _classCallCheck(this, FirstOperator);

	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }

	    _createClass(FirstOperator, [{
	        key: 'call',
	        value: function call(observer) {
	            return new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
	        }
	    }]);

	    return FirstOperator;
	}();

	var FirstSubscriber = function (_Subscriber) {
	    _inherits(FirstSubscriber, _Subscriber);

	    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _classCallCheck(this, FirstSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FirstSubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.resultSelector = resultSelector;
	        _this.defaultValue = defaultValue;
	        _this.source = source;
	        _this.index = 0;
	        _this.hasCompleted = false;
	        return _this;
	    }

	    _createClass(FirstSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var index = this.index++;
	            if (this.predicate) {
	                this._tryPredicate(value, index);
	            } else {
	                this._emit(value, index);
	            }
	        }
	    }, {
	        key: '_tryPredicate',
	        value: function _tryPredicate(value, index) {
	            var result = void 0;
	            try {
	                result = this.predicate(value, index, this.source);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            if (result) {
	                this._emit(value, index);
	            }
	        }
	    }, {
	        key: '_emit',
	        value: function _emit(value, index) {
	            if (this.resultSelector) {
	                this._tryResultSelector(value, index);
	                return;
	            }
	            this._emitFinal(value);
	        }
	    }, {
	        key: '_tryResultSelector',
	        value: function _tryResultSelector(value, index) {
	            var result = void 0;
	            try {
	                result = this.resultSelector(value, index);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this._emitFinal(result);
	        }
	    }, {
	        key: '_emitFinal',
	        value: function _emitFinal(value) {
	            var destination = this.destination;
	            destination.next(value);
	            destination.complete();
	            this.hasCompleted = true;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var destination = this.destination;
	            if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
	                destination.next(this.defaultValue);
	                destination.complete();
	            } else if (!this.hasCompleted) {
	                destination.error(new _EmptyError.EmptyError());
	            }
	        }
	    }]);

	    return FirstSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=first.js.map

/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EmptyError = exports.EmptyError = function (_Error) {
	    _inherits(EmptyError, _Error);

	    function EmptyError() {
	        _classCallCheck(this, EmptyError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EmptyError).call(this, 'no elements in sequence'));

	        _this.name = 'EmptyError';
	        return _this;
	    }

	    return EmptyError;
	}(Error);
	//# sourceMappingURL=EmptyError.js.map

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _groupBy = __webpack_require__(143);

	_Observable.Observable.prototype.groupBy = _groupBy.groupBy;
	var _void = exports._void = undefined;
	//# sourceMappingURL=groupBy.js.map

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GroupedObservable = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.groupBy = groupBy;

	var _Subscriber3 = __webpack_require__(8);

	var _Subscription2 = __webpack_require__(10);

	var _Observable2 = __webpack_require__(3);

	var _Operator2 = __webpack_require__(144);

	var _Subject = __webpack_require__(2);

	var _Map = __webpack_require__(145);

	var _FastMap = __webpack_require__(147);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Groups the items emitted by an Observable according to a specified criterion,
	 * and emits these grouped items as `GroupedObservables`, one `GroupedObservable` per group.
	 *
	 * <img src="./img/groupBy.png" width="100%">
	 *
	 * @param {Function} keySelector - a function that extracts the key for each item
	 * @param {Function} elementSelector - a function that extracts the return element for each item
	 * @returns {Observable} an Observable that emits GroupedObservables, each of which corresponds
	 * to a unique key value and each of which emits those items from the source Observable that share
	 * that key value.
	 */
	function groupBy(keySelector, elementSelector, durationSelector) {
	    return this.lift(new GroupByOperator(this, keySelector, elementSelector, durationSelector));
	}

	var GroupByOperator = function (_Operator) {
	    _inherits(GroupByOperator, _Operator);

	    function GroupByOperator(source, keySelector, elementSelector, durationSelector) {
	        _classCallCheck(this, GroupByOperator);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupByOperator).call(this));

	        _this.source = source;
	        _this.keySelector = keySelector;
	        _this.elementSelector = elementSelector;
	        _this.durationSelector = durationSelector;
	        return _this;
	    }

	    _createClass(GroupByOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector);
	        }
	    }]);

	    return GroupByOperator;
	}(_Operator2.Operator);

	var GroupBySubscriber = function (_Subscriber) {
	    _inherits(GroupBySubscriber, _Subscriber);

	    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector) {
	        _classCallCheck(this, GroupBySubscriber);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupBySubscriber).call(this));

	        _this2.keySelector = keySelector;
	        _this2.elementSelector = elementSelector;
	        _this2.durationSelector = durationSelector;
	        _this2.groups = null;
	        _this2.attemptedToUnsubscribe = false;
	        _this2.count = 0;
	        _this2.destination = destination;
	        _this2.add(destination);
	        return _this2;
	    }

	    _createClass(GroupBySubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var key = void 0;
	            try {
	                key = this.keySelector(value);
	            } catch (err) {
	                this.error(err);
	                return;
	            }
	            this._group(value, key);
	        }
	    }, {
	        key: '_group',
	        value: function _group(value, key) {
	            var groups = this.groups;
	            if (!groups) {
	                groups = this.groups = typeof key === 'string' ? new _FastMap.FastMap() : new _Map.Map();
	            }
	            var group = groups.get(key);
	            if (!group) {
	                groups.set(key, group = new _Subject.Subject());
	                var groupedObservable = new GroupedObservable(key, group, this);
	                if (this.durationSelector) {
	                    this._selectDuration(key, group);
	                }
	                this.destination.next(groupedObservable);
	            }
	            if (this.elementSelector) {
	                this._selectElement(value, group);
	            } else {
	                this.tryGroupNext(value, group);
	            }
	        }
	    }, {
	        key: '_selectElement',
	        value: function _selectElement(value, group) {
	            var result = void 0;
	            try {
	                result = this.elementSelector(value);
	            } catch (err) {
	                this.error(err);
	                return;
	            }
	            this.tryGroupNext(result, group);
	        }
	    }, {
	        key: '_selectDuration',
	        value: function _selectDuration(key, group) {
	            var duration = void 0;
	            try {
	                duration = this.durationSelector(new GroupedObservable(key, group));
	            } catch (err) {
	                this.error(err);
	                return;
	            }
	            this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
	        }
	    }, {
	        key: 'tryGroupNext',
	        value: function tryGroupNext(value, group) {
	            if (!group.isUnsubscribed) {
	                group.next(value);
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            var groups = this.groups;
	            if (groups) {
	                groups.forEach(function (group, key) {
	                    group.error(err);
	                });
	                groups.clear();
	            }
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var groups = this.groups;
	            if (groups) {
	                groups.forEach(function (group, key) {
	                    group.complete();
	                });
	                groups.clear();
	            }
	            this.destination.complete();
	        }
	    }, {
	        key: 'removeGroup',
	        value: function removeGroup(key) {
	            this.groups.delete(key);
	        }
	    }, {
	        key: 'unsubscribe',
	        value: function unsubscribe() {
	            if (!this.isUnsubscribed && !this.attemptedToUnsubscribe) {
	                this.attemptedToUnsubscribe = true;
	                if (this.count === 0) {
	                    _get(Object.getPrototypeOf(GroupBySubscriber.prototype), 'unsubscribe', this).call(this);
	                }
	            }
	        }
	    }]);

	    return GroupBySubscriber;
	}(_Subscriber3.Subscriber);

	var GroupDurationSubscriber = function (_Subscriber2) {
	    _inherits(GroupDurationSubscriber, _Subscriber2);

	    function GroupDurationSubscriber(key, group, parent) {
	        _classCallCheck(this, GroupDurationSubscriber);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupDurationSubscriber).call(this));

	        _this3.key = key;
	        _this3.group = group;
	        _this3.parent = parent;
	        return _this3;
	    }

	    _createClass(GroupDurationSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.tryComplete();
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.tryError(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.tryComplete();
	        }
	    }, {
	        key: 'tryError',
	        value: function tryError(err) {
	            var group = this.group;
	            if (!group.isUnsubscribed) {
	                group.error(err);
	            }
	            this.parent.removeGroup(this.key);
	        }
	    }, {
	        key: 'tryComplete',
	        value: function tryComplete() {
	            var group = this.group;
	            if (!group.isUnsubscribed) {
	                group.complete();
	            }
	            this.parent.removeGroup(this.key);
	        }
	    }]);

	    return GroupDurationSubscriber;
	}(_Subscriber3.Subscriber);

	var GroupedObservable = exports.GroupedObservable = function (_Observable) {
	    _inherits(GroupedObservable, _Observable);

	    function GroupedObservable(key, groupSubject, refCountSubscription) {
	        _classCallCheck(this, GroupedObservable);

	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupedObservable).call(this));

	        _this4.key = key;
	        _this4.groupSubject = groupSubject;
	        _this4.refCountSubscription = refCountSubscription;
	        return _this4;
	    }

	    _createClass(GroupedObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var subscription = new _Subscription2.Subscription();
	            var refCountSubscription = this.refCountSubscription;
	            var groupSubject = this.groupSubject;

	            if (refCountSubscription && !refCountSubscription.isUnsubscribed) {
	                subscription.add(new InnerRefCountSubscription(refCountSubscription));
	            }
	            subscription.add(groupSubject.subscribe(subscriber));
	            return subscription;
	        }
	    }]);

	    return GroupedObservable;
	}(_Observable2.Observable);

	var InnerRefCountSubscription = function (_Subscription) {
	    _inherits(InnerRefCountSubscription, _Subscription);

	    function InnerRefCountSubscription(parent) {
	        _classCallCheck(this, InnerRefCountSubscription);

	        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(InnerRefCountSubscription).call(this));

	        _this5.parent = parent;
	        parent.count++;
	        return _this5;
	    }

	    _createClass(InnerRefCountSubscription, [{
	        key: 'unsubscribe',
	        value: function unsubscribe() {
	            var parent = this.parent;
	            if (!parent.isUnsubscribed && !this.isUnsubscribed) {
	                _get(Object.getPrototypeOf(InnerRefCountSubscription.prototype), 'unsubscribe', this).call(this);
	                parent.count -= 1;
	                if (parent.count === 0 && parent.attemptedToUnsubscribe) {
	                    parent.unsubscribe();
	                }
	            }
	        }
	    }]);

	    return InnerRefCountSubscription;
	}(_Subscription2.Subscription);
	//# sourceMappingURL=groupBy.js.map

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Operator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Subscriber = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Operator = exports.Operator = function () {
	    function Operator() {
	        _classCallCheck(this, Operator);
	    }

	    _createClass(Operator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new _Subscriber.Subscriber(subscriber);
	        }
	    }]);

	    return Operator;
	}();
	//# sourceMappingURL=Operator.js.map

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Map = undefined;

	var _root = __webpack_require__(4);

	var _MapPolyfill = __webpack_require__(146);

	var Map = exports.Map = _root.root.Map || function () {
	  return _MapPolyfill.MapPolyfill;
	}();
	//# sourceMappingURL=Map.js.map

/***/ },
/* 146 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MapPolyfill = exports.MapPolyfill = function () {
	    function MapPolyfill() {
	        _classCallCheck(this, MapPolyfill);

	        this.size = 0;
	        this._values = [];
	        this._keys = [];
	    }

	    _createClass(MapPolyfill, [{
	        key: "get",
	        value: function get(key) {
	            var i = this._keys.indexOf(key);
	            return i === -1 ? undefined : this._values[i];
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            var i = this._keys.indexOf(key);
	            if (i === -1) {
	                this._keys.push(key);
	                this._values.push(value);
	                this.size++;
	            } else {
	                this._values[i] = value;
	            }
	            return this;
	        }
	    }, {
	        key: "delete",
	        value: function _delete(key) {
	            var i = this._keys.indexOf(key);
	            if (i === -1) {
	                return false;
	            }
	            this._values.splice(i, 1);
	            this._keys.splice(i, 1);
	            this.size--;
	            return true;
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this._keys.length = 0;
	            this._values.length = 0;
	            this.size = 0;
	        }
	    }, {
	        key: "forEach",
	        value: function forEach(cb, thisArg) {
	            for (var i = 0; i < this.size; i++) {
	                cb.call(thisArg, this._values[i], this._keys[i]);
	            }
	        }
	    }]);

	    return MapPolyfill;
	}();
	//# sourceMappingURL=MapPolyfill.js.map

/***/ },
/* 147 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FastMap = exports.FastMap = function () {
	    function FastMap() {
	        _classCallCheck(this, FastMap);

	        this.values = {};
	    }

	    _createClass(FastMap, [{
	        key: "delete",
	        value: function _delete(key) {
	            this.values[key] = null;
	            return true;
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            this.values[key] = value;
	            return this;
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this.values[key];
	        }
	    }, {
	        key: "forEach",
	        value: function forEach(cb, thisArg) {
	            var values = this.values;
	            for (var key in values) {
	                if (values.hasOwnProperty(key) && values[key] !== null) {
	                    cb.call(thisArg, values[key], key);
	                }
	            }
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.values = {};
	        }
	    }]);

	    return FastMap;
	}();
	//# sourceMappingURL=FastMap.js.map

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _ignoreElements = __webpack_require__(149);

	_Observable.Observable.prototype.ignoreElements = _ignoreElements.ignoreElements;
	var _void = exports._void = undefined;
	//# sourceMappingURL=ignoreElements.js.map

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.ignoreElements = ignoreElements;

	var _Subscriber2 = __webpack_require__(8);

	var _noop = __webpack_require__(74);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
	 *
	 * <img src="./img/ignoreElements.png" width="100%">
	 *
	 * @returns {Observable} an empty Observable that only calls `complete`
	 * or `error`, based on which one is called by the source Observable.
	 */
	function ignoreElements() {
	    return this.lift(new IgnoreElementsOperator());
	}
	;

	var IgnoreElementsOperator = function () {
	    function IgnoreElementsOperator() {
	        _classCallCheck(this, IgnoreElementsOperator);
	    }

	    _createClass(IgnoreElementsOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new IgnoreElementsSubscriber(subscriber);
	        }
	    }]);

	    return IgnoreElementsOperator;
	}();

	var IgnoreElementsSubscriber = function (_Subscriber) {
	    _inherits(IgnoreElementsSubscriber, _Subscriber);

	    function IgnoreElementsSubscriber() {
	        _classCallCheck(this, IgnoreElementsSubscriber);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IgnoreElementsSubscriber).apply(this, arguments));
	    }

	    _createClass(IgnoreElementsSubscriber, [{
	        key: '_next',
	        value: function _next(unused) {
	            (0, _noop.noop)();
	        }
	    }]);

	    return IgnoreElementsSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=ignoreElements.js.map

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _inspect = __webpack_require__(151);

	_Observable.Observable.prototype.inspect = _inspect.inspect;
	var _void = exports._void = undefined;
	//# sourceMappingURL=inspect.js.map

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.inspect = inspect;

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function inspect(durationSelector) {
	    return this.lift(new InspectOperator(durationSelector));
	}

	var InspectOperator = function () {
	    function InspectOperator(durationSelector) {
	        _classCallCheck(this, InspectOperator);

	        this.durationSelector = durationSelector;
	    }

	    _createClass(InspectOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new InspectSubscriber(subscriber, this.durationSelector);
	        }
	    }]);

	    return InspectOperator;
	}();

	var InspectSubscriber = function (_OuterSubscriber) {
	    _inherits(InspectSubscriber, _OuterSubscriber);

	    function InspectSubscriber(destination, durationSelector) {
	        _classCallCheck(this, InspectSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InspectSubscriber).call(this, destination));

	        _this.durationSelector = durationSelector;
	        _this.hasValue = false;
	        return _this;
	    }

	    _createClass(InspectSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.value = value;
	            this.hasValue = true;
	            if (!this.throttled) {
	                var duration = (0, _tryCatch.tryCatch)(this.durationSelector)(value);
	                if (duration === _errorObject.errorObject) {
	                    this.destination.error(_errorObject.errorObject.e);
	                } else {
	                    this.add(this.throttled = (0, _subscribeToResult.subscribeToResult)(this, duration));
	                }
	            }
	        }
	    }, {
	        key: 'clearThrottle',
	        value: function clearThrottle() {
	            var value = this.value;
	            var hasValue = this.hasValue;
	            var throttled = this.throttled;

	            if (throttled) {
	                this.remove(throttled);
	                this.throttled = null;
	                throttled.unsubscribe();
	            }
	            if (hasValue) {
	                this.value = null;
	                this.hasValue = false;
	                this.destination.next(value);
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex) {
	            this.clearThrottle();
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            this.clearThrottle();
	        }
	    }]);

	    return InspectSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=inspect.js.map

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _inspectTime = __webpack_require__(153);

	_Observable.Observable.prototype.inspectTime = _inspectTime.inspectTime;
	var _void = exports._void = undefined;
	//# sourceMappingURL=inspectTime.js.map

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.inspectTime = inspectTime;

	var _asap = __webpack_require__(63);

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function inspectTime(delay) {
	    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	    return this.lift(new InspectTimeOperator(delay, scheduler));
	}

	var InspectTimeOperator = function () {
	    function InspectTimeOperator(delay, scheduler) {
	        _classCallCheck(this, InspectTimeOperator);

	        this.delay = delay;
	        this.scheduler = scheduler;
	    }

	    _createClass(InspectTimeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new InspectTimeSubscriber(subscriber, this.delay, this.scheduler);
	        }
	    }]);

	    return InspectTimeOperator;
	}();

	var InspectTimeSubscriber = function (_Subscriber) {
	    _inherits(InspectTimeSubscriber, _Subscriber);

	    function InspectTimeSubscriber(destination, delay, scheduler) {
	        _classCallCheck(this, InspectTimeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InspectTimeSubscriber).call(this, destination));

	        _this.delay = delay;
	        _this.scheduler = scheduler;
	        _this.hasValue = false;
	        return _this;
	    }

	    _createClass(InspectTimeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.value = value;
	            this.hasValue = true;
	            if (!this.throttled) {
	                this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, this));
	            }
	        }
	    }, {
	        key: 'clearThrottle',
	        value: function clearThrottle() {
	            var value = this.value;
	            var hasValue = this.hasValue;
	            var throttled = this.throttled;

	            if (throttled) {
	                this.remove(throttled);
	                this.throttled = null;
	                throttled.unsubscribe();
	            }
	            if (hasValue) {
	                this.value = null;
	                this.hasValue = false;
	                this.destination.next(value);
	            }
	        }
	    }]);

	    return InspectTimeSubscriber;
	}(_Subscriber2.Subscriber);

	function dispatchNext(subscriber) {
	    subscriber.clearThrottle();
	}
	//# sourceMappingURL=inspectTime.js.map

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _every = __webpack_require__(155);

	_Observable.Observable.prototype.every = _every.every;
	var _void = exports._void = undefined;
	//# sourceMappingURL=every.js.map

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.every = every;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
	 * @param {function} predicate a function for determining if an item meets a specified condition.
	 * @param {any} [thisArg] optional object to use for `this` in the callback
	 * @returns {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
	 */
	function every(predicate, thisArg) {
	    var source = this;
	    return source.lift(new EveryOperator(predicate, thisArg, source));
	}

	var EveryOperator = function () {
	    function EveryOperator(predicate, thisArg, source) {
	        _classCallCheck(this, EveryOperator);

	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	    }

	    _createClass(EveryOperator, [{
	        key: 'call',
	        value: function call(observer) {
	            return new EverySubscriber(observer, this.predicate, this.thisArg, this.source);
	        }
	    }]);

	    return EveryOperator;
	}();

	var EverySubscriber = function (_Subscriber) {
	    _inherits(EverySubscriber, _Subscriber);

	    function EverySubscriber(destination, predicate, thisArg, source) {
	        _classCallCheck(this, EverySubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EverySubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.thisArg = thisArg;
	        _this.source = source;
	        _this.index = 0;
	        _this.thisArg = thisArg || _this;
	        return _this;
	    }

	    _createClass(EverySubscriber, [{
	        key: 'notifyComplete',
	        value: function notifyComplete(everyValueMatch) {
	            this.destination.next(everyValueMatch);
	            this.destination.complete();
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            var result = false;
	            try {
	                result = this.predicate.call(this.thisArg, value, this.index++, this.source);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            if (!result) {
	                this.notifyComplete(false);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.notifyComplete(true);
	        }
	    }]);

	    return EverySubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=every.js.map

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _last = __webpack_require__(157);

	_Observable.Observable.prototype.last = _last.last;
	var _void = exports._void = undefined;
	//# sourceMappingURL=last.js.map

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.last = last;

	var _Subscriber2 = __webpack_require__(8);

	var _EmptyError = __webpack_require__(141);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits only the last item emitted by the source Observable.
	 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
	 * the last item from the source Observable, the resulting Observable will emit the last item
	 * from the source Observable that satisfies the predicate.
	 *
	 * <img src="./img/last.png" width="100%">
	 *
	 * @param {function} predicate - the condition any source emitted item has to satisfy.
	 * @returns {Observable} an Observable that emits only the last item satisfying the given condition
	 * from the source, or an NoSuchElementException if no such items are emitted.
	 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
	 */
	function last(predicate, resultSelector, defaultValue) {
	    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
	}

	var LastOperator = function () {
	    function LastOperator(predicate, resultSelector, defaultValue, source) {
	        _classCallCheck(this, LastOperator);

	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }

	    _createClass(LastOperator, [{
	        key: 'call',
	        value: function call(observer) {
	            return new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source);
	        }
	    }]);

	    return LastOperator;
	}();

	var LastSubscriber = function (_Subscriber) {
	    _inherits(LastSubscriber, _Subscriber);

	    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _classCallCheck(this, LastSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LastSubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.resultSelector = resultSelector;
	        _this.defaultValue = defaultValue;
	        _this.source = source;
	        _this.hasValue = false;
	        _this.index = 0;
	        if (typeof defaultValue !== 'undefined') {
	            _this.lastValue = defaultValue;
	            _this.hasValue = true;
	        }
	        return _this;
	    }

	    _createClass(LastSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var index = this.index++;
	            if (this.predicate) {
	                this._tryPredicate(value, index);
	            } else {
	                if (this.resultSelector) {
	                    this._tryResultSelector(value, index);
	                    return;
	                }
	                this.lastValue = value;
	                this.hasValue = true;
	            }
	        }
	    }, {
	        key: '_tryPredicate',
	        value: function _tryPredicate(value, index) {
	            var result = void 0;
	            try {
	                result = this.predicate(value, index, this.source);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            if (result) {
	                if (this.resultSelector) {
	                    this._tryResultSelector(value, index);
	                    return;
	                }
	                this.lastValue = value;
	                this.hasValue = true;
	            }
	        }
	    }, {
	        key: '_tryResultSelector',
	        value: function _tryResultSelector(value, index) {
	            var result = void 0;
	            try {
	                result = this.resultSelector(value, index);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.lastValue = result;
	            this.hasValue = true;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var destination = this.destination;
	            if (this.hasValue) {
	                destination.next(this.lastValue);
	                destination.complete();
	            } else {
	                destination.error(new _EmptyError.EmptyError());
	            }
	        }
	    }]);

	    return LastSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=last.js.map

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _let = __webpack_require__(159);

	_Observable.Observable.prototype.let = _let.letProto;
	_Observable.Observable.prototype.letBind = _let.letProto;
	var _void = exports._void = undefined;
	//# sourceMappingURL=let.js.map

/***/ },
/* 159 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.letProto = letProto;
	function letProto(func) {
	    return func(this);
	}
	//# sourceMappingURL=let.js.map

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _map = __webpack_require__(161);

	_Observable.Observable.prototype.map = _map.map;
	var _void = exports._void = undefined;
	//# sourceMappingURL=map.js.map

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.map = map;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the returned observable
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * @param {Function} project the function to create projection
	 * @param {any} [thisArg] an optional argument to define what `this` is in the project function
	 * @returns {Observable} a observable of projected values
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}

	var MapOperator = function () {
	    function MapOperator(project, thisArg) {
	        _classCallCheck(this, MapOperator);

	        this.project = project;
	        this.thisArg = thisArg;
	    }

	    _createClass(MapOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new MapSubscriber(subscriber, this.project, this.thisArg);
	        }
	    }]);

	    return MapOperator;
	}();

	var MapSubscriber = function (_Subscriber) {
	    _inherits(MapSubscriber, _Subscriber);

	    function MapSubscriber(destination, project, thisArg) {
	        _classCallCheck(this, MapSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapSubscriber).call(this, destination));

	        _this.project = project;
	        _this.count = 0;
	        _this.thisArg = thisArg || _this;
	        return _this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.


	    _createClass(MapSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var result = void 0;
	            try {
	                result = this.project.call(this.thisArg, value, this.count++);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(result);
	        }
	    }]);

	    return MapSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=map.js.map

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _mapTo = __webpack_require__(163);

	_Observable.Observable.prototype.mapTo = _mapTo.mapTo;
	var _void = exports._void = undefined;
	//# sourceMappingURL=mapTo.js.map

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.mapTo = mapTo;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Maps every value to the same value every time.
	 *
	 * <img src="./img/mapTo.png" width="100%">
	 *
	 * @param {any} value the value to map each incoming value to
	 * @returns {Observable} an observable of the passed value that emits everytime the source does
	 */
	function mapTo(value) {
	    return this.lift(new MapToOperator(value));
	}

	var MapToOperator = function () {
	    function MapToOperator(value) {
	        _classCallCheck(this, MapToOperator);

	        this.value = value;
	    }

	    _createClass(MapToOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new MapToSubscriber(subscriber, this.value);
	        }
	    }]);

	    return MapToOperator;
	}();

	var MapToSubscriber = function (_Subscriber) {
	    _inherits(MapToSubscriber, _Subscriber);

	    function MapToSubscriber(destination, value) {
	        _classCallCheck(this, MapToSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapToSubscriber).call(this, destination));

	        _this.value = value;
	        return _this;
	    }

	    _createClass(MapToSubscriber, [{
	        key: '_next',
	        value: function _next(x) {
	            this.destination.next(this.value);
	        }
	    }]);

	    return MapToSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=mapTo.js.map

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _materialize = __webpack_require__(165);

	_Observable.Observable.prototype.materialize = _materialize.materialize;
	var _void = exports._void = undefined;
	//# sourceMappingURL=materialize.js.map

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.materialize = materialize;

	var _Subscriber2 = __webpack_require__(8);

	var _Notification = __webpack_require__(53);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that represents all of the emissions and notifications
	 * from the source Observable into emissions marked with their original types
	 * within a `Notification` objects.
	 *
	 * <img src="./img/materialize.png" width="100%">
	 *
	 * @scheduler materialize does not operate by default on a particular Scheduler.
	 * @returns {Observable} an Observable that emits items that are the result of
	 * materializing the items and notifications of the source Observable.
	 */
	function materialize() {
	    return this.lift(new MaterializeOperator());
	}

	var MaterializeOperator = function () {
	    function MaterializeOperator() {
	        _classCallCheck(this, MaterializeOperator);
	    }

	    _createClass(MaterializeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new MaterializeSubscriber(subscriber);
	        }
	    }]);

	    return MaterializeOperator;
	}();

	var MaterializeSubscriber = function (_Subscriber) {
	    _inherits(MaterializeSubscriber, _Subscriber);

	    function MaterializeSubscriber(destination) {
	        _classCallCheck(this, MaterializeSubscriber);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MaterializeSubscriber).call(this, destination));
	    }

	    _createClass(MaterializeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.destination.next(_Notification.Notification.createNext(value));
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            var destination = this.destination;
	            destination.next(_Notification.Notification.createError(err));
	            destination.complete();
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var destination = this.destination;
	            destination.next(_Notification.Notification.createComplete());
	            destination.complete();
	        }
	    }]);

	    return MaterializeSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=materialize.js.map

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _merge = __webpack_require__(34);

	_Observable.Observable.prototype.merge = _merge.merge;
	var _void = exports._void = undefined;
	//# sourceMappingURL=merge.js.map

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _mergeAll = __webpack_require__(32);

	_Observable.Observable.prototype.mergeAll = _mergeAll.mergeAll;
	var _void = exports._void = undefined;
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _mergeMap = __webpack_require__(111);

	_Observable.Observable.prototype.mergeMap = _mergeMap.mergeMap;
	_Observable.Observable.prototype.flatMap = _mergeMap.mergeMap;
	var _void = exports._void = undefined;
	//# sourceMappingURL=mergeMap.js.map

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _mergeMapTo = __webpack_require__(114);

	_Observable.Observable.prototype.mergeMapTo = _mergeMapTo.mergeMapTo;
	var _void = exports._void = undefined;
	//# sourceMappingURL=mergeMapTo.js.map

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _multicast = __webpack_require__(99);

	_Observable.Observable.prototype.multicast = _multicast.multicast;
	var _void = exports._void = undefined;
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _observeOn = __webpack_require__(52);

	_Observable.Observable.prototype.observeOn = _observeOn.observeOn;
	var _void = exports._void = undefined;
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _partition = __webpack_require__(173);

	_Observable.Observable.prototype.partition = _partition.partition;
	var _void = exports._void = undefined;
	//# sourceMappingURL=partition.js.map

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.partition = partition;

	var _not = __webpack_require__(174);

	var _filter = __webpack_require__(136);

	function partition(predicate, thisArg) {
	    return [_filter.filter.call(this, predicate), _filter.filter.call(this, (0, _not.not)(predicate, thisArg))];
	}
	//# sourceMappingURL=partition.js.map

/***/ },
/* 174 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.not = not;
	function not(pred, thisArg) {
	    function notPred() {
	        return !notPred.pred.apply(notPred.thisArg, arguments);
	    }
	    notPred.pred = pred;
	    notPred.thisArg = thisArg;
	    return notPred;
	}
	//# sourceMappingURL=not.js.map

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _pluck = __webpack_require__(176);

	_Observable.Observable.prototype.pluck = _pluck.pluck;
	var _void = exports._void = undefined;
	//# sourceMappingURL=pluck.js.map

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.pluck = pluck;

	var _map = __webpack_require__(161);

	/**
	 * Retrieves the value of a specified nested property from all elements in
	 * the Observable sequence. If a property can't be resolved, it will return
	 * `undefined` for that value.
	 *
	 * @param {...args} properties the nested properties to pluck
	 * @returns {Observable} Returns a new Observable sequence of property values
	 */
	function pluck() {
	    for (var _len = arguments.length, properties = Array(_len), _key = 0; _key < _len; _key++) {
	        properties[_key] = arguments[_key];
	    }

	    var length = properties.length;
	    if (length === 0) {
	        throw new Error('List of properties cannot be empty.');
	    }
	    return _map.map.call(this, plucker(properties, length));
	}
	function plucker(props, length) {
	    var mapper = function mapper(x) {
	        var currentProp = x;
	        for (var i = 0; i < length; i++) {
	            var p = currentProp[props[i]];
	            if (typeof p !== 'undefined') {
	                currentProp = p;
	            } else {
	                return undefined;
	            }
	        }
	        return currentProp;
	    };
	    return mapper;
	}
	//# sourceMappingURL=pluck.js.map

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _publish = __webpack_require__(178);

	_Observable.Observable.prototype.publish = _publish.publish;
	var _void = exports._void = undefined;
	//# sourceMappingURL=publish.js.map

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.publish = publish;

	var _Subject = __webpack_require__(2);

	var _multicast = __webpack_require__(99);

	/**
	 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
	 * before it begins emitting items to those Observers that have subscribed to it.
	 *
	 * <img src="./img/publish.png" width="100%">
	 *
	 * @returns a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
	 */
	function publish() {
	  return _multicast.multicast.call(this, new _Subject.Subject());
	}
	//# sourceMappingURL=publish.js.map

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _publishBehavior = __webpack_require__(180);

	_Observable.Observable.prototype.publishBehavior = _publishBehavior.publishBehavior;
	var _void = exports._void = undefined;
	//# sourceMappingURL=publishBehavior.js.map

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.publishBehavior = publishBehavior;

	var _BehaviorSubject = __webpack_require__(181);

	var _multicast = __webpack_require__(99);

	function publishBehavior(value) {
	    return _multicast.multicast.call(this, new _BehaviorSubject.BehaviorSubject(value));
	}
	//# sourceMappingURL=publishBehavior.js.map

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BehaviorSubject = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Subject2 = __webpack_require__(2);

	var _throwError = __webpack_require__(18);

	var _ObjectUnsubscribedError = __webpack_require__(19);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BehaviorSubject = exports.BehaviorSubject = function (_Subject) {
	    _inherits(BehaviorSubject, _Subject);

	    function BehaviorSubject(_value) {
	        _classCallCheck(this, BehaviorSubject);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BehaviorSubject).call(this));

	        _this._value = _value;
	        return _this;
	    }

	    _createClass(BehaviorSubject, [{
	        key: 'getValue',
	        value: function getValue() {
	            if (this.hasErrored) {
	                (0, _throwError.throwError)(this.errorValue);
	            } else if (this.isUnsubscribed) {
	                (0, _throwError.throwError)(new _ObjectUnsubscribedError.ObjectUnsubscribedError());
	            } else {
	                return this._value;
	            }
	        }
	    }, {
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var subscription = _get(Object.getPrototypeOf(BehaviorSubject.prototype), '_subscribe', this).call(this, subscriber);
	            if (subscription && !subscription.isUnsubscribed) {
	                subscriber.next(this._value);
	            }
	            return subscription;
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            _get(Object.getPrototypeOf(BehaviorSubject.prototype), '_next', this).call(this, this._value = value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.hasErrored = true;
	            _get(Object.getPrototypeOf(BehaviorSubject.prototype), '_error', this).call(this, this.errorValue = err);
	        }
	    }, {
	        key: 'value',
	        get: function get() {
	            return this.getValue();
	        }
	    }]);

	    return BehaviorSubject;
	}(_Subject2.Subject);
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _publishReplay = __webpack_require__(96);

	_Observable.Observable.prototype.publishReplay = _publishReplay.publishReplay;
	var _void = exports._void = undefined;
	//# sourceMappingURL=publishReplay.js.map

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _publishLast = __webpack_require__(184);

	_Observable.Observable.prototype.publishLast = _publishLast.publishLast;
	var _void = exports._void = undefined;
	//# sourceMappingURL=publishLast.js.map

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.publishLast = publishLast;

	var _AsyncSubject = __webpack_require__(39);

	var _multicast = __webpack_require__(99);

	function publishLast() {
	    return _multicast.multicast.call(this, new _AsyncSubject.AsyncSubject());
	}
	//# sourceMappingURL=publishLast.js.map

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _race = __webpack_require__(36);

	_Observable.Observable.prototype.race = _race.race;
	var _void = exports._void = undefined;
	//# sourceMappingURL=race.js.map

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _reduce = __webpack_require__(187);

	_Observable.Observable.prototype.reduce = _reduce.reduce;
	var _void = exports._void = undefined;
	//# sourceMappingURL=reduce.js.map

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ReduceSubscriber = exports.ReduceOperator = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.reduce = reduce;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that applies a specified accumulator function to the first item emitted by a source Observable,
	 * then feeds the result of that function along with the second item emitted by the source Observable into the same
	 * function, and so on until all items have been emitted by the source Observable, and emits the final result from
	 * the final call to your function as its sole item.
	 * This technique, which is called "reduce" here, is sometimes called "aggregate," "fold," "accumulate," "compress," or
	 * "inject" in other programming contexts.
	 *
	 * <img src="./img/reduce.png" width="100%">
	 *
	 * @param {initialValue} the initial (seed) accumulator value
	 * @param {accumulator} an accumulator function to be invoked on each item emitted by the source Observable, the
	 * result of which will be used in the next accumulator call.
	 * @returns {Observable} an Observable that emits a single item that is the result of accumulating the output from the
	 * items emitted by the source Observable.
	 */
	function reduce(project, seed) {
	    return this.lift(new ReduceOperator(project, seed));
	}

	var ReduceOperator = exports.ReduceOperator = function () {
	    function ReduceOperator(project, seed) {
	        _classCallCheck(this, ReduceOperator);

	        this.project = project;
	        this.seed = seed;
	    }

	    _createClass(ReduceOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ReduceSubscriber(subscriber, this.project, this.seed);
	        }
	    }]);

	    return ReduceOperator;
	}();

	var ReduceSubscriber = exports.ReduceSubscriber = function (_Subscriber) {
	    _inherits(ReduceSubscriber, _Subscriber);

	    function ReduceSubscriber(destination, project, seed) {
	        _classCallCheck(this, ReduceSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduceSubscriber).call(this, destination));

	        _this.hasValue = false;
	        _this.acc = seed;
	        _this.project = project;
	        _this.hasSeed = typeof seed !== 'undefined';
	        return _this;
	    }

	    _createClass(ReduceSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (this.hasValue || (this.hasValue = this.hasSeed)) {
	                this._tryReduce(value);
	            } else {
	                this.acc = value;
	                this.hasValue = true;
	            }
	        }
	    }, {
	        key: '_tryReduce',
	        value: function _tryReduce(value) {
	            var result = void 0;
	            try {
	                result = this.project(this.acc, value);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.acc = result;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            if (this.hasValue || this.hasSeed) {
	                this.destination.next(this.acc);
	            }
	            this.destination.complete();
	        }
	    }]);

	    return ReduceSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=reduce.js.map

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _repeat = __webpack_require__(189);

	_Observable.Observable.prototype.repeat = _repeat.repeat;
	var _void = exports._void = undefined;
	//# sourceMappingURL=repeat.js.map

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.repeat = repeat;

	var _Subscriber2 = __webpack_require__(8);

	var _EmptyObservable = __webpack_require__(24);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times,
	 * on a particular Scheduler.
	 *
	 * <img src="./img/repeat.png" width="100%">
	 *
	 * @param {Scheduler} [scheduler] the Scheduler to emit the items on.
	 * @param {number} [count] the number of times the source Observable items are repeated, a count of 0 will yield
	 * an empty Observable.
	 * @returns {Observable} an Observable that repeats the stream of items emitted by the source Observable at most
	 * count times.
	 */
	function repeat() {
	    var count = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

	    if (count === 0) {
	        return new _EmptyObservable.EmptyObservable();
	    } else if (count < 0) {
	        return this.lift(new RepeatOperator(-1, this));
	    } else {
	        return this.lift(new RepeatOperator(count - 1, this));
	    }
	}

	var RepeatOperator = function () {
	    function RepeatOperator(count, source) {
	        _classCallCheck(this, RepeatOperator);

	        this.count = count;
	        this.source = source;
	    }

	    _createClass(RepeatOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new RepeatSubscriber(subscriber, this.count, this.source);
	        }
	    }]);

	    return RepeatOperator;
	}();

	var RepeatSubscriber = function (_Subscriber) {
	    _inherits(RepeatSubscriber, _Subscriber);

	    function RepeatSubscriber(destination, count, source) {
	        _classCallCheck(this, RepeatSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RepeatSubscriber).call(this, destination));

	        _this.count = count;
	        _this.source = source;
	        return _this;
	    }

	    _createClass(RepeatSubscriber, [{
	        key: 'complete',
	        value: function complete() {
	            if (!this.isStopped) {
	                var source = this.source;
	                var count = this.count;

	                if (count === 0) {
	                    return _get(Object.getPrototypeOf(RepeatSubscriber.prototype), 'complete', this).call(this);
	                } else if (count > -1) {
	                    this.count = count - 1;
	                }
	                this.unsubscribe();
	                this.isStopped = false;
	                this.isUnsubscribed = false;
	                source.subscribe(this);
	            }
	        }
	    }]);

	    return RepeatSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=repeat.js.map

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _retry = __webpack_require__(191);

	_Observable.Observable.prototype.retry = _retry.retry;
	var _void = exports._void = undefined;
	//# sourceMappingURL=retry.js.map

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.retry = retry;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that mirrors the source Observable, resubscribing to it if it calls `error` and the
	 * predicate returns true for that specific exception and retry count.
	 * If the source Observable calls `error`, this method will resubscribe to the source Observable for a maximum of
	 * count resubscriptions (given as a number parameter) rather than propagating the `error` call.
	 *
	 * <img src="./img/retry.png" width="100%">
	 *
	 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
	 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
	 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
	 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
	 * @param {number} number of retry attempts before failing.
	 * @returns {Observable} the source Observable modified with the retry logic.
	 */
	function retry() {
	    var count = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

	    return this.lift(new RetryOperator(count, this));
	}

	var RetryOperator = function () {
	    function RetryOperator(count, source) {
	        _classCallCheck(this, RetryOperator);

	        this.count = count;
	        this.source = source;
	    }

	    _createClass(RetryOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new RetrySubscriber(subscriber, this.count, this.source);
	        }
	    }]);

	    return RetryOperator;
	}();

	var RetrySubscriber = function (_Subscriber) {
	    _inherits(RetrySubscriber, _Subscriber);

	    function RetrySubscriber(destination, count, source) {
	        _classCallCheck(this, RetrySubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RetrySubscriber).call(this, destination));

	        _this.count = count;
	        _this.source = source;
	        return _this;
	    }

	    _createClass(RetrySubscriber, [{
	        key: 'error',
	        value: function error(err) {
	            if (!this.isStopped) {
	                var source = this.source;
	                var count = this.count;

	                if (count === 0) {
	                    return _get(Object.getPrototypeOf(RetrySubscriber.prototype), 'error', this).call(this, err);
	                } else if (count > -1) {
	                    this.count = count - 1;
	                }
	                this.unsubscribe();
	                this.isStopped = false;
	                this.isUnsubscribed = false;
	                source.subscribe(this);
	            }
	        }
	    }]);

	    return RetrySubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=retry.js.map

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _retryWhen = __webpack_require__(193);

	_Observable.Observable.prototype.retryWhen = _retryWhen.retryWhen;
	var _void = exports._void = undefined;
	//# sourceMappingURL=retryWhen.js.map

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.retryWhen = retryWhen;

	var _Subject = __webpack_require__(2);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits the same values as the source observable with the exception of an `error`.
	 * An `error` will cause the emission of the Throwable that cause the error to the Observable returned from
	 * notificationHandler. If that Observable calls onComplete or `error` then retry will call `complete` or `error`
	 * on the child subscription. Otherwise, this Observable will resubscribe to the source observable, on a particular
	 * Scheduler.
	 *
	 * <img src="./img/retryWhen.png" width="100%">
	 *
	 * @param {notificationHandler} receives an Observable of notifications with which a user can `complete` or `error`,
	 * aborting the retry.
	 * @param {scheduler} the Scheduler on which to subscribe to the source Observable.
	 * @returns {Observable} the source Observable modified with retry logic.
	 */
	function retryWhen(notifier) {
	    return this.lift(new RetryWhenOperator(notifier, this));
	}

	var RetryWhenOperator = function () {
	    function RetryWhenOperator(notifier, source) {
	        _classCallCheck(this, RetryWhenOperator);

	        this.notifier = notifier;
	        this.source = source;
	    }

	    _createClass(RetryWhenOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new RetryWhenSubscriber(subscriber, this.notifier, this.source);
	        }
	    }]);

	    return RetryWhenOperator;
	}();

	var RetryWhenSubscriber = function (_OuterSubscriber) {
	    _inherits(RetryWhenSubscriber, _OuterSubscriber);

	    function RetryWhenSubscriber(destination, notifier, source) {
	        _classCallCheck(this, RetryWhenSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RetryWhenSubscriber).call(this, destination));

	        _this.notifier = notifier;
	        _this.source = source;
	        return _this;
	    }

	    _createClass(RetryWhenSubscriber, [{
	        key: 'error',
	        value: function error(err) {
	            if (!this.isStopped) {
	                var errors = this.errors;
	                var retries = this.retries;
	                var retriesSubscription = this.retriesSubscription;
	                if (!retries) {
	                    errors = new _Subject.Subject();
	                    retries = (0, _tryCatch.tryCatch)(this.notifier)(errors);
	                    if (retries === _errorObject.errorObject) {
	                        return _get(Object.getPrototypeOf(RetryWhenSubscriber.prototype), 'error', this).call(this, _errorObject.errorObject.e);
	                    }
	                    retriesSubscription = (0, _subscribeToResult.subscribeToResult)(this, retries);
	                } else {
	                    this.errors = null;
	                    this.retriesSubscription = null;
	                }
	                this.unsubscribe();
	                this.isUnsubscribed = false;
	                this.errors = errors;
	                this.retries = retries;
	                this.retriesSubscription = retriesSubscription;
	                errors.next(err);
	            }
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var errors = this.errors;
	            var retriesSubscription = this.retriesSubscription;

	            if (errors) {
	                errors.unsubscribe();
	                this.errors = null;
	            }
	            if (retriesSubscription) {
	                retriesSubscription.unsubscribe();
	                this.retriesSubscription = null;
	            }
	            this.retries = null;
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            var errors = this.errors;
	            var retries = this.retries;
	            var retriesSubscription = this.retriesSubscription;

	            this.errors = null;
	            this.retries = null;
	            this.retriesSubscription = null;
	            this.unsubscribe();
	            this.isStopped = false;
	            this.isUnsubscribed = false;
	            this.errors = errors;
	            this.retries = retries;
	            this.retriesSubscription = retriesSubscription;
	            this.source.subscribe(this);
	        }
	    }]);

	    return RetryWhenSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=retryWhen.js.map

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _sample = __webpack_require__(195);

	_Observable.Observable.prototype.sample = _sample.sample;
	var _void = exports._void = undefined;
	//# sourceMappingURL=sample.js.map

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.sample = sample;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that, when the specified sampler Observable emits an item or completes, it then emits the most
	 * recently emitted item (if any) emitted by the source Observable since the previous emission from the sampler
	 * Observable.
	 *
	 * <img src="./img/sample.png" width="100%">
	 *
	 * @param {Observable} sampler - the Observable to use for sampling the source Observable.
	 * @returns {Observable<T>} an Observable that emits the results of sampling the items emitted by this Observable
	 * whenever the sampler Observable emits an item or completes.
	 */
	function sample(notifier) {
	    return this.lift(new SampleOperator(notifier));
	}

	var SampleOperator = function () {
	    function SampleOperator(notifier) {
	        _classCallCheck(this, SampleOperator);

	        this.notifier = notifier;
	    }

	    _createClass(SampleOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SampleSubscriber(subscriber, this.notifier);
	        }
	    }]);

	    return SampleOperator;
	}();

	var SampleSubscriber = function (_OuterSubscriber) {
	    _inherits(SampleSubscriber, _OuterSubscriber);

	    function SampleSubscriber(destination, notifier) {
	        _classCallCheck(this, SampleSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SampleSubscriber).call(this, destination));

	        _this.hasValue = false;
	        _this.add((0, _subscribeToResult.subscribeToResult)(_this, notifier));
	        return _this;
	    }

	    _createClass(SampleSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.value = value;
	            this.hasValue = true;
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.emitValue();
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            this.emitValue();
	        }
	    }, {
	        key: 'emitValue',
	        value: function emitValue() {
	            if (this.hasValue) {
	                this.hasValue = false;
	                this.destination.next(this.value);
	            }
	        }
	    }]);

	    return SampleSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=sample.js.map

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _sampleTime = __webpack_require__(197);

	_Observable.Observable.prototype.sampleTime = _sampleTime.sampleTime;
	var _void = exports._void = undefined;
	//# sourceMappingURL=sampleTime.js.map

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.sampleTime = sampleTime;

	var _Subscriber2 = __webpack_require__(8);

	var _asap = __webpack_require__(63);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function sampleTime(delay) {
	    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	    return this.lift(new SampleTimeOperator(delay, scheduler));
	}

	var SampleTimeOperator = function () {
	    function SampleTimeOperator(delay, scheduler) {
	        _classCallCheck(this, SampleTimeOperator);

	        this.delay = delay;
	        this.scheduler = scheduler;
	    }

	    _createClass(SampleTimeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SampleTimeSubscriber(subscriber, this.delay, this.scheduler);
	        }
	    }]);

	    return SampleTimeOperator;
	}();

	var SampleTimeSubscriber = function (_Subscriber) {
	    _inherits(SampleTimeSubscriber, _Subscriber);

	    function SampleTimeSubscriber(destination, delay, scheduler) {
	        _classCallCheck(this, SampleTimeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SampleTimeSubscriber).call(this, destination));

	        _this.delay = delay;
	        _this.scheduler = scheduler;
	        _this.hasValue = false;
	        _this.add(scheduler.schedule(dispatchNotification, delay, { subscriber: _this, delay: delay }));
	        return _this;
	    }

	    _createClass(SampleTimeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.lastValue = value;
	            this.hasValue = true;
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext() {
	            if (this.hasValue) {
	                this.hasValue = false;
	                this.destination.next(this.lastValue);
	            }
	        }
	    }]);

	    return SampleTimeSubscriber;
	}(_Subscriber2.Subscriber);

	function dispatchNotification(state) {
	    var subscriber = state.subscriber;
	    var delay = state.delay;

	    subscriber.notifyNext();
	    this.schedule(state, delay);
	}
	//# sourceMappingURL=sampleTime.js.map

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _scan = __webpack_require__(199);

	_Observable.Observable.prototype.scan = _scan.scan;
	var _void = exports._void = undefined;
	//# sourceMappingURL=scan.js.map

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.scan = scan;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that applies a specified accumulator function to each item emitted by the source Observable.
	 * If a seed value is specified, then that value will be used as the initial value for the accumulator.
	 * If no seed value is specified, the first item of the source is used as the seed.
	 * @param {function} accumulator The accumulator function called on each item.
	 *
	 * <img src="./img/scan.png" width="100%">
	 *
	 * @param {any} [seed] The initial accumulator value.
	 * @returns {Obervable} An observable of the accumulated values.
	 */
	function scan(accumulator, seed) {
	    return this.lift(new ScanOperator(accumulator, seed));
	}

	var ScanOperator = function () {
	    function ScanOperator(accumulator, seed) {
	        _classCallCheck(this, ScanOperator);

	        this.accumulator = accumulator;
	        this.seed = seed;
	    }

	    _createClass(ScanOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ScanSubscriber(subscriber, this.accumulator, this.seed);
	        }
	    }]);

	    return ScanOperator;
	}();

	var ScanSubscriber = function (_Subscriber) {
	    _inherits(ScanSubscriber, _Subscriber);

	    function ScanSubscriber(destination, accumulator, seed) {
	        _classCallCheck(this, ScanSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScanSubscriber).call(this, destination));

	        _this.accumulator = accumulator;
	        _this.accumulatorSet = false;
	        _this.seed = seed;
	        _this.accumulator = accumulator;
	        _this.accumulatorSet = typeof seed !== 'undefined';
	        return _this;
	    }

	    _createClass(ScanSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (!this.accumulatorSet) {
	                this.seed = value;
	                this.destination.next(value);
	            } else {
	                return this._tryNext(value);
	            }
	        }
	    }, {
	        key: '_tryNext',
	        value: function _tryNext(value) {
	            var result = void 0;
	            try {
	                result = this.accumulator(this.seed, value);
	            } catch (err) {
	                this.destination.error(err);
	            }
	            this.seed = result;
	            this.destination.next(result);
	        }
	    }, {
	        key: 'seed',
	        get: function get() {
	            return this._seed;
	        },
	        set: function set(value) {
	            this.accumulatorSet = true;
	            this._seed = value;
	        }
	    }]);

	    return ScanSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=scan.js.map

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _share = __webpack_require__(201);

	_Observable.Observable.prototype.share = _share.share;
	var _void = exports._void = undefined;
	//# sourceMappingURL=share.js.map

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.share = share;

	var _multicast = __webpack_require__(99);

	var _Subject = __webpack_require__(2);

	function shareSubjectFactory() {
	    return new _Subject.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @returns {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 */
	function share() {
	    return _multicast.multicast.call(this, shareSubjectFactory).refCount();
	}
	;
	//# sourceMappingURL=share.js.map

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _single = __webpack_require__(203);

	_Observable.Observable.prototype.single = _single.single;
	var _void = exports._void = undefined;
	//# sourceMappingURL=single.js.map

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.single = single;

	var _Subscriber2 = __webpack_require__(8);

	var _EmptyError = __webpack_require__(141);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
	 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
	 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
	 *
	 * <img src="./img/single.png" width="100%">
	 *
	 * @param {Function} a predicate function to evaluate items emitted by the source Observable.
	 * @returns {Observable<T>} an Observable that emits the single item emitted by the source Observable that matches
	 * the predicate.
	 .
	 */
	function single(predicate) {
	    return this.lift(new SingleOperator(predicate, this));
	}

	var SingleOperator = function () {
	    function SingleOperator(predicate, source) {
	        _classCallCheck(this, SingleOperator);

	        this.predicate = predicate;
	        this.source = source;
	    }

	    _createClass(SingleOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SingleSubscriber(subscriber, this.predicate, this.source);
	        }
	    }]);

	    return SingleOperator;
	}();

	var SingleSubscriber = function (_Subscriber) {
	    _inherits(SingleSubscriber, _Subscriber);

	    function SingleSubscriber(destination, predicate, source) {
	        _classCallCheck(this, SingleSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleSubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.source = source;
	        _this.seenValue = false;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(SingleSubscriber, [{
	        key: 'applySingleValue',
	        value: function applySingleValue(value) {
	            if (this.seenValue) {
	                this.destination.error('Sequence contains more than one element');
	            } else {
	                this.seenValue = true;
	                this.singleValue = value;
	            }
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            var predicate = this.predicate;
	            this.index++;
	            if (predicate) {
	                this.tryNext(value);
	            } else {
	                this.applySingleValue(value);
	            }
	        }
	    }, {
	        key: 'tryNext',
	        value: function tryNext(value) {
	            try {
	                var result = this.predicate(value, this.index, this.source);
	                if (result) {
	                    this.applySingleValue(value);
	                }
	            } catch (err) {
	                this.destination.error(err);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var destination = this.destination;
	            if (this.index > 0) {
	                destination.next(this.seenValue ? this.singleValue : undefined);
	                destination.complete();
	            } else {
	                destination.error(new _EmptyError.EmptyError());
	            }
	        }
	    }]);

	    return SingleSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=single.js.map

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _skip = __webpack_require__(205);

	_Observable.Observable.prototype.skip = _skip.skip;
	var _void = exports._void = undefined;
	//# sourceMappingURL=skip.js.map

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.skip = skip;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that skips `n` items emitted by an Observable.
	 *
	 * <img src="./img/skip.png" width="100%">
	 *
	 * @param {Number} the `n` of times, items emitted by source Observable should be skipped.
	 * @returns {Observable} an Observable that skips values emitted by the source Observable.
	 *
	 */
	function skip(total) {
	    return this.lift(new SkipOperator(total));
	}

	var SkipOperator = function () {
	    function SkipOperator(total) {
	        _classCallCheck(this, SkipOperator);

	        this.total = total;
	    }

	    _createClass(SkipOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SkipSubscriber(subscriber, this.total);
	        }
	    }]);

	    return SkipOperator;
	}();

	var SkipSubscriber = function (_Subscriber) {
	    _inherits(SkipSubscriber, _Subscriber);

	    function SkipSubscriber(destination, total) {
	        _classCallCheck(this, SkipSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SkipSubscriber).call(this, destination));

	        _this.total = total;
	        _this.count = 0;
	        return _this;
	    }

	    _createClass(SkipSubscriber, [{
	        key: '_next',
	        value: function _next(x) {
	            if (++this.count > this.total) {
	                this.destination.next(x);
	            }
	        }
	    }]);

	    return SkipSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=skip.js.map

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _skipUntil = __webpack_require__(207);

	_Observable.Observable.prototype.skipUntil = _skipUntil.skipUntil;
	var _void = exports._void = undefined;
	//# sourceMappingURL=skipUntil.js.map

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.skipUntil = skipUntil;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
	*
	* <img src="./img/skipUntil.png" width="100%">
	*
	* @param {Observable} the second Observable that has to emit an item before the source Observable's elements begin to
	* be mirrored by the resulting Observable.
	* @returns {Observable<T>} an Observable that skips items from the source Observable until the second Observable emits
	* an item, then emits the remaining items.
	*/
	function skipUntil(notifier) {
	    return this.lift(new SkipUntilOperator(notifier));
	}

	var SkipUntilOperator = function () {
	    function SkipUntilOperator(notifier) {
	        _classCallCheck(this, SkipUntilOperator);

	        this.notifier = notifier;
	    }

	    _createClass(SkipUntilOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SkipUntilSubscriber(subscriber, this.notifier);
	        }
	    }]);

	    return SkipUntilOperator;
	}();

	var SkipUntilSubscriber = function (_OuterSubscriber) {
	    _inherits(SkipUntilSubscriber, _OuterSubscriber);

	    function SkipUntilSubscriber(destination, notifier) {
	        _classCallCheck(this, SkipUntilSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SkipUntilSubscriber).call(this, destination));

	        _this.hasValue = false;
	        _this.isInnerStopped = false;
	        _this.add((0, _subscribeToResult.subscribeToResult)(_this, notifier));
	        return _this;
	    }

	    _createClass(SkipUntilSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (this.hasValue) {
	                _get(Object.getPrototypeOf(SkipUntilSubscriber.prototype), '_next', this).call(this, value);
	            }
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            if (this.isInnerStopped) {
	                _get(Object.getPrototypeOf(SkipUntilSubscriber.prototype), '_complete', this).call(this);
	            } else {
	                this.unsubscribe();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.hasValue = true;
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            this.isInnerStopped = true;
	            if (this.isStopped) {
	                _get(Object.getPrototypeOf(SkipUntilSubscriber.prototype), '_complete', this).call(this);
	            }
	        }
	    }]);

	    return SkipUntilSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=skipUntil.js.map

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _skipWhile = __webpack_require__(209);

	_Observable.Observable.prototype.skipWhile = _skipWhile.skipWhile;
	var _void = exports._void = undefined;
	//# sourceMappingURL=skipWhile.js.map

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.skipWhile = skipWhile;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
	 * true, but emits all further source items as soon as the condition becomes false.
	 *
	 * <img src="./img/skipWhile.png" width="100%">
	 *
	 * @param {Function} predicate - a function to test each item emitted from the source Observable.
	 * @returns {Observable<T>} an Observable that begins emitting items emitted by the source Observable when the
	 * specified predicate becomes false.
	 */
	function skipWhile(predicate) {
	    return this.lift(new SkipWhileOperator(predicate));
	}

	var SkipWhileOperator = function () {
	    function SkipWhileOperator(predicate) {
	        _classCallCheck(this, SkipWhileOperator);

	        this.predicate = predicate;
	    }

	    _createClass(SkipWhileOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SkipWhileSubscriber(subscriber, this.predicate);
	        }
	    }]);

	    return SkipWhileOperator;
	}();

	var SkipWhileSubscriber = function (_Subscriber) {
	    _inherits(SkipWhileSubscriber, _Subscriber);

	    function SkipWhileSubscriber(destination, predicate) {
	        _classCallCheck(this, SkipWhileSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SkipWhileSubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.skipping = true;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(SkipWhileSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var destination = this.destination;
	            if (this.skipping) {
	                this.tryCallPredicate(value);
	            }
	            if (!this.skipping) {
	                destination.next(value);
	            }
	        }
	    }, {
	        key: 'tryCallPredicate',
	        value: function tryCallPredicate(value) {
	            try {
	                var result = this.predicate(value, this.index++);
	                this.skipping = Boolean(result);
	            } catch (err) {
	                this.destination.error(err);
	            }
	        }
	    }]);

	    return SkipWhileSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=skipWhile.js.map

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _startWith = __webpack_require__(211);

	_Observable.Observable.prototype.startWith = _startWith.startWith;
	var _void = exports._void = undefined;
	//# sourceMappingURL=startWith.js.map

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.startWith = startWith;

	var _ArrayObservable = __webpack_require__(22);

	var _ScalarObservable = __webpack_require__(23);

	var _EmptyObservable = __webpack_require__(24);

	var _concat = __webpack_require__(31);

	var _isScheduler = __webpack_require__(25);

	/**
	 * Returns an Observable that emits the items in a specified Iterable before it begins to emit items emitted by the
	 * source Observable.
	 *
	 * <img src="./img/startWith.png" width="100%">
	 *
	 * @param {Values} an Iterable that contains the items you want the modified Observable to emit first.
	 * @returns {Observable} an Observable that emits the items in the specified Iterable and then emits the items
	 * emitted by the source Observable.
	 */
	function startWith() {
	    for (var _len = arguments.length, array = Array(_len), _key = 0; _key < _len; _key++) {
	        array[_key] = arguments[_key];
	    }

	    var scheduler = array[array.length - 1];
	    if ((0, _isScheduler.isScheduler)(scheduler)) {
	        array.pop();
	    } else {
	        scheduler = null;
	    }
	    var len = array.length;
	    if (len === 1) {
	        return (0, _concat.concatStatic)(new _ScalarObservable.ScalarObservable(array[0], scheduler), this);
	    } else if (len > 1) {
	        return (0, _concat.concatStatic)(new _ArrayObservable.ArrayObservable(array, scheduler), this);
	    } else {
	        return (0, _concat.concatStatic)(new _EmptyObservable.EmptyObservable(scheduler), this);
	    }
	}
	//# sourceMappingURL=startWith.js.map

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _subscribeOn = __webpack_require__(213);

	_Observable.Observable.prototype.subscribeOn = _subscribeOn.subscribeOn;
	var _void = exports._void = undefined;
	//# sourceMappingURL=subscribeOn.js.map

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.subscribeOn = subscribeOn;

	var _SubscribeOnObservable = __webpack_require__(214);

	/**
	 * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
	 *
	 * <img src="./img/subscribeOn.png" width="100%">
	 *
	 * @param {Scheduler} the Scheduler to perform subscription actions on.
	 * @returns {Observable<T>} the source Observable modified so that its subscriptions happen on the specified Scheduler
	 .
	 */
	function subscribeOn(scheduler) {
	  var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	  return new _SubscribeOnObservable.SubscribeOnObservable(this, delay, scheduler);
	}
	//# sourceMappingURL=subscribeOn.js.map

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SubscribeOnObservable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Observable2 = __webpack_require__(3);

	var _asap = __webpack_require__(63);

	var _isNumeric = __webpack_require__(62);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SubscribeOnObservable = exports.SubscribeOnObservable = function (_Observable) {
	    _inherits(SubscribeOnObservable, _Observable);

	    function SubscribeOnObservable(source) {
	        var delayTime = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	        var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _asap.asap : arguments[2];

	        _classCallCheck(this, SubscribeOnObservable);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SubscribeOnObservable).call(this));

	        _this.source = source;
	        _this.delayTime = delayTime;
	        _this.scheduler = scheduler;
	        if (!(0, _isNumeric.isNumeric)(delayTime) || delayTime < 0) {
	            _this.delayTime = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            _this.scheduler = _asap.asap;
	        }
	        return _this;
	    }

	    _createClass(SubscribeOnObservable, [{
	        key: '_subscribe',
	        value: function _subscribe(subscriber) {
	            var delay = this.delayTime;
	            var source = this.source;
	            var scheduler = this.scheduler;
	            return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
	                source: source, subscriber: subscriber
	            });
	        }
	    }], [{
	        key: 'create',
	        value: function create(source) {
	            var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _asap.asap : arguments[2];

	            return new SubscribeOnObservable(source, delay, scheduler);
	        }
	    }, {
	        key: 'dispatch',
	        value: function dispatch(_ref) {
	            var source = _ref.source;
	            var subscriber = _ref.subscriber;

	            return source.subscribe(subscriber);
	        }
	    }]);

	    return SubscribeOnObservable;
	}(_Observable2.Observable);
	//# sourceMappingURL=SubscribeOnObservable.js.map

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _switch2 = __webpack_require__(216);

	_Observable.Observable.prototype.switch = _switch2._switch;
	var _void = exports._void = undefined;
	//# sourceMappingURL=switch.js.map

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports._switch = _switch;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Converts an Observable that emits Observables into an Observable that emits the items emitted by the most recently
	 * emitted of those Observables.
	 *
	 * <img src="./img/switch.png" width="100%">
	 *
	 * Switch subscribes to an Observable that emits Observables. Each time it observes one of these emitted Observables,
	 * the Observable returned by switchOnNext begins emitting the items emitted by that Observable. When a new Observable
	 * is emitted, switchOnNext stops emitting items from the earlier-emitted Observable and begins emitting items from the
	 * new one.
	 *
	 * @param {Function} a predicate function to evaluate items emitted by the source Observable.
	 * @returns {Observable<T>} an Observable that emits the items emitted by the Observable most recently emitted by the
	 * source Observable.
	 */
	function _switch() {
	    return this.lift(new SwitchOperator());
	}

	var SwitchOperator = function () {
	    function SwitchOperator() {
	        _classCallCheck(this, SwitchOperator);
	    }

	    _createClass(SwitchOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SwitchSubscriber(subscriber);
	        }
	    }]);

	    return SwitchOperator;
	}();

	var SwitchSubscriber = function (_OuterSubscriber) {
	    _inherits(SwitchSubscriber, _OuterSubscriber);

	    function SwitchSubscriber(destination) {
	        _classCallCheck(this, SwitchSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwitchSubscriber).call(this, destination));

	        _this.active = 0;
	        _this.hasCompleted = false;
	        return _this;
	    }

	    _createClass(SwitchSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            this.unsubscribeInner();
	            this.active++;
	            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, value));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.hasCompleted = true;
	            if (this.active === 0) {
	                this.destination.complete();
	            }
	        }
	    }, {
	        key: 'unsubscribeInner',
	        value: function unsubscribeInner() {
	            this.active = this.active > 0 ? this.active - 1 : 0;
	            var innerSubscription = this.innerSubscription;
	            if (innerSubscription) {
	                innerSubscription.unsubscribe();
	                this.remove(innerSubscription);
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.destination.next(innerValue);
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(err) {
	            this.destination.error(err);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            this.unsubscribeInner();
	            if (this.hasCompleted && this.active === 0) {
	                this.destination.complete();
	            }
	        }
	    }]);

	    return SwitchSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=switch.js.map

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _switchMap = __webpack_require__(218);

	_Observable.Observable.prototype.switchMap = _switchMap.switchMap;
	var _void = exports._void = undefined;
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.switchMap = switchMap;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Returns a new Observable by applying a function that you supply to each item emitted by the source Observable that
	 * returns an Observable, and then emitting the items emitted by the most recently emitted of these Observables.
	 *
	 * <img src="./img/switchMap.png" width="100%">
	 *
	 * @param {Observable} a function that, when applied to an item emitted by the source Observable, returns an Observable.
	 * @returns {Observable} an Observable that emits the items emitted by the Observable returned from applying func to
	 * the most recently emitted item emitted by the source Observable.
	 */
	function switchMap(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}

	var SwitchMapOperator = function () {
	    function SwitchMapOperator(project, resultSelector) {
	        _classCallCheck(this, SwitchMapOperator);

	        this.project = project;
	        this.resultSelector = resultSelector;
	    }

	    _createClass(SwitchMapOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SwitchMapSubscriber(subscriber, this.project, this.resultSelector);
	        }
	    }]);

	    return SwitchMapOperator;
	}();

	var SwitchMapSubscriber = function (_OuterSubscriber) {
	    _inherits(SwitchMapSubscriber, _OuterSubscriber);

	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _classCallCheck(this, SwitchMapSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwitchMapSubscriber).call(this, destination));

	        _this.project = project;
	        _this.resultSelector = resultSelector;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(SwitchMapSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var result = void 0;
	            var index = this.index++;
	            try {
	                result = this.project(value, index);
	            } catch (error) {
	                this.destination.error(error);
	                return;
	            }
	            this._innerSub(result, value, index);
	        }
	    }, {
	        key: '_innerSub',
	        value: function _innerSub(result, value, index) {
	            var innerSubscription = this.innerSubscription;
	            if (innerSubscription) {
	                innerSubscription.unsubscribe();
	            }
	            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, result, value, index));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var innerSubscription = this.innerSubscription;

	            if (!innerSubscription || innerSubscription.isUnsubscribed) {
	                _get(Object.getPrototypeOf(SwitchMapSubscriber.prototype), '_complete', this).call(this);
	            }
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            this.innerSubscription = null;
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            this.remove(innerSub);
	            this.innerSubscription = null;
	            if (this.isStopped) {
	                _get(Object.getPrototypeOf(SwitchMapSubscriber.prototype), '_complete', this).call(this);
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            if (this.resultSelector) {
	                this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
	            } else {
	                this.destination.next(innerValue);
	            }
	        }
	    }, {
	        key: '_tryNotifyNext',
	        value: function _tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex) {
	            var result = void 0;
	            try {
	                result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(result);
	        }
	    }]);

	    return SwitchMapSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=switchMap.js.map

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _switchMapTo = __webpack_require__(220);

	_Observable.Observable.prototype.switchMapTo = _switchMapTo.switchMapTo;
	var _void = exports._void = undefined;
	//# sourceMappingURL=switchMapTo.js.map

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.switchMapTo = switchMapTo;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function switchMapTo(observable, resultSelector) {
	    return this.lift(new SwitchMapToOperator(observable, resultSelector));
	}

	var SwitchMapToOperator = function () {
	    function SwitchMapToOperator(observable, resultSelector) {
	        _classCallCheck(this, SwitchMapToOperator);

	        this.observable = observable;
	        this.resultSelector = resultSelector;
	    }

	    _createClass(SwitchMapToOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector);
	        }
	    }]);

	    return SwitchMapToOperator;
	}();

	var SwitchMapToSubscriber = function (_OuterSubscriber) {
	    _inherits(SwitchMapToSubscriber, _OuterSubscriber);

	    function SwitchMapToSubscriber(destination, inner, resultSelector) {
	        _classCallCheck(this, SwitchMapToSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwitchMapToSubscriber).call(this, destination));

	        _this.inner = inner;
	        _this.resultSelector = resultSelector;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(SwitchMapToSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var innerSubscription = this.innerSubscription;
	            if (innerSubscription) {
	                innerSubscription.unsubscribe();
	            }
	            this.add(this.innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, this.inner, value, this.index++));
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var innerSubscription = this.innerSubscription;

	            if (!innerSubscription || innerSubscription.isUnsubscribed) {
	                _get(Object.getPrototypeOf(SwitchMapToSubscriber.prototype), '_complete', this).call(this);
	            }
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            this.innerSubscription = null;
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            this.remove(innerSub);
	            this.innerSubscription = null;
	            if (this.isStopped) {
	                _get(Object.getPrototypeOf(SwitchMapToSubscriber.prototype), '_complete', this).call(this);
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            var resultSelector = this.resultSelector;
	            var destination = this.destination;

	            if (resultSelector) {
	                this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            } else {
	                destination.next(innerValue);
	            }
	        }
	    }, {
	        key: 'tryResultSelector',
	        value: function tryResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
	            var resultSelector = this.resultSelector;
	            var destination = this.destination;

	            var result = void 0;
	            try {
	                result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            } catch (err) {
	                destination.error(err);
	                return;
	            }
	            destination.next(result);
	        }
	    }]);

	    return SwitchMapToSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=switchMapTo.js.map

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _take = __webpack_require__(222);

	_Observable.Observable.prototype.take = _take.take;
	var _void = exports._void = undefined;
	//# sourceMappingURL=take.js.map

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.take = take;

	var _Subscriber2 = __webpack_require__(8);

	var _ArgumentOutOfRangeError = __webpack_require__(223);

	var _EmptyObservable = __webpack_require__(24);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function take(total) {
	    if (total === 0) {
	        return new _EmptyObservable.EmptyObservable();
	    } else {
	        return this.lift(new TakeOperator(total));
	    }
	}

	var TakeOperator = function () {
	    function TakeOperator(total) {
	        _classCallCheck(this, TakeOperator);

	        this.total = total;
	        if (this.total < 0) {
	            throw new _ArgumentOutOfRangeError.ArgumentOutOfRangeError();
	        }
	    }

	    _createClass(TakeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new TakeSubscriber(subscriber, this.total);
	        }
	    }]);

	    return TakeOperator;
	}();

	var TakeSubscriber = function (_Subscriber) {
	    _inherits(TakeSubscriber, _Subscriber);

	    function TakeSubscriber(destination, total) {
	        _classCallCheck(this, TakeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TakeSubscriber).call(this, destination));

	        _this.total = total;
	        _this.count = 0;
	        return _this;
	    }

	    _createClass(TakeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var total = this.total;
	            if (++this.count <= total) {
	                this.destination.next(value);
	                if (this.count === total) {
	                    this.destination.complete();
	                }
	            }
	        }
	    }]);

	    return TakeSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=take.js.map

/***/ },
/* 223 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ArgumentOutOfRangeError = exports.ArgumentOutOfRangeError = function (_Error) {
	    _inherits(ArgumentOutOfRangeError, _Error);

	    function ArgumentOutOfRangeError() {
	        _classCallCheck(this, ArgumentOutOfRangeError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArgumentOutOfRangeError).call(this, 'argument out of range'));

	        _this.name = 'ArgumentOutOfRangeError';
	        return _this;
	    }

	    return ArgumentOutOfRangeError;
	}(Error);
	//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _takeLast = __webpack_require__(225);

	_Observable.Observable.prototype.takeLast = _takeLast.takeLast;
	var _void = exports._void = undefined;
	//# sourceMappingURL=takeLast.js.map

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.takeLast = takeLast;

	var _Subscriber2 = __webpack_require__(8);

	var _ArgumentOutOfRangeError = __webpack_require__(223);

	var _EmptyObservable = __webpack_require__(24);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function takeLast(total) {
	    if (total === 0) {
	        return new _EmptyObservable.EmptyObservable();
	    } else {
	        return this.lift(new TakeLastOperator(total));
	    }
	}

	var TakeLastOperator = function () {
	    function TakeLastOperator(total) {
	        _classCallCheck(this, TakeLastOperator);

	        this.total = total;
	        if (this.total < 0) {
	            throw new _ArgumentOutOfRangeError.ArgumentOutOfRangeError();
	        }
	    }

	    _createClass(TakeLastOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new TakeLastSubscriber(subscriber, this.total);
	        }
	    }]);

	    return TakeLastOperator;
	}();

	var TakeLastSubscriber = function (_Subscriber) {
	    _inherits(TakeLastSubscriber, _Subscriber);

	    function TakeLastSubscriber(destination, total) {
	        _classCallCheck(this, TakeLastSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TakeLastSubscriber).call(this, destination));

	        _this.total = total;
	        _this.count = 0;
	        _this.index = 0;
	        _this.ring = new Array(total);
	        return _this;
	    }

	    _createClass(TakeLastSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var index = this.index;
	            var ring = this.ring;
	            var total = this.total;
	            var count = this.count;
	            if (total > 1) {
	                if (count < total) {
	                    this.count = count + 1;
	                    this.index = index + 1;
	                } else if (index === 0) {
	                    this.index = ++index;
	                } else if (index < total) {
	                    this.index = index + 1;
	                } else {
	                    this.index = index = 0;
	                }
	            } else if (count < total) {
	                this.count = total;
	            }
	            ring[index] = value;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var iter = -1;
	            var ring = this.ring;
	            var count = this.count;
	            var total = this.total;
	            var destination = this.destination;

	            var index = total === 1 || count < total ? 0 : this.index - 1;
	            while (++iter < count) {
	                if (iter + index === total) {
	                    index = total - iter;
	                }
	                destination.next(ring[iter + index]);
	            }
	            destination.complete();
	        }
	    }]);

	    return TakeLastSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=takeLast.js.map

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _takeUntil = __webpack_require__(227);

	_Observable.Observable.prototype.takeUntil = _takeUntil.takeUntil;
	var _void = exports._void = undefined;
	//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.takeUntil = takeUntil;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function takeUntil(notifier) {
	    return this.lift(new TakeUntilOperator(notifier));
	}

	var TakeUntilOperator = function () {
	    function TakeUntilOperator(notifier) {
	        _classCallCheck(this, TakeUntilOperator);

	        this.notifier = notifier;
	    }

	    _createClass(TakeUntilOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new TakeUntilSubscriber(subscriber, this.notifier);
	        }
	    }]);

	    return TakeUntilOperator;
	}();

	var TakeUntilSubscriber = function (_OuterSubscriber) {
	    _inherits(TakeUntilSubscriber, _OuterSubscriber);

	    function TakeUntilSubscriber(destination, notifier) {
	        _classCallCheck(this, TakeUntilSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TakeUntilSubscriber).call(this, destination));

	        _this.notifier = notifier;
	        _this.add((0, _subscribeToResult.subscribeToResult)(_this, notifier));
	        return _this;
	    }

	    _createClass(TakeUntilSubscriber, [{
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.complete();
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            // noop
	        }
	    }]);

	    return TakeUntilSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=takeUntil.js.map

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _takeWhile = __webpack_require__(229);

	_Observable.Observable.prototype.takeWhile = _takeWhile.takeWhile;
	var _void = exports._void = undefined;
	//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.takeWhile = takeWhile;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function takeWhile(predicate) {
	    return this.lift(new TakeWhileOperator(predicate));
	}

	var TakeWhileOperator = function () {
	    function TakeWhileOperator(predicate) {
	        _classCallCheck(this, TakeWhileOperator);

	        this.predicate = predicate;
	    }

	    _createClass(TakeWhileOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new TakeWhileSubscriber(subscriber, this.predicate);
	        }
	    }]);

	    return TakeWhileOperator;
	}();

	var TakeWhileSubscriber = function (_Subscriber) {
	    _inherits(TakeWhileSubscriber, _Subscriber);

	    function TakeWhileSubscriber(destination, predicate) {
	        _classCallCheck(this, TakeWhileSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TakeWhileSubscriber).call(this, destination));

	        _this.predicate = predicate;
	        _this.index = 0;
	        return _this;
	    }

	    _createClass(TakeWhileSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var destination = this.destination;
	            var result = void 0;
	            try {
	                result = this.predicate(value, this.index++);
	            } catch (err) {
	                destination.error(err);
	                return;
	            }
	            this.nextOrComplete(value, result);
	        }
	    }, {
	        key: 'nextOrComplete',
	        value: function nextOrComplete(value, predicateResult) {
	            var destination = this.destination;
	            if (Boolean(predicateResult)) {
	                destination.next(value);
	            } else {
	                destination.complete();
	            }
	        }
	    }]);

	    return TakeWhileSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _throttle = __webpack_require__(231);

	_Observable.Observable.prototype.throttle = _throttle.throttle;
	var _void = exports._void = undefined;
	//# sourceMappingURL=throttle.js.map

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.throttle = throttle;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function throttle(durationSelector) {
	    return this.lift(new ThrottleOperator(durationSelector));
	}

	var ThrottleOperator = function () {
	    function ThrottleOperator(durationSelector) {
	        _classCallCheck(this, ThrottleOperator);

	        this.durationSelector = durationSelector;
	    }

	    _createClass(ThrottleOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ThrottleSubscriber(subscriber, this.durationSelector);
	        }
	    }]);

	    return ThrottleOperator;
	}();

	var ThrottleSubscriber = function (_OuterSubscriber) {
	    _inherits(ThrottleSubscriber, _OuterSubscriber);

	    function ThrottleSubscriber(destination, durationSelector) {
	        _classCallCheck(this, ThrottleSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ThrottleSubscriber).call(this, destination));

	        _this.destination = destination;
	        _this.durationSelector = durationSelector;
	        return _this;
	    }

	    _createClass(ThrottleSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (!this.throttled) {
	                this.tryDurationSelector(value);
	            }
	        }
	    }, {
	        key: 'tryDurationSelector',
	        value: function tryDurationSelector(value) {
	            var duration = null;
	            try {
	                duration = this.durationSelector(value);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.emitAndThrottle(value, duration);
	        }
	    }, {
	        key: 'emitAndThrottle',
	        value: function emitAndThrottle(value, duration) {
	            this.add(this.throttled = (0, _subscribeToResult.subscribeToResult)(this, duration));
	            this.destination.next(value);
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var throttled = this.throttled;
	            if (throttled) {
	                this.remove(throttled);
	                this.throttled = null;
	                throttled.unsubscribe();
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this._unsubscribe();
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            this._unsubscribe();
	        }
	    }]);

	    return ThrottleSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=throttle.js.map

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _throttleTime = __webpack_require__(233);

	_Observable.Observable.prototype.throttleTime = _throttleTime.throttleTime;
	var _void = exports._void = undefined;
	//# sourceMappingURL=throttleTime.js.map

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.throttleTime = throttleTime;

	var _Subscriber2 = __webpack_require__(8);

	var _asap = __webpack_require__(63);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function throttleTime(delay) {
	    var scheduler = arguments.length <= 1 || arguments[1] === undefined ? _asap.asap : arguments[1];

	    return this.lift(new ThrottleTimeOperator(delay, scheduler));
	}

	var ThrottleTimeOperator = function () {
	    function ThrottleTimeOperator(delay, scheduler) {
	        _classCallCheck(this, ThrottleTimeOperator);

	        this.delay = delay;
	        this.scheduler = scheduler;
	    }

	    _createClass(ThrottleTimeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ThrottleTimeSubscriber(subscriber, this.delay, this.scheduler);
	        }
	    }]);

	    return ThrottleTimeOperator;
	}();

	var ThrottleTimeSubscriber = function (_Subscriber) {
	    _inherits(ThrottleTimeSubscriber, _Subscriber);

	    function ThrottleTimeSubscriber(destination, delay, scheduler) {
	        _classCallCheck(this, ThrottleTimeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ThrottleTimeSubscriber).call(this, destination));

	        _this.delay = delay;
	        _this.scheduler = scheduler;
	        return _this;
	    }

	    _createClass(ThrottleTimeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            if (!this.throttled) {
	                this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.delay, { subscriber: this }));
	                this.destination.next(value);
	            }
	        }
	    }, {
	        key: 'clearThrottle',
	        value: function clearThrottle() {
	            var throttled = this.throttled;
	            if (throttled) {
	                throttled.unsubscribe();
	                this.remove(throttled);
	                this.throttled = null;
	            }
	        }
	    }]);

	    return ThrottleTimeSubscriber;
	}(_Subscriber2.Subscriber);

	function dispatchNext(_ref) {
	    var subscriber = _ref.subscriber;

	    subscriber.clearThrottle();
	}
	//# sourceMappingURL=throttleTime.js.map

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _timeout = __webpack_require__(235);

	_Observable.Observable.prototype.timeout = _timeout.timeout;
	var _void = exports._void = undefined;
	//# sourceMappingURL=timeout.js.map

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.timeout = timeout;

	var _asap = __webpack_require__(63);

	var _isDate = __webpack_require__(81);

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function timeout(due) {
	    var errorToSend = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _asap.asap : arguments[2];

	    var absoluteTimeout = (0, _isDate.isDate)(due);
	    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
	    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler));
	}

	var TimeoutOperator = function () {
	    function TimeoutOperator(waitFor, absoluteTimeout, errorToSend, scheduler) {
	        _classCallCheck(this, TimeoutOperator);

	        this.waitFor = waitFor;
	        this.absoluteTimeout = absoluteTimeout;
	        this.errorToSend = errorToSend;
	        this.scheduler = scheduler;
	    }

	    _createClass(TimeoutOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.errorToSend, this.scheduler);
	        }
	    }]);

	    return TimeoutOperator;
	}();

	var TimeoutSubscriber = function (_Subscriber) {
	    _inherits(TimeoutSubscriber, _Subscriber);

	    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, errorToSend, scheduler) {
	        _classCallCheck(this, TimeoutSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeoutSubscriber).call(this, destination));

	        _this.absoluteTimeout = absoluteTimeout;
	        _this.waitFor = waitFor;
	        _this.errorToSend = errorToSend;
	        _this.scheduler = scheduler;
	        _this.index = 0;
	        _this._previousIndex = 0;
	        _this._hasCompleted = false;
	        _this.scheduleTimeout();
	        return _this;
	    }

	    _createClass(TimeoutSubscriber, [{
	        key: 'scheduleTimeout',
	        value: function scheduleTimeout() {
	            var currentIndex = this.index;
	            this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, { subscriber: this, index: currentIndex });
	            this.index++;
	            this._previousIndex = currentIndex;
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.destination.next(value);
	            if (!this.absoluteTimeout) {
	                this.scheduleTimeout();
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.destination.error(err);
	            this._hasCompleted = true;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.destination.complete();
	            this._hasCompleted = true;
	        }
	    }, {
	        key: 'notifyTimeout',
	        value: function notifyTimeout() {
	            this.error(this.errorToSend || new Error('timeout'));
	        }
	    }, {
	        key: 'previousIndex',
	        get: function get() {
	            return this._previousIndex;
	        }
	    }, {
	        key: 'hasCompleted',
	        get: function get() {
	            return this._hasCompleted;
	        }
	    }], [{
	        key: 'dispatchTimeout',
	        value: function dispatchTimeout(state) {
	            var source = state.subscriber;
	            var currentIndex = state.index;
	            if (!source.hasCompleted && source.previousIndex === currentIndex) {
	                source.notifyTimeout();
	            }
	        }
	    }]);

	    return TimeoutSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=timeout.js.map

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _timeoutWith = __webpack_require__(237);

	_Observable.Observable.prototype.timeoutWith = _timeoutWith.timeoutWith;
	var _void = exports._void = undefined;
	//# sourceMappingURL=timeoutWith.js.map

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.timeoutWith = timeoutWith;

	var _asap = __webpack_require__(63);

	var _isDate = __webpack_require__(81);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function timeoutWith(due, withObservable) {
	    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _asap.asap : arguments[2];

	    var absoluteTimeout = (0, _isDate.isDate)(due);
	    var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
	    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
	}

	var TimeoutWithOperator = function () {
	    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
	        _classCallCheck(this, TimeoutWithOperator);

	        this.waitFor = waitFor;
	        this.absoluteTimeout = absoluteTimeout;
	        this.withObservable = withObservable;
	        this.scheduler = scheduler;
	    }

	    _createClass(TimeoutWithOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler);
	        }
	    }]);

	    return TimeoutWithOperator;
	}();

	var TimeoutWithSubscriber = function (_OuterSubscriber) {
	    _inherits(TimeoutWithSubscriber, _OuterSubscriber);

	    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
	        _classCallCheck(this, TimeoutWithSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimeoutWithSubscriber).call(this));

	        _this.destination = destination;
	        _this.absoluteTimeout = absoluteTimeout;
	        _this.waitFor = waitFor;
	        _this.withObservable = withObservable;
	        _this.scheduler = scheduler;
	        _this.timeoutSubscription = undefined;
	        _this.index = 0;
	        _this._previousIndex = 0;
	        _this._hasCompleted = false;
	        destination.add(_this);
	        _this.scheduleTimeout();
	        return _this;
	    }

	    _createClass(TimeoutWithSubscriber, [{
	        key: 'scheduleTimeout',
	        value: function scheduleTimeout() {
	            var currentIndex = this.index;
	            var timeoutState = { subscriber: this, index: currentIndex };
	            this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, timeoutState);
	            this.index++;
	            this._previousIndex = currentIndex;
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.destination.next(value);
	            if (!this.absoluteTimeout) {
	                this.scheduleTimeout();
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.destination.error(err);
	            this._hasCompleted = true;
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.destination.complete();
	            this._hasCompleted = true;
	        }
	    }, {
	        key: 'handleTimeout',
	        value: function handleTimeout() {
	            if (!this.isUnsubscribed) {
	                var withObservable = this.withObservable;
	                this.unsubscribe();
	                this.destination.add(this.timeoutSubscription = (0, _subscribeToResult.subscribeToResult)(this, withObservable));
	            }
	        }
	    }, {
	        key: 'previousIndex',
	        get: function get() {
	            return this._previousIndex;
	        }
	    }, {
	        key: 'hasCompleted',
	        get: function get() {
	            return this._hasCompleted;
	        }
	    }], [{
	        key: 'dispatchTimeout',
	        value: function dispatchTimeout(state) {
	            var source = state.subscriber;
	            var currentIndex = state.index;
	            if (!source.hasCompleted && source.previousIndex === currentIndex) {
	                source.handleTimeout();
	            }
	        }
	    }]);

	    return TimeoutWithSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=timeoutWith.js.map

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _toArray = __webpack_require__(239);

	_Observable.Observable.prototype.toArray = _toArray.toArray;
	var _void = exports._void = undefined;
	//# sourceMappingURL=toArray.js.map

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.toArray = toArray;

	var _Subscriber2 = __webpack_require__(8);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function toArray() {
	    return this.lift(new ToArrayOperator());
	}

	var ToArrayOperator = function () {
	    function ToArrayOperator() {
	        _classCallCheck(this, ToArrayOperator);
	    }

	    _createClass(ToArrayOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new ToArraySubscriber(subscriber);
	        }
	    }]);

	    return ToArrayOperator;
	}();

	var ToArraySubscriber = function (_Subscriber) {
	    _inherits(ToArraySubscriber, _Subscriber);

	    function ToArraySubscriber(destination) {
	        _classCallCheck(this, ToArraySubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToArraySubscriber).call(this, destination));

	        _this.array = [];
	        return _this;
	    }

	    _createClass(ToArraySubscriber, [{
	        key: '_next',
	        value: function _next(x) {
	            this.array.push(x);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.destination.next(this.array);
	            this.destination.complete();
	        }
	    }]);

	    return ToArraySubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=toArray.js.map

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _toPromise = __webpack_require__(241);

	_Observable.Observable.prototype.toPromise = _toPromise.toPromise;
	var _void = exports._void = undefined;
	//# sourceMappingURL=toPromise.js.map

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.toPromise = toPromise;

	var _root = __webpack_require__(4);

	function toPromise(PromiseCtor) {
	    var _this = this;

	    if (!PromiseCtor) {
	        if (_root.root.Rx && _root.root.Rx.config && _root.root.Rx.config.Promise) {
	            PromiseCtor = _root.root.Rx.config.Promise;
	        } else if (_root.root.Promise) {
	            PromiseCtor = _root.root.Promise;
	        }
	    }
	    if (!PromiseCtor) {
	        throw new Error('no Promise impl found');
	    }
	    return new PromiseCtor(function (resolve, reject) {
	        var value = void 0;
	        _this.subscribe(function (x) {
	            return value = x;
	        }, function (err) {
	            return reject(err);
	        }, function () {
	            return resolve(value);
	        });
	    });
	}
	//# sourceMappingURL=toPromise.js.map

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _window = __webpack_require__(243);

	_Observable.Observable.prototype.window = _window.window;
	var _void = exports._void = undefined;
	//# sourceMappingURL=window.js.map

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.window = window;

	var _Subject = __webpack_require__(2);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function window(closingNotifier) {
	    return this.lift(new WindowOperator(closingNotifier));
	}

	var WindowOperator = function () {
	    function WindowOperator(closingNotifier) {
	        _classCallCheck(this, WindowOperator);

	        this.closingNotifier = closingNotifier;
	    }

	    _createClass(WindowOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new WindowSubscriber(subscriber, this.closingNotifier);
	        }
	    }]);

	    return WindowOperator;
	}();

	var WindowSubscriber = function (_OuterSubscriber) {
	    _inherits(WindowSubscriber, _OuterSubscriber);

	    function WindowSubscriber(destination, closingNotifier) {
	        _classCallCheck(this, WindowSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowSubscriber).call(this, destination));

	        _this.destination = destination;
	        _this.closingNotifier = closingNotifier;
	        _this.add((0, _subscribeToResult.subscribeToResult)(_this, closingNotifier));
	        _this.openWindow();
	        return _this;
	    }

	    _createClass(WindowSubscriber, [{
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.openWindow();
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(error, innerSub) {
	            this._error(error);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            this._complete();
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.window.next(value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.window.error(err);
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.window.complete();
	            this.destination.complete();
	        }
	    }, {
	        key: 'openWindow',
	        value: function openWindow() {
	            var prevWindow = this.window;
	            if (prevWindow) {
	                prevWindow.complete();
	            }
	            var destination = this.destination;
	            var newWindow = this.window = new _Subject.Subject();
	            destination.add(newWindow);
	            destination.next(newWindow);
	        }
	    }]);

	    return WindowSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=window.js.map

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _windowCount = __webpack_require__(245);

	_Observable.Observable.prototype.windowCount = _windowCount.windowCount;
	var _void = exports._void = undefined;
	//# sourceMappingURL=windowCount.js.map

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.windowCount = windowCount;

	var _Subscriber2 = __webpack_require__(8);

	var _Subject = __webpack_require__(2);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function windowCount(windowSize) {
	    var startWindowEvery = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
	}

	var WindowCountOperator = function () {
	    function WindowCountOperator(windowSize, startWindowEvery) {
	        _classCallCheck(this, WindowCountOperator);

	        this.windowSize = windowSize;
	        this.startWindowEvery = startWindowEvery;
	    }

	    _createClass(WindowCountOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery);
	        }
	    }]);

	    return WindowCountOperator;
	}();

	var WindowCountSubscriber = function (_Subscriber) {
	    _inherits(WindowCountSubscriber, _Subscriber);

	    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
	        _classCallCheck(this, WindowCountSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowCountSubscriber).call(this, destination));

	        _this.destination = destination;
	        _this.windowSize = windowSize;
	        _this.startWindowEvery = startWindowEvery;
	        _this.windows = [new _Subject.Subject()];
	        _this.count = 0;
	        var firstWindow = _this.windows[0];
	        destination.add(firstWindow);
	        destination.next(firstWindow);
	        return _this;
	    }

	    _createClass(WindowCountSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
	            var destination = this.destination;
	            var windowSize = this.windowSize;
	            var windows = this.windows;
	            var len = windows.length;
	            for (var i = 0; i < len; i++) {
	                windows[i].next(value);
	            }
	            var c = this.count - windowSize + 1;
	            if (c >= 0 && c % startWindowEvery === 0) {
	                windows.shift().complete();
	            }
	            if (++this.count % startWindowEvery === 0) {
	                var window = new _Subject.Subject();
	                windows.push(window);
	                destination.add(window);
	                destination.next(window);
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            var windows = this.windows;
	            while (windows.length > 0) {
	                windows.shift().error(err);
	            }
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var windows = this.windows;
	            while (windows.length > 0) {
	                windows.shift().complete();
	            }
	            this.destination.complete();
	        }
	    }]);

	    return WindowCountSubscriber;
	}(_Subscriber2.Subscriber);
	//# sourceMappingURL=windowCount.js.map

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _windowTime = __webpack_require__(247);

	_Observable.Observable.prototype.windowTime = _windowTime.windowTime;
	var _void = exports._void = undefined;
	//# sourceMappingURL=windowTime.js.map

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.windowTime = windowTime;

	var _Subscriber2 = __webpack_require__(8);

	var _Subject = __webpack_require__(2);

	var _asap = __webpack_require__(63);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function windowTime(windowTimeSpan) {
	    var windowCreationInterval = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var scheduler = arguments.length <= 2 || arguments[2] === undefined ? _asap.asap : arguments[2];

	    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler));
	}

	var WindowTimeOperator = function () {
	    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, scheduler) {
	        _classCallCheck(this, WindowTimeOperator);

	        this.windowTimeSpan = windowTimeSpan;
	        this.windowCreationInterval = windowCreationInterval;
	        this.scheduler = scheduler;
	    }

	    _createClass(WindowTimeOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.scheduler);
	        }
	    }]);

	    return WindowTimeOperator;
	}();

	var WindowTimeSubscriber = function (_Subscriber) {
	    _inherits(WindowTimeSubscriber, _Subscriber);

	    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, scheduler) {
	        _classCallCheck(this, WindowTimeSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowTimeSubscriber).call(this, destination));

	        _this.destination = destination;
	        _this.windowTimeSpan = windowTimeSpan;
	        _this.windowCreationInterval = windowCreationInterval;
	        _this.scheduler = scheduler;
	        _this.windows = [];
	        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
	            var window = _this.openWindow();
	            var closeState = { subscriber: _this, window: window, context: null };
	            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
	            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
	            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
	        } else {
	            var _window = _this.openWindow();
	            var timeSpanOnlyState = { subscriber: _this, window: _window, windowTimeSpan: windowTimeSpan };
	            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
	        }
	        return _this;
	    }

	    _createClass(WindowTimeSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var windows = this.windows;
	            var len = windows.length;
	            for (var i = 0; i < len; i++) {
	                var window = windows[i];
	                if (!window.isUnsubscribed) {
	                    window.next(value);
	                }
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            var windows = this.windows;
	            while (windows.length > 0) {
	                windows.shift().error(err);
	            }
	            this.destination.error(err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var windows = this.windows;
	            while (windows.length > 0) {
	                var window = windows.shift();
	                if (!window.isUnsubscribed) {
	                    window.complete();
	                }
	            }
	            this.destination.complete();
	        }
	    }, {
	        key: 'openWindow',
	        value: function openWindow() {
	            var window = new _Subject.Subject();
	            this.windows.push(window);
	            var destination = this.destination;
	            destination.add(window);
	            destination.next(window);
	            return window;
	        }
	    }, {
	        key: 'closeWindow',
	        value: function closeWindow(window) {
	            window.complete();
	            var windows = this.windows;
	            windows.splice(windows.indexOf(window), 1);
	        }
	    }]);

	    return WindowTimeSubscriber;
	}(_Subscriber2.Subscriber);

	function dispatchWindowTimeSpanOnly(state) {
	    var subscriber = state.subscriber;
	    var windowTimeSpan = state.windowTimeSpan;
	    var window = state.window;

	    if (window) {
	        window.complete();
	    }
	    state.window = subscriber.openWindow();
	    this.schedule(state, windowTimeSpan);
	}
	function dispatchWindowCreation(state) {
	    var windowTimeSpan = state.windowTimeSpan;
	    var subscriber = state.subscriber;
	    var scheduler = state.scheduler;
	    var windowCreationInterval = state.windowCreationInterval;

	    var window = subscriber.openWindow();
	    var action = this;
	    var context = { action: action, subscription: null };
	    var timeSpanState = { subscriber: subscriber, window: window, context: context };
	    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
	    action.add(context.subscription);
	    action.schedule(state, windowCreationInterval);
	}
	function dispatchWindowClose(_ref) {
	    var subscriber = _ref.subscriber;
	    var window = _ref.window;
	    var context = _ref.context;

	    if (context && context.action && context.subscription) {
	        context.action.remove(context.subscription);
	    }
	    subscriber.closeWindow(window);
	}
	//# sourceMappingURL=windowTime.js.map

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _windowToggle = __webpack_require__(249);

	_Observable.Observable.prototype.windowToggle = _windowToggle.windowToggle;
	var _void = exports._void = undefined;
	//# sourceMappingURL=windowToggle.js.map

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.windowToggle = windowToggle;

	var _Subject = __webpack_require__(2);

	var _Subscription = __webpack_require__(10);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function windowToggle(openings, closingSelector) {
	    return this.lift(new WindowToggleOperator(openings, closingSelector));
	}

	var WindowToggleOperator = function () {
	    function WindowToggleOperator(openings, closingSelector) {
	        _classCallCheck(this, WindowToggleOperator);

	        this.openings = openings;
	        this.closingSelector = closingSelector;
	    }

	    _createClass(WindowToggleOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector);
	        }
	    }]);

	    return WindowToggleOperator;
	}();

	var WindowToggleSubscriber = function (_OuterSubscriber) {
	    _inherits(WindowToggleSubscriber, _OuterSubscriber);

	    function WindowToggleSubscriber(destination, openings, closingSelector) {
	        _classCallCheck(this, WindowToggleSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowToggleSubscriber).call(this, destination));

	        _this.openings = openings;
	        _this.closingSelector = closingSelector;
	        _this.contexts = [];
	        _this.add(_this.openSubscription = (0, _subscribeToResult.subscribeToResult)(_this, openings, openings));
	        return _this;
	    }

	    _createClass(WindowToggleSubscriber, [{
	        key: '_next',
	        value: function _next(value) {
	            var contexts = this.contexts;

	            if (contexts) {
	                var len = contexts.length;
	                for (var i = 0; i < len; i++) {
	                    contexts[i].window.next(value);
	                }
	            }
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            var contexts = this.contexts;

	            this.contexts = null;
	            if (contexts) {
	                var len = contexts.length;
	                var index = -1;
	                while (++index < len) {
	                    var context = contexts[index];
	                    context.window.error(err);
	                    context.subscription.unsubscribe();
	                }
	            }
	            _get(Object.getPrototypeOf(WindowToggleSubscriber.prototype), '_error', this).call(this, err);
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            var contexts = this.contexts;

	            this.contexts = null;
	            if (contexts) {
	                var len = contexts.length;
	                var index = -1;
	                while (++index < len) {
	                    var context = contexts[index];
	                    context.window.complete();
	                    context.subscription.unsubscribe();
	                }
	            }
	            _get(Object.getPrototypeOf(WindowToggleSubscriber.prototype), '_complete', this).call(this);
	        }
	    }, {
	        key: '_unsubscribe',
	        value: function _unsubscribe() {
	            var contexts = this.contexts;

	            this.contexts = null;
	            if (contexts) {
	                var len = contexts.length;
	                var index = -1;
	                while (++index < len) {
	                    var context = contexts[index];
	                    context.window.unsubscribe();
	                    context.subscription.unsubscribe();
	                }
	            }
	        }
	    }, {
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            if (outerValue === this.openings) {
	                var closingSelector = this.closingSelector;

	                var closingNotifier = (0, _tryCatch.tryCatch)(closingSelector)(innerValue);
	                if (closingNotifier === _errorObject.errorObject) {
	                    return this.error(_errorObject.errorObject.e);
	                } else {
	                    var window = new _Subject.Subject();
	                    var subscription = new _Subscription.Subscription();
	                    var context = { window: window, subscription: subscription };
	                    this.contexts.push(context);
	                    var innerSubscription = (0, _subscribeToResult.subscribeToResult)(this, closingNotifier, context);
	                    innerSubscription.context = context;
	                    subscription.add(innerSubscription);
	                    this.destination.next(window);
	                }
	            } else {
	                this.closeWindow(this.contexts.indexOf(outerValue));
	            }
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(err) {
	            this.error(err);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(inner) {
	            if (inner !== this.openSubscription) {
	                this.closeWindow(this.contexts.indexOf(inner.context));
	            }
	        }
	    }, {
	        key: 'closeWindow',
	        value: function closeWindow(index) {
	            var contexts = this.contexts;

	            var context = contexts[index];
	            var window = context.window;
	            var subscription = context.subscription;

	            contexts.splice(index, 1);
	            window.complete();
	            subscription.unsubscribe();
	        }
	    }]);

	    return WindowToggleSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=windowToggle.js.map

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _windowWhen = __webpack_require__(251);

	_Observable.Observable.prototype.windowWhen = _windowWhen.windowWhen;
	var _void = exports._void = undefined;
	//# sourceMappingURL=windowWhen.js.map

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.windowWhen = windowWhen;

	var _Subject = __webpack_require__(2);

	var _tryCatch = __webpack_require__(13);

	var _errorObject = __webpack_require__(14);

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function windowWhen(closingSelector) {
	    return this.lift(new WindowOperator(closingSelector));
	}

	var WindowOperator = function () {
	    function WindowOperator(closingSelector) {
	        _classCallCheck(this, WindowOperator);

	        this.closingSelector = closingSelector;
	    }

	    _createClass(WindowOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new WindowSubscriber(subscriber, this.closingSelector);
	        }
	    }]);

	    return WindowOperator;
	}();

	var WindowSubscriber = function (_OuterSubscriber) {
	    _inherits(WindowSubscriber, _OuterSubscriber);

	    function WindowSubscriber(destination, closingSelector) {
	        _classCallCheck(this, WindowSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WindowSubscriber).call(this, destination));

	        _this.destination = destination;
	        _this.closingSelector = closingSelector;
	        _this.openWindow();
	        return _this;
	    }

	    _createClass(WindowSubscriber, [{
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.openWindow(innerSub);
	        }
	    }, {
	        key: 'notifyError',
	        value: function notifyError(error, innerSub) {
	            this._error(error);
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete(innerSub) {
	            this.openWindow(innerSub);
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            this.window.next(value);
	        }
	    }, {
	        key: '_error',
	        value: function _error(err) {
	            this.window.error(err);
	            this.destination.error(err);
	            this.unsubscribeClosingNotification();
	        }
	    }, {
	        key: '_complete',
	        value: function _complete() {
	            this.window.complete();
	            this.destination.complete();
	            this.unsubscribeClosingNotification();
	        }
	    }, {
	        key: 'unsubscribeClosingNotification',
	        value: function unsubscribeClosingNotification() {
	            if (this.closingNotification) {
	                this.closingNotification.unsubscribe();
	            }
	        }
	    }, {
	        key: 'openWindow',
	        value: function openWindow() {
	            var innerSub = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	            if (innerSub) {
	                this.remove(innerSub);
	                innerSub.unsubscribe();
	            }
	            var prevWindow = this.window;
	            if (prevWindow) {
	                prevWindow.complete();
	            }
	            var window = this.window = new _Subject.Subject();
	            this.destination.next(window);
	            var closingNotifier = (0, _tryCatch.tryCatch)(this.closingSelector)();
	            if (closingNotifier === _errorObject.errorObject) {
	                var err = _errorObject.errorObject.e;
	                this.destination.error(err);
	                this.window.error(err);
	            } else {
	                this.add(this.closingNotification = (0, _subscribeToResult.subscribeToResult)(this, closingNotifier));
	                this.add(window);
	            }
	        }
	    }]);

	    return WindowSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=windowWhen.js.map

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _withLatestFrom = __webpack_require__(253);

	_Observable.Observable.prototype.withLatestFrom = _withLatestFrom.withLatestFrom;
	var _void = exports._void = undefined;
	//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.withLatestFrom = withLatestFrom;

	var _OuterSubscriber2 = __webpack_require__(26);

	var _subscribeToResult = __webpack_require__(27);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @param {Observable} observables the observables to get the latest values from.
	 * @param {Function} [project] optional projection function for merging values together. Receives all values in order
	 *  of observables passed. (e.g. `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not passed, arrays
	 *  will be returned.
	 * @description merges each value from an observable with the latest values from the other passed observables.
	 * All observables must emit at least one value before the resulting observable will emit
	 *
	 * #### example
	 * ```
	 * A.withLatestFrom(B, C)
	 *
	 *  A:     ----a-----------------b---------------c-----------|
	 *  B:     ---d----------------e--------------f---------|
	 *  C:     --x----------------y-------------z-------------|
	 * result: ---([a,d,x])---------([b,e,y])--------([c,f,z])---|
	 * ```
	 */
	function withLatestFrom() {
	    var project = void 0;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    if (typeof args[args.length - 1] === 'function') {
	        project = args.pop();
	    }
	    var observables = args;
	    return this.lift(new WithLatestFromOperator(observables, project));
	}
	/* tslint:enable:max-line-length */

	var WithLatestFromOperator = function () {
	    function WithLatestFromOperator(observables, project) {
	        _classCallCheck(this, WithLatestFromOperator);

	        this.observables = observables;
	        this.project = project;
	    }

	    _createClass(WithLatestFromOperator, [{
	        key: 'call',
	        value: function call(subscriber) {
	            return new WithLatestFromSubscriber(subscriber, this.observables, this.project);
	        }
	    }]);

	    return WithLatestFromOperator;
	}();

	var WithLatestFromSubscriber = function (_OuterSubscriber) {
	    _inherits(WithLatestFromSubscriber, _OuterSubscriber);

	    function WithLatestFromSubscriber(destination, observables, project) {
	        _classCallCheck(this, WithLatestFromSubscriber);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WithLatestFromSubscriber).call(this, destination));

	        _this.observables = observables;
	        _this.project = project;
	        _this.toRespond = [];
	        var len = observables.length;
	        _this.values = new Array(len);
	        for (var i = 0; i < len; i++) {
	            _this.toRespond.push(i);
	        }
	        for (var _i = 0; _i < len; _i++) {
	            var observable = observables[_i];
	            _this.add((0, _subscribeToResult.subscribeToResult)(_this, observable, observable, _i));
	        }
	        return _this;
	    }

	    _createClass(WithLatestFromSubscriber, [{
	        key: 'notifyNext',
	        value: function notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	            this.values[outerIndex] = innerValue;
	            var toRespond = this.toRespond;
	            if (toRespond.length > 0) {
	                var found = toRespond.indexOf(outerIndex);
	                if (found !== -1) {
	                    toRespond.splice(found, 1);
	                }
	            }
	        }
	    }, {
	        key: 'notifyComplete',
	        value: function notifyComplete() {
	            // noop
	        }
	    }, {
	        key: '_next',
	        value: function _next(value) {
	            if (this.toRespond.length === 0) {
	                var _args = [value].concat(_toConsumableArray(this.values));
	                if (this.project) {
	                    this._tryProject(_args);
	                } else {
	                    this.destination.next(_args);
	                }
	            }
	        }
	    }, {
	        key: '_tryProject',
	        value: function _tryProject(args) {
	            var result = void 0;
	            try {
	                result = this.project.apply(this, args);
	            } catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.destination.next(result);
	        }
	    }]);

	    return WithLatestFromSubscriber;
	}(_OuterSubscriber2.OuterSubscriber);
	//# sourceMappingURL=withLatestFrom.js.map

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _zip = __webpack_require__(83);

	_Observable.Observable.prototype.zip = _zip.zipProto;
	var _void = exports._void = undefined;
	//# sourceMappingURL=zip.js.map

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._void = undefined;

	var _Observable = __webpack_require__(3);

	var _zipAll = __webpack_require__(256);

	_Observable.Observable.prototype.zipAll = _zipAll.zipAll;
	var _void = exports._void = undefined;
	//# sourceMappingURL=zipAll.js.map

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.zipAll = zipAll;

	var _zip = __webpack_require__(83);

	function zipAll(project) {
	    return this.lift(new _zip.ZipOperator(project));
	}
	//# sourceMappingURL=zipAll.js.map

/***/ }
/******/ ]);