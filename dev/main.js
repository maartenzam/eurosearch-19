// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"or4r":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"WEtf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// device sniffing for mobile
var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};
var _default = isMobile;
exports.default = _default;
},{}],"yVOz":[function(require,module,exports) {
var define;
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.flubber=t.flubber||{})}(this,function(t){"use strict";function n(t){return 10===t||13===t||8232===t||8233===t||32===t||9===t||11===t||12===t||160===t||t>=5760&&an.indexOf(t)>=0}function e(t){switch(32|t){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function r(t){return t>=48&&t<=57}function i(t){return t>=48&&t<=57||43===t||45===t||46===t}function a(t){this.index=0,this.path=t,this.max=t.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function o(t){for(;t.index<t.max&&n(t.path.charCodeAt(t.index));)t.index++}function s(t){var n,e=t.index,i=e,a=t.max,o=!1,s=!1,h=!1,u=!1;if(i>=a)return void(t.err="SvgPath: missed param (at pos "+i+")");if(n=t.path.charCodeAt(i),43!==n&&45!==n||(i++,n=i<a?t.path.charCodeAt(i):0),!r(n)&&46!==n)return void(t.err="SvgPath: param should start with 0..9 or `.` (at pos "+i+")");if(46!==n){if(o=48===n,i++,n=i<a?t.path.charCodeAt(i):0,o&&i<a&&n&&r(n))return void(t.err="SvgPath: numbers started with `0` such as `09` are ilegal (at pos "+e+")");for(;i<a&&r(t.path.charCodeAt(i));)i++,s=!0;n=i<a?t.path.charCodeAt(i):0}if(46===n){for(u=!0,i++;r(t.path.charCodeAt(i));)i++,h=!0;n=i<a?t.path.charCodeAt(i):0}if(101===n||69===n){if(u&&!s&&!h)return void(t.err="SvgPath: invalid float exponent (at pos "+i+")");if(i++,n=i<a?t.path.charCodeAt(i):0,43!==n&&45!==n||i++,!(i<a&&r(t.path.charCodeAt(i))))return void(t.err="SvgPath: invalid float exponent (at pos "+i+")");for(;i<a&&r(t.path.charCodeAt(i));)i++}t.index=i,t.param=parseFloat(t.path.slice(e,i))+0}function h(t){var n,e;n=t.path[t.segmentStart],e=n.toLowerCase();var r=t.data;if("m"===e&&r.length>2&&(t.result.push([n,r[0],r[1]]),r=r.slice(2),e="l",n="m"===n?"l":"L"),"r"===e)t.result.push([n].concat(r));else for(;r.length>=rn[e]&&(t.result.push([n].concat(r.splice(0,rn[e]))),rn[e]););}function u(t){var n,r,a,u,c=t.max;if(t.segmentStart=t.index,n=t.path.charCodeAt(t.index),!e(n))return void(t.err="SvgPath: bad command "+t.path[t.index]+" (at pos "+t.index+")");if(a=rn[t.path[t.index].toLowerCase()],t.index++,o(t),t.data=[],!a)return void h(t);for(r=!1;;){for(u=a;u>0;u--){if(s(t),t.err.length)return;t.data.push(t.param),o(t),r=!1,t.index<c&&44===t.path.charCodeAt(t.index)&&(t.index++,o(t),r=!0)}if(!r){if(t.index>=t.max)break;if(!i(t.path.charCodeAt(t.index)))break}}h(t)}function c(t,n){return[t[0]*n[0]+t[2]*n[1],t[1]*n[0]+t[3]*n[1],t[0]*n[2]+t[2]*n[3],t[1]*n[2]+t[3]*n[3],t[0]*n[4]+t[2]*n[5]+t[4],t[1]*n[4]+t[3]*n[5]+t[5]]}function f(){if(!(this instanceof f))return new f;this.queue=[],this.cache=null}function l(t,n,e,r){var i=t*r-n*e<0?-1:1,a=Math.sqrt(t*t+n*n),o=Math.sqrt(t*t+n*n),s=t*e+n*r,h=s/(a*o);return h>1&&(h=1),h<-1&&(h=-1),i*Math.acos(h)}function p(t,n,e,r,i,a,o,s,h,u){var c=u*(t-e)/2+h*(n-r)/2,f=-h*(t-e)/2+u*(n-r)/2,p=o*o,g=s*s,v=c*c,x=f*f,y=p*g-p*x-g*v;y<0&&(y=0),y/=p*x+g*v,y=Math.sqrt(y)*(i===a?-1:1);var d=y*o/s*f,m=y*-s/o*c,M=u*d-h*m+(t+e)/2,w=h*d+u*m+(n+r)/2,b=(c-d)/o,L=(f-m)/s,A=(-c-d)/o,q=(-f-m)/s,k=l(1,0,b,L),P=l(b,L,A,q);return 0===a&&P>0&&(P-=ln),1===a&&P<0&&(P+=ln),[M,w,k,P]}function g(t,n){var e=4/3*Math.tan(n/4),r=Math.cos(t),i=Math.sin(t),a=Math.cos(t+n),o=Math.sin(t+n);return[r,i,r-i*e,i+r*e,a+o*e,o-a*e,a,o]}function v(t,n,e){if(!(this instanceof v))return new v(t,n,e);this.rx=t,this.ry=n,this.ax=e}function x(t){if(!(this instanceof x))return new x(t);var n=on(t);this.segments=n.segments,this.err=n.err,this.__stack=[]}function y(t){var n=t.match(wn);return n?n.map(Number):[]}function d(t,n,e,r,i,a,o,s){this.a={x:t,y:n},this.b={x:e,y:r},this.c={x:i,y:a},this.d={x:o,y:s},null!==o&&void 0!==o&&null!==s&&void 0!==s?(this.getArcLength=_,this.getPoint=L,this.getDerivative=M):(this.getArcLength=A,this.getPoint=b,this.getDerivative=m),this.init()}function m(t,n,e){return{x:2*(1-e)*(t[1]-t[0])+2*e*(t[2]-t[1]),y:2*(1-e)*(n[1]-n[0])+2*e*(n[2]-n[1])}}function M(t,n,e){return b([3*(t[1]-t[0]),3*(t[2]-t[1]),3*(t[3]-t[2])],[3*(n[1]-n[0]),3*(n[2]-n[1]),3*(n[3]-n[2])],e)}function w(t,n,e,r,i){for(var a=1,o=t/n,s=(t-e(r,i,o))/n;a>.001;){var h=e(r,i,o+s),u=e(r,i,o-s),c=Math.abs(t-h)/n,f=Math.abs(t-u)/n;c<a?(a=c,o+=s):f<a?(a=f,o-=s):s/=2}return o}function b(t,n,e){return{x:(1-e)*(1-e)*t[0]+2*(1-e)*e*t[1]+e*e*t[2],y:(1-e)*(1-e)*n[0]+2*(1-e)*e*n[1]+e*e*n[2]}}function L(t,n,e){return{x:(1-e)*(1-e)*(1-e)*t[0]+3*(1-e)*(1-e)*e*t[1]+3*(1-e)*e*e*t[2]+e*e*e*t[3],y:(1-e)*(1-e)*(1-e)*n[0]+3*(1-e)*(1-e)*e*n[1]+3*(1-e)*e*e*n[2]+e*e*e*n[3]}}function A(t,n,e){void 0===e&&(e=1);var r=t[0]-2*t[1]+t[2],i=n[0]-2*n[1]+n[2],a=2*t[1]-2*t[0],o=2*n[1]-2*n[0],s=4*(r*r+i*i),h=4*(r*a+i*o),u=a*a+o*o;if(0===s)return e*Math.sqrt(Math.pow(t[2]-t[0],2)+Math.pow(n[2]-n[0],2));var c=h/(2*s),f=u/s,l=e+c,p=f-c*c;return Math.sqrt(s)/2*(l*Math.sqrt(l*l+p)-c*Math.sqrt(c*c+p)+p*Math.log(Math.abs((l+Math.sqrt(l*l+p))/(c+Math.sqrt(c*c+p)))))}function q(t,n){return qn[t][n]}function k(t,n,e){var r,i,a,o=e.length-1;if(0===o)return 0;if(0===t){for(i=0,a=0;a<=o;a++)i+=q(o,a)*Math.pow(1-n,o-a)*Math.pow(n,a)*e[a];return i}for(r=new Array(o),a=0;a<o;a++)r[a]=o*(e[a+1]-e[a]);return k(t-1,n,r)}function P(t,n,e){var r=k(1,e,t),i=k(1,e,n),a=r*r+i*i;return Math.sqrt(a)}function _(t,n,e){var r,i,a,o;void 0===e&&(e=1);for(r=e/2,i=0,a=0;a<20;a++)o=r*Ln[20][a]+r,i+=An[20][a]*P(t,n,o);return r*i}function E(t,n,e,r){var i=t*r-n*e<0?-1:1,a=t*e+n*r;return a>1&&(a=1),a<-1&&(a=-1),i*Math.acos(a)}function S(t,n,e,r,i,a,o,s,h,u){var c=u*(t-e)/2+h*(n-r)/2,f=-h*(t-e)/2+u*(n-r)/2,l=o*o,p=s*s,g=c*c,v=f*f,x=l*p-l*v-p*g;x<0&&(x=0),x/=l*v+p*g,x=Math.sqrt(x)*(i===a?-1:1);var y=x*o/s*f,d=x*-s/o*c,m=u*y-h*d+(t+e)/2,M=h*y+u*d+(n+r)/2,w=(c-y)/o,b=(f-d)/s,L=(-c-y)/o,A=(-f-d)/s,q=E(1,0,w,b),k=E(w,b,L,A);return 0===a&&k>0&&(k-=kn),1===a&&k<0&&(k+=kn),[m,M,q,k]}function C(t,n){var e=4/3*Math.tan(n/4),r=Math.cos(t),i=Math.sin(t),a=Math.cos(t+n),o=Math.sin(t+n);return[r,i,r-i*e,i+r*e,a+o*e,o-a*e,a,o]}function Z(t,n,e,r,i,a,o,s,h){var u=0,c=[],f=[];Pn(t,n,e,r,i,a,o,s,h).forEach(function(t){var n=new bn(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7]),e=n.getTotalLength();u+=e,c.push(e),f.push(n)}),this.length=u,this.partialLengths=c,this.curves=f}function T(t,n,e,r){this.x0=t,this.x1=n,this.y0=e,this.y1=r}function F(t,n){return Math.sqrt((t[0]-n[0])*(t[0]-n[0])+(t[1]-n[1])*(t[1]-n[1]))}function z(t,n,e){return[t[0]+(n[0]-t[0])*e,t[1]+(n[1]-t[1])*e]}function j(t,n){return F(t,n)<1e-9}function I(t,n,e){var r=t.map(function(t,e){return V(t,n[e])});return function(t){var n=r.map(function(n){return n(t)});return e?H(n):n}}function V(t,n){return function(e){return t.map(function(t,r){return t+e*(n[r]-t)})}}function X(t){return"number"==typeof t&&isFinite(t)}function Y(t){return G(t)?nn(t):[(t[0][0]+t[t.length-1][0])/2,(t[0][1]+t[t.length-1][1])/2]}function G(t){for(var n=0;n<t.length-2;n++){var e=t[n],r=t[n+1],i=t[n+2];if(e[0]*(r[1]-i[1])+r[0]*(i[1]-e[1])+i[0]*(e[1]-r[1]))return!0}return!1}function O(t){return new yn(t).abs()}function D(t){return t.toString().split("M").map(function(t,n){return t=t.trim(),n&&t?"M"+t:t}).filter(function(t){return t})}function H(t){return"M"+t.join("L")+"Z"}function N(t){return D(O(t))}function Q(t,n){var e=O(t);return U(e)||R(e,n)}function U(t){var n=t.segments||[],e=[];if(!n.length||"M"!==n[0][0])return!1;for(var r=0;r<n.length;r++){var i=n[r],a=i[0],o=i[1],s=i[2];if("M"===a&&r||"Z"===a)break;if("M"===a||"L"===a)e.push([o,s]);else if("H"===a)e.push([o,e[e.length-1][1]]);else{if("V"!==a)return!1;e.push([e[e.length-1][0],o])}}return!!e.length&&{ring:e}}function R(t,n){var e,r,i=D(t)[0],a=[],o=3;if(!i)throw new TypeError(Cn);r=B(i),e=r.getTotalLength(),n&&X(n)&&n>0&&(o=Math.max(o,Math.ceil(e/n)));for(var s=0;s<o;s++){var h=r.getPointAtLength(e*s/o);a.push([h.x,h.y])}return{ring:a,skipBisect:!0}}function B(t){if("undefined"!=typeof window&&window&&window.document)try{var n=window.document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttributeNS(null,"d",t),n}catch(t){}return Sn(t)}function W(t,n){for(var e=t.length+n,r=en(t)/n,i=0,a=0,o=r/2;t.length<e;){var s=t[i],h=t[(i+1)%t.length],u=F(s,h);o<=a+u?(t.splice(i+1,0,u?z(s,h,(o-a)/u):s.slice(0)),o+=r):(a+=u,i++)}}function $(t,n){void 0===n&&(n=1/0);for(var e=0;e<t.length;e++)for(var r=t[e],i=e===t.length-1?t[0]:t[e+1];F(r,i)>n;)i=z(r,i,.5),t.splice(e+1,0,i)}function J(t,n){var e,r,i;if("string"==typeof t){var a=Q(t,n);t=a.ring,i=a.skipBisect}else if(!Array.isArray(t))throw new TypeError(Cn);if(e=t.slice(0),!K(e))throw new TypeError(Cn);return e.length>1&&j(e[0],e[e.length-1])&&e.pop(),r=tn(e),r>0&&e.reverse(),!i&&n&&X(n)&&n>0&&$(e,n),e}function K(t){return t.every(function(t){return Array.isArray(t)&&t.length>=2&&X(t[0])&&X(t[1])})}function tt(t,n,e){var r;return r=t.length-n.length,W(t,r<0?-1*r:0),W(n,r>0?r:0),Tn(t,n),I(t,n,e)}function nt(t,n,e){e=e||2;var r=n&&n.length,i=r?n[0]*e:t.length,a=et(t,0,i,e,!0),o=[];if(!a)return o;var s,h,u,c,f,l,p;if(r&&(a=ut(t,n,a,e)),t.length>80*e){s=u=t[0],h=c=t[1];for(var g=e;g<i;g+=e)f=t[g],l=t[g+1],f<s&&(s=f),l<h&&(h=l),f>u&&(u=f),l>c&&(c=l);p=Math.max(u-s,c-h)}return it(a,o,e,s,h,p),o}function et(t,n,e,r,i){var a,o;if(i===Et(t,n,e,r)>0)for(a=n;a<e;a+=r)o=kt(a,t[a],t[a+1],o);else for(a=e-r;a>=n;a-=r)o=kt(a,t[a],t[a+1],o);return o&&Mt(o,o.next)&&(Pt(o),o=o.next),o}function rt(t,n){if(!t)return t;n||(n=t);var e,r=t;do{if(e=!1,r.steiner||!Mt(r,r.next)&&0!==mt(r.prev,r,r.next))r=r.next;else{if(Pt(r),(r=n=r.prev)===r.next)return null;e=!0}}while(e||r!==n);return n}function it(t,n,e,r,i,a,o){if(t){!o&&a&&pt(t,r,i,a);for(var s,h,u=t;t.prev!==t.next;)if(s=t.prev,h=t.next,a?ot(t,r,i,a):at(t))n.push(s.i/e),n.push(t.i/e),n.push(h.i/e),Pt(t),t=h.next,u=h.next;else if((t=h)===u){o?1===o?(t=st(t,n,e),it(t,n,e,r,i,a,2)):2===o&&ht(t,n,e,r,i,a):it(rt(t),n,e,r,i,a,1);break}}}function at(t){var n=t.prev,e=t,r=t.next;if(mt(n,e,r)>=0)return!1;for(var i=t.next.next;i!==t.prev;){if(yt(n.x,n.y,e.x,e.y,r.x,r.y,i.x,i.y)&&mt(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function ot(t,n,e,r){var i=t.prev,a=t,o=t.next;if(mt(i,a,o)>=0)return!1;for(var s=i.x<a.x?i.x<o.x?i.x:o.x:a.x<o.x?a.x:o.x,h=i.y<a.y?i.y<o.y?i.y:o.y:a.y<o.y?a.y:o.y,u=i.x>a.x?i.x>o.x?i.x:o.x:a.x>o.x?a.x:o.x,c=i.y>a.y?i.y>o.y?i.y:o.y:a.y>o.y?a.y:o.y,f=vt(s,h,n,e,r),l=vt(u,c,n,e,r),p=t.nextZ;p&&p.z<=l;){if(p!==t.prev&&p!==t.next&&yt(i.x,i.y,a.x,a.y,o.x,o.y,p.x,p.y)&&mt(p.prev,p,p.next)>=0)return!1;p=p.nextZ}for(p=t.prevZ;p&&p.z>=f;){if(p!==t.prev&&p!==t.next&&yt(i.x,i.y,a.x,a.y,o.x,o.y,p.x,p.y)&&mt(p.prev,p,p.next)>=0)return!1;p=p.prevZ}return!0}function st(t,n,e){var r=t;do{var i=r.prev,a=r.next.next;!Mt(i,a)&&wt(i,r,r.next,a)&&Lt(i,a)&&Lt(a,i)&&(n.push(i.i/e),n.push(r.i/e),n.push(a.i/e),Pt(r),Pt(r.next),r=t=a),r=r.next}while(r!==t);return r}function ht(t,n,e,r,i,a){var o=t;do{for(var s=o.next.next;s!==o.prev;){if(o.i!==s.i&&dt(o,s)){var h=qt(o,s);return o=rt(o,o.next),h=rt(h,h.next),it(o,n,e,r,i,a),void it(h,n,e,r,i,a)}s=s.next}o=o.next}while(o!==t)}function ut(t,n,e,r){var i,a,o,s,h,u=[];for(i=0,a=n.length;i<a;i++)o=n[i]*r,s=i<a-1?n[i+1]*r:t.length,h=et(t,o,s,r,!1),h===h.next&&(h.steiner=!0),u.push(xt(h));for(u.sort(ct),i=0;i<u.length;i++)ft(u[i],e),e=rt(e,e.next);return e}function ct(t,n){return t.x-n.x}function ft(t,n){if(n=lt(t,n)){var e=qt(n,t);rt(e,e.next)}}function lt(t,n){var e,r=n,i=t.x,a=t.y,o=-1/0;do{if(a<=r.y&&a>=r.next.y){var s=r.x+(a-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(s<=i&&s>o){if(o=s,s===i){if(a===r.y)return r;if(a===r.next.y)return r.next}e=r.x<r.next.x?r:r.next}}r=r.next}while(r!==n);if(!e)return null;if(i===o)return e.prev;var h,u=e,c=e.x,f=e.y,l=1/0;for(r=e.next;r!==u;)i>=r.x&&r.x>=c&&yt(a<f?i:o,a,c,f,a<f?o:i,a,r.x,r.y)&&((h=Math.abs(a-r.y)/(i-r.x))<l||h===l&&r.x>e.x)&&Lt(r,t)&&(e=r,l=h),r=r.next;return e}function pt(t,n,e,r){var i=t;do{null===i.z&&(i.z=vt(i.x,i.y,n,e,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,gt(i)}function gt(t){var n,e,r,i,a,o,s,h,u=1;do{for(e=t,t=null,a=null,o=0;e;){for(o++,r=e,s=0,n=0;n<u&&(s++,r=r.nextZ);n++);for(h=u;s>0||h>0&&r;)0===s?(i=r,r=r.nextZ,h--):0!==h&&r?e.z<=r.z?(i=e,e=e.nextZ,s--):(i=r,r=r.nextZ,h--):(i=e,e=e.nextZ,s--),a?a.nextZ=i:t=i,i.prevZ=a,a=i;e=r}a.nextZ=null,u*=2}while(o>1);return t}function vt(t,n,e,r,i){return t=32767*(t-e)/i,n=32767*(n-r)/i,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),n=16711935&(n|n<<8),n=252645135&(n|n<<4),n=858993459&(n|n<<2),n=1431655765&(n|n<<1),t|n<<1}function xt(t){var n=t,e=t;do{n.x<e.x&&(e=n),n=n.next}while(n!==t);return e}function yt(t,n,e,r,i,a,o,s){return(i-o)*(n-s)-(t-o)*(a-s)>=0&&(t-o)*(r-s)-(e-o)*(n-s)>=0&&(e-o)*(a-s)-(i-o)*(r-s)>=0}function dt(t,n){return t.next.i!==n.i&&t.prev.i!==n.i&&!bt(t,n)&&Lt(t,n)&&Lt(n,t)&&At(t,n)}function mt(t,n,e){return(n.y-t.y)*(e.x-n.x)-(n.x-t.x)*(e.y-n.y)}function Mt(t,n){return t.x===n.x&&t.y===n.y}function wt(t,n,e,r){return!!(Mt(t,n)&&Mt(e,r)||Mt(t,r)&&Mt(e,n))||mt(t,n,e)>0!=mt(t,n,r)>0&&mt(e,r,t)>0!=mt(e,r,n)>0}function bt(t,n){var e=t;do{if(e.i!==t.i&&e.next.i!==t.i&&e.i!==n.i&&e.next.i!==n.i&&wt(e,e.next,t,n))return!0;e=e.next}while(e!==t);return!1}function Lt(t,n){return mt(t.prev,t,t.next)<0?mt(t,n,t.next)>=0&&mt(t,t.prev,n)>=0:mt(t,n,t.prev)<0||mt(t,t.next,n)<0}function At(t,n){var e=t,r=!1,i=(t.x+n.x)/2,a=(t.y+n.y)/2;do{e.y>a!=e.next.y>a&&i<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(r=!r),e=e.next}while(e!==t);return r}function qt(t,n){var e=new _t(t.i,t.x,t.y),r=new _t(n.i,n.x,n.y),i=t.next,a=n.prev;return t.next=n,n.prev=t,e.next=i,i.prev=e,r.next=e,e.prev=r,a.next=r,r.prev=a,r}function kt(t,n,e,r){var i=new _t(t,n,e);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Pt(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function _t(t,n,e){this.i=t,this.x=n,this.y=e,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Et(t,n,e,r){for(var i=0,a=n,o=e-r;a<e;a+=r)i+=(t[o]-t[a])*(t[a+1]+t[o+1]),o=a;return i}function St(t,n){var e=n.id,r=n.bbox,i=null==n.properties?{}:n.properties,a=Ct(t,n);return null==e&&null==r?{type:"Feature",properties:i,geometry:a}:null==r?{type:"Feature",id:e,properties:i,geometry:a}:{type:"Feature",id:e,bbox:r,properties:i,geometry:a}}function Ct(t,n){function e(t,n){n.length&&n.pop();for(var e=u[t<0?~t:t],r=0,i=e.length;r<i;++r)n.push(h(e[r],r));t<0&&Vn(n,i)}function r(t){return h(t)}function i(t){for(var n=[],r=0,i=t.length;r<i;++r)e(t[r],n);return n.length<2&&n.push(n[0]),n}function a(t){for(var n=i(t);n.length<4;)n.push(n[0]);return n}function o(t){return t.map(a)}function s(t){var n,e=t.type;switch(e){case"GeometryCollection":return{type:e,geometries:t.geometries.map(s)};case"Point":n=r(t.coordinates);break;case"MultiPoint":n=t.coordinates.map(r);break;case"LineString":n=i(t.arcs);break;case"MultiLineString":n=t.arcs.map(i);break;case"Polygon":n=o(t.arcs);break;case"MultiPolygon":n=t.arcs.map(o);break;default:return null}return{type:e,coordinates:n}}var h=In(t.transform),u=t.arcs;return s(n)}function Zt(t){for(var n,e=-1,r=t.length,i=t[r-1],a=0;++e<r;)n=i,i=t[e],a+=n[0]*i[1]-n[1]*i[0];return Math.abs(a)}function Tt(t,n){function e(t){switch(t.type){case"GeometryCollection":t.geometries.forEach(e);break;case"Polygon":r(t.arcs);break;case"MultiPolygon":t.arcs.forEach(r)}}function r(t){t.forEach(function(n){n.forEach(function(n){(a[n=n<0?~n:n]||(a[n]=[])).push(t)})}),o.push(t)}function i(n){return Zt(Ct(t,{type:"Polygon",arcs:[n]}).coordinates[0])}var a={},o=[],s=[];return n.forEach(e),o.forEach(function(t){if(!t._){var n=[],e=[t];for(t._=1,s.push(n);t=e.pop();)n.push(t),t.forEach(function(t){t.forEach(function(t){a[t<0?~t:t].forEach(function(t){t._||(t._=1,e.push(t))})})})}}),o.forEach(function(t){delete t._}),{type:"MultiPolygon",arcs:s.map(function(n){var e,r=[];if(n.forEach(function(t){t.forEach(function(t){t.forEach(function(t){a[t<0?~t:t].length<2&&r.push(t)})})}),r=Yn(t,r),(e=r.length)>1)for(var o,s,h=1,u=i(r[0]);h<e;++h)(o=i(r[h]))>u&&(s=r[0],r[0]=r[h],r[h]=s,u=o);return r})}}function Ft(t){return function(n,e){return Dn(t(n),e)}}function zt(t,n){var e={},r={type:"Topology",objects:{triangles:{type:"GeometryCollection",geometries:[]}},arcs:[]};return t.forEach(function(t){var i=[];t.forEach(function(t,a){var o=t[0]<t[1]?t.join(","):t[1]+","+t[0],s=t.map(function(t){return n[t]});o in e?i.push(~e[o]):(i.push(e[o]=r.arcs.length),r.arcs.push(s))}),r.objects.triangles.geometries.push({type:"Polygon",area:Math.abs(tn(t.map(function(t){return n[t[0]]}))),arcs:[i]})}),r.objects.triangles.geometries.sort(function(t,n){return t.area-n.area}),r}function jt(t,n){for(var e=t.objects.triangles.geometries,r=Hn(function(t){return t.area}).left;e.length>n;)!function(){var n=e[0],i=On(e)[0][0],a=e[i],o=Tt(t,[n,a]);o.area=n.area+a.area,o.type="Polygon",o.arcs=o.arcs[0],e.splice(i,1),e.shift(),e.splice(r(e,o.area),0,o)}();if(n>e.length)throw new RangeError("Can't collapse topology into "+n+" pieces.");return Xn(t,t.objects.triangles).features.map(function(t){return t.geometry.coordinates[0].pop(),t.geometry.coordinates[0]})}function It(t){for(var n=zn(t.reduce(function(t,n){return t.concat([n[0]],[n[1]])},[])),e=[],r=0,i=n.length;r<i;r+=3)e.push([[n[r],n[r+1]],[n[r+1],n[r+2]],[n[r+2],n[r]]]);return e}function Vt(t,n,e){function r(t,n,o){void 0===n&&(n=[]),void 0===o&&(o=0);for(var s=0;s<t.length;s++){var h=t.splice(s,1),u=e[h[0]][n.length];o+u<i&&(t.length?r(t.slice(),n.concat(h),o+u):(i=o+u,a=n.concat(h))),t.length&&t.splice(s,0,h[0])}}var i=1/0,a=t.map(function(t,n){return n});return r(a),a}function Xt(t,n){var e=F(Y(t),Y(n));return e*e}function Yt(t,n,e){void 0===e&&(e={});var r=e.maxSegmentLength;void 0===r&&(r=10);var i=e.string;void 0===i&&(i=!0);var a=e.single;void 0===a&&(a=!1);var o=J(t,r);o.length<n.length+2&&W(o,n.length+2-o.length);var s,h=Qn(o,n.length),u=n.map(function(t){return J(t,r)}),c="string"==typeof t&&t;return a&&!n.every(function(t){return"string"==typeof t})||(s=n.slice(0)),Dt(h,u,{match:!0,string:i,single:a,t0:c,t1:s})}function Gt(t,n,e){void 0===e&&(e={});var r=e.maxSegmentLength;void 0===r&&(r=10);var i=e.string;void 0===i&&(i=!0);var a=e.single;void 0===a&&(a=!1);var o=Yt(n,t,{maxSegmentLength:r,string:i,single:a});return a?function(t){return o(1-t)}:o.map(function(t){return function(n){return t(1-n)}})}function Ot(t,n,e){void 0===e&&(e={});var r=e.maxSegmentLength;void 0===r&&(r=10);var i=e.string;void 0===i&&(i=!0);var a=e.single;if(void 0===a&&(a=!1),!Array.isArray(t)||!Array.isArray(n)||t.length!==n.length||!t.length)throw new TypeError(Zn);var o,s,h=function(t){return J(t,r)},u=t.map(h),c=n.map(h);return a?(t.every(function(t){return"string"==typeof t})&&(o=t.slice(0)),n.every(function(t){return"string"==typeof t})&&(s=n.slice(0))):(o=t.slice(0),s=n.slice(0)),Dt(u,c,{string:i,single:a,t0:o,t1:s,match:!1})}function Dt(t,n,e){void 0===e&&(e={});var r=e.string,i=e.single,a=e.t0,o=e.t1,s=e.match,h=s?Un(t,n):t.map(function(t,n){return n}),u=h.map(function(e,i){return tt(t[e],n[i],r)});if(s&&Array.isArray(a)&&(a=h.map(function(t){return a[t]})),i&&r&&(Array.isArray(a)&&(a=a.join(" ")),Array.isArray(o)&&(o=o.join(" "))),i){var c=r?function(t){return u.map(function(n){return n(t)}).join(" ")}:function(t){return u.map(function(n){return n(t)})};return r&&(a||o)?function(t){return t<1e-4&&a||1-t<1e-4&&o||c(t)}:c}return r?(a=Array.isArray(a)?a.map(function(t){return"string"==typeof t&&t}):[],o=Array.isArray(o)?o.map(function(t){return"string"==typeof t&&t}):[],u.map(function(t,n){return a[n]||o[n]?function(e){return e<1e-4&&a[n]||1-e<1e-4&&o[n]||t(e)}:t})):u}function Ht(t,n,e,r,i){return Rt(Bt(t,n,e),r,Jt(t,n,e),2*Math.PI*e,i)}function Nt(t,n,e,r,i){var a=Ht(n,e,r,t,i);return function(t){return a(1-t)}}function Qt(t,n,e,r,i,a){return Rt(Wt(t,n,e,r),i,Kt(t,n,e,r),2*e+2*r,a)}function Ut(t,n,e,r,i,a){var o=Qt(n,e,r,i,t,a);return function(t){return o(1-t)}}function Rt(t,n,e,r,i){void 0===i&&(i={});var a=i.maxSegmentLength;void 0===a&&(a=10);var o=i.string;void 0===o&&(o=!0);var s,h,u=J(n,a);return X(r)&&u.length<r/a&&W(u,Math.ceil(r/a-u.length)),s=t(u),h=I(s,u,o),o?function(t){return t<1e-4?e:h(t)}:h}function Bt(t,n,e){return function(r){var i=Y(r),a=en(r.concat([r[0]])),o=Math.atan2(r[0][1]-i[1],r[0][0]-i[0]),s=0;return r.map(function(i,h){var u;return h&&(s+=F(i,r[h-1])),u=o+2*Math.PI*(a?s/a:h/r.length),[Math.cos(u)*e+t,Math.sin(u)*e+n]})}}function Wt(t,n,e,r){return function(i){var a=Y(i),o=en(i.concat([i[0]])),s=Math.atan2(i[0][1]-a[1],i[0][0]-a[0]),h=0;s<0&&(s=2*Math.PI+s);var u=s/(2*Math.PI);return i.map(function(a,s){s&&(h+=F(a,i[s-1]));var c=$t((u+(o?h/o:s/i.length))%1);return[t+c[0]*e,n+c[1]*r]})}}function $t(t){return t<=1/8?[1,.5+4*t]:t<=3/8?[1.5-4*t,1]:t<=5/8?[0,2.5-4*t]:t<=7/8?[4*t-2.5,0]:[1,4*t-3.5]}function Jt(t,n,e){var r=t-e+","+n,i=t+e+","+n,a="A"+e+","+e+",0,1,1,";return"M"+r+a+i+a+r+"Z"}function Kt(t,n,e,r){var i=t+e,a=n+r;return"M"+t+","+n+"L"+i+","+n+"L"+i+","+a+"L"+t+","+a+"Z"}var tn=function(t){for(var n,e=-1,r=t.length,i=t[r-1],a=0;++e<r;)n=i,i=t[e],a+=n[1]*i[0]-n[0]*i[1];return a/2},nn=function(t){for(var n,e,r=-1,i=t.length,a=0,o=0,s=t[i-1],h=0;++r<i;)n=s,s=t[r],h+=e=n[0]*s[1]-s[0]*n[1],a+=(n[0]+s[0])*e,o+=(n[1]+s[1])*e;return h*=3,[a/h,o/h]},en=function(t){for(var n,e,r=-1,i=t.length,a=t[i-1],o=a[0],s=a[1],h=0;++r<i;)n=o,e=s,a=t[r],o=a[0],s=a[1],n-=o,e-=s,h+=Math.sqrt(n*n+e*e);return h},rn={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},an=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279],on=function(t){var n=new a(t),e=n.max;for(o(n);n.index<e&&!n.err.length;)u(n);return n.err.length?n.result=[]:n.result.length&&("mM".indexOf(n.result[0][0])<0?(n.err="SvgPath: string should start with `M` or `m`",n.result=[]):n.result[0][0]="M"),{err:n.err,segments:n.result}};f.prototype.matrix=function(t){return 1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]?this:(this.cache=null,this.queue.push(t),this)},f.prototype.translate=function(t,n){return 0===t&&0===n||(this.cache=null,this.queue.push([1,0,0,1,t,n])),this},f.prototype.scale=function(t,n){return 1===t&&1===n||(this.cache=null,this.queue.push([t,0,0,n,0,0])),this},f.prototype.rotate=function(t,n,e){var r,i,a;return 0!==t&&(this.translate(n,e),r=t*Math.PI/180,i=Math.cos(r),a=Math.sin(r),this.queue.push([i,a,-a,i,0,0]),this.cache=null,this.translate(-n,-e)),this},f.prototype.skewX=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,0,Math.tan(t*Math.PI/180),1,0,0])),this},f.prototype.skewY=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,Math.tan(t*Math.PI/180),0,1,0,0])),this},f.prototype.toArray=function(){var t=this;if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],1===this.queue.length)return this.cache;for(var n=1;n<this.queue.length;n++)t.cache=c(t.cache,t.queue[n]);return this.cache},f.prototype.calc=function(t,n,e){var r;return this.queue.length?(this.cache||(this.cache=this.toArray()),r=this.cache,[t*r[0]+n*r[2]+(e?0:r[4]),t*r[1]+n*r[3]+(e?0:r[5])]):[t,n]};var sn=f,hn={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},un=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,cn=/[\s,]+/,fn=function(t){var n,e,r=new sn;return t.split(un).forEach(function(t){if(t.length){if(void 0!==hn[t])return void(n=t);switch(e=t.split(cn).map(function(t){return+t||0}),n){case"matrix":return void(6===e.length&&r.matrix(e));case"scale":return void(1===e.length?r.scale(e[0],e[0]):2===e.length&&r.scale(e[0],e[1]));case"rotate":return void(1===e.length?r.rotate(e[0],0,0):3===e.length&&r.rotate(e[0],e[1],e[2]));case"translate":return void(1===e.length?r.translate(e[0],0):2===e.length&&r.translate(e[0],e[1]));case"skewX":return void(1===e.length&&r.skewX(e[0]));case"skewY":return void(1===e.length&&r.skewY(e[0]))}}}),r},ln=2*Math.PI,pn=function(t,n,e,r,i,a,o,s,h){var u=Math.sin(h*ln/360),c=Math.cos(h*ln/360),f=c*(t-e)/2+u*(n-r)/2,l=-u*(t-e)/2+c*(n-r)/2;if(0===f&&0===l)return[];if(0===o||0===s)return[];o=Math.abs(o),s=Math.abs(s);var v=f*f/(o*o)+l*l/(s*s);v>1&&(o*=Math.sqrt(v),s*=Math.sqrt(v));var x=p(t,n,e,r,i,a,o,s,u,c),y=[],d=x[2],m=x[3],M=Math.max(Math.ceil(Math.abs(m)/(ln/4)),1);m/=M;for(var w=0;w<M;w++)y.push(g(d,m)),d+=m;return y.map(function(t){for(var n=0;n<t.length;n+=2){var e=t[n+0],r=t[n+1];e*=o,r*=s;var i=c*e-u*r,a=u*e+c*r;t[n+0]=i+x[0],t[n+1]=a+x[1]}return t})},gn=Math.PI/180;v.prototype.transform=function(t){var n=Math.cos(this.ax*gn),e=Math.sin(this.ax*gn),r=[this.rx*(t[0]*n+t[2]*e),this.rx*(t[1]*n+t[3]*e),this.ry*(-t[0]*e+t[2]*n),this.ry*(-t[1]*e+t[3]*n)],i=r[0]*r[0]+r[2]*r[2],a=r[1]*r[1]+r[3]*r[3],o=((r[0]-r[3])*(r[0]-r[3])+(r[2]+r[1])*(r[2]+r[1]))*((r[0]+r[3])*(r[0]+r[3])+(r[2]-r[1])*(r[2]-r[1])),s=(i+a)/2;if(o<1e-10*s)return this.rx=this.ry=Math.sqrt(s),this.ax=0,this;var h=r[0]*r[1]+r[2]*r[3];o=Math.sqrt(o);var u=s+o/2,c=s-o/2;return this.ax=Math.abs(h)<1e-10&&Math.abs(u-a)<1e-10?90:180*Math.atan(Math.abs(h)>Math.abs(u-a)?(u-i)/h:h/(u-a))/Math.PI,this.ax>=0?(this.rx=Math.sqrt(u),this.ry=Math.sqrt(c)):(this.ax+=90,this.rx=Math.sqrt(c),this.ry=Math.sqrt(u)),this},v.prototype.isDegenerate=function(){return this.rx<1e-10*this.ry||this.ry<1e-10*this.rx};var vn=v;x.prototype.__matrix=function(t){var n,e=this;t.queue.length&&this.iterate(function(r,i,a,o){var s,h,u,c;switch(r[0]){case"v":s=t.calc(0,r[1],!0),h=0===s[0]?["v",s[1]]:["l",s[0],s[1]];break;case"V":s=t.calc(a,r[1],!1),h=s[0]===t.calc(a,o,!1)[0]?["V",s[1]]:["L",s[0],s[1]];break;case"h":s=t.calc(r[1],0,!0),h=0===s[1]?["h",s[0]]:["l",s[0],s[1]];break;case"H":s=t.calc(r[1],o,!1),h=s[1]===t.calc(a,o,!1)[1]?["H",s[0]]:["L",s[0],s[1]];break;case"a":case"A":var f=t.toArray(),l=vn(r[1],r[2],r[3]).transform(f);if(f[0]*f[3]-f[1]*f[2]<0&&(r[5]=r[5]?"0":"1"),s=t.calc(r[6],r[7],"a"===r[0]),"A"===r[0]&&r[6]===a&&r[7]===o||"a"===r[0]&&0===r[6]&&0===r[7]){h=["a"===r[0]?"l":"L",s[0],s[1]];break}h=l.isDegenerate()?["a"===r[0]?"l":"L",s[0],s[1]]:[r[0],l.rx,l.ry,l.ax,r[4],r[5],s[0],s[1]];break;case"m":c=i>0,s=t.calc(r[1],r[2],c),h=["m",s[0],s[1]];break;default:for(u=r[0],h=[u],c=u.toLowerCase()===u,n=1;n<r.length;n+=2)s=t.calc(r[n],r[n+1],c),h.push(s[0],s[1])}e.segments[i]=h},!0)},x.prototype.__evaluateStack=function(){var t,n,e=this;if(this.__stack.length){if(1===this.__stack.length)return this.__matrix(this.__stack[0]),void(this.__stack=[]);for(t=sn(),n=this.__stack.length;--n>=0;)t.matrix(e.__stack[n].toArray());this.__matrix(t),this.__stack=[]}},x.prototype.toString=function(){var t,n,e=this,r=[];this.__evaluateStack();for(var i=0;i<this.segments.length;i++)n=e.segments[i][0],t=i>0&&"m"!==n&&"M"!==n&&n===e.segments[i-1][0],r=r.concat(t?e.segments[i].slice(1):e.segments[i]);return r.join(" ").replace(/ ?([achlmqrstvz]) ?/gi,"$1").replace(/ \-/g,"-").replace(/zm/g,"z m")},x.prototype.translate=function(t,n){return this.__stack.push(sn().translate(t,n||0)),this},x.prototype.scale=function(t,n){return this.__stack.push(sn().scale(t,n||0===n?n:t)),this},x.prototype.rotate=function(t,n,e){return this.__stack.push(sn().rotate(t,n||0,e||0)),this},x.prototype.skewX=function(t){return this.__stack.push(sn().skewX(t)),this},x.prototype.skewY=function(t){return this.__stack.push(sn().skewY(t)),this},x.prototype.matrix=function(t){return this.__stack.push(sn().matrix(t)),this},x.prototype.transform=function(t){return t.trim()?(this.__stack.push(fn(t)),this):this},x.prototype.round=function(t){var n,e=0,r=0,i=0,a=0;return t=t||0,this.__evaluateStack(),this.segments.forEach(function(o){var s=o[0].toLowerCase()===o[0];switch(o[0]){case"H":case"h":return s&&(o[1]+=i),i=o[1]-o[1].toFixed(t),void(o[1]=+o[1].toFixed(t));case"V":case"v":return s&&(o[1]+=a),a=o[1]-o[1].toFixed(t),void(o[1]=+o[1].toFixed(t));case"Z":case"z":return i=e,void(a=r);case"M":case"m":return s&&(o[1]+=i,o[2]+=a),i=o[1]-o[1].toFixed(t),a=o[2]-o[2].toFixed(t),e=i,r=a,o[1]=+o[1].toFixed(t),void(o[2]=+o[2].toFixed(t));case"A":case"a":return s&&(o[6]+=i,o[7]+=a),i=o[6]-o[6].toFixed(t),a=o[7]-o[7].toFixed(t),o[1]=+o[1].toFixed(t),o[2]=+o[2].toFixed(t),o[3]=+o[3].toFixed(t+2),o[6]=+o[6].toFixed(t),void(o[7]=+o[7].toFixed(t));default:return n=o.length,s&&(o[n-2]+=i,o[n-1]+=a),i=o[n-2]-o[n-2].toFixed(t),a=o[n-1]-o[n-1].toFixed(t),void o.forEach(function(n,e){e&&(o[e]=+o[e].toFixed(t))})}}),this},x.prototype.iterate=function(t,n){var e,r,i,a=this.segments,o={},s=!1,h=0,u=0,c=0,f=0;if(n||this.__evaluateStack(),a.forEach(function(n,e){var r=t(n,e,h,u);Array.isArray(r)&&(o[e]=r,s=!0);var i=n[0]===n[0].toLowerCase();switch(n[0]){case"m":case"M":return h=n[1]+(i?h:0),u=n[2]+(i?u:0),c=h,void(f=u);case"h":case"H":return void(h=n[1]+(i?h:0));case"v":case"V":return void(u=n[1]+(i?u:0));case"z":case"Z":return h=c,void(u=f);default:h=n[n.length-2]+(i?h:0),u=n[n.length-1]+(i?u:0)}}),!s)return this;for(i=[],e=0;e<a.length;e++)if(void 0!==o[e])for(r=0;r<o[e].length;r++)i.push(o[e][r]);else i.push(a[e]);return this.segments=i,this},x.prototype.abs=function(){return this.iterate(function(t,n,e,r){var i,a=t[0],o=a.toUpperCase();if(a!==o)switch(t[0]=o,a){case"v":return void(t[1]+=r);case"a":return t[6]+=e,void(t[7]+=r);default:for(i=1;i<t.length;i++)t[i]+=i%2?e:r}},!0),this},x.prototype.rel=function(){return this.iterate(function(t,n,e,r){var i,a=t[0],o=a.toLowerCase();if(a!==o&&(0!==n||"M"!==a))switch(t[0]=o,a){case"V":return void(t[1]-=r);case"A":return t[6]-=e,void(t[7]-=r);default:for(i=1;i<t.length;i++)t[i]-=i%2?e:r}},!0),this},x.prototype.unarc=function(){return this.iterate(function(t,n,e,r){var i,a,o,s=[],h=t[0];return"A"!==h&&"a"!==h?null:("a"===h?(a=e+t[6],o=r+t[7]):(a=t[6],o=t[7]),i=pn(e,r,a,o,t[4],t[5],t[1],t[2],t[3]),0===i.length?[["a"===t[0]?"l":"L",t[6],t[7]]]:(i.forEach(function(t){s.push(["C",t[2],t[3],t[4],t[5],t[6],t[7]])}),s))}),this},x.prototype.unshort=function(){var t,n,e,r,i,a=this.segments;return this.iterate(function(o,s,h,u){var c,f=o[0],l=f.toUpperCase();s&&("T"===l?(c="t"===f,e=a[s-1],"Q"===e[0]?(t=e[1]-h,n=e[2]-u):"q"===e[0]?(t=e[1]-e[3],n=e[2]-e[4]):(t=0,n=0),r=-t,i=-n,c||(r+=h,i+=u),a[s]=[c?"q":"Q",r,i,o[1],o[2]]):"S"===l&&(c="s"===f,e=a[s-1],"C"===e[0]?(t=e[3]-h,n=e[4]-u):"c"===e[0]?(t=e[3]-e[5],n=e[4]-e[6]):(t=0,n=0),r=-t,i=-n,c||(r+=h,i+=u),a[s]=[c?"c":"C",r,i,o[1],o[2],o[3],o[4]]))}),this};var xn=x,yn=xn,dn={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},mn=/([astvzqmhlc])([^astvzqmhlc]*)/gi,Mn=function(t){var n=[];return t.replace(mn,function(t,e,r){var i=e.toLowerCase();for(r=y(r),"m"===i&&r.length>2&&(n.push([e].concat(r.splice(0,2))),i="l",e="m"===e?"l":"L");r.length>=0;){if(r.length===dn[i])return r.unshift(e),n.push(r);if(r.length<dn[i])throw new Error("malformed path data");n.push([e].concat(r.splice(0,dn[i])))}}),n},wn=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,bn=function(t,n,e,r,i,a,o,s){return new d(t,n,e,r,i,a,o,s)};d.prototype={constructor:d,init:function(){this.length=this.getArcLength([this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y])},getTotalLength:function(){return this.length},getPointAtLength:function(t){var n=w(t,this.length,this.getArcLength,[this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y]);return this.getPoint([this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y],n)},getTangentAtLength:function(t){var n=w(t,this.length,this.getArcLength,[this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y]),e=this.getDerivative([this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y],n),r=Math.sqrt(e.x*e.x+e.y*e.y);return r>0?{x:e.x/r,y:e.y/r}:{x:0,y:0}},getPropertiesAtLength:function(t){var n,e=w(t,this.length,this.getArcLength,[this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y]),r=this.getDerivative([this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y],e),i=Math.sqrt(r.x*r.x+r.y*r.y);n=i>0?{x:r.x/i,y:r.y/i}:{
x:0,y:0};var a=this.getPoint([this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y],e);return{x:a.x,y:a.y,tangentX:n.x,tangentY:n.y}}};var Ln=[[],[],[-.5773502691896257,.5773502691896257],[0,-.7745966692414834,.7745966692414834],[-.33998104358485626,.33998104358485626,-.8611363115940526,.8611363115940526],[0,-.5384693101056831,.5384693101056831,-.906179845938664,.906179845938664],[.6612093864662645,-.6612093864662645,-.2386191860831969,.2386191860831969,-.932469514203152,.932469514203152],[0,.4058451513773972,-.4058451513773972,-.7415311855993945,.7415311855993945,-.9491079123427585,.9491079123427585],[-.1834346424956498,.1834346424956498,-.525532409916329,.525532409916329,-.7966664774136267,.7966664774136267,-.9602898564975363,.9602898564975363],[0,-.8360311073266358,.8360311073266358,-.9681602395076261,.9681602395076261,-.3242534234038089,.3242534234038089,-.6133714327005904,.6133714327005904],[-.14887433898163122,.14887433898163122,-.4333953941292472,.4333953941292472,-.6794095682990244,.6794095682990244,-.8650633666889845,.8650633666889845,-.9739065285171717,.9739065285171717],[0,-.26954315595234496,.26954315595234496,-.5190961292068118,.5190961292068118,-.7301520055740494,.7301520055740494,-.8870625997680953,.8870625997680953,-.978228658146057,.978228658146057],[-.1252334085114689,.1252334085114689,-.3678314989981802,.3678314989981802,-.5873179542866175,.5873179542866175,-.7699026741943047,.7699026741943047,-.9041172563704749,.9041172563704749,-.9815606342467192,.9815606342467192],[0,-.2304583159551348,.2304583159551348,-.44849275103644687,.44849275103644687,-.6423493394403402,.6423493394403402,-.8015780907333099,.8015780907333099,-.9175983992229779,.9175983992229779,-.9841830547185881,.9841830547185881],[-.10805494870734367,.10805494870734367,-.31911236892788974,.31911236892788974,-.5152486363581541,.5152486363581541,-.6872929048116855,.6872929048116855,-.827201315069765,.827201315069765,-.9284348836635735,.9284348836635735,-.9862838086968123,.9862838086968123],[0,-.20119409399743451,.20119409399743451,-.3941513470775634,.3941513470775634,-.5709721726085388,.5709721726085388,-.7244177313601701,.7244177313601701,-.8482065834104272,.8482065834104272,-.937273392400706,.937273392400706,-.9879925180204854,.9879925180204854],[-.09501250983763744,.09501250983763744,-.2816035507792589,.2816035507792589,-.45801677765722737,.45801677765722737,-.6178762444026438,.6178762444026438,-.755404408355003,.755404408355003,-.8656312023878318,.8656312023878318,-.9445750230732326,.9445750230732326,-.9894009349916499,.9894009349916499],[0,-.17848418149584785,.17848418149584785,-.3512317634538763,.3512317634538763,-.5126905370864769,.5126905370864769,-.6576711592166907,.6576711592166907,-.7815140038968014,.7815140038968014,-.8802391537269859,.8802391537269859,-.9506755217687678,.9506755217687678,-.9905754753144174,.9905754753144174],[-.0847750130417353,.0847750130417353,-.2518862256915055,.2518862256915055,-.41175116146284263,.41175116146284263,-.5597708310739475,.5597708310739475,-.6916870430603532,.6916870430603532,-.8037049589725231,.8037049589725231,-.8926024664975557,.8926024664975557,-.9558239495713977,.9558239495713977,-.9915651684209309,.9915651684209309],[0,-.16035864564022537,.16035864564022537,-.31656409996362983,.31656409996362983,-.46457074137596094,.46457074137596094,-.600545304661681,.600545304661681,-.7209661773352294,.7209661773352294,-.8227146565371428,.8227146565371428,-.9031559036148179,.9031559036148179,-.96020815213483,.96020815213483,-.9924068438435844,.9924068438435844],[-.07652652113349734,.07652652113349734,-.22778585114164507,.22778585114164507,-.37370608871541955,.37370608871541955,-.5108670019508271,.5108670019508271,-.636053680726515,.636053680726515,-.7463319064601508,.7463319064601508,-.8391169718222188,.8391169718222188,-.912234428251326,.912234428251326,-.9639719272779138,.9639719272779138,-.9931285991850949,.9931285991850949],[0,-.1455618541608951,.1455618541608951,-.2880213168024011,.2880213168024011,-.4243421202074388,.4243421202074388,-.5516188358872198,.5516188358872198,-.6671388041974123,.6671388041974123,-.7684399634756779,.7684399634756779,-.8533633645833173,.8533633645833173,-.9200993341504008,.9200993341504008,-.9672268385663063,.9672268385663063,-.9937521706203895,.9937521706203895],[-.06973927331972223,.06973927331972223,-.20786042668822127,.20786042668822127,-.34193582089208424,.34193582089208424,-.469355837986757,.469355837986757,-.5876404035069116,.5876404035069116,-.6944872631866827,.6944872631866827,-.7878168059792081,.7878168059792081,-.8658125777203002,.8658125777203002,-.926956772187174,.926956772187174,-.9700604978354287,.9700604978354287,-.9942945854823992,.9942945854823992],[0,-.1332568242984661,.1332568242984661,-.26413568097034495,.26413568097034495,-.3903010380302908,.3903010380302908,-.5095014778460075,.5095014778460075,-.6196098757636461,.6196098757636461,-.7186613631319502,.7186613631319502,-.8048884016188399,.8048884016188399,-.8767523582704416,.8767523582704416,-.9329710868260161,.9329710868260161,-.9725424712181152,.9725424712181152,-.9947693349975522,.9947693349975522],[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213]],An=[[],[],[1,1],[.8888888888888888,.5555555555555556,.5555555555555556],[.6521451548625461,.6521451548625461,.34785484513745385,.34785484513745385],[.5688888888888889,.47862867049936647,.47862867049936647,.23692688505618908,.23692688505618908],[.3607615730481386,.3607615730481386,.46791393457269104,.46791393457269104,.17132449237917036,.17132449237917036],[.4179591836734694,.3818300505051189,.3818300505051189,.27970539148927664,.27970539148927664,.1294849661688697,.1294849661688697],[.362683783378362,.362683783378362,.31370664587788727,.31370664587788727,.22238103445337448,.22238103445337448,.10122853629037626,.10122853629037626],[.3302393550012598,.1806481606948574,.1806481606948574,.08127438836157441,.08127438836157441,.31234707704000286,.31234707704000286,.26061069640293544,.26061069640293544],[.29552422471475287,.29552422471475287,.26926671930999635,.26926671930999635,.21908636251598204,.21908636251598204,.1494513491505806,.1494513491505806,.06667134430868814,.06667134430868814],[.2729250867779006,.26280454451024665,.26280454451024665,.23319376459199048,.23319376459199048,.18629021092773426,.18629021092773426,.1255803694649046,.1255803694649046,.05566856711617366,.05566856711617366],[.24914704581340277,.24914704581340277,.2334925365383548,.2334925365383548,.20316742672306592,.20316742672306592,.16007832854334622,.16007832854334622,.10693932599531843,.10693932599531843,.04717533638651183,.04717533638651183],[.2325515532308739,.22628318026289723,.22628318026289723,.2078160475368885,.2078160475368885,.17814598076194574,.17814598076194574,.13887351021978725,.13887351021978725,.09212149983772845,.09212149983772845,.04048400476531588,.04048400476531588],[.2152638534631578,.2152638534631578,.2051984637212956,.2051984637212956,.18553839747793782,.18553839747793782,.15720316715819355,.15720316715819355,.12151857068790319,.12151857068790319,.08015808715976021,.08015808715976021,.03511946033175186,.03511946033175186],[.2025782419255613,.19843148532711158,.19843148532711158,.1861610000155622,.1861610000155622,.16626920581699392,.16626920581699392,.13957067792615432,.13957067792615432,.10715922046717194,.10715922046717194,.07036604748810812,.07036604748810812,.03075324199611727,.03075324199611727],[.1894506104550685,.1894506104550685,.18260341504492358,.18260341504492358,.16915651939500254,.16915651939500254,.14959598881657674,.14959598881657674,.12462897125553388,.12462897125553388,.09515851168249279,.09515851168249279,.062253523938647894,.062253523938647894,.027152459411754096,.027152459411754096],[.17944647035620653,.17656270536699264,.17656270536699264,.16800410215645004,.16800410215645004,.15404576107681028,.15404576107681028,.13513636846852548,.13513636846852548,.11188384719340397,.11188384719340397,.08503614831717918,.08503614831717918,.0554595293739872,.0554595293739872,.02414830286854793,.02414830286854793],[.1691423829631436,.1691423829631436,.16427648374583273,.16427648374583273,.15468467512626524,.15468467512626524,.14064291467065065,.14064291467065065,.12255520671147846,.12255520671147846,.10094204410628717,.10094204410628717,.07642573025488905,.07642573025488905,.0497145488949698,.0497145488949698,.02161601352648331,.02161601352648331],[.1610544498487837,.15896884339395434,.15896884339395434,.15276604206585967,.15276604206585967,.1426067021736066,.1426067021736066,.12875396253933621,.12875396253933621,.11156664554733399,.11156664554733399,.09149002162245,.09149002162245,.06904454273764123,.06904454273764123,.0448142267656996,.0448142267656996,.019461788229726478,.019461788229726478],[.15275338713072584,.15275338713072584,.14917298647260374,.14917298647260374,.14209610931838204,.14209610931838204,.13168863844917664,.13168863844917664,.11819453196151841,.11819453196151841,.10193011981724044,.10193011981724044,.08327674157670475,.08327674157670475,.06267204833410907,.06267204833410907,.04060142980038694,.04060142980038694,.017614007139152118,.017614007139152118],[.14608113364969041,.14452440398997005,.14452440398997005,.13988739479107315,.13988739479107315,.13226893863333747,.13226893863333747,.12183141605372853,.12183141605372853,.10879729916714838,.10879729916714838,.09344442345603386,.09344442345603386,.0761001136283793,.0761001136283793,.057134425426857205,.057134425426857205,.036953789770852494,.036953789770852494,.016017228257774335,.016017228257774335],[.13925187285563198,.13925187285563198,.13654149834601517,.13654149834601517,.13117350478706238,.13117350478706238,.12325237681051242,.12325237681051242,.11293229608053922,.11293229608053922,.10041414444288096,.10041414444288096,.08594160621706773,.08594160621706773,.06979646842452049,.06979646842452049,.052293335152683286,.052293335152683286,.03377490158481415,.03377490158481415,.0146279952982722,.0146279952982722],[.13365457218610619,.1324620394046966,.1324620394046966,.12890572218808216,.12890572218808216,.12304908430672953,.12304908430672953,.11499664022241136,.11499664022241136,.10489209146454141,.10489209146454141,.09291576606003515,.09291576606003515,.07928141177671895,.07928141177671895,.06423242140852585,.06423242140852585,.04803767173108467,.04803767173108467,.030988005856979445,.030988005856979445,.013411859487141771,.013411859487141771],[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872]],qn=[[1],[1,1],[1,2,1],[1,3,3,1]],kn=2*Math.PI,Pn=function(t,n,e,r,i,a,o,s,h){var u=Math.sin(i*kn/360),c=Math.cos(i*kn/360),f=c*(t-s)/2+u*(n-h)/2,l=-u*(t-s)/2+c*(n-h)/2;if(0===f&&0===l)return[];if(0===e||0===r)return[];e=Math.abs(e),r=Math.abs(r);var p=f*f/(e*e)+l*l/(r*r);p>1&&(e*=Math.sqrt(p),r*=Math.sqrt(p));var g=S(t,n,s,h,a,o,e,r,u,c),v=[],x=g[2],y=g[3],d=Math.max(Math.ceil(Math.abs(y)/(kn/4)),1);y/=d;for(var m=0;m<d;m++)v.push(C(x,y)),x+=y;return v.map(function(t){for(var n=0;n<t.length;n+=2){var i=t[n+0],a=t[n+1];i*=e,a*=r;var o=c*i-u*a,s=u*i+c*a;t[n+0]=o+g[0],t[n+1]=s+g[1]}return t})},_n=function(t,n,e,r,i,a,o,s,h){return new Z(t,n,e,r,i,a,o,s,h)};Z.prototype={constructor:Z,init:function(){},getTotalLength:function(){return this.length},getPointAtLength:function(t){var n=this;t<0?t=0:t>this.length&&(t=this.length);for(var e=this.partialLengths.length-1;this.partialLengths[e]>=t&&this.partialLengths[e]>0;)e--;e<this.partialLengths.length-1&&e++;for(var r=0,i=0;i<e;i++)r+=n.partialLengths[i];return this.curves[e].getPointAtLength(t-r)},getTangentAtLength:function(t){var n=this;t<0?t=0:t>this.length&&(t=this.length);for(var e=this.partialLengths.length-1;this.partialLengths[e]>=t&&this.partialLengths[e]>0;)e--;e<this.partialLengths.length-1&&e++;for(var r=0,i=0;i<e;i++)r+=n.partialLengths[i];return this.curves[e].getTangentAtLength(t-r)},getPropertiesAtLength:function(t){var n=this.getTangentAtLength(t),e=this.getPointAtLength(t);return{x:e.x,y:e.y,tangentX:n.x,tangentY:n.y}}};var En=function(t,n,e,r){return new T(t,n,e,r)};T.prototype.getTotalLength=function(){return Math.sqrt(Math.pow(this.x0-this.x1,2)+Math.pow(this.y0-this.y1,2))},T.prototype.getPointAtLength=function(t){var n=t/Math.sqrt(Math.pow(this.x0-this.x1,2)+Math.pow(this.y0-this.y1,2)),e=(this.x1-this.x0)*n,r=(this.y1-this.y0)*n;return{x:this.x0+e,y:this.y0+r}},T.prototype.getTangentAtLength=function(){var t=Math.sqrt((this.x1-this.x0)*(this.x1-this.x0)+(this.y1-this.y0)*(this.y1-this.y0));return{x:(this.x1-this.x0)/t,y:(this.y1-this.y0)/t}},T.prototype.getPropertiesAtLength=function(t){var n=this.getPointAtLength(t),e=this.getTangentAtLength();return{x:n.x,y:n.y,tangentX:e.x,tangentY:e.y}};var Sn=function(t){function n(t){if(!t)return null;for(var a,o=Mn(t),s=[0,0],h=[0,0],u=0;u<o.length;u++)"M"===o[u][0]?(s=[o[u][1],o[u][2]],i.push(null)):"m"===o[u][0]?(s=[o[u][1]+s[0],o[u][2]+s[1]],i.push(null)):"L"===o[u][0]?(e+=Math.sqrt(Math.pow(s[0]-o[u][1],2)+Math.pow(s[1]-o[u][2],2)),i.push(new En(s[0],o[u][1],s[1],o[u][2])),s=[o[u][1],o[u][2]]):"l"===o[u][0]?(e+=Math.sqrt(Math.pow(o[u][1],2)+Math.pow(o[u][2],2)),i.push(new En(s[0],o[u][1]+s[0],s[1],o[u][2]+s[1])),s=[o[u][1]+s[0],o[u][2]+s[1]]):"H"===o[u][0]?(e+=Math.abs(s[0]-o[u][1]),i.push(new En(s[0],o[u][1],s[1],s[1])),s[0]=o[u][1]):"h"===o[u][0]?(e+=Math.abs(o[u][1]),i.push(new En(s[0],s[0]+o[u][1],s[1],s[1])),s[0]=o[u][1]+s[0]):"V"===o[u][0]?(e+=Math.abs(s[1]-o[u][1]),i.push(new En(s[0],s[0],s[1],o[u][1])),s[1]=o[u][1]):"v"===o[u][0]?(e+=Math.abs(o[u][1]),i.push(new En(s[0],s[0],s[1],s[1]+o[u][1])),s[1]=o[u][1]+s[1]):"z"===o[u][0]||"Z"===o[u][0]?(e+=Math.sqrt(Math.pow(o[0][1]-s[0],2)+Math.pow(o[0][2]-s[1],2)),i.push(new En(s[0],o[0][1],s[1],o[0][2])),s=[o[0][1],o[0][2]]):"C"===o[u][0]?(a=new bn(s[0],s[1],o[u][1],o[u][2],o[u][3],o[u][4],o[u][5],o[u][6]),e+=a.getTotalLength(),s=[o[u][5],o[u][6]],i.push(a)):"c"===o[u][0]?(a=new bn(s[0],s[1],s[0]+o[u][1],s[1]+o[u][2],s[0]+o[u][3],s[1]+o[u][4],s[0]+o[u][5],s[1]+o[u][6]),e+=a.getTotalLength(),s=[o[u][5]+s[0],o[u][6]+s[1]],i.push(a)):"S"===o[u][0]?(a=u>0&&["C","c","S","s"].indexOf(o[u-1][0])>-1?new bn(s[0],s[1],2*s[0]-o[u-1][o[u-1].length-4],2*s[1]-o[u-1][o[u-1].length-3],o[u][1],o[u][2],o[u][3],o[u][4]):new bn(s[0],s[1],s[0],s[1],o[u][1],o[u][2],o[u][3],o[u][4]),e+=a.getTotalLength(),s=[o[u][3],o[u][4]],i.push(a)):"s"===o[u][0]?(a=u>0&&["C","c","S","s"].indexOf(o[u-1][0])>-1?new bn(s[0],s[1],s[0]+a.d.x-a.c.x,s[1]+a.d.y-a.c.y,s[0]+o[u][1],s[1]+o[u][2],s[0]+o[u][3],s[1]+o[u][4]):new bn(s[0],s[1],s[0],s[1],s[0]+o[u][1],s[1]+o[u][2],s[0]+o[u][3],s[1]+o[u][4]),e+=a.getTotalLength(),s=[o[u][3]+s[0],o[u][4]+s[1]],i.push(a)):"Q"===o[u][0]?(a=new bn(s[0],s[1],o[u][1],o[u][2],o[u][3],o[u][4]),e+=a.getTotalLength(),i.push(a),s=[o[u][3],o[u][4]],h=[o[u][1],o[u][2]]):"q"===o[u][0]?(a=new bn(s[0],s[1],s[0]+o[u][1],s[1]+o[u][2],s[0]+o[u][3],s[1]+o[u][4]),e+=a.getTotalLength(),h=[s[0]+o[u][1],s[1]+o[u][2]],s=[o[u][3]+s[0],o[u][4]+s[1]],i.push(a)):"T"===o[u][0]?(a=u>0&&["Q","q","T","t"].indexOf(o[u-1][0])>-1?new bn(s[0],s[1],2*s[0]-h[0],2*s[1]-h[1],o[u][1],o[u][2]):new En(s[0],o[u][1],s[1],o[u][2]),i.push(a),e+=a.getTotalLength(),h=[2*s[0]-h[0],2*s[1]-h[1]],s=[o[u][1],o[u][2]]):"t"===o[u][0]?(a=u>0&&["Q","q","T","t"].indexOf(o[u-1][0])>-1?new bn(s[0],s[1],2*s[0]-h[0],2*s[1]-h[1],s[0]+o[u][1],s[1]+o[u][2]):new En(s[0],s[0]+o[u][1],s[1],s[1]+o[u][2]),e+=a.getTotalLength(),h=[2*s[0]-h[0],2*s[1]-h[1]],s=[o[u][1]+s[0],o[u][2]+s[0]],i.push(a)):"A"===o[u][0]?(a=new _n(s[0],s[1],o[u][1],o[u][2],o[u][3],o[u][4],o[u][5],o[u][6],o[u][7]),e+=a.getTotalLength(),s=[o[u][6],o[u][7]],i.push(a)):"a"===o[u][0]&&(a=new _n(s[0],s[1],o[u][1],o[u][2],o[u][3],o[u][4],o[u][5],s[0]+o[u][6],s[1]+o[u][7]),e+=a.getTotalLength(),s=[s[0]+o[u][6],s[1]+o[u][7]],i.push(a)),r.push(e);return n}var e=0,r=[],i=[];n.getTotalLength=function(){return e},n.getPointAtLength=function(t){var n=a(t);return i[n.i].getPointAtLength(n.fraction)},n.getTangentAtLength=function(t){var n=a(t);return i[n.i].getTangentAtLength(n.fraction)},n.getPropertiesAtLength=function(t){var n=a(t);return i[n.i].getPropertiesAtLength(n.fraction)};var a=function(t){t<0?t=0:t>e&&(t=e);for(var n=r.length-1;r[n]>=t&&r[n]>0;)n--;return n++,{fraction:t-r[n-1],i:n}};return n(t)},Cn='All shapes must be supplied as arrays of [x, y] points or an SVG path string (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).\nExample valid ways of supplying a shape would be:\n[[0, 0], [10, 0], [10, 10]]\n"M0,0 L10,0 L10,10Z"\n',Zn="flubber.all() expects two arrays of equal length as arguments. Each element in both arrays should be an array of [x, y] points or an SVG path string (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d).",Tn=function(t,n){for(var e,r,i,a=t.length,o=1/0,s=0;s<a;s++)!function(i){r=0,n.forEach(function(n,e){var o=F(t[(i+e)%a],n);r+=o*o}),r<o&&(o=r,e=i)}(s);e&&(i=t.splice(0,e),t.splice.apply(t,[t.length,0].concat(i)))},Fn=function(t,n,e){void 0===e&&(e={});var r=e.maxSegmentLength;void 0===r&&(r=10);var i=e.string;void 0===i&&(i=!0);var a=J(t,r),o=J(n,r),s=tt(a,o,i);return!i||"string"!=typeof t&&"string"!=typeof n?s:function(e){return e<1e-4&&"string"==typeof t?t:1-e<1e-4&&"string"==typeof n?n:s(e)}},zn=nt;nt.deviation=function(t,n,e,r){var i=n&&n.length,a=i?n[0]*e:t.length,o=Math.abs(Et(t,0,a,e));if(i)for(var s=0,h=n.length;s<h;s++){var u=n[s]*e,c=s<h-1?n[s+1]*e:t.length;o-=Math.abs(Et(t,u,c,e))}var f=0;for(s=0;s<r.length;s+=3){var l=r[s]*e,p=r[s+1]*e,g=r[s+2]*e;f+=Math.abs((t[l]-t[g])*(t[p+1]-t[l+1])-(t[l]-t[p])*(t[g+1]-t[l+1]))}return 0===o&&0===f?0:Math.abs((f-o)/o)},nt.flatten=function(t){for(var n=t[0][0].length,e={vertices:[],holes:[],dimensions:n},r=0,i=0;i<t.length;i++){for(var a=0;a<t[i].length;a++)for(var o=0;o<n;o++)e.vertices.push(t[i][a][o]);i>0&&(r+=t[i-1].length,e.holes.push(r))}return e};var jn=function(t){return t},In=function(t){if(null==t)return jn;var n,e,r=t.scale[0],i=t.scale[1],a=t.translate[0],o=t.translate[1];return function(t,s){s||(n=e=0);var h=2,u=t.length,c=new Array(u);for(c[0]=(n+=t[0])*r+a,c[1]=(e+=t[1])*i+o;h<u;)c[h]=t[h],++h;return c}},Vn=function(t,n){for(var e,r=t.length,i=r-n;i<--r;)e=t[i],t[i++]=t[r],t[r]=e},Xn=function(t,n){return"GeometryCollection"===n.type?{type:"FeatureCollection",features:n.geometries.map(function(n){return St(t,n)})}:St(t,n)},Yn=function(t,n){function e(n){var e,r=t.arcs[n<0?~n:n],i=r[0];return t.transform?(e=[0,0],r.forEach(function(t){e[0]+=t[0],e[1]+=t[1]})):e=r[r.length-1],n<0?[e,i]:[i,e]}function r(t,n){for(var e in t){var r=t[e];delete n[r.start],delete r.start,delete r.end,r.forEach(function(t){i[t<0?~t:t]=1}),s.push(r)}}var i={},a={},o={},s=[],h=-1;return n.forEach(function(e,r){var i,a=t.arcs[e<0?~e:e];a.length<3&&!a[1][0]&&!a[1][1]&&(i=n[++h],n[h]=e,n[r]=i)}),n.forEach(function(t){var n,r,i=e(t),s=i[0],h=i[1];if(n=o[s])if(delete o[n.end],n.push(t),n.end=h,r=a[h]){delete a[r.start];var u=r===n?n:n.concat(r);a[u.start=n.start]=o[u.end=r.end]=u}else a[n.start]=o[n.end]=n;else if(n=a[h])if(delete a[n.start],n.unshift(t),n.start=s,r=o[s]){delete o[r.end];var c=r===n?n:r.concat(n);a[c.start=r.start]=o[c.end=n.end]=c}else a[n.start]=o[n.end]=n;else n=[t],a[n.start=s]=o[n.end=h]=n}),r(o,a),r(a,o),n.forEach(function(t){i[t<0?~t:t]||s.push([t])}),s},Gn=function(t,n){for(var e=0,r=t.length;e<r;){var i=e+r>>>1;t[i]<n?e=i+1:r=i}return e},On=function(t){function n(t,n){t.forEach(function(t){t<0&&(t=~t);var e=i[t];e?e.push(n):i[t]=[n]})}function e(t,e){t.forEach(function(t){n(t,e)})}function r(t,n){"GeometryCollection"===t.type?t.geometries.forEach(function(t){r(t,n)}):t.type in o&&o[t.type](t.arcs,n)}var i={},a=t.map(function(){return[]}),o={LineString:n,MultiLineString:e,Polygon:e,MultiPolygon:function(t,n){t.forEach(function(t){e(t,n)})}};t.forEach(r);for(var s in i)for(var h=i[s],u=h.length,c=0;c<u;++c)for(var f=c+1;f<u;++f){var l,p=h[c],g=h[f];(l=a[p])[s=Gn(l,g)]!==g&&l.splice(s,0,g),(l=a[g])[s=Gn(l,p)]!==p&&l.splice(s,0,p)}return a},Dn=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN},Hn=function(t){return 1===t.length&&(t=Ft(t)),{left:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var a=r+i>>>1;t(n[a],e)<0?r=a+1:i=a}return r},right:function(n,e,r,i){for(null==r&&(r=0),null==i&&(i=n.length);r<i;){var a=r+i>>>1;t(n[a],e)>0?i=a:r=a+1}return r}}},Nn=Hn(Dn),Qn=(Nn.right,Math.sqrt(50),Math.sqrt(10),Math.sqrt(2),function(t,n){return jt(zt(It(t),t),n)}),Un=function(t,n){if(t.length>8)return t.map(function(t,n){return n});var e=t.map(function(t){return n.map(function(n){return Xt(t,n)})});return Vt(t,n,e)};t.interpolate=Fn,t.separate=Yt,t.combine=Gt,t.interpolateAll=Ot,t.splitPathString=N,t.toPathString=H,t.fromCircle=Ht,t.toCircle=Nt,t.fromRect=Qt,t.toRect=Ut,Object.defineProperty(t,"__esModule",{value:!0})});

},{}],"graphic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flubber = require("flubber");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function resize() {}

