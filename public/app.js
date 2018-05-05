(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement)
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":5,"hyperx":8,"on-load":11}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
/* global HTMLElement */

'use strict'

module.exports = function emptyElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }

  var node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

},{}],5:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":2}],6:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],8:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12

module.exports = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":7}],9:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],10:[function(require,module,exports){
'use strict';

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var actualHasAttributeNS;

if (testEl.hasAttributeNS) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    actualHasAttributeNS = function(el, namespaceURI, name) {
        return el.getAttributeNode(namespaceURI, name) != null;
    };
}

var hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            if (newValue === '' && fromEl.firstChild.nodeValue === fromEl.placeholder) {
                return;
            }

            fromEl.firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!hasAttributeNS(toEl, null, 'multiple')) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = toEl.firstChild;
            while(curChild) {
                var nodeName = curChild.nodeName;
                if (nodeName && nodeName.toUpperCase() === 'OPTION') {
                    if (hasAttributeNS(curChild, null, 'selected')) {
                        selectedIndex = i;
                        break;
                    }
                    i++;
                }
                curChild = curChild.nextSibling;
            }

            fromEl.selectedIndex = i;
        }
    }
};

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = {};
        var keyedRemovalList;

        function addKeyedRemoval(key) {
            if (keyedRemovalList) {
                keyedRemovalList.push(key);
            } else {
                keyedRemovalList = [key];
            }
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);
            var curFromNodeKey;

            if (toElKey) {
                // If an element with an ID is being morphed then it is will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
                return;
            }

            if (!childrenOnly) {
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                morphAttrs(fromEl, toEl);
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
                var curToNodeChild = toEl.firstChild;
                var curFromNodeChild = fromEl.firstChild;
                var curToNodeKey;

                var fromNextSibling;
                var toNextSibling;
                var matchingFromEl;

                outer: while (curToNodeChild) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);

                    while (curFromNodeChild) {
                        fromNextSibling = curFromNodeChild.nextSibling;

                        if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        curFromNodeKey = getNodeKey(curFromNodeChild);

                        var curFromNodeType = curFromNodeChild.nodeType;

                        var isCompatible = undefined;

                        if (curFromNodeType === curToNodeChild.nodeType) {
                            if (curFromNodeType === ELEMENT_NODE) {
                                // Both nodes being compared are Element nodes

                                if (curToNodeKey) {
                                    // The target node has a key so we want to match it up with the correct element
                                    // in the original DOM tree
                                    if (curToNodeKey !== curFromNodeKey) {
                                        // The current element in the original DOM tree does not have a matching key so
                                        // let's check our lookup to see if there is a matching element in the original
                                        // DOM tree
                                        if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                            if (curFromNodeChild.nextSibling === matchingFromEl) {
                                                // Special case for single element removals. To avoid removing the original
                                                // DOM node out of the tree (since that can break CSS transitions, etc.),
                                                // we will instead discard the current node and wait until the next
                                                // iteration to properly match up the keyed target element with its matching
                                                // element in the original tree
                                                isCompatible = false;
                                            } else {
                                                // We found a matching keyed element somewhere in the original DOM tree.
                                                // Let's moving the original DOM node into the current position and morph
                                                // it.

                                                // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                                // the `removeNode()` function for the node that is being discarded so that
                                                // all lifecycle hooks are correctly invoked
                                                fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                                fromNextSibling = curFromNodeChild.nextSibling;

                                                if (curFromNodeKey) {
                                                    // Since the node is keyed it might be matched up later so we defer
                                                    // the actual removal to later
                                                    addKeyedRemoval(curFromNodeKey);
                                                } else {
                                                    // NOTE: we skip nested keyed nodes from being removed since there is
                                                    //       still a chance they will be matched up later
                                                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                                }

                                                curFromNodeChild = matchingFromEl;
                                            }
                                        } else {
                                            // The nodes are not compatible since the "to" node has a key and there
                                            // is no matching keyed node in the source tree
                                            isCompatible = false;
                                        }
                                    }
                                } else if (curFromNodeKey) {
                                    // The original has a key
                                    isCompatible = false;
                                }

                                isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                                if (isCompatible) {
                                    // We found compatible DOM elements so transform
                                    // the current "from" node to match the current
                                    // target DOM node.
                                    morphEl(curFromNodeChild, curToNodeChild);
                                }

                            } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                                // Both nodes being compared are Text or Comment nodes
                                isCompatible = true;
                                // Simply update nodeValue on the original node to
                                // change the text value
                                curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                            }
                        }

                        if (isCompatible) {
                            // Advance both the "to" child and the "from" child since we found a match
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }

                        // No compatible match so remove the old node from the DOM and continue trying to find a
                        // match in the original DOM. However, we only do this if the from node is not keyed
                        // since it is possible that a keyed node might match up with a node somewhere else in the
                        // target tree and we don't want to discard it just yet since it still might find a
                        // home in the final DOM tree. After everything is done we will remove any keyed nodes
                        // that didn't find a home
                        if (curFromNodeKey) {
                            // Since the node is keyed it might be matched up later so we defer
                            // the actual removal to later
                            addKeyedRemoval(curFromNodeKey);
                        } else {
                            // NOTE: we skip nested keyed nodes from being removed since there is
                            //       still a chance they will be matched up later
                            removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                        }

                        curFromNodeChild = fromNextSibling;
                    }

                    // If we got this far then we did not find a candidate match for
                    // our "to node" and we exhausted all of the children "from"
                    // nodes. Therefore, we will just append the current "to" node
                    // to the end
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                        fromEl.appendChild(matchingFromEl);
                        morphEl(matchingFromEl, curToNodeChild);
                    } else {
                        var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                        if (onBeforeNodeAddedResult !== false) {
                            if (onBeforeNodeAddedResult) {
                                curToNodeChild = onBeforeNodeAddedResult;
                            }

                            if (curToNodeChild.actualize) {
                                curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                            }
                            fromEl.appendChild(curToNodeChild);
                            handleNodeAdded(curToNodeChild);
                        }
                    }

                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                }

                // We have processed all of the "to nodes". If curFromNodeChild is
                // non-null then we still have some from nodes left over that need
                // to be removed
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }
                    curFromNodeChild = fromNextSibling;
                }
            }

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphEl(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    morphedNode.nodeValue = toNode.nodeValue;
                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],11:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":5,"global/window":6}],12:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {string|!Function|!Object} path
   * @param {Function=} fn
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(/** @type {string} */ (path));
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {string}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {string} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} dispatch
   * @param {boolean=} push
   * @return {!Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object=} state
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {string} from - if param 'to' is undefined redirects to 'from'
   * @param {string=} to
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(/** @type {!string} */ (to));
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {string} path
   * @param {Object=} state
   * @param {boolean=} init
   * @param {boolean=} dispatch
   * @return {!Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Context} ctx
   * @api private
   */
  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */
  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {string} val - URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @constructor
   * @param {string} path
   * @param {Object=} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @constructor
   * @param {string} path
   * @param {Object=} options
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {string} path
   * @param {Object} params
   * @return {boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    // use shadow dom when available
    var el = e.path ? e.path[0] : e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":3,"path-to-regexp":13}],13:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":9}],14:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    var oldValue = f.value
    var newValue = t.value
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (!newValue) {
        t.value = f.value
      } else if (newValue !== oldValue) {
        f.value = newValue
      }
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":15,"bel":1,"morphdom":10}],15:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],16:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <article class="tercio album">\n    <div class="imagenCentral">Soy una imagen central</div>\n    <div class="galeria">\n      <a href="" class="miniatura">soy una miniatura</a>\n      <a href="" class="miniatura">soy una miniatura</a>\n      <a href="" class="miniatura">soy una miniatura</a>\n    </div>\n  </article>\n '], ['\n  <article class="tercio album">\n    <div class="imagenCentral">Soy una imagen central</div>\n    <div class="galeria">\n      <a href="" class="miniatura">soy una miniatura</a>\n      <a href="" class="miniatura">soy una miniatura</a>\n      <a href="" class="miniatura">soy una miniatura</a>\n    </div>\n  </article>\n ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (imagenes) {
  var el = (0, _yoYo2.default)(_templateObject);
  return el;
};

},{"yo-yo":14}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  <a class="tarjeta" href="/', '/', '">\n    <div class="tarjetaImagen" style="background: url(\'/images/', '\'); background-size: cover"></div>\n    <div class="tarjetaInfo">\n     <hgroup>\n      <h2>', '</h2>\n      <h4>Regi\xF3n: ', '</h4>\n      <h4>', '</h4>\n     </hgroup>\n    </div>\n  </a>\n '], ['\n  <a class="tarjeta" href="/', '/', '">\n    <div class="tarjetaImagen" style="background: url(\'/images/', '\'); background-size: cover"></div>\n    <div class="tarjetaInfo">\n     <hgroup>\n      <h2>', '</h2>\n      <h4>Regi\xF3n: ', '</h4>\n      <h4>', '</h4>\n     </hgroup>\n    </div>\n  </a>\n ']);

exports.default = function (seccion, articulo) {
  var el = (0, _yoYo2.default)(_templateObject, seccion, articulo.url, articulo.miniatura, articulo.nombre, articulo.region, articulo.dato);
  return el;
};

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

},{"yo-yo":14}],18:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/contacto', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":19,"empty-element":4,"page":12}],19:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="contacto completa">\n    <article class="contactoInfo rosaTrans">\n      <div>\n        <h2>Cont\xE1ctenos:</h2>\n        <h4>Email:</h4>\n        <p>info@folkinlovepty.com</p>\n        <h4>tel\xE9fono:</h4>\n        <p>6945-5931</p>\n        <form action="/contacto/send" method="post">\n          <input type="text" name="nombre" placeholder="Nombre">\n          <input type="text" name="email" placeholder="Email">\n          <input type="text" name="asunto" placeholder="Asunto">\n          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>\n          <input type="submit" name="submit" value="Enviar" class="btn negro">\n        </form>\n      </div>\n    </article>\n  </section>\n'], ['\n  <section class="contacto completa">\n    <article class="contactoInfo rosaTrans">\n      <div>\n        <h2>Cont\xE1ctenos:</h2>\n        <h4>Email:</h4>\n        <p>info@folkinlovepty.com</p>\n        <h4>tel\xE9fono:</h4>\n        <p>6945-5931</p>\n        <form action="/contacto/send" method="post">\n          <input type="text" name="nombre" placeholder="Nombre">\n          <input type="text" name="email" placeholder="Email">\n          <input type="text" name="asunto" placeholder="Asunto">\n          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>\n          <input type="submit" name="submit" value="Enviar" class="btn negro">\n        </form>\n      </div>\n    </article>\n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],20:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/confirmacion', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":21,"empty-element":4,"page":12}],21:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <articulo className="completa blanco texto">\n  <hgroup>\n   <h2>Su Mensaje Ha Sido Enviado</h2>\n  </hgroup>\n </articulo>\n'], ['\n <articulo className="completa blanco texto">\n  <hgroup>\n   <h2>Su Mensaje Ha Sido Enviado</h2>\n  </hgroup>\n </articulo>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],22:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/error', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":23,"empty-element":4,"page":12}],23:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <articulo className="completa texto rosa">\n  <hgroup>\n    <h2>Ha habido Un Error</h2>\n  </hgroup> \n </articulo>\n'], ['\n <articulo className="completa texto rosa">\n  <hgroup>\n    <h2>Ha habido Un Error</h2>\n  </hgroup> \n </articulo>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],24:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _danzas = require('../danzas/danzas');

var _danzas2 = _interopRequireDefault(_danzas);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/danzas/:url', _header2.default, _footer2.default, function (ctx, next) {
  var baile = _danzas2.default.find(function (danza) {
    return danza.url === ctx.params.url;
  });
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild((0, _template2.default)(baile));
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../danzas/danzas":26,"../footer":29,"../header":32,"../header/functions":31,"./template":25,"empty-element":4,"page":12}],25:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <main>\n  <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n    <article class="mitad rosaTrans">\n    <hgroup>\n      <h1>', '</h1>\n      <p>', '</p>\n    </hgroup>\n    </article>\n  </section>\n  <section>\n    <article class="tercio imagen" style="background: url(\'', '\'); background-size: cover;"></article>\n    <article class="dosTercios blanco texto">\n    ', '\n    </article>\n  </section>\n  <section>\n    <article class="completa texto info blanco">\n    ', '\n    </article>\n  </section>\n  <section>\n    <article class="tercio blanco pasos">\n    <hgroup>\n      <h2>Pasos de ', '</h2>\n      <ul>\n      ', '\n      </ul>\n    </hgroup>\n    </article>\n    <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n  </section>\n  <article class="completa texto info rosa">\n      ', '\n  </article>\n</main>\n '], ['\n <main>\n  <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n    <article class="mitad rosaTrans">\n    <hgroup>\n      <h1>', '</h1>\n      <p>', '</p>\n    </hgroup>\n    </article>\n  </section>\n  <section>\n    <article class="tercio imagen" style="background: url(\'', '\'); background-size: cover;"></article>\n    <article class="dosTercios blanco texto">\n    ', '\n    </article>\n  </section>\n  <section>\n    <article class="completa texto info blanco">\n    ', '\n    </article>\n  </section>\n  <section>\n    <article class="tercio blanco pasos">\n    <hgroup>\n      <h2>Pasos de ', '</h2>\n      <ul>\n      ', '\n      </ul>\n    </hgroup>\n    </article>\n    <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n  </section>\n  <article class="completa texto info rosa">\n      ', '\n  </article>\n</main>\n ']),
    _templateObject2 = _taggedTemplateLiteral(['<li>', '</li>'], ['<li>', '</li>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (danza) {
  var el = (0, _yoYo2.default)(_templateObject, danza.portadaImagen, danza.nombre, danza.reseña, danza.introImagen, danza.intro, danza.descripcion, danza.nombre, danza.pasos.map(function (paso) {
    return (0, _yoYo2.default)(_templateObject2, paso);
  }), danza.pasosImagen, danza.referencias);
  return el;
};

},{"yo-yo":14}],26:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n   <hgroup>\n    <p><i>\u201CDespu\xE9s del tamborito, el baile de parejas individual m\xE1s atractivo es el PUNTO en el cual la pareja hace gala de donaire, precisi\xF3n y gracia. Parece de pura ascendencia hisp\xE1nica a juzgar por la m\xFAsica que lo acompa\xF1a.</i></p>\n    <p><i>El baile de PUNTO no es baile de toda una noche como puede serio el Tamborito y la Cumbia; el Pind\xEDn y la Mejorana. Se baila m\xE1s bien como una demostraci\xF3n atractiva entre los minutos de descanso de un baile, para regalo de los ojos y goce del esp\xEDritu de la concurrencia a una fiesta.\u201D</i></p>\n    <p>Dora P\xE9rez de Zarate</p>\n   </hgroup>'], ['\n   <hgroup>\n    <p><i>\u201CDespu\xE9s del tamborito, el baile de parejas individual m\xE1s atractivo es el PUNTO en el cual la pareja hace gala de donaire, precisi\xF3n y gracia. Parece de pura ascendencia hisp\xE1nica a juzgar por la m\xFAsica que lo acompa\xF1a.</i></p>\n    <p><i>El baile de PUNTO no es baile de toda una noche como puede serio el Tamborito y la Cumbia; el Pind\xEDn y la Mejorana. Se baila m\xE1s bien como una demostraci\xF3n atractiva entre los minutos de descanso de un baile, para regalo de los ojos y goce del esp\xEDritu de la concurrencia a una fiesta.\u201D</i></p>\n    <p>Dora P\xE9rez de Zarate</p>\n   </hgroup>']),
    _templateObject2 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF3n del Punto Sante\xF1o</h2>\n    <p> <b>El punto</b> consta de una serie de pasos (que describiremos a continuaci\xF3n) los cuales se repiten 3 veces <i>"tiempos"</i> en el mismo orden. A cada repetici\xF3n le llamamos tiempos o vueltas musicales. Una de sus caracter\xEDsticas particulares se lleva a cabo durante el zapateo ya que en cada uno (son 3) la pareja bailar\xE1 en una direcci\xF3n diferente. En el primer tiempo la pareja realizar\xE1 el zapateo frente a frente, en el segundo tiempo se dirigir\xE1n hacia los m\xFAsicos (es com\xFAn en los conjuntos folkl\xF3ricos dirigir el zapateo en otra direcci\xF3n cuando no se baila con m\xFAsicos en vivo) y en el \xFAltimo tiempo se dirige hacia el p\xFAblico.</p>\n    <p>Cada paso durante la ejecuci\xF3n del Punto Sante\xF1o no tiene una duraci\xF3n definida, es el cambio de la m\xFAsica la que indicar\xE1 el paso a la siguiente figura.</p>\n    <p>Inicia con <b>El PASEO</b>, es el paso de baile en el que el var\xF3n y la dama describen un amplio c\xEDrculo, ocupando cada uno de los extremos.</p>\n    <p>Al cambio de la m\xFAsica se ejecuta una ca\xEDda y vuelta pasando al <b>ZAPATEO</b> en el cual los bailadores, dependiendo del tiempo lo ejecutan, frente a frente, a la m\xFAsica o al p\xFAblico.</p>\n    <p>En seguida, otro cambio de la m\xFAsica les advierte que deben realizar el tercer movimiento, <b>EL ESCOBILLAO</b>, que separa ampliamente a la pareja y  se ejecuta con r\xE1pidos movimientos de los pies hacia atr\xE1s.</p>\n    <p>Por \xFAltimo, tambi\xE9n a indicaci\xF3n de la m\xFAsica, se realiza una caida y vuelta para pasar a la <b>SEGUIDILLA</b> con la cual la pareja se desplaza acerc\xE1ndose el uno al otro para girar con mucha serenidad y finura en el centro del c\xEDrculo hasta que se indique el cambio y comience con una vuelta paseada el siguiente tiempo con el <b>PASEO</b>.</p>\n    <p>Al finalizar el tercer tiempo, la mujer realiza un medio giro para quedar frente al p\xFAblico en un cierre que puede ser con el parejo arrodillado o de pi\xE9 tapandole el rostro con el sombrero simulando un beso.</p>\n    <p>Es Com\xFAn que al ver a la pareja ejecutar tan hermoso baile los espectadores lancen monedas por el suelo; costumbre que hoy podemos ver en las fiestas cuando las quincea\xF1eras o reinas bailan el punto.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF3n del Punto Sante\xF1o</h2>\n    <p> <b>El punto</b> consta de una serie de pasos (que describiremos a continuaci\xF3n) los cuales se repiten 3 veces <i>"tiempos"</i> en el mismo orden. A cada repetici\xF3n le llamamos tiempos o vueltas musicales. Una de sus caracter\xEDsticas particulares se lleva a cabo durante el zapateo ya que en cada uno (son 3) la pareja bailar\xE1 en una direcci\xF3n diferente. En el primer tiempo la pareja realizar\xE1 el zapateo frente a frente, en el segundo tiempo se dirigir\xE1n hacia los m\xFAsicos (es com\xFAn en los conjuntos folkl\xF3ricos dirigir el zapateo en otra direcci\xF3n cuando no se baila con m\xFAsicos en vivo) y en el \xFAltimo tiempo se dirige hacia el p\xFAblico.</p>\n    <p>Cada paso durante la ejecuci\xF3n del Punto Sante\xF1o no tiene una duraci\xF3n definida, es el cambio de la m\xFAsica la que indicar\xE1 el paso a la siguiente figura.</p>\n    <p>Inicia con <b>El PASEO</b>, es el paso de baile en el que el var\xF3n y la dama describen un amplio c\xEDrculo, ocupando cada uno de los extremos.</p>\n    <p>Al cambio de la m\xFAsica se ejecuta una ca\xEDda y vuelta pasando al <b>ZAPATEO</b> en el cual los bailadores, dependiendo del tiempo lo ejecutan, frente a frente, a la m\xFAsica o al p\xFAblico.</p>\n    <p>En seguida, otro cambio de la m\xFAsica les advierte que deben realizar el tercer movimiento, <b>EL ESCOBILLAO</b>, que separa ampliamente a la pareja y  se ejecuta con r\xE1pidos movimientos de los pies hacia atr\xE1s.</p>\n    <p>Por \xFAltimo, tambi\xE9n a indicaci\xF3n de la m\xFAsica, se realiza una caida y vuelta para pasar a la <b>SEGUIDILLA</b> con la cual la pareja se desplaza acerc\xE1ndose el uno al otro para girar con mucha serenidad y finura en el centro del c\xEDrculo hasta que se indique el cambio y comience con una vuelta paseada el siguiente tiempo con el <b>PASEO</b>.</p>\n    <p>Al finalizar el tercer tiempo, la mujer realiza un medio giro para quedar frente al p\xFAblico en un cierre que puede ser con el parejo arrodillado o de pi\xE9 tapandole el rostro con el sombrero simulando un beso.</p>\n    <p>Es Com\xFAn que al ver a la pareja ejecutar tan hermoso baile los espectadores lancen monedas por el suelo; costumbre que hoy podemos ver en las fiestas cuando las quincea\xF1eras o reinas bailan el punto.</p>\n   </hgroup>\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n  <hgroup>\n   <h2>Referencias Sobre El Punto Sante\xF1o</h2>\n   <ul>\n   <li>Extracto de "EL PUNTO, LA DENESA, EL ATRAVESADO Y OTROS BAILES ORQUESTADOS". Dora P\xE9rez de Z\xE1rate. 198</li>\n   </ul>\n  </hgroup>\n  '], ['\n  <hgroup>\n   <h2>Referencias Sobre El Punto Sante\xF1o</h2>\n   <ul>\n   <li>Extracto de "EL PUNTO, LA DENESA, EL ATRAVESADO Y OTROS BAILES ORQUESTADOS". Dora P\xE9rez de Z\xE1rate. 198</li>\n   </ul>\n  </hgroup>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');

module.exports = [{
  nombre: 'El Punto Santeño',
  url: 'El-Punto-Santeno',
  region: 'Azuero',
  dato: 'Vestuario: Pollera De Lujo',
  miniatura: 'puntoMiniatura.jpg',
  imagenOpenGraph: 'puntoOpenGraph.jpg',
  reseña: 'El Punto Santeño es un género musical y a su vez un baile. Es considerado como uno de los más bellos y elegantes de todo el Istmo de Panamá; es ejecutado por una sola pareja y tiene como característica principal la elegancia y el donaire con la que el hombre y la mujer se mueven durante su ejecución.',
  portadaImagen: '/images/puntoPortada.jpg',
  intro: yo(_templateObject),
  introImagen: '/images/puntoIntro.jpg',
  descripcion: yo(_templateObject2),
  pasos: ['Paseo', 'Caida y vuelta', 'Zapateo', 'Escobillao', 'Seguidilla', 'Vuelta Paseada'],
  pasosImagen: '/images/puntoPasos.jpg',
  referencias: yo(_templateObject3)
}];

},{"yo-yo":14}],27:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/danzas', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":28,"empty-element":4,"page":12}],28:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n <section class="portada" id="danzasPortada">\n  <picture class="banner">\n   <source media="(min-width: 800px)" srcset="images/danzas-full.jpg">\n   <source media="(min-width: 600px)" srcset="images/danzas-tab.jpg">\n   <img class="completa" src="images/danzas-cel.jpg" alt="Bailes T\xEDpicos de Panam\xE1, Baile Congo">\n  </picture>\n  <article className="completa negroTrans">\n   <hgroup>\n    <h1>Bailes T\xEDpicos de Panam\xE1</h1>\n    <p><b>Las danzas folkl\xF3ricas</b> paname\xF1as expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colaci\xF3n <b>costumbres</b>, rituales religiosos y celebraciones.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaCont">\n   ', '\n  </div> \n </section>\n <section class="completa blanco videoPasos">\n  <h2>Pasos B\xE1sicos de los Danzas T\xEDpicas Paname\xF1as</h2>\n  <iframe src="https://www.youtube.com/embed/x7HdglWtujg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n </section>\n</main>\n'], ['\n<main>\n <section class="portada" id="danzasPortada">\n  <picture class="banner">\n   <source media="(min-width: 800px)" srcset="images/danzas-full.jpg">\n   <source media="(min-width: 600px)" srcset="images/danzas-tab.jpg">\n   <img class="completa" src="images/danzas-cel.jpg" alt="Bailes T\xEDpicos de Panam\xE1, Baile Congo">\n  </picture>\n  <article className="completa negroTrans">\n   <hgroup>\n    <h1>Bailes T\xEDpicos de Panam\xE1</h1>\n    <p><b>Las danzas folkl\xF3ricas</b> paname\xF1as expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colaci\xF3n <b>costumbres</b>, rituales religiosos y celebraciones.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaCont">\n   ', '\n  </div> \n </section>\n <section class="completa blanco videoPasos">\n  <h2>Pasos B\xE1sicos de los Danzas T\xEDpicas Paname\xF1as</h2>\n  <iframe src="https://www.youtube.com/embed/x7HdglWtujg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n </section>\n</main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('../componentes/tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

var _danzas = require('./danzas');

var _danzas2 = _interopRequireDefault(_danzas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _danzas2.default.map(function (danza) {
  return (0, _tarjeta2.default)('danzas', danza);
}));

},{"../componentes/tarjeta":17,"./danzas":26,"yo-yo":14}],29:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function footer(ctx, next) {
  var pie = document.getElementById('footer');
  (0, _emptyElement2.default)(pie).appendChild(_template2.default);
  next();
};

},{"./template":30,"empty-element":4}],30:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<footer>\n <div class="footerLeft">\n  <a class="logo"></a>\n </div>\n <div class="footerRight">\n  <div class="footerRightUp">\n   <h3>Cont\xE1ctenos:</h3>\n   <ul>\n    <li>Email: info@folkinlovepty.com</li>\n    <li>Tel\xE9fono: 6945-5931</li>\n    <li>Direcci\xF3n: Calle 49A<br>\n    El Cangrejo, Bella Vista</li>\n   </ul>\n  </div>\n  <div class="footerRightDown">\n   <a href="https://facebook.com/folkinlovepty" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>\n   <a href="https://instagram.com/folkinlovepty" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>\n   <a href="mailto: info@folkinlovepty.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>\n  </div>\n </div>\n</footer>\n'], ['\n<footer>\n <div class="footerLeft">\n  <a class="logo"></a>\n </div>\n <div class="footerRight">\n  <div class="footerRightUp">\n   <h3>Cont\xE1ctenos:</h3>\n   <ul>\n    <li>Email: info@folkinlovepty.com</li>\n    <li>Tel\xE9fono: 6945-5931</li>\n    <li>Direcci\xF3n: Calle 49A<br>\n    El Cangrejo, Bella Vista</li>\n   </ul>\n  </div>\n  <div class="footerRightDown">\n   <a href="https://facebook.com/folkinlovepty" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>\n   <a href="https://instagram.com/folkinlovepty" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>\n   <a href="mailto: info@folkinlovepty.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>\n  </div>\n </div>\n</footer>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],31:[function(require,module,exports){
'use strict';

var scrollFunction = function scrollFunction() {
  var altura = window.innerWidth * 0.19;
  var headerContainer = document.getElementById('headerContainer');
  if (window.scrollY > altura) {
    headerContainer.classList.add('blanco');
  }if (window.scrollY < altura) {
    headerContainer.classList.remove('blanco');
  }
};

var noScrollFunction = function noScrollFunction(ctx, next) {
  removeEventListener('scroll', scrollFunction);
  var headerContainer = document.getElementById('headerContainer');
  headerContainer.classList.add('blanco');
  next();
};
var navegacion = function navegacion() {
  var nav = document.getElementById('nav');
  nav.classList.toggle('hidden');
};

module.exports = { scrollFunction: scrollFunction, noScrollFunction: noScrollFunction, navegacion: navegacion };

},{}],32:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function header(ctx, next) {
  var container = document.getElementById('header');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
  next();
};

},{"./template":33,"empty-element":4}],33:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<header id= "headerContainer">\n <a href="/" class="logoContainer">\n   <img src="images/folkInLove-logo.png" alt="logo de Folk in Love Pty" class=\'logo\'>\n   <img src="images/folkInLove-letras-negro.png" alt="Tipo de Folk in Love Pty" class=\'tipo\'>\n </a>\n <nav id="nav" class="nav hidden">\n   <a href="/" onclick=', '>Inicio</a>\n   <a href="/danzas" onclick=', '>Danzas</a>\n   <a href="/vestuarios" onclick=', '>Vestuarios</a>\n   <a href="/tienda" onclick=', '>Productos y Servicios</a>\n   <a href="/contacto" onclick=', '>Contacto</a>\n </nav>\n <a href="#" class="navButton" onclick=', '>\n   <i class="fa fa-bars" aria-hidden="true"></i>\n </a>\n</header>'], ['\n<header id= "headerContainer">\n <a href="/" class="logoContainer">\n   <img src="images/folkInLove-logo.png" alt="logo de Folk in Love Pty" class=\'logo\'>\n   <img src="images/folkInLove-letras-negro.png" alt="Tipo de Folk in Love Pty" class=\'tipo\'>\n </a>\n <nav id="nav" class="nav hidden">\n   <a href="/" onclick=', '>Inicio</a>\n   <a href="/danzas" onclick=', '>Danzas</a>\n   <a href="/vestuarios" onclick=', '>Vestuarios</a>\n   <a href="/tienda" onclick=', '>Productos y Servicios</a>\n   <a href="/contacto" onclick=', '>Contacto</a>\n </nav>\n <a href="#" class="navButton" onclick=', '>\n   <i class="fa fa-bars" aria-hidden="true"></i>\n </a>\n</header>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _functions = require('./functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion);

},{"./functions":31,"yo-yo":14}],34:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('*', function (ctx, next) {
  window.scrollTo(0, 0);
  next();
});
require('./inicio');
require('./contacto');
require('./danzas');
require('./vestuarios');
require('./danzaPage');
require('./vestuarioPage');
require('./contactoConfirmacion');
require('./contactoError');
require('./tienda');
require('./producto');

(0, _page2.default)();

},{"./contacto":18,"./contactoConfirmacion":20,"./contactoError":22,"./danzaPage":24,"./danzas":27,"./inicio":39,"./producto":41,"./tienda":44,"./vestuarioPage":48,"./vestuarios":50,"page":12}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  <section class="inicioAbout completa">\n    <article class="aboutTexto mitad blanco">\n      <hgroup>\n        <h2>\xBFQu\xE9 es Folk in love?</h2>\n        <h3>Conoce M\xE1s de las costumbres y tradiciones de Panam\xE1</h3>\n        <p>\n          En <b>Folk in love</b> nos dedicamos a la investigaci\xF3n, difusi\xF3n, promoci\xF3n y conservaci\xF3n del <b>folklore Paname\xF1o</b>, queremos ofrecer un espacio en donde se pueda encontrar informaci\xF3n de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes de la <b>Cultura de Panam\xE1</b>.\n        </p>\n        <p>\n          Buscamos realizar <b>aportes culturales</b> mediante art\xEDculos escritos, <a href="/tienda">productos</a>, <a href="/tienda/fotografia">fotograf\xEDas</a> y videos sobre los <a href="/vestuarios">vestidos</a> y <a href="/danzas">bailes t\xEDpicos</a>, <b>origen</b> de las manifestaciones folk\xF3ricas, <b>elementos</b> de las diferentes tradiciones, entre otros.\n        </p>\n      </hgroup>\n    </article>\n    <img src="images/moneda-coronada-full.jpg" alt="Joya de la Pollera, Moneda Coronada" class="aboutImagen mitad foto">\n  </section>\n'], ['\n  <section class="inicioAbout completa">\n    <article class="aboutTexto mitad blanco">\n      <hgroup>\n        <h2>\xBFQu\xE9 es Folk in love?</h2>\n        <h3>Conoce M\xE1s de las costumbres y tradiciones de Panam\xE1</h3>\n        <p>\n          En <b>Folk in love</b> nos dedicamos a la investigaci\xF3n, difusi\xF3n, promoci\xF3n y conservaci\xF3n del <b>folklore Paname\xF1o</b>, queremos ofrecer un espacio en donde se pueda encontrar informaci\xF3n de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes de la <b>Cultura de Panam\xE1</b>.\n        </p>\n        <p>\n          Buscamos realizar <b>aportes culturales</b> mediante art\xEDculos escritos, <a href="/tienda">productos</a>, <a href="/tienda/fotografia">fotograf\xEDas</a> y videos sobre los <a href="/vestuarios">vestidos</a> y <a href="/danzas">bailes t\xEDpicos</a>, <b>origen</b> de las manifestaciones folk\xF3ricas, <b>elementos</b> de las diferentes tradiciones, entre otros.\n        </p>\n      </hgroup>\n    </article>\n    <img src="images/moneda-coronada-full.jpg" alt="Joya de la Pollera, Moneda Coronada" class="aboutImagen mitad foto">\n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],36:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="inicioApoyo completa">\n    <article class="apoyoTexto mitad rosaTrans">\n      <hgroup>\n        <h2>Origen de la Identidad del Paname\xF1o</h2>\n        <h3>Historia de las Tradiciones de Panam\xE1</h3>\n        <p>\n          Gracias a su posici\xF3n estrat\xE9gica dentro de las am\xE9ricas nuestro pa\xEDs ha desarrollado una riqueza\n    \n    cultural y folkl\xF3rica inigualable. La combinacion entre las etnias ind\xEDgenas existentes antes de la\n    \n    conquista, la intromisi\xF3n europea y la llegada de los negros como esclavos ha permitido el\n    \n    enriquecimiento de la cultura de manera inigualable.\n        </p>\n        <p>\n          De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue\n    \n          aceptada y utilizada por los paname\xF1os a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso com\xFAn en toda la rep\xFAblica. Actualmente podemos ver como las etnias\n    \n          ind\xEDgenas y los grupos congos mantienen sus tradiciones permitiendo la evoluci\xF3n al tener remplazo\n    \n          generacional y danzas vivas.        </p>\n      </hgroup>\n    </article>\n  </section>\n  '], ['\n  <section class="inicioApoyo completa">\n    <article class="apoyoTexto mitad rosaTrans">\n      <hgroup>\n        <h2>Origen de la Identidad del Paname\xF1o</h2>\n        <h3>Historia de las Tradiciones de Panam\xE1</h3>\n        <p>\n          Gracias a su posici\xF3n estrat\xE9gica dentro de las am\xE9ricas nuestro pa\xEDs ha desarrollado una riqueza\n    \n    cultural y folkl\xF3rica inigualable. La combinacion entre las etnias ind\xEDgenas existentes antes de la\n    \n    conquista, la intromisi\xF3n europea y la llegada de los negros como esclavos ha permitido el\n    \n    enriquecimiento de la cultura de manera inigualable.\n        </p>\n        <p>\n          De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue\n    \n          aceptada y utilizada por los paname\xF1os a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso com\xFAn en toda la rep\xFAblica. Actualmente podemos ver como las etnias\n    \n          ind\xEDgenas y los grupos congos mantienen sus tradiciones permitiendo la evoluci\xF3n al tener remplazo\n    \n          generacional y danzas vivas.        </p>\n      </hgroup>\n    </article>\n  </section>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],37:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="portada">\n    <picture class="banner">\n      <source media="(min-width: 800px)" srcset="images/trajes-tipicos-panama-banner-full-2x.jpg">\n        <img alt="trajes tipicos de panama, pollera de lujo, pollera congo y montuna ocue\xF1a" class="completa" src="images/trajes-tipicos-panama-banner-cel.jpg">\n    </picture>\n    <articulo class="negroTrans completa texto">\n        <hgroup class="portadaTitulo">\n          <h1 class="logoLetras">\n            <span>Investigaci\xF3n y Difusi\xF3n del Folklore de Panam\xE1 - Folk in Love</span>\n          </h1>\n          <h3>La Nueva Manera de Ver el Folklore</h3>\n        </hgroup>\n    </articulo> \n  </section>\n'], ['\n  <section class="portada">\n    <picture class="banner">\n      <source media="(min-width: 800px)" srcset="images/trajes-tipicos-panama-banner-full-2x.jpg">\n        <img alt="trajes tipicos de panama, pollera de lujo, pollera congo y montuna ocue\xF1a" class="completa" src="images/trajes-tipicos-panama-banner-cel.jpg">\n    </picture>\n    <articulo class="negroTrans completa texto">\n        <hgroup class="portadaTitulo">\n          <h1 class="logoLetras">\n            <span>Investigaci\xF3n y Difusi\xF3n del Folklore de Panam\xE1 - Folk in Love</span>\n          </h1>\n          <h3>La Nueva Manera de Ver el Folklore</h3>\n        </hgroup>\n    </articulo> \n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],38:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <div class="inicioIdentidad">\n    <article class="identidadImagenes">\n      <a href="/vestuarios/Gala-Ocuena" class="identidadImagen  tercio">\n        <picture >\n          <source media="(min-width: 800px)" srcset="images/pollera-gala-ocu-identidad-full.jpg">\n          <img src="images/pollera-gala-ocu-identidad-cel.jpg" alt="Pollera de Gala Ocue\xF1a, traje tipico de la regi\xF3n de azuero, Panama" class=" tercio identidadFotos">\n        </picture>\n        \n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h5>Pollera de Gala Ocue\xF1a</h5>\n            <h6>Azuero</h6>\n          </hgroup>\n        </div>\n      </a>\n      <a href="/vestuarios/Pollera-Congo" class="identidadImagen tercio">\n        <picture>\n          <source media="(min-width: 800px)" srcset="images/pollera-congo-identidad-full.jpg">\n          <img src="images/pollera-congo-identidad-cel.jpg" alt="Pollera Congo, traje tipico de la regi\xF3n de Col\xF3n, Panama" class=" tercio identidadFotos">\n        </picture>\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h5>Pollera Congo</h5>\n            <h6>Col\xF3n</h6>\n          </hgroup>\n        </div>\n      </a>\n      <a href="/vestuarios/Pollera-De-Lujo" class="identidadImagen identidad1 tercio">\n        <picture>\n          <source media="(min-width: 800px)" srcset="images/pollera-lujo-losantos-identidad-full.jpg">\n          <img src="images/pollera-lujo-losantos-identidad-cel.jpg" alt="Pollera de lujo sante\xF1a, traje tipico de la regi\xF3n de azuero, Panama" class=" tercio identidadFotos">\n        </picture>\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h5>Pollera De Lujo</h5>\n            <h6>Azuero</h6>\n          </hgroup>\n        </div>\n      </a>\n      \n    </article>\n    <article class="identidadTexto completa blanco">\n      <hgroup>\n        <h2>Elementos de Nuestro Folklore</h2>\n        <h3>Investigando Sobre las Costumbres de Cada Regi\xF3n</h3>\n        <p>\n          Son Muchos los <b>elementos</b>  que forman parte de la <b>cultura y el folklore</b>  de un pa\xEDs. Desde peque\xF1os y abstactos como pueden ser cuentos infantiles y rimas; Objetos como <a href="/vestuarios">vestidos tradicionales</a> e instrumentos musicales; O m\xE1s trascendentales como rituales religiosos o festivos as\xED como la manera de celebrar los momentos de la vida, como bautizos, matrimonios y funerales. \n        </p>\n        <p>\n          Lo importante de cada uno de estos <b>componentes</b> es que nos definen como seres humanos, como comunidad y como pa\xEDs, nos d\xE1n la <b>identidad</b> ante nosotros mismos y los dem\xE1s.   \n        </p>\n        <p>  \n          Dos <b>elementos</b> important\xEDsimos que definen al <b>paname\xF1o</b>  y que pueden diferenciar <b>las costumbres</b> de cada una de las regiones del pa\xEDs, para darle a cada lugar su propia identidad, Son los <a href="/vestuarios">trajes t\xEDpicos</a> y los <a href="danzas">bailes o danzas folkl\xF3ricas</a>. \n        </p>\n        <p>\n          <b>Danzas</b> como <a href="/danzas/El-Punto-Santeno">el punto</a> que nos hablan de la elegancia y ceremonia que nos trajeron los espa\xF1oles, el Gran Diablo es un reflejo de la llegada del cristianismo, <a href="/vestuarios/Pollera-Congo">las polleras congo</a> nos hablan de la <b>cultura</b> de los Africanos que vinieron en \xE9poca de colonia y se establecieron en la costa atl\xE1ntica.\n        </p>\n        <p>\n          Y as\xED se cuenta <b>nuestra historia</b> atrav\xE9s de la caja y el repicador, de la pollera montuna y de una m\xE1scara de diablico sucio. Caminamos en la vida con una cutarra y nos tapamos del sol con un sombrero pintao. \n        </p>\n        <p>\n          Creemos en la importancia de conocer de donde venimos para poder desarrollar un sentido de <b>identidad</b>, para poder tomar decisiones hacia el futuro, para cuidar el <b>legado</b> que nos dejaron las generaciones pasadas, para entender quienes somos y de donde venimos y poder as\xED saber hacia donde vamos.  \n        </p>\n      </hgroup>\n    </article>\n  </div>\n'], ['\n  <div class="inicioIdentidad">\n    <article class="identidadImagenes">\n      <a href="/vestuarios/Gala-Ocuena" class="identidadImagen  tercio">\n        <picture >\n          <source media="(min-width: 800px)" srcset="images/pollera-gala-ocu-identidad-full.jpg">\n          <img src="images/pollera-gala-ocu-identidad-cel.jpg" alt="Pollera de Gala Ocue\xF1a, traje tipico de la regi\xF3n de azuero, Panama" class=" tercio identidadFotos">\n        </picture>\n        \n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h5>Pollera de Gala Ocue\xF1a</h5>\n            <h6>Azuero</h6>\n          </hgroup>\n        </div>\n      </a>\n      <a href="/vestuarios/Pollera-Congo" class="identidadImagen tercio">\n        <picture>\n          <source media="(min-width: 800px)" srcset="images/pollera-congo-identidad-full.jpg">\n          <img src="images/pollera-congo-identidad-cel.jpg" alt="Pollera Congo, traje tipico de la regi\xF3n de Col\xF3n, Panama" class=" tercio identidadFotos">\n        </picture>\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h5>Pollera Congo</h5>\n            <h6>Col\xF3n</h6>\n          </hgroup>\n        </div>\n      </a>\n      <a href="/vestuarios/Pollera-De-Lujo" class="identidadImagen identidad1 tercio">\n        <picture>\n          <source media="(min-width: 800px)" srcset="images/pollera-lujo-losantos-identidad-full.jpg">\n          <img src="images/pollera-lujo-losantos-identidad-cel.jpg" alt="Pollera de lujo sante\xF1a, traje tipico de la regi\xF3n de azuero, Panama" class=" tercio identidadFotos">\n        </picture>\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h5>Pollera De Lujo</h5>\n            <h6>Azuero</h6>\n          </hgroup>\n        </div>\n      </a>\n      \n    </article>\n    <article class="identidadTexto completa blanco">\n      <hgroup>\n        <h2>Elementos de Nuestro Folklore</h2>\n        <h3>Investigando Sobre las Costumbres de Cada Regi\xF3n</h3>\n        <p>\n          Son Muchos los <b>elementos</b>  que forman parte de la <b>cultura y el folklore</b>  de un pa\xEDs. Desde peque\xF1os y abstactos como pueden ser cuentos infantiles y rimas; Objetos como <a href="/vestuarios">vestidos tradicionales</a> e instrumentos musicales; O m\xE1s trascendentales como rituales religiosos o festivos as\xED como la manera de celebrar los momentos de la vida, como bautizos, matrimonios y funerales. \n        </p>\n        <p>\n          Lo importante de cada uno de estos <b>componentes</b> es que nos definen como seres humanos, como comunidad y como pa\xEDs, nos d\xE1n la <b>identidad</b> ante nosotros mismos y los dem\xE1s.   \n        </p>\n        <p>  \n          Dos <b>elementos</b> important\xEDsimos que definen al <b>paname\xF1o</b>  y que pueden diferenciar <b>las costumbres</b> de cada una de las regiones del pa\xEDs, para darle a cada lugar su propia identidad, Son los <a href="/vestuarios">trajes t\xEDpicos</a> y los <a href="danzas">bailes o danzas folkl\xF3ricas</a>. \n        </p>\n        <p>\n          <b>Danzas</b> como <a href="/danzas/El-Punto-Santeno">el punto</a> que nos hablan de la elegancia y ceremonia que nos trajeron los espa\xF1oles, el Gran Diablo es un reflejo de la llegada del cristianismo, <a href="/vestuarios/Pollera-Congo">las polleras congo</a> nos hablan de la <b>cultura</b> de los Africanos que vinieron en \xE9poca de colonia y se establecieron en la costa atl\xE1ntica.\n        </p>\n        <p>\n          Y as\xED se cuenta <b>nuestra historia</b> atrav\xE9s de la caja y el repicador, de la pollera montuna y de una m\xE1scara de diablico sucio. Caminamos en la vida con una cutarra y nos tapamos del sol con un sombrero pintao. \n        </p>\n        <p>\n          Creemos en la importancia de conocer de donde venimos para poder desarrollar un sentido de <b>identidad</b>, para poder tomar decisiones hacia el futuro, para cuidar el <b>legado</b> que nos dejaron las generaciones pasadas, para entender quienes somos y de donde venimos y poder as\xED saber hacia donde vamos.  \n        </p>\n      </hgroup>\n    </article>\n  </div>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],39:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  var headerContainer = document.getElementById('headerContainer');
  headerContainer.classList.remove('blanco');
  window.addEventListener("scroll", _functions2.default.scrollFunction);
  next();
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":40,"empty-element":4,"page":12}],40:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main class="home">\n    ', '\n    ', '\n    ', '\n    ', '\n  </main>\n'], ['\n  <main class="home">\n    ', '\n    ', '\n    ', '\n    ', '\n  </main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _banner = require('./banner');

var _banner2 = _interopRequireDefault(_banner);

var _about = require('./about');

var _about2 = _interopRequireDefault(_about);

var _identidad = require('./identidad');

var _identidad2 = _interopRequireDefault(_identidad);

var _apoyo = require('./apoyo');

var _apoyo2 = _interopRequireDefault(_apoyo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _banner2.default, _about2.default, _identidad2.default, _apoyo2.default);

},{"./about":35,"./apoyo":36,"./banner":37,"./identidad":38,"yo-yo":14}],41:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

var _catalogo = require('../tienda/catalogo');

var _catalogo2 = _interopRequireDefault(_catalogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/tienda/:nombre', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {

  var producto = _catalogo2.default.find(function (producto) {
    return producto.enlace === ctx.params.nombre;
  });
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild((0, _template2.default)(producto));
});

},{"../footer":29,"../header":32,"../header/functions":31,"../tienda/catalogo":43,"./template":42,"empty-element":4,"page":12}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n <section class="completa producto">\n  <articulo class="tercio productoImagenes">\n   <picture>\n    <source media="(min-width: 800px)" srcset="', '">\n    <img src="', '" alt="', '">\n   </picture>\n  </articulo>\n  <articulo class="dosTercios productoInfo">\n   <h1>', '</h1>\n   <h3>', '</h3>\n   <h4>Descripci\xF3n:</h4>\n   <p>', '</p>\n   <h4>Opciones:</h4>\n   ', '\n  </articulo>\n </section>\n'], ['\n <section class="completa producto">\n  <articulo class="tercio productoImagenes">\n   <picture>\n    <source media="(min-width: 800px)" srcset="', '">\n    <img src="', '" alt="', '">\n   </picture>\n  </articulo>\n  <articulo class="dosTercios productoInfo">\n   <h1>', '</h1>\n   <h3>', '</h3>\n   <h4>Descripci\xF3n:</h4>\n   <p>', '</p>\n   <h4>Opciones:</h4>\n   ', '\n  </articulo>\n </section>\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="opciones">\n     <h2>', '</h2>\n     <h4>', '</h4>\n     <p>', '</p>\n    </div>'], ['\n    <div class="opciones">\n     <h2>', '</h2>\n     <h4>', '</h4>\n     <p>', '</p>\n    </div>']);

exports.default = function (producto) {
  var el = (0, _yoYo2.default)(_templateObject, producto.imagenFull, producto.imagenCel, producto.alt, producto.nombre, producto.subtitulo, producto.descripcion, producto.opciones.map(function (opcion) {
    return (0, _yoYo2.default)(_templateObject2, opcion.detalle, opcion.precio.toLocaleString("en-US", {
      style: 'currency',
      currency: 'USD'
    }), opcion.descripcion);
  }));
  return el;
};

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

},{"yo-yo":14}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  nombre: 'Sesión de Fotografía',
  enlace: 'fotografia',
  subtitulo: 'en vestido típico',
  descripcion: 'La sesión fotográfica en exteriores. Incluye el vestido típico de su elección, peinado, maquillaje, colocación de tembleques y prendas, asesoría con las poses, Biblioteca digital perzonalizada con 15 fotos Editadas.',
  miniaturaFull: 'images/fotografia-miniatura-full.jpg',
  miniaturaCel: 'images/fotografia-miniatura-cel.jpg',
  imagenFull: 'images/fotografia-imagen-full.jpg',
  imagenCel: 'images/fotografia-imagen-cel.jpg',
  alt: 'Sesión fotográfica de alta calidad, vestidos típicos de Panamá',
  opciones: [{
    detalle: 'Pollera de Lujo',
    precio: 350
  }, {
    detalle: 'Pollera Blanca',
    precio: 250
  }, {
    detalle: 'Pollera Montuna',
    precio: 225
  }, {
    detalle: 'Pollera Congo',
    precio: 175
  }, {
    detalle: 'Persona Adicional',
    precio: 0,
    descripcion: 'No se cobra adicional por las fotografías, sólo el costo del alquiler de cada vestuario. (consultar precios en la sección de alquiler de vestuarios)'
  }]
}, {
  nombre: 'Pollera Blanca',
  enlace: 'pollera-blanca',
  subtitulo: 'Organza Bordada',
  descripcion: 'Pollera confeccionada en tela de organza, adornada con finos encajes de hilo.',
  miniaturaFull: 'images/organza-bordada-miniatura-full.jpg',
  miniaturaCel: 'images/organza-bordada-miniatura-cel.jpg',
  imagenFull: 'images/organza-bordada-producto-full.jpg',
  imagenCel: 'images/organza-bordada-producto-cel.jpg',
  alt: 'pollera blanca de organza bordada, traje tipico de panama',
  opciones: [{
    detalle: 'Bebes de 0 a 2 años (con una sola arandela)',
    precio: 50.00
  }, {
    detalle: 'de 3 a 5 años (con 2 arandelas)',
    precio: 100.00
  }, {
    detalle: 'de 6 a 10 años',
    precio: 200.00
  }, {
    detalle: 'de 11 en adelante',
    precio: 400.00
  }]
}, {
  nombre: 'Pollera Congo',
  enlace: 'pollera-congo',
  subtitulo: '',
  descripcion: 'Pollera de retazos de tela de vistosos colores.',
  miniaturaFull: 'images/pollera-congo-miniatura-full.jpg',
  miniaturaCel: 'images/pollera-congo-miniatura-cel.jpg',
  imagenFull: 'images/pollera-congo-producto-full.jpg',
  imagenCel: 'images/pollera-congo-producto-cel.jpg',
  alt: 'Pollera congo de retazos, vestuarios tipicos de panama',
  opciones: [{
    detalle: 'Niñas hasta 2 años',
    precio: 45
  }, {
    detalle: 'Niñas hasta 10 años',
    precio: 90
  }, {
    detalle: 'Adultos',
    precio: 160
  }]
}, {
  nombre: 'Pollera de Lujo',
  enlace: 'pollera-lujo',
  subtitulo: 'Talco al Sol',
  descripcion: 'Pollera de gala en técnica del talco al sol con calados y encajes valencianos.',
  miniaturaFull: 'images/pollera-lujo-miniatura-full.jpg',
  miniaturaCel: 'images/pollera-lujo-miniatura-cell.jpg',
  imagenFull: 'images/pollera-lujo-producto-full.jpg',
  imagenCel: 'images/pollera-lulo-producto-cel.jpg',
  alt: 'Pollera de Lujo, talco en sol, vestidos tipicos de Panama',
  opciones: [{
    detalle: 'Talco en Sol',
    precio: 5000,
    descripción: 'Tiempo de entrega 10 a 12 meses, durante ese tiempo se podrán ir efectuando pagos, el primer pago se debe hacer el día de la toma de las medidas.'
  }]
}, {
  nombre: 'Tembleques',
  enlace: 'tembleques',
  subtitulo: 'blancos o en color',
  descripcion: 'Juego de 12 pares de flores.',
  miniaturaFull: 'images/tembleques-miniatura-full.jpg',
  miniaturaCel: 'images/tembleques-miniatura-cel.jpg',
  imagenFull: 'images/tembleques-producto-full.jpg',
  imagenCel: 'images/tembleques-producto-cel.jpg',
  alt: 'Cabeza de Tembleques, Accesorios Folklóricos Panameños',
  opciones: [{
    detalle: 'Niñas',
    precio: 250
  }, {
    detalle: 'Adulta',
    precio: 450
  }, {
    detalle: 'Tapamoños',
    precio: 25
  }]
},
// {
//  nombre: 'Camisa',
//  enlace: 'camisa',
//  subtitulo: 'Una Sola Arandela',
//  descripcion: 'Pollera de gala en técnica del talco al sol con calados y encajes valencianos.',
//  miniaturaFull: 'images/camisa-miniatura-full.jpg',
//  miniaturaCel: 'images/camisa-miniatura-cel.jpg',
//  imagenFull: 'images/camisa-imagen-full.jpg',
//  imagenCel: 'images/camisa-imagen-cel.jpg',
//  alt: 'Camisa de voilé, con una sola arandela',
//  opciones: [
//   {
//    detalle: 'Arandela de organza bordada', 
//    precio: 40
//   },
//   {
//    detalle: 'Arandela de Coquito industrial', 
//    precio: 40
//   },
//   {
//    detalle: 'Arandela de voilé (bual)',
//    precio: 40
//   }
//  ]
// },
{
  nombre: 'Camisilla',
  enlace: 'camisilla',
  subtitulo: 'De Gala',
  descripcion: '',
  miniaturaFull: 'images/camisilla-miniatura-full.jpg',
  miniaturaCel: 'images/camisilla-miniatura-cel.jpg',
  imagenFull: 'images/camisilla-producto-full.jpg',
  imagenCel: 'images/camisilla-producto-cel.jpg',
  alt: 'Camisilla de Gala, Vestidos Típicos de Panamá',
  opciones: [{
    detalle: 'Niños hasta 6 años',
    precio: 35
  }, {
    detalle: 'Niños hasta 12 años',
    precio: 45
  }, {
    detalle: 'Adultos, voilé y alforzas',
    precio: 100
  }, {
    detalle: 'Adultos con espiguetas y tela de hilo',
    precio: 200
  }]
}
// {
//  nombre: 'Montuno Ocueño',
//  enlace: 'montuno-ocueno',
//  subtitulo: '',
//  descripcion: 'Camisa y Pantalón en tela de manta sucia con bordados a mano.',
//  miniaturaFull: 'images/montuno-ocueno-miniatura-full.jpg',
//  miniaturaCel: 'images/montuno-ocueno-miniatura-cel.jpg',
//  imagenFull: 'images/montuno-ocueno-imagen-full.jpg',
//  imagenCel: 'images/montuno-ocueno-imagen-cel.jpg',
//  alt: 'Montuno Ocueño, vestidos tipicos de Panama',
//  opciones: [
//   {
//    detalle: 'Niños hasta 6 años', 
//    precio: 50
//   },
//   {
//    detalle: 'Niños hasta 12 años',
//    precio: 80
//   },
//   {
//    detalle: 'Adultos',
//    precio: 100
//   }
//  ]
// }
];

},{}],44:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/tienda', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  headerContainer.classList.remove('blanco');
  window.addEventListener("scroll", _functions2.default.scrollFunction);
  next();
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":46,"empty-element":4,"page":12}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  <a class="tarjeta tiendaTarjeta" href="', '">\n    <picture>\n      <source media="(min-width: 800px)" srcset="', '">\n      <img src="', '" alt=', ' class="tarjetaImagen">\n    </picture>\n    <div class="tarjetaInfo">\n     <hgroup>\n      <h2>', '</h2>\n      <h3>', '</h3>\n      <h4>Descripci\xF3n: </h4>\n      <p>', '</p>\n     </hgroup>\n    </div>\n  </a>\n '], ['\n  <a class="tarjeta tiendaTarjeta" href="', '">\n    <picture>\n      <source media="(min-width: 800px)" srcset="', '">\n      <img src="', '" alt=', ' class="tarjetaImagen">\n    </picture>\n    <div class="tarjetaInfo">\n     <hgroup>\n      <h2>', '</h2>\n      <h3>', '</h3>\n      <h4>Descripci\xF3n: </h4>\n      <p>', '</p>\n     </hgroup>\n    </div>\n  </a>\n ']);

exports.default = function (producto) {
  var el = (0, _yoYo2.default)(_templateObject, producto.enlace, producto.miniaturaFull, producto.miniaturaCel, producto.alt, producto.nombre, producto.subtitulo, producto.descripcion);
  return el;
};

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

},{"yo-yo":14}],46:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n <section class="portada">\n  <picture class="banner">\n   <source media="(min-width: 800px)" srcset="images/pollera-lujo-losantos-tienda-portada-full.jpg">\n   <img class="completa" alt="Foto de Pollera De Lujo Sante\xF1a, traje tipico de panam\xE1, en Panam\xE1 Viejo"  src="images/pollera-lujo-losantos-tienda-portada-cel.jpg"  >\n  </picture>\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Productos y Servicios</h2>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaCont">\n   ', '\n  </div>\n  \n </section>\n</main>\n'], ['\n<main>\n <section class="portada">\n  <picture class="banner">\n   <source media="(min-width: 800px)" srcset="images/pollera-lujo-losantos-tienda-portada-full.jpg">\n   <img class="completa" alt="Foto de Pollera De Lujo Sante\xF1a, traje tipico de panam\xE1, en Panam\xE1 Viejo"  src="images/pollera-lujo-losantos-tienda-portada-cel.jpg"  >\n  </picture>\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Productos y Servicios</h2>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaCont">\n   ', '\n  </div>\n  \n </section>\n</main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _catalogo = require('./catalogo');

var _catalogo2 = _interopRequireDefault(_catalogo);

var _tarjeta = require('./tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _catalogo2.default.map(function (producto) {
  return (0, _tarjeta2.default)(producto);
}));

},{"./catalogo":43,"./tarjeta":45,"yo-yo":14}],47:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section>\n    <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n    <article class="tercio blanco joyero">\n      <hgroup>\n        <h2>Joyero</h2>\n        <ul>\n         ', '\n       </ul>  \n      </hgroup>\n    </article>\n  </section>   \n    '], ['\n  <section>\n    <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n    <article class="tercio blanco joyero">\n      <hgroup>\n        <h2>Joyero</h2>\n        <ul>\n         ', '\n       </ul>  \n      </hgroup>\n    </article>\n  </section>   \n    ']),
    _templateObject2 = _taggedTemplateLiteral(['<li>', '</li>'], ['<li>', '</li>']),
    _templateObject3 = _taggedTemplateLiteral(['\n  <main itemscope itemtype="http://schema.org/Article">\n   <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n    <article class="mitad rosaTrans">\n      <hgroup>\n          <h1 itemprop="name">', '</h1>\n          <p itemprop="description">', '</p>\n      </hgroup>\n    </article>\n   </section>\n   <section itemprop="articleBody" className="completa texto info blanco">\n    ', '\n   </section>\n   <section class="completa portada" style="background: url(\'', '\'); background-size:cover; background-attachment: fixed">\n    <article itemprop="articleBody" class="mitad negroTrans texto">\n     <hgroup>\n       <p>', '</p>\n     </hgroup>\n    </article>\n   </section>\n   <section itemprop="articleBody" class="completa texto info blanco">\n     ', '\n   </section>\n   ', '\n  </main>\n '], ['\n  <main itemscope itemtype="http://schema.org/Article">\n   <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n    <article class="mitad rosaTrans">\n      <hgroup>\n          <h1 itemprop="name">', '</h1>\n          <p itemprop="description">', '</p>\n      </hgroup>\n    </article>\n   </section>\n   <section itemprop="articleBody" className="completa texto info blanco">\n    ', '\n   </section>\n   <section class="completa portada" style="background: url(\'', '\'); background-size:cover; background-attachment: fixed">\n    <article itemprop="articleBody" class="mitad negroTrans texto">\n     <hgroup>\n       <p>', '</p>\n     </hgroup>\n    </article>\n   </section>\n   <section itemprop="articleBody" class="completa texto info blanco">\n     ', '\n   </section>\n   ', '\n  </main>\n ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function joyero(vestuario) {
  if (vestuario.joyero) {
    return (0, _yoYo2.default)(_templateObject, vestuario.joyeroImagen, vestuario.joyero.map(function (joya) {
      return (0, _yoYo2.default)(_templateObject2, joya);
    }));
  }
}
module.exports = function (vestuario) {
  var el = (0, _yoYo2.default)(_templateObject3, vestuario.portadaImagen, vestuario.nombre, vestuario.reseña, vestuario.antecedentes, vestuario.generalImagen, vestuario.general, vestuario.descripcion, joyero(vestuario));
  return el;
};

},{"yo-yo":14}],48:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _vestuarios = require('../vestuarios/vestuarios');

var _vestuarios2 = _interopRequireDefault(_vestuarios);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/vestuarios/:url', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild((0, _template2.default)(_vestuarios2.default, ctx.params.url));
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":29,"../header":32,"../header/functions":31,"../vestuarios/vestuarios":52,"./template":49,"empty-element":4,"page":12}],49:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <div>\n  ', '\n </div>\n '], ['\n <div>\n  ', '\n </div>\n ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _album = require('../componentes/album');

var _album2 = _interopRequireDefault(_album);

var _estructura = require('./estructura');

var _estructura2 = _interopRequireDefault(_estructura);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = function (vestuarios, ident) {
  var el = (0, _yoYo2.default)(_templateObject, vestuarios.map(function (vestuario) {
    if (vestuario.url == ident) {
      return (0, _estructura2.default)(vestuario);
    }
  }));
  return el;
};

},{"../componentes/album":16,"./estructura":47,"yo-yo":14}],50:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _header = require('../header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../footer');

var _footer2 = _interopRequireDefault(_footer);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _functions = require('../header/functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _page2.default)('/vestuarios', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":29,"../header":32,"../header/functions":31,"./template":51,"empty-element":4,"page":12}],51:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n <section class="portada" id="vestuarioPortada">\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Vestuarios Paname\xF1os</h2>\n    <p>Los vestidos t\xEDpicos de nuestro pa\xEDs son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer paname\xF1a.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaCont">\n  ', '\n  </div> \n </section>\n</main>\n'], ['\n<main>\n <section class="portada" id="vestuarioPortada">\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Vestuarios Paname\xF1os</h2>\n    <p>Los vestidos t\xEDpicos de nuestro pa\xEDs son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer paname\xF1a.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaCont">\n  ', '\n  </div> \n </section>\n</main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('../componentes/tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

var _vestuarios = require('./vestuarios');

var _vestuarios2 = _interopRequireDefault(_vestuarios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

module.exports = (0, _yoYo2.default)(_templateObject, _vestuarios2.default.map(function (danza) {
  return (0, _tarjeta2.default)('vestuarios', danza);
}));

},{"../componentes/tarjeta":17,"./vestuarios":52,"yo-yo":14}],52:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<p>Esta hermosa pollera era utilizada por las mujeres solo en ocasiones especiales como por ejemplo en el matrimonio. Hoy en d\xEDa la representaci\xF3n del Matrimonio campesino es una tradici\xF3n que se realiza dentro del marco del festival del manito, que adem\xE1s de ser una fiesta del pueblo es una celebraci\xF3n religiosa. Se escoge una vez al a\xF1o por la suerte a una pareja ocue\xF1a para realizar el sacramento en la parroquia de San Sebasti\xE1n de Oc\xFA.</p>'], ['<p>Esta hermosa pollera era utilizada por las mujeres solo en ocasiones especiales como por ejemplo en el matrimonio. Hoy en d\xEDa la representaci\xF3n del Matrimonio campesino es una tradici\xF3n que se realiza dentro del marco del festival del manito, que adem\xE1s de ser una fiesta del pueblo es una celebraci\xF3n religiosa. Se escoge una vez al a\xF1o por la suerte a una pareja ocue\xF1a para realizar el sacramento en la parroquia de San Sebasti\xE1n de Oc\xFA.</p>']),
    _templateObject2 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>La provincia de herrera est\xE1 ubicada en la pen\xEDnsula de Azuero. Antes de la \xE9poca precolombina fue habitada por gran cantidad de ind\xEDgenas.  La conquista de la pen\xEDnsula de Azuero se inicia en 1515, por \xF3rdenes del gobernador de Castilla de Oro, Don Pedrarias D\xE1vila, luego de duras batallas entre ind\xEDgenas y espa\xF1oles en 1520 se funda la primera ciudad espa\xF1ola en la pen\xEDnsula "Nat\xE1 de los Caballeros" este fue uno de los acontecimientos m\xE1s importantes en la regi\xF3n para la expansi\xF3n espa\xF1ola a pesar del genocidio ind\xEDgena.  Los primeros pueblos lejos de Nata se formaron por iniciativa de pobladores que cre\xEDan en la libertad de los ind\xEDgenas (el espa\xF1ol quer\xEDa volver a esclavizarlos) y por soldados espa\xF1oles que vinieron a el nuevo mundo sin vocaci\xF3n b\xE9lica y con ganas de una segunda oportunidad.</p>\n    <p>A\xFAn en el a\xF1o 1903 cuando Panam\xE1 se separa de Colombia y se establece como Rep\xFAblica, Herrera no estaba constituida como provincia. Bajo la administraci\xF3n del Dr. Belisario Porras, en 1915 se funda definitivamente la provincia de Herrera con capital en la ciudad de Chitr\xE9.</p>\n    <p>El distrito de Oc\xFA es muy particular ya que no hay ind\xEDgenas en el \xE1rea (las guerras con los colonizadores acabaron con gran parte de su poblaci\xF3n) su poblaci\xF3n es en su mayor\xEDa mestiza.</p>\n    <p>El hombre y la mujer ocue\xF1a se caracterizan por su sencillez, son personas trabajadoras de la tierra por lo que es com\xFAn ver a los agricultores y a los ganaderos con sombrero y cutarras.</p>\n    <p>Otra caracter\xEDstica importante es que el folklore ocue\xF1o es uno de los mejores conservados del pa\xEDs. Los folkloristas, maestros y las personas del pueblo est\xE1n orgullosos de sus tradiciones, por esta raz\xF3n han unificando criterios y fomentado el relevo generacional en actividades como el festival del manito.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>La provincia de herrera est\xE1 ubicada en la pen\xEDnsula de Azuero. Antes de la \xE9poca precolombina fue habitada por gran cantidad de ind\xEDgenas.  La conquista de la pen\xEDnsula de Azuero se inicia en 1515, por \xF3rdenes del gobernador de Castilla de Oro, Don Pedrarias D\xE1vila, luego de duras batallas entre ind\xEDgenas y espa\xF1oles en 1520 se funda la primera ciudad espa\xF1ola en la pen\xEDnsula "Nat\xE1 de los Caballeros" este fue uno de los acontecimientos m\xE1s importantes en la regi\xF3n para la expansi\xF3n espa\xF1ola a pesar del genocidio ind\xEDgena.  Los primeros pueblos lejos de Nata se formaron por iniciativa de pobladores que cre\xEDan en la libertad de los ind\xEDgenas (el espa\xF1ol quer\xEDa volver a esclavizarlos) y por soldados espa\xF1oles que vinieron a el nuevo mundo sin vocaci\xF3n b\xE9lica y con ganas de una segunda oportunidad.</p>\n    <p>A\xFAn en el a\xF1o 1903 cuando Panam\xE1 se separa de Colombia y se establece como Rep\xFAblica, Herrera no estaba constituida como provincia. Bajo la administraci\xF3n del Dr. Belisario Porras, en 1915 se funda definitivamente la provincia de Herrera con capital en la ciudad de Chitr\xE9.</p>\n    <p>El distrito de Oc\xFA es muy particular ya que no hay ind\xEDgenas en el \xE1rea (las guerras con los colonizadores acabaron con gran parte de su poblaci\xF3n) su poblaci\xF3n es en su mayor\xEDa mestiza.</p>\n    <p>El hombre y la mujer ocue\xF1a se caracterizan por su sencillez, son personas trabajadoras de la tierra por lo que es com\xFAn ver a los agricultores y a los ganaderos con sombrero y cutarras.</p>\n    <p>Otra caracter\xEDstica importante es que el folklore ocue\xF1o es uno de los mejores conservados del pa\xEDs. Los folkloristas, maestros y las personas del pueblo est\xE1n orgullosos de sus tradiciones, por esta raz\xF3n han unificando criterios y fomentado el relevo generacional en actividades como el festival del manito.</p>\n   </hgroup>\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <p>La camisa y la falda se confeccionan con la misma tela. La camisa est\xE1 formada por 2 arandelas y mangas terminadas en encajes, se utilizan encajes de tienda no mundillos. </p>\n    <p>Se enjareta (poner las lanas a trav\xE9s de la trencilla de enjaretar) de dos maneras: la primera forma es, el enjaretado corrido, que consiste en trazar con lana dos l\xEDneas paralelas a trav\xE9s del encaje de enjaretar en el mismo color, la segunda forma es el enjaretado en zigzag, combinando dos colores, el primer color en paralelo (enjaretado corrido) y el otro color traza un zig zag en medio de las dos l\xEDneas. Se remata el enjaretado con dos lacitos en frente y atr\xE1s con la misma lana utilizada. </p>\n    <p>El fald\xF3n de la pollera es de 2 tramos, dividido en la mitad con una trencilla de encaje y al final con un peacillo y encajes anchos o de revuelo. </p>\n    <p>El cabello se divide en 2 con una l\xEDnea a la mitad que llamamos "rayo" y se hacen trenzas que caen sobre la espalda (muchos grupos folkl\xF3ricos utilizan mo\xF1os falsos para semejar est\xE1 caracter\xEDstica) y se amarran desde la mitad con un pedazo de lana del mismo color del enjaretado dejando al final un trozo de lana suelta despu\xE9s del lazo. Si su cabello es corto puede dejarlo suelto. </p>\n    <p>El arreglo de la cabeza se realiza con un juego de peinetas que puede ir desde 2 hasta 6 pares m\xE1s el peinet\xF3n. Es com\xFAn en esta regi\xF3n amarrar las peinetas con cintas del color del enjaretado y rematarlas con un lacito en la frente.  Los tembleques que se utilizan son pimpollos, peque\xF1as flores que imitan a los capullos de las rosas, se pueden hacer en dos colores y los materiales caracter\xEDsticos son telas, perlas y gusanillos.</p>\n    <p>Cuando se usa la pollera para matrimonio se puede hacer los tembleques y el enjaretado en color blanco.</p>\n    <p>Adem\xE1s la empollerada debe llevar un pa\xF1uelito tejido sencillo que se coloca en la pretina del lado derecho, una carterita tejida, de manta sucia o chacarita ind\xEDgena en donde lleva sus  art\xEDculos de uso personal: peinilla, espejito, perfume, el carm\xEDn (para pintar los labios) y su dinero (tradicionalmente envueltas en un pa\xF1uelito y luego en una bolsita).</p>\n    <p>Para complementar se usa un rebozo o pa\xF1o de tela sencillo en voile (bual) se le pueden poner bordado o marcado similar al del montuno. En la actualidad se est\xE1n utilizando pa\xF1os de hamaca, (no son tradicionales de panam\xE1), se usan sobre un solo hombro, alrededor del cuello o por detr\xE1s sobre ambos hombros, se puede cruzar en la espalda formando una especie de lazo dando m\xE1s comodidad a la empollerada.</p>\n    <p>Los zapatos de la pollera deben ser de pana, cuando no se encuentran los colores en este material se hacen de tela que no tenga brillo.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <p>La camisa y la falda se confeccionan con la misma tela. La camisa est\xE1 formada por 2 arandelas y mangas terminadas en encajes, se utilizan encajes de tienda no mundillos. </p>\n    <p>Se enjareta (poner las lanas a trav\xE9s de la trencilla de enjaretar) de dos maneras: la primera forma es, el enjaretado corrido, que consiste en trazar con lana dos l\xEDneas paralelas a trav\xE9s del encaje de enjaretar en el mismo color, la segunda forma es el enjaretado en zigzag, combinando dos colores, el primer color en paralelo (enjaretado corrido) y el otro color traza un zig zag en medio de las dos l\xEDneas. Se remata el enjaretado con dos lacitos en frente y atr\xE1s con la misma lana utilizada. </p>\n    <p>El fald\xF3n de la pollera es de 2 tramos, dividido en la mitad con una trencilla de encaje y al final con un peacillo y encajes anchos o de revuelo. </p>\n    <p>El cabello se divide en 2 con una l\xEDnea a la mitad que llamamos "rayo" y se hacen trenzas que caen sobre la espalda (muchos grupos folkl\xF3ricos utilizan mo\xF1os falsos para semejar est\xE1 caracter\xEDstica) y se amarran desde la mitad con un pedazo de lana del mismo color del enjaretado dejando al final un trozo de lana suelta despu\xE9s del lazo. Si su cabello es corto puede dejarlo suelto. </p>\n    <p>El arreglo de la cabeza se realiza con un juego de peinetas que puede ir desde 2 hasta 6 pares m\xE1s el peinet\xF3n. Es com\xFAn en esta regi\xF3n amarrar las peinetas con cintas del color del enjaretado y rematarlas con un lacito en la frente.  Los tembleques que se utilizan son pimpollos, peque\xF1as flores que imitan a los capullos de las rosas, se pueden hacer en dos colores y los materiales caracter\xEDsticos son telas, perlas y gusanillos.</p>\n    <p>Cuando se usa la pollera para matrimonio se puede hacer los tembleques y el enjaretado en color blanco.</p>\n    <p>Adem\xE1s la empollerada debe llevar un pa\xF1uelito tejido sencillo que se coloca en la pretina del lado derecho, una carterita tejida, de manta sucia o chacarita ind\xEDgena en donde lleva sus  art\xEDculos de uso personal: peinilla, espejito, perfume, el carm\xEDn (para pintar los labios) y su dinero (tradicionalmente envueltas en un pa\xF1uelito y luego en una bolsita).</p>\n    <p>Para complementar se usa un rebozo o pa\xF1o de tela sencillo en voile (bual) se le pueden poner bordado o marcado similar al del montuno. En la actualidad se est\xE1n utilizando pa\xF1os de hamaca, (no son tradicionales de panam\xE1), se usan sobre un solo hombro, alrededor del cuello o por detr\xE1s sobre ambos hombros, se puede cruzar en la espalda formando una especie de lazo dando m\xE1s comodidad a la empollerada.</p>\n    <p>Los zapatos de la pollera deben ser de pana, cuando no se encuentran los colores en este material se hacen de tela que no tenga brillo.</p>\n   </hgroup>\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n   <hgroup>\n    <p>El Congo es una cultura, g\xE9nero musical y baile Afro-colonial que se caracteriza por ser alegre y sensual, es ejecutado por hombres y mujeres al ritmo de cantos y tambor.</p>\n    <p>Sus vistosas y coloridas polleras est\xE1n cargadas de historia. Nos hablan de la fortaleza de un pueblo y de su lucha por la libertad.</p>\n   </hgroup>'], ['\n   <hgroup>\n    <p>El Congo es una cultura, g\xE9nero musical y baile Afro-colonial que se caracteriza por ser alegre y sensual, es ejecutado por hombres y mujeres al ritmo de cantos y tambor.</p>\n    <p>Sus vistosas y coloridas polleras est\xE1n cargadas de historia. Nos hablan de la fortaleza de un pueblo y de su lucha por la libertad.</p>\n   </hgroup>']),
    _templateObject5 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>A pesar de lo que conocemos com\xFAnmente, existe una teor\xEDa que brinda pruebas de la presencia de africanos en el continente americano antes de la conquista. Esta postura es defendida por el cient\xEDfico social y escritor de la obra "They Came Before Columbus" (Ellos vinieron antes que Col\xF3n) el Dr. Iv\xE1n Van Sertima, en sus escritos el asegura que el historiador Peter Martyr (1457-1526) describi\xF3 como unos africanos hab\xEDan naufragado en un \xE1rea cerca de la costa de la provincia de Dari\xE9n y que luego se hab\xEDan refugiado en las monta\xF1as. Martyr describi\xF3 a los hombres como \u201Cpiratas et\xEDopes\u201D t\xE9rmino que en el pasado hac\xEDa referencia al continente africano. M\xE1s adelante el historiador y etn\xF3logo Franc\xE9s Charles de Bourbourg report\xF3 la existencia de dos tribus abor\xEDgenes en Panam\xE1, los mandingas (de piel negra) y los Tule (de piel roja), Esta informaci\xF3n tiene concordancia con unas figuras ind\xEDgenas de la cultura "Barriles" enterradas en las monta\xF1as de Chiriqu\xED cerca de la frontera con Costa Rica, algunas de ellas resaltaban porque ten\xEDan\n    \n    caracter\xEDsticas de la raza negra como los labios pronunciados y la nariz ancha.</p>\n    <p>La historia m\xE1s conocida nos confirma la llegada de negros como esclavos a Am\xE9rica durante la conquista. Hombres y mujeres fueron tra\xEDdos a la fuerza desde el continente africano, api\xF1ados en barcos en condiciones inhumanas. Los negros esclavos eran considerados propiedad de sus amos y pod\xEDan ser comprados y vendidos, no hab\xEDa ning\xFAn derecho que les permitiera defenderse as\xED que algunos eran marcados o mutilados para impedir que se fugaran.</p>\n    <p>Podemos pensar, \xBFpor qu\xE9 traer a personas desde tan lejos para trabajar en Am\xE9rica?</p>\n    <p>Esta es la raz\xF3n: Antes del descubrimiento de Am\xE9rica ya se hab\xEDa dictado una ley para evitar la esclavitud en los territorios conquistados.</p>\n    <p>Tras la llegada a Am\xE9rica en 1492, se produjo una de las atrocidades m\xE1s grandes de la historia, el genocidio ind\xEDgena producto de las guerras de la conquista y a\xFAn con las leyes establecidas (era muy dif\xEDcil hacerlas cumplir tan lejos de Espa\xF1a) se daban el comercio de indios como esclavos, ya para este momento en muchas zonas de Am\xE9rica no quedaban muchos ind\xEDgenas por la guerra y por las epidemias tra\xEDdas por los espa\xF1oles. La demanda de mano de obra sigui\xF3 creciendo hasta que el padre Fray Bartolom\xE9 de las casas propuso reemplazar a los ind\xEDgenas por negros africanos y es de esta manera que se inicia la esclavitud en Am\xE9rica con el primer cargamento de negros en 1518, proceso que durar\xEDa hasta 1880.</p>\n    <p>Adem\xE1s de los beneficios en Am\xE9rica, los monarcas espa\xF1oles lograron sacar muchos beneficios a costar de vender licencias para permitir traer esclavos negros a Am\xE9rica, con las siguientes cifras podemos darnos una idea de lo que representaba en ganancias el comercio de esclavos, cada una de estas licencias costaba 8 ducados (moneda de oro antigua) y en el siglo XVI se concedieron en Espa\xF1a m\xE1s de 120.000 licencias.</p>\n    <p>En el a\xF1o 1548 En Panam\xE1 se registra la primera fuga de esclavos. Los negros que se rebelaron contra la opresi\xF3n espa\xF1ola se refugiaron en las monta\xF1as y es est\xE9 hecho el que inicia el cimarronaje.</p>\n    <p>Los primeros dos grupos que lograron escapar fueron liderados por Bayano y Felipillo, dos esclavos que tuvieron un rol muy importante durante la conquista.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>A pesar de lo que conocemos com\xFAnmente, existe una teor\xEDa que brinda pruebas de la presencia de africanos en el continente americano antes de la conquista. Esta postura es defendida por el cient\xEDfico social y escritor de la obra "They Came Before Columbus" (Ellos vinieron antes que Col\xF3n) el Dr. Iv\xE1n Van Sertima, en sus escritos el asegura que el historiador Peter Martyr (1457-1526) describi\xF3 como unos africanos hab\xEDan naufragado en un \xE1rea cerca de la costa de la provincia de Dari\xE9n y que luego se hab\xEDan refugiado en las monta\xF1as. Martyr describi\xF3 a los hombres como \u201Cpiratas et\xEDopes\u201D t\xE9rmino que en el pasado hac\xEDa referencia al continente africano. M\xE1s adelante el historiador y etn\xF3logo Franc\xE9s Charles de Bourbourg report\xF3 la existencia de dos tribus abor\xEDgenes en Panam\xE1, los mandingas (de piel negra) y los Tule (de piel roja), Esta informaci\xF3n tiene concordancia con unas figuras ind\xEDgenas de la cultura "Barriles" enterradas en las monta\xF1as de Chiriqu\xED cerca de la frontera con Costa Rica, algunas de ellas resaltaban porque ten\xEDan\n    \n    caracter\xEDsticas de la raza negra como los labios pronunciados y la nariz ancha.</p>\n    <p>La historia m\xE1s conocida nos confirma la llegada de negros como esclavos a Am\xE9rica durante la conquista. Hombres y mujeres fueron tra\xEDdos a la fuerza desde el continente africano, api\xF1ados en barcos en condiciones inhumanas. Los negros esclavos eran considerados propiedad de sus amos y pod\xEDan ser comprados y vendidos, no hab\xEDa ning\xFAn derecho que les permitiera defenderse as\xED que algunos eran marcados o mutilados para impedir que se fugaran.</p>\n    <p>Podemos pensar, \xBFpor qu\xE9 traer a personas desde tan lejos para trabajar en Am\xE9rica?</p>\n    <p>Esta es la raz\xF3n: Antes del descubrimiento de Am\xE9rica ya se hab\xEDa dictado una ley para evitar la esclavitud en los territorios conquistados.</p>\n    <p>Tras la llegada a Am\xE9rica en 1492, se produjo una de las atrocidades m\xE1s grandes de la historia, el genocidio ind\xEDgena producto de las guerras de la conquista y a\xFAn con las leyes establecidas (era muy dif\xEDcil hacerlas cumplir tan lejos de Espa\xF1a) se daban el comercio de indios como esclavos, ya para este momento en muchas zonas de Am\xE9rica no quedaban muchos ind\xEDgenas por la guerra y por las epidemias tra\xEDdas por los espa\xF1oles. La demanda de mano de obra sigui\xF3 creciendo hasta que el padre Fray Bartolom\xE9 de las casas propuso reemplazar a los ind\xEDgenas por negros africanos y es de esta manera que se inicia la esclavitud en Am\xE9rica con el primer cargamento de negros en 1518, proceso que durar\xEDa hasta 1880.</p>\n    <p>Adem\xE1s de los beneficios en Am\xE9rica, los monarcas espa\xF1oles lograron sacar muchos beneficios a costar de vender licencias para permitir traer esclavos negros a Am\xE9rica, con las siguientes cifras podemos darnos una idea de lo que representaba en ganancias el comercio de esclavos, cada una de estas licencias costaba 8 ducados (moneda de oro antigua) y en el siglo XVI se concedieron en Espa\xF1a m\xE1s de 120.000 licencias.</p>\n    <p>En el a\xF1o 1548 En Panam\xE1 se registra la primera fuga de esclavos. Los negros que se rebelaron contra la opresi\xF3n espa\xF1ola se refugiaron en las monta\xF1as y es est\xE9 hecho el que inicia el cimarronaje.</p>\n    <p>Los primeros dos grupos que lograron escapar fueron liderados por Bayano y Felipillo, dos esclavos que tuvieron un rol muy importante durante la conquista.</p>\n   </hgroup>\n  ']),
    _templateObject6 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <h3>Pollera de Retazos</h3>\n    <p>Es una pollera de dos piezas, camisa y falda. Se combinan dise\xF1os lisos y estampados para crear una tela colorida y vistosa, los retazos com\xFAnmente son en forma cuadrada, pero se pueden hacer en la forma que se desee como tri\xE1ngulos o rect\xE1ngulos.</p>\n    <p>La camisa puede ser de una o dos arandelas, puede ser usada sin mangas o con mangas terminadas en una peque\xF1a rucha. Esta camisa se usa por dentro de la falda, si es por fuera se termina la camisa en una rucha o arandela.</p>\n    <p>El poller\xF3n, tambi\xE9n hecho de retazos, puede ser de dos o tres tramos.</p>\n    <p>Por debajo de la falda en algunos palenques se usa un peticote muy sencillo y en otros el uso de esta prenda es exclusiva de la reina, las dem\xE1s usan una especie de ropa interior llamada pantaleta o petipan que llega m\xE1s o menos hasta la rodilla.</p>\n    <p>Tambi\xE9n se usan unas bolsas llamadas Chupas o Chumpas.</p>\n    <p>El cabello se puede llevar de diferentes maneras, porque hay cabellos y peinados muy diversos, desde corto muy rizados hasta largo y liso. Si es largo se puede llevar de manera muy tradicional con partidura a la mitad y dos trenzas, con las puntas amarradas con tiritas de trapos.</p>\n    <p>Para adornar la cabeza se usan flores, tradicionalmente la flor del congo llamada Ca\xF1itolendo que es una flor silvestre que se encuentra a lo largo de la costa arriba y costa abajo, puede decirse que es un tembleque natural.</p>\n    <p>Una de las caracter\xEDsticas del arreglo de la cabeza es que a pesar de que se hace una partidura en el centro de la cabellera y se hacen dos tortas o una hacia atr\xE1s de la cabeza las flores deben ocupar toda la parte trasera de la cabeza, dejando al descubierto la parte de arriba de la cabeza, pero no la partidura de la parte de atr\xE1s como es tradicional en la pollera sante\xF1a</p>\n    <p>Sus accesorios son collares son de cuentas, conchas y caracoles.</p>\n    <p>Este vestido no utiliza zapatos y se dice que es por la relaci\xF3n del negro con la tierra.</p>\n    <p>La cultura congo es matriarcal, la reina congo puede usar lo que ella desee, aunque com\xFAnmente usa una pollera de color blanco y una corona alta. Con flores y cintas de colores que le caen sobre la espalda.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <h3>Pollera de Retazos</h3>\n    <p>Es una pollera de dos piezas, camisa y falda. Se combinan dise\xF1os lisos y estampados para crear una tela colorida y vistosa, los retazos com\xFAnmente son en forma cuadrada, pero se pueden hacer en la forma que se desee como tri\xE1ngulos o rect\xE1ngulos.</p>\n    <p>La camisa puede ser de una o dos arandelas, puede ser usada sin mangas o con mangas terminadas en una peque\xF1a rucha. Esta camisa se usa por dentro de la falda, si es por fuera se termina la camisa en una rucha o arandela.</p>\n    <p>El poller\xF3n, tambi\xE9n hecho de retazos, puede ser de dos o tres tramos.</p>\n    <p>Por debajo de la falda en algunos palenques se usa un peticote muy sencillo y en otros el uso de esta prenda es exclusiva de la reina, las dem\xE1s usan una especie de ropa interior llamada pantaleta o petipan que llega m\xE1s o menos hasta la rodilla.</p>\n    <p>Tambi\xE9n se usan unas bolsas llamadas Chupas o Chumpas.</p>\n    <p>El cabello se puede llevar de diferentes maneras, porque hay cabellos y peinados muy diversos, desde corto muy rizados hasta largo y liso. Si es largo se puede llevar de manera muy tradicional con partidura a la mitad y dos trenzas, con las puntas amarradas con tiritas de trapos.</p>\n    <p>Para adornar la cabeza se usan flores, tradicionalmente la flor del congo llamada Ca\xF1itolendo que es una flor silvestre que se encuentra a lo largo de la costa arriba y costa abajo, puede decirse que es un tembleque natural.</p>\n    <p>Una de las caracter\xEDsticas del arreglo de la cabeza es que a pesar de que se hace una partidura en el centro de la cabellera y se hacen dos tortas o una hacia atr\xE1s de la cabeza las flores deben ocupar toda la parte trasera de la cabeza, dejando al descubierto la parte de arriba de la cabeza, pero no la partidura de la parte de atr\xE1s como es tradicional en la pollera sante\xF1a</p>\n    <p>Sus accesorios son collares son de cuentas, conchas y caracoles.</p>\n    <p>Este vestido no utiliza zapatos y se dice que es por la relaci\xF3n del negro con la tierra.</p>\n    <p>La cultura congo es matriarcal, la reina congo puede usar lo que ella desee, aunque com\xFAnmente usa una pollera de color blanco y una corona alta. Con flores y cintas de colores que le caen sobre la espalda.</p>\n   </hgroup>\n  ']),
    _templateObject7 = _taggedTemplateLiteral(['\n   <hgroup>\n    <p>La pollera de Gala es el vestido t\xEDpico m\xE1s lujoso y conocido de Panam\xE1. el trabajo artesanal que es utilizado para su confecci\xF3n lo hace una pieza digna de colecci\xF3n. </p>\n    <p>La pollera de lujo era el vestido utilizado por las mujeres paname\xF1as en las fiestas m\xE1s importantes como por ejemplo en los d\xEDas patrios y en carnavales.</p>\n   </hgroup>'], ['\n   <hgroup>\n    <p>La pollera de Gala es el vestido t\xEDpico m\xE1s lujoso y conocido de Panam\xE1. el trabajo artesanal que es utilizado para su confecci\xF3n lo hace una pieza digna de colecci\xF3n. </p>\n    <p>La pollera de lujo era el vestido utilizado por las mujeres paname\xF1as en las fiestas m\xE1s importantes como por ejemplo en los d\xEDas patrios y en carnavales.</p>\n   </hgroup>']),
    _templateObject8 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>La Pollera de gala Sante\xF1a o de Lujo tiene sus or\xEDgenes en Europa, es el resultado de la evoluci\xF3n y de una mezcla de culturas. Desde los tembleques con origen chino, peinado franc\xE9s hasta zarcillos persas, el vestido t\xEDpico de gala es una joya que ha unido detalles de tantos lugares, convirtiendo esas influencias en lo que nosotros conocemos hoy d\xEDa como pollera. </p>\n    <p>Ciertamente la influencia de nuestro traje t\xEDpico es europea y al ser territorio espa\xF1ol desde donde se embarcaron los nav\xEDos a Am\xE9rica es f\xE1cil hacer la relaci\xF3n directa, pero hay muchos indicadores que permiten dar ejemplos tangibles de los or\xEDgenes tan diversos de los elementos que la conforman.  <i>1</i></p>\n    <p>En Panam\xE1 se tienen datos de las polleras desde el a\xF1o 1863 gracias a las im\xE1genes captadas por el primer fot\xF3grafo espa\xF1ol Rafael Castro Ordo\xF1ez, a las polleras centenarias que todav\xEDa existen y a los estudios realizados a las telas y encajes. Es muy interesante conocer las menciones que se encuentran en las cartas de los viajes de Crist\xF3bal Col\xF3n, m\xE1s espec\xEDficamente en su segundo viaje en donde se hace una descripci\xF3n de las vestimentas que tra\xEDan las primeras mujeres que llegaron a Am\xE9rica resaltando que ellas aclimataron los vestidos al calor del tr\xF3pico.</p>\n    <p>La pollera de lujo es el vestido t\xEDpico que representa a la provincia de Los Santos y ha sido adoptada por las personas de la capital con ciertas modificaciones como por ejemplo utilizar la Mosqueta sobre la "mota" o pom pom y tembleques con gusanillos dorados.</p>\n    <p>En el Club Uni\xF3n las chicas de la alta sociedad retomaron el uso de este hermoso traje t\xEDpico para carnavales y d\xEDas patrios. Se tienen datos que afirman que en ocasiones ellas no usaban la partidura en medio y se empolleraban hasta con flequillo. Otro dato interesante es que utilizaban la camisa de la pollera caida sobre los hombros. </p>\n    <p>Ramona "La Trona" Lefevre fue una dama amante de la pollera que sobresali\xF3 gracias a su amor por el traje t\xEDpico y a su poder adquisitivo lo que le permiti\xF3 tener una colecci\xF3n de 19 polleras y uno de los joyeros m\xE1s grandes y lujosos de la capital. Ella implement\xF3 elementos y los impuso como una nueva moda, como, por ejemplo: el uso del peinet\xF3n, el uso de muchas cadenas y el aumento en el tama\xF1o de las labores de la pollera.</p>\n    <p>Otra persona muy sobresaliente en la evoluci\xF3n de la pollera fue el sr Edgardo de Le\xF3n Madariaga un folklorista y artesano, responsable de un cambio est\xE9tico importante en la pollera, incluy\xF3 mayor vuelo en la falda e introdujo las polleras policromadas y degradaciones "matizado". Lleg\xF3 a utilizar hasta 20 colores en las labores de sus dise\xF1os. </p>\n    <p>Otra dama muy importante fue Elia Charpentier la primera \u201CDama nacional de la pollera\u201D ella fue la responsable del aumento en el tama\xF1o de las monedas coronadas y hasta les incrust\xF3 esmeraldas, aument\xF3 el tama\xF1o del peinet\xF3n, revivi\xF3 el uso del tost\xF3n y lleg\xF3 a utilizar todos los tembleques de oro y perlas. </p>\n    <h4>1. recomendamos las charlas del Sr. Eduardo Cano que nos brinda una nueva teor\xEDa sobre el origen de la pollera, esta teor\xEDa es el resultado de muchos a\xF1os de estudio tanto a nivel nacional como internacional.</h4>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>La Pollera de gala Sante\xF1a o de Lujo tiene sus or\xEDgenes en Europa, es el resultado de la evoluci\xF3n y de una mezcla de culturas. Desde los tembleques con origen chino, peinado franc\xE9s hasta zarcillos persas, el vestido t\xEDpico de gala es una joya que ha unido detalles de tantos lugares, convirtiendo esas influencias en lo que nosotros conocemos hoy d\xEDa como pollera. </p>\n    <p>Ciertamente la influencia de nuestro traje t\xEDpico es europea y al ser territorio espa\xF1ol desde donde se embarcaron los nav\xEDos a Am\xE9rica es f\xE1cil hacer la relaci\xF3n directa, pero hay muchos indicadores que permiten dar ejemplos tangibles de los or\xEDgenes tan diversos de los elementos que la conforman.  <i>1</i></p>\n    <p>En Panam\xE1 se tienen datos de las polleras desde el a\xF1o 1863 gracias a las im\xE1genes captadas por el primer fot\xF3grafo espa\xF1ol Rafael Castro Ordo\xF1ez, a las polleras centenarias que todav\xEDa existen y a los estudios realizados a las telas y encajes. Es muy interesante conocer las menciones que se encuentran en las cartas de los viajes de Crist\xF3bal Col\xF3n, m\xE1s espec\xEDficamente en su segundo viaje en donde se hace una descripci\xF3n de las vestimentas que tra\xEDan las primeras mujeres que llegaron a Am\xE9rica resaltando que ellas aclimataron los vestidos al calor del tr\xF3pico.</p>\n    <p>La pollera de lujo es el vestido t\xEDpico que representa a la provincia de Los Santos y ha sido adoptada por las personas de la capital con ciertas modificaciones como por ejemplo utilizar la Mosqueta sobre la "mota" o pom pom y tembleques con gusanillos dorados.</p>\n    <p>En el Club Uni\xF3n las chicas de la alta sociedad retomaron el uso de este hermoso traje t\xEDpico para carnavales y d\xEDas patrios. Se tienen datos que afirman que en ocasiones ellas no usaban la partidura en medio y se empolleraban hasta con flequillo. Otro dato interesante es que utilizaban la camisa de la pollera caida sobre los hombros. </p>\n    <p>Ramona "La Trona" Lefevre fue una dama amante de la pollera que sobresali\xF3 gracias a su amor por el traje t\xEDpico y a su poder adquisitivo lo que le permiti\xF3 tener una colecci\xF3n de 19 polleras y uno de los joyeros m\xE1s grandes y lujosos de la capital. Ella implement\xF3 elementos y los impuso como una nueva moda, como, por ejemplo: el uso del peinet\xF3n, el uso de muchas cadenas y el aumento en el tama\xF1o de las labores de la pollera.</p>\n    <p>Otra persona muy sobresaliente en la evoluci\xF3n de la pollera fue el sr Edgardo de Le\xF3n Madariaga un folklorista y artesano, responsable de un cambio est\xE9tico importante en la pollera, incluy\xF3 mayor vuelo en la falda e introdujo las polleras policromadas y degradaciones "matizado". Lleg\xF3 a utilizar hasta 20 colores en las labores de sus dise\xF1os. </p>\n    <p>Otra dama muy importante fue Elia Charpentier la primera \u201CDama nacional de la pollera\u201D ella fue la responsable del aumento en el tama\xF1o de las monedas coronadas y hasta les incrust\xF3 esmeraldas, aument\xF3 el tama\xF1o del peinet\xF3n, revivi\xF3 el uso del tost\xF3n y lleg\xF3 a utilizar todos los tembleques de oro y perlas. </p>\n    <h4>1. recomendamos las charlas del Sr. Eduardo Cano que nos brinda una nueva teor\xEDa sobre el origen de la pollera, esta teor\xEDa es el resultado de muchos a\xF1os de estudio tanto a nivel nacional como internacional.</h4>\n   </hgroup>\n  ']),
    _templateObject9 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <h3>Pollera de Lujo</h3>\n    <p>La pollera de Gala es una pollera de encajes, en su corte y armado es igual a la pollera blanca o la de coquitos, est\xE1 formado por una camisa de dos arandelas y mangas; debajo de estas mangas tiene unas cintas que se utilizan para amarrarlas y mantenerlas al mismo nivel que la segunda arandela. </p>\n    <p>El Poller\xF3n est\xE1 compuesto por dos tramos de tela separados por una trencilla y terminada en un encaje peque\xF1o llamado peacillo y encajes anchos con un poquito de recogido. </p>\n    <p>En la cintura la pretina se separa en dos (adelante y atr\xE1s) y a ambos lados se terminan en cuatro tiras de tela que se amarran. Las dos tiras de atr\xE1s se amarran primero hacia adelante y luego las de adelante hacia atr\xE1s. </p>\n    <p>Los dibujos o labores que se hacen sobre la tela se repiten indefinidamente a lo largo de la falda y de la camisa. </p>\n    <p>Tradicionalmente se utilizan colores s\xF3lidos como azul, rojo o negro, con la modernizaci\xF3n de los m\xE9todos de colorizaci\xF3n de hilos y textiles la pollera ha evolucionado y en la actualidad podemos ver labores matizadas (degradaci\xF3n de colores en un solo tono) o combinando colores (hojas verdes, flores rojas y mariposas amarillas), a pesar de la gran diversidad debemos evitar los colores ne\xF3n. </p>\n    <p>No es posible decir que alguna pollera este mal o bien, la tradici\xF3n y las investigaciones de las polleras centenarias nos revelan caracter\xEDsticas que por necesidad y a veces por simple gusto se utilizan igual o se han modificado. </p>\n    <p>Hay algunos lineamientos que forman parte del buen gusto a la hora de confeccionar una pollera. como, por ejemplo: el tama\xF1o de las labores, hist\xF3ricamente podemos ver un cambio notable en el tama\xF1o de este elemento indispensable de la pollera de lujo. hoy en d\xEDa podemos decir que en la pollera se debe dejar ver el color blanco de la tela en la parte superior de los pa\xF1os como buena pr\xE1ctica.  </p>\n    <p>Diferentes tipos de labores de pollera</p>\n    <ul>\n     <li> Labores Talco en sombra, normalmente es utilizada para trabajar labores en color blanco.</li>\n     <li> Labores Talco al Sol, se utiliza con o sin calados.</li>\n     <li> Labores Marcadas o en punto de cruz. </li>\n     <li> Labores Bordadas se utiliza con o sin calados. </li>\n     <li> Labores Zurcidas se utiliza con o sin calados. </li>\n    </ul>\n    <p>Las labores de la pollera pueden ir acompa\xF1adas de "calados" son una t\xE9cnica que consiste en sacar los hilos de una tela y luego trabajar una especie de bordado sobre ellos. Se realizan dentro de las labores como, por ejemplo: en el centro de una hoja o en el centro del p\xE9talo de una flor. Es caracter\xEDstico que las polleras lleven muchos dise\xF1os diferentes, en algunos casos en una sola pollera no se repite ninguno. </p>\n    <p>los encajes utilizados para las polleras de gala son los que conocemos com\xFAnmente como valencianos, aunque este nombre es un regionalismo y se refiere a encajes trabajados sobre una malla; Su nombre es valencie o valencienne (as\xED es f\xE1cil encontrarlos en Google) </p>\n    <p>Otra de las caracter\xEDsticas de las polleras de gala son los mundillos, que son encajes confeccionados a mano con bolillos (palitos), los que conocemos com\xFAnmente como peacillo y trencilla. seg\xFAn la definici\xF3n del diccionario el mundillo es en realidad el cilindro que se usa para tejer las trencillas, aunque en Panam\xE1 denominamos "mundillo" al juego de trencillas trabajadas con esta t\xE9cnica que se usan para las polleras. </p>\n    <p>Otro accesorio muy interesante es el pa\xF1o o rebozo, este accesorio es el equivalente al chal actual, era utilizado para cubrirse la cabeza del sereno o para abrigarse del fr\xEDo. En la actualidad el reboso es una pieza de gran labor artesanal, se trabaja al igual que la pollera, en labores que combinan perfectamente. No es un accesorio indispensable y cuando se lleva puesto no debe ser amarrado a las mangas, ni utilizado al bailar. </p>\n    <p>En la cabeza de tembleques blancos no se deben utilizan pimpollos de colores, el uso de ellos no es tradicional.  </p>\n    <p>En la actualidad podemos encontrar nuevos materiales para la confecci\xF3n de tembleques como los cristales de Swarovski. </p>\n    <p>Las Enaguas o peticotes son parte fundamental de la pollera. Se utilizan dos o tres y se confeccionan en diferentes t\xE9cnicas, pueden ser de encajes, tejido de crochet, pajita, con labores en talco y calado. Las enaguas o peticotes internos son m\xE1s sencillos y tienen la finalidad de no dejar ver las piernas de la empollerada. </p>\n    <p>El Enjaretado en las polleras de gala se utilizan en colores contrastantes, por ejemplo: si la pollera es roja, el enjaretado puede ser en azul o celeste.  </p>\n    <p>Los Zapatos en las polleras de encajes se usan con lazos y hebillas, son del mismo color que el enjaretado y se deben llevar de sat\xE9n o en una tela con brillos.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <h3>Pollera de Lujo</h3>\n    <p>La pollera de Gala es una pollera de encajes, en su corte y armado es igual a la pollera blanca o la de coquitos, est\xE1 formado por una camisa de dos arandelas y mangas; debajo de estas mangas tiene unas cintas que se utilizan para amarrarlas y mantenerlas al mismo nivel que la segunda arandela. </p>\n    <p>El Poller\xF3n est\xE1 compuesto por dos tramos de tela separados por una trencilla y terminada en un encaje peque\xF1o llamado peacillo y encajes anchos con un poquito de recogido. </p>\n    <p>En la cintura la pretina se separa en dos (adelante y atr\xE1s) y a ambos lados se terminan en cuatro tiras de tela que se amarran. Las dos tiras de atr\xE1s se amarran primero hacia adelante y luego las de adelante hacia atr\xE1s. </p>\n    <p>Los dibujos o labores que se hacen sobre la tela se repiten indefinidamente a lo largo de la falda y de la camisa. </p>\n    <p>Tradicionalmente se utilizan colores s\xF3lidos como azul, rojo o negro, con la modernizaci\xF3n de los m\xE9todos de colorizaci\xF3n de hilos y textiles la pollera ha evolucionado y en la actualidad podemos ver labores matizadas (degradaci\xF3n de colores en un solo tono) o combinando colores (hojas verdes, flores rojas y mariposas amarillas), a pesar de la gran diversidad debemos evitar los colores ne\xF3n. </p>\n    <p>No es posible decir que alguna pollera este mal o bien, la tradici\xF3n y las investigaciones de las polleras centenarias nos revelan caracter\xEDsticas que por necesidad y a veces por simple gusto se utilizan igual o se han modificado. </p>\n    <p>Hay algunos lineamientos que forman parte del buen gusto a la hora de confeccionar una pollera. como, por ejemplo: el tama\xF1o de las labores, hist\xF3ricamente podemos ver un cambio notable en el tama\xF1o de este elemento indispensable de la pollera de lujo. hoy en d\xEDa podemos decir que en la pollera se debe dejar ver el color blanco de la tela en la parte superior de los pa\xF1os como buena pr\xE1ctica.  </p>\n    <p>Diferentes tipos de labores de pollera</p>\n    <ul>\n     <li> Labores Talco en sombra, normalmente es utilizada para trabajar labores en color blanco.</li>\n     <li> Labores Talco al Sol, se utiliza con o sin calados.</li>\n     <li> Labores Marcadas o en punto de cruz. </li>\n     <li> Labores Bordadas se utiliza con o sin calados. </li>\n     <li> Labores Zurcidas se utiliza con o sin calados. </li>\n    </ul>\n    <p>Las labores de la pollera pueden ir acompa\xF1adas de "calados" son una t\xE9cnica que consiste en sacar los hilos de una tela y luego trabajar una especie de bordado sobre ellos. Se realizan dentro de las labores como, por ejemplo: en el centro de una hoja o en el centro del p\xE9talo de una flor. Es caracter\xEDstico que las polleras lleven muchos dise\xF1os diferentes, en algunos casos en una sola pollera no se repite ninguno. </p>\n    <p>los encajes utilizados para las polleras de gala son los que conocemos com\xFAnmente como valencianos, aunque este nombre es un regionalismo y se refiere a encajes trabajados sobre una malla; Su nombre es valencie o valencienne (as\xED es f\xE1cil encontrarlos en Google) </p>\n    <p>Otra de las caracter\xEDsticas de las polleras de gala son los mundillos, que son encajes confeccionados a mano con bolillos (palitos), los que conocemos com\xFAnmente como peacillo y trencilla. seg\xFAn la definici\xF3n del diccionario el mundillo es en realidad el cilindro que se usa para tejer las trencillas, aunque en Panam\xE1 denominamos "mundillo" al juego de trencillas trabajadas con esta t\xE9cnica que se usan para las polleras. </p>\n    <p>Otro accesorio muy interesante es el pa\xF1o o rebozo, este accesorio es el equivalente al chal actual, era utilizado para cubrirse la cabeza del sereno o para abrigarse del fr\xEDo. En la actualidad el reboso es una pieza de gran labor artesanal, se trabaja al igual que la pollera, en labores que combinan perfectamente. No es un accesorio indispensable y cuando se lleva puesto no debe ser amarrado a las mangas, ni utilizado al bailar. </p>\n    <p>En la cabeza de tembleques blancos no se deben utilizan pimpollos de colores, el uso de ellos no es tradicional.  </p>\n    <p>En la actualidad podemos encontrar nuevos materiales para la confecci\xF3n de tembleques como los cristales de Swarovski. </p>\n    <p>Las Enaguas o peticotes son parte fundamental de la pollera. Se utilizan dos o tres y se confeccionan en diferentes t\xE9cnicas, pueden ser de encajes, tejido de crochet, pajita, con labores en talco y calado. Las enaguas o peticotes internos son m\xE1s sencillos y tienen la finalidad de no dejar ver las piernas de la empollerada. </p>\n    <p>El Enjaretado en las polleras de gala se utilizan en colores contrastantes, por ejemplo: si la pollera es roja, el enjaretado puede ser en azul o celeste.  </p>\n    <p>Los Zapatos en las polleras de encajes se usan con lazos y hebillas, son del mismo color que el enjaretado y se deben llevar de sat\xE9n o en una tela con brillos.</p>\n   </hgroup>\n  ']),
    _templateObject10 = _taggedTemplateLiteral(['\n   <hgroup>\n    <p>La camisilla es el vestido t\xEDpico de gala del hombre paname\xF1o y es utilizada en fiestas y en ocasiones especiales como por ejemplo los domingos para asistir a misa.</p>\n   </hgroup>'], ['\n   <hgroup>\n    <p>La camisilla es el vestido t\xEDpico de gala del hombre paname\xF1o y es utilizada en fiestas y en ocasiones especiales como por ejemplo los domingos para asistir a misa.</p>\n   </hgroup>']),
    _templateObject11 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>"No se sabe a ciencia cierta en qu\xE9 a\xF1o s\xE9 utilizo por primera vez la camisilla, existen referencias de que esta pieza masculina tiene una larga vida de existencia, ya que en la fiesta del Centenario de Chitr\xE9 en 1948, se exhibi\xF3 una camisilla con juegos de alforzas y peque\xF1os talcos piramidales en relieve, con cien a\xF1os de existencia".</p>\n    <h3>Dora P. De Z\xE1rate</h3>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>"No se sabe a ciencia cierta en qu\xE9 a\xF1o s\xE9 utilizo por primera vez la camisilla, existen referencias de que esta pieza masculina tiene una larga vida de existencia, ya que en la fiesta del Centenario de Chitr\xE9 en 1948, se exhibi\xF3 una camisilla con juegos de alforzas y peque\xF1os talcos piramidales en relieve, con cien a\xF1os de existencia".</p>\n    <h3>Dora P. De Z\xE1rate</h3>\n   </hgroup>\n  ']),
    _templateObject12 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <h3>Camisilla</h3>\n    <p>Las camisillas de Los Santos son de color blanco y tienen un dise\xF1o caracter\xEDstico. </p>\n    <p>El cuello de la camisa es alto y de estilo chino, en la parte frontal posee dos bolsillos, las mangas son largas y holgadas, en las mu\xF1ecas es cerrada y no lleva botones.</p>\n    <p>El cuerpo de la camisilla esta adornado con alforzas, que son una serie de tabletas finamente cosidas en la parte trasera dela camisa se hacen dos o tres tiras de alforzas y en la parte frontal se hacen a ambos lados del pecho.</p>\n    <p>Las camisillas llevan botones que pueden ser de oro, monedas peque\xF1as de plata ba\xF1ada en oro, n\xE1car o hueso. Las m\xE1s sencillas normalmente llevan los botones pegados y una sola l\xEDnea de ojales. mientras que las m\xE1s elaboradas y finas tienen doble l\xEDnea, ya que los botones son de oro y se puedes quitar y poner para lavar la camisa.</p>\n    <p>Las telas utilizadas para su confecci\xF3n son de hilo como el hol\xE1n o m\xE1s sencillas como el poplin.</p>\n    <p>La labor artesanal de las camisillas se destaca en las alforzas o espiguetas, que pueden tomar al rededor de cinco o seis d\xEDas para su confecci\xF3n.</p>\n    <p>De la cantidad de espiguetas depende el valor que se le brindar\xE1 a la camisilla. La tradici\xF3n nos dice que se consideran m\xE1s finas las camisillas que tienen m\xE1s espiguetas, por esta raz\xF3n cuando son confeccionadas para concursos, deben tener un m\xEDnimo de 30 espiguetas en la parte delantera.</p>\n    <p>tipos de alforzas o espiguetas</p>\n    <ul>\n     <li>Alforzas Horizontales</li>\n     <li>Alforzas Verticales</li>\n     <li>Alforzas Oblicuas</li>\n     <li>Alforzas Oblicuas Encontradas (combinaci\xF3n de dos tiras independientes de alforzas)</li>\n     <li>Alforzas horizontales y verticales</li>\n     <li>Cepito</li>\n    </ul>\n    <p>Para acompa\xF1ar la camisilla el hombre debe vestir con pantal\xF3n negro, zapatos negros, cutarras o chinelas (zapatos blanco con negro), una cebadera o ch\xE1cara (bolsa de hilo tejida) y sombrero pintado.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <h3>Camisilla</h3>\n    <p>Las camisillas de Los Santos son de color blanco y tienen un dise\xF1o caracter\xEDstico. </p>\n    <p>El cuello de la camisa es alto y de estilo chino, en la parte frontal posee dos bolsillos, las mangas son largas y holgadas, en las mu\xF1ecas es cerrada y no lleva botones.</p>\n    <p>El cuerpo de la camisilla esta adornado con alforzas, que son una serie de tabletas finamente cosidas en la parte trasera dela camisa se hacen dos o tres tiras de alforzas y en la parte frontal se hacen a ambos lados del pecho.</p>\n    <p>Las camisillas llevan botones que pueden ser de oro, monedas peque\xF1as de plata ba\xF1ada en oro, n\xE1car o hueso. Las m\xE1s sencillas normalmente llevan los botones pegados y una sola l\xEDnea de ojales. mientras que las m\xE1s elaboradas y finas tienen doble l\xEDnea, ya que los botones son de oro y se puedes quitar y poner para lavar la camisa.</p>\n    <p>Las telas utilizadas para su confecci\xF3n son de hilo como el hol\xE1n o m\xE1s sencillas como el poplin.</p>\n    <p>La labor artesanal de las camisillas se destaca en las alforzas o espiguetas, que pueden tomar al rededor de cinco o seis d\xEDas para su confecci\xF3n.</p>\n    <p>De la cantidad de espiguetas depende el valor que se le brindar\xE1 a la camisilla. La tradici\xF3n nos dice que se consideran m\xE1s finas las camisillas que tienen m\xE1s espiguetas, por esta raz\xF3n cuando son confeccionadas para concursos, deben tener un m\xEDnimo de 30 espiguetas en la parte delantera.</p>\n    <p>tipos de alforzas o espiguetas</p>\n    <ul>\n     <li>Alforzas Horizontales</li>\n     <li>Alforzas Verticales</li>\n     <li>Alforzas Oblicuas</li>\n     <li>Alforzas Oblicuas Encontradas (combinaci\xF3n de dos tiras independientes de alforzas)</li>\n     <li>Alforzas horizontales y verticales</li>\n     <li>Cepito</li>\n    </ul>\n    <p>Para acompa\xF1ar la camisilla el hombre debe vestir con pantal\xF3n negro, zapatos negros, cutarras o chinelas (zapatos blanco con negro), una cebadera o ch\xE1cara (bolsa de hilo tejida) y sombrero pintado.</p>\n   </hgroup>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');
module.exports = [{
  nombre: 'Pollera de Gala Ocueña',
  url: 'Gala-Ocuena',
  region: 'Ocú',
  dato: 'Danzas: Mejorana',
  miniatura: 'galaOcuMiniatura.jpg',
  reseña: yo(_templateObject),
  antecedentes: yo(_templateObject2),
  portadaImagen: '/images/galaOcuPortada.jpg',
  generalImagen: '/images/galaOcuGeneral.jpg',
  general: 'La pollera de gala ocueña  es una pollera blanca utilizada para ocasiones especiales. Una de sus características es que no lleva labores corridas (como en Los Santos). Esta pollera puede ser confeccionada en tela de hilo, voile (bual), coquito, linón de motita, seda lisa o estampada, de coquito, tela de colores pasteles y organza bordada o letin bordado (las 2 últimas no son telas tradicionales, su uso es reciente).',
  descripcion: yo(_templateObject3),
  joyero: ['zarcillos', 'tapa hueso (dije con cinta negra)', 'cadena chata', 'Cadena bruja (chata abierta) con la flor de guate', 'Cadena guachapalí', 'Rosario', 'Cabestrillo', 'No se utilizan joyas en los brazos.', 'En las manos se utilizan anillos de aro lizo, de corazón o las de manito.'],
  joyeroImagen: '/images/galaOcuJoyero.jpg'
}, {
  nombre: 'Pollera Congo',
  url: 'Pollera-Congo',
  region: 'Costa Atlántica',
  dato: 'Danza: Congo',
  miniatura: 'polleraCongoMiniatura.jpg',
  reseña: yo(_templateObject4),
  antecedentes: yo(_templateObject5),
  portadaImagen: '/images/polleraCongoFull.jpg',
  generalImagen: '/images/polleraCongoGeneral.jpg',
  general: 'Las polleras congo son confeccionadas en telas de diferentes colores lisos y estampados, no existe una limitación en el uso de las telas, estas son del gusto de la dueña de la pollera, o producto de las telas que se tenga a la mano. Una de las pocas características en las que se restrige el uso de un elemento es en el color Rojo. En la cultura congo este color representa al diablo o chamuco y si alguien lo usa está diciendo que tiene algún pacto con él. Pero este personaje no es el que hoy conocemos, el diablo para los congos era el blanco esclavizador la viva representación del mal. Otros datos nos aportan información sobre lo que significa el uso del color rojo en el vestido congo. Se debía a la colaboración de algunos palenques con los blancos, ellos prestaron su ayuda a corsarios ingleses como Francis Drake y a piratas como Henry Morgan para sabotear el comercio colonial español.',
  descripcion: yo(_templateObject6)
}, {
  nombre: 'Pollera De Lujo',
  url: 'Pollera-De-Lujo',
  region: 'Los Santos',
  dato: 'Danza: Cumbia Santeña',
  miniatura: 'PolleraDeLujoMiniatura.jpg',
  reseña: yo(_templateObject7),
  antecedentes: yo(_templateObject8),
  portadaImagen: '/images/PolleraDeLujoFull.jpg',
  generalImagen: '/images/PolleraDeLujoGeneral.jpg',
  general: 'Es imposible determinar cuál de las polleras existentes de Panamá es mejor, cada una es fruto de la evolución y de las características históricas del pueblo al que pertenecen. Sus rasgos distintivos hacen a cada una de nuestras polleras únicas y dignas de amor y respeto. Por otro lado, las ganas de volver a "las polleras" más comerciales y vistosas han llegado a crear variaciones muy distintas de lo tradicional.',
  descripcion: yo(_templateObject9)
}, {
  nombre: 'La Camisilla',
  url: 'Camisilla',
  region: 'Provincias Centrales',
  dato: 'Danza: Punto',
  miniatura: 'camisillaMiniatura.jpg',
  reseña: yo(_templateObject10),
  antecedentes: yo(_templateObject11),
  portadaImagen: '/images/camisillaFull.jpg',
  generalImagen: '/images/camisillaGeneral.jpg',
  general: 'Los vestidos típicos de los hombres, no son tan conocidos como los de las mujeres. Existen pocosdatos sobre sus orígenes. En la actualidad podemos apreciar una amplia variedad de modelos endonde se incluyen elementos totalmente novedosos para esta prenda de vestir como, por ejemplo: encajes, bordados, calados, talcos, etc... que son labores usualmente utilizadas en las polleras de gala y en algunas montunas. ',
  descripcion: yo(_templateObject12)
}];

},{"yo-yo":14}]},{},[34]);