function init() {
  Promise.all([d3.dsv(",", "assets/data/ranking.csv", function (d) {
    return {
      country: d.country,
      search: +d.search,
      tele: +d.tele,
      overall: +d.overall
    };
  }), d3.json('assets/data/eurovis-countries-simplified-sanmarino.geojson')]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        rankingdata = _ref2[0],
        geodata = _ref2[1];

    /**RANKING **/
    var rankingHeight = 800;
    var rankingWidth = 600;
    var rankingMargin = {
      top: 40,
      left: 100
    };
    var rankingSvg = d3.select("#ranking").attr("width", rankingWidth).attr("height", rankingHeight);
    var filter = rankingSvg.append("defs").append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stDeviation", 2.5).attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    var countryScale = d3.scaleBand().domain(rankingdata.map(function (d) {
      return d.country;
    })).range([rankingMargin.top, rankingHeight]);
    var voteScale = d3.scaleBand().domain(["search", "tele", "overall"]).range([rankingMargin.left, rankingWidth]);
    rankingSvg.selectAll('text.header').data(["search", "tele", "overall"]).enter().append("text").attr('x', function (d) {
      return voteScale(d);
    }).attr('y', 20).text(function (d) {
      return d;
    }).attr("class", function (d) {
      return "label-".concat(d);
    }).attr('text-anchor', 'middle').attr('font-size', '16px').attr('font-family', 'Rubik');
    var countryheight = 24; //Connecting lines

    rankingSvg.selectAll("line.connection").data(rankingdata).enter().append("line").attr("class", "connection").attr('x1', voteScale("search")).attr('x2', voteScale("overall")).attr('y1', function (d) {
      return countryScale(d.country);
    }).attr('y2', function (d) {
      return countryScale(d.country);
    }).style("stroke", "#cccccc").style("stroke-width", 1);
    /*var connections = svgFive.selectAll('line.connection')
        .data(rankingconnect)
        .enter().append('line')
        .attr('class', function (d) { return 'connection id-' + d.key; })
        .attr('x1', 150)
        .attr('x2', 230)
        .attr('y1', function (d) { return countryheight*d.googlerank + 18; })
        .attr('y2', function (d) { return countryheight*d.realrank + 18; })
        .style('stroke', function(d){
            return '#eeeeee';
        })
        .style('stroke-width', 2);*/
    //Left part, search results

    rankingSvg.selectAll('image.flag').data(rankingdata).enter().append('image').attr("xlink:href", function (d) {
      return 'assets/images/flags/' + d.country + '.svg';
    }).attr('x', voteScale("search") - countryheight / 2) //.attr('y', function (d, i) { return 30 + countryheight * i; })
    .attr("y", function (d) {
      return countryScale(d.country) - countryheight / 2;
    }).attr('class', function (d) {
      return 'id-' + d.Country;
    }).attr('width', countryheight - 2).attr('height', countryheight - 2).style("filter", "url('#glow')");
    rankingSvg.selectAll('image.question.tele').data(rankingdata).enter().append('image').attr("xlink:href", function (d) {
      return 'assets/images/help-circle' + '.svg';
    }).attr('x', voteScale("tele") - countryheight / 2).attr('y', function (d) {
      return countryScale(d.country) - countryheight / 2;
    }).attr('class', 'question').attr('width', countryheight - 2).attr('height', countryheight - 2);
    rankingSvg.selectAll('image.question.overall').data(rankingdata).enter().append('image').attr("xlink:href", function (d) {
      return 'assets/images/help-circle' + '.svg';
    }).attr('x', voteScale("overall") - countryheight / 2).attr('y', function (d) {
      return countryScale(d.country) - countryheight / 2;
    }).attr('class', 'question').attr('width', countryheight - 2).attr('height', countryheight - 2);
    rankingSvg.selectAll('text.countrylabel').data(rankingdata).enter().append('text').attr('x', 0).attr('y', function (d) {
      return countryScale(d.country);
    }).attr("dy", "0.3em").style('font-family', 'Rubik').style('font-size', '14px').attr('class', function (d) {
      return 'countrylabel id-' + d.country;
    }).attr('id', function (d) {
      return d.key;
    }) //.style('fill', '#000037')
    .html(function (d, i) {
      return i + 1 + '. ' + d.country;
    });
    /** MAP **/

    var mapWidth = 800;
    var mapHeight = 800;
    var mapSvg = d3.select("#map").attr("width", mapWidth).attr("height", mapHeight);
    var projection = d3.geoMercator().center([20, 51]).scale(mapWidth * 0.65).translate([mapWidth / 2, mapHeight / 2]);
    var path = d3.geoPath().projection(projection);
    mapSvg.selectAll('path').data(geodata.features).enter().append('path').attr("id", function (d) {
      return d.properties.ISO_A3;
    }).attr("class", "country").attr('d', path).style("fill", "#cccccc").style("stroke", "#ffffff").style("stroke-width", 1);
    var grid = {
      ALB: {
        x: 5,
        y: 8
      },
      ARM: {
        x: 9,
        y: 6
      },
      AUS: {
        x: 9,
        y: 9
      },
      AUT: {
        x: 4,
        y: 5
      },
      AZE: {
        x: 9,
        y: 5
      },
      BEL: {
        x: 2,
        y: 3
      },
      BGR: {
        x: 7,
        y: 6
      },
      BIH: {
        x: 5,
        y: 6
      },
      BLR: {
        x: 6,
        y: 3
      },
      CHE: {
        x: 3,
        y: 4
      },
      CYP: {
        x: 8,
        y: 7
      },
      CZE: {
        x: 4,
        y: 4
      },
      DEU: {
        x: 4,
        y: 3
      },
      DNK: {
        x: 4,
        y: 2
      },
      ESP: {
        x: 1,
        y: 5
      },
      EST: {
        x: 6,
        y: 1
      },
      FIN: {
        x: 6,
        y: 0
      },
      FRA: {
        x: 1,
        y: 4
      },
      GBR: {
        x: 1,
        y: 2
      },
      GEO: {
        x: 8,
        y: 5
      },
      GRC: {
        x: 6,
        y: 8
      },
      HUN: {
        x: 5,
        y: 5
      },
      HRV: {
        x: 4,
        y: 6
      },
      IRL: {
        x: 0,
        y: 2
      },
      ISL: {
        x: 0,
        y: 0
      },
      ISR: {
        x: 8,
        y: 8
      },
      ITA: {
        x: 3,
        y: 5
      },
      KOS: {
        x: 6,
        y: 7
      },
      LTU: {
        x: 6,
        y: 2
      },
      LUX: {
        x: 2,
        y: 4
      },
      LVA: {
        x: 7,
        y: 2
      },
      MDA: {
        x: 7,
        y: 5
      },
      MKD: {
        x: 7,
        y: 7
      },
      MLT: {
        x: 1,
        y: 7
      },
      MNE: {
        x: 5,
        y: 7
      },
      NLD: {
        x: 3,
        y: 3
      },
      NOR: {
        x: 4,
        y: 0
      },
      POL: {
        x: 5,
        y: 3
      },
      PRT: {
        x: 0,
        y: 5
      },
      ROU: {
        x: 6,
        y: 5
      },
      RUS: {
        x: 7,
        y: 3
      },
      SMR: {
        x: 2,
        y: 6
      },
      SRB: {
        x: 6,
        y: 6
      },
      SVK: {
        x: 5,
        y: 4
      },
      SVN: {
        x: 3,
        y: 6
      },
      SWE: {
        x: 5,
        y: 0
      },
      UKR: {
        x: 6,
        y: 4
      },
      TUR: {
        x: 8,
        y: 6
      }
    };
    var rectDim = 48;

    function rectToPath(x, y, dim) {
      return "M".concat(x, ",").concat(y, " L").concat(x + dim, ",").concat(y, " L").concat(x + dim, ",").concat(y + dim, " L").concat(x, ",").concat(y + dim);
    }

    d3.select("input#mapswitch").on("change", function () {
      if (this.checked) {
        mapSvg.selectAll("path.country").transition().duration(2000).attrTween("d", function (d) {
          console.log(rectToPath(grid[d3.select(this).attr("id")].x, grid[d3.select(this).attr("id")].y, rectDim));
          return (0, _flubber.combine)((0, _flubber.splitPathString)(d3.select(this).attr("d")), rectToPath(grid[d3.select(this).attr("id")].x, grid[d3.select(this).attr("id")].y, rectDim));
          /*return toRect(d3.select(this).attr("d"),
          grid[d3.select(this).attr("id")].x * rectDim,
          grid[d3.select(this).attr("id")].y * rectDim,
          rectDim,
          rectDim);*/
        });
      }

      if (!this.checked) {
        mapSvg.selectAll("path.country").transition().duration(2000).attrTween("d", function (d) {
          return (0, _flubber.interpolate)(d3.select(this).attr("d"), path(d.geometry));
        });
      }
    });
  });
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{"flubber":"yVOz"}],"v9Q8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fallbackData = [{
  image: '2018_02_stand-up',
  url: '2018/02/stand-up',
  hed: 'The Structure of Stand-Up Comedy'
}, {
  image: '2018_04_birthday-paradox',
  url: '2018/04/birthday-paradox',
  hed: 'The Birthday Paradox Experiment'
}, {
  image: '2018_11_boy-bands',
  url: '2018/11/boy-bands',
  hed: 'Internet Boy Band Database'
}, {
  image: '2018_08_pockets',
  url: '2018/08/pockets',
  hed: 'Women’s Pockets are Inferior'
}];
var storyData = null;

function loadJS(src, cb) {
  var ref = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  if (cb && typeof cb === 'function') {
    script.onload = cb;
  }

  return script;
}

function loadStories(cb) {
  var request = new XMLHttpRequest();
  var v = Date.now();
  var url = "https://pudding.cool/assets/data/stories.json?v=".concat(v);
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb(data);
    } else cb(fallbackData);
  };

  request.onerror = function () {
    return cb(fallbackData);
  };

  request.send();
}

function createLink(d) {
  return "\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(d.url, "' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(d.image, ".jpg' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
}

function recircHTML() {
  var url = window.location.href;
  var html = storyData.filter(function (d) {
    return !url.includes(d.url);
  }).slice(0, 4).map(createLink).join('');
  d3.select('.pudding-footer .footer-recirc__articles').html(html);
}

function setupSocialJS() {
  // facebook
  (function (d, s, id) {
    var js;
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  loadJS('https://platform.twitter.com/widgets.js');
}

function init() {
  loadStories(function (data) {
    storyData = data;
    recircHTML();
    setupSocialJS();
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _footer = _interopRequireDefault(require("./footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
var $body = d3.select('body');
var previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  var width = $body.node().offsetWidth;

  if (previousWidth !== width) {
    previousWidth = width;

    _graphic.default.resize();
  }
}

function setupStickyHeader() {
  var $header = $body.select('header');

  if ($header.classed('is-sticky')) {
    var $menu = $body.select('.header__menu');
    var $toggle = $body.select('.header__toggle');
    $toggle.on('click', function () {
      var visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function init() {
  // add mobile class to body tag
  $body.classed('is-mobile', _isMobile.default.any()); // setup resize event

  window.addEventListener('resize', (0, _lodash.default)(resize, 150)); // setup sticky header menu

  setupStickyHeader(); // kick off graphic code

  _graphic.default.init();

  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"graphic.js","./footer":"v9Q8"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map