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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = function (imagenes) {
  var el = (0, _yoYo2.default)(_templateObject);
  return el;
};

},{"yo-yo":14}],17:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <a class="tarjeta" href="/', '/', '">\n    <div class="tarjetaImagen" style="background: url(\'/images/', '\'); background-size: cover"></div>\n    <div class="tarjetaInfo">\n     <hgroup>\n      <h2>', '</h2>\n      <h4>Regi\xF3n: ', '</h4>\n      <h4>', '</h4>\n     </hgroup>\n    </div>\n  </a>\n '], ['\n  <a class="tarjeta" href="/', '/', '">\n    <div class="tarjetaImagen" style="background: url(\'/images/', '\'); background-size: cover"></div>\n    <div class="tarjetaInfo">\n     <hgroup>\n      <h2>', '</h2>\n      <h4>Regi\xF3n: ', '</h4>\n      <h4>', '</h4>\n     </hgroup>\n    </div>\n  </a>\n ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = function (seccion, articulo) {
  var el = (0, _yoYo2.default)(_templateObject, seccion, articulo.url, articulo.miniatura, articulo.nombre, articulo.region, articulo.dato);
  return el;
};

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/contacto', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
});

},{"../footer":30,"../header":33,"../header/functions":32,"./template":19,"empty-element":4,"page":12}],19:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="contacto completa">\n    <article class="contactoInfo rosaTrans">\n      <div>\n        <h2>Cont\xE1ctenos:</h2>\n        <h4>Email:</h4>\n        <p>info@folkinlovepty.com</p>\n        <h4>tel\xE9fono:</h4>\n        <p>6945-5931</p>\n        <form action="/contacto/send" method="post">\n          <input type="text" name="nombre" placeholder="Nombre">\n          <input type="text" name="email" placeholder="Email">\n          <input type="text" name="asunto" placeholder="Asunto">\n          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>\n          <input type="submit" name="submit" value="Enviar" class="btn negro">\n        </form>\n      </div>\n    </article>\n  </section>\n'], ['\n  <section class="contacto completa">\n    <article class="contactoInfo rosaTrans">\n      <div>\n        <h2>Cont\xE1ctenos:</h2>\n        <h4>Email:</h4>\n        <p>info@folkinlovepty.com</p>\n        <h4>tel\xE9fono:</h4>\n        <p>6945-5931</p>\n        <form action="/contacto/send" method="post">\n          <input type="text" name="nombre" placeholder="Nombre">\n          <input type="text" name="email" placeholder="Email">\n          <input type="text" name="asunto" placeholder="Asunto">\n          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>\n          <input type="submit" name="submit" value="Enviar" class="btn negro">\n        </form>\n      </div>\n    </article>\n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/confirmacion', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
});

},{"../footer":30,"../header":33,"../header/functions":32,"./template":21,"empty-element":4,"page":12}],21:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <articulo className="completa blanco texto">\n  <hgroup>\n   <h2>Su Mensaje Ha Sido Enviado</h2>\n  </hgroup>\n </articulo>\n'], ['\n <articulo className="completa blanco texto">\n  <hgroup>\n   <h2>Su Mensaje Ha Sido Enviado</h2>\n  </hgroup>\n </articulo>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/error', _header2.default, _footer2.default, _functions2.default.noScrollFunction, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
});

},{"../footer":30,"../header":33,"../header/functions":32,"./template":23,"empty-element":4,"page":12}],23:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <articulo className="completa texto rosa">\n  <hgroup>\n    <h2>Ha habido Un Error</h2>\n  </hgroup> \n </articulo>\n'], ['\n <articulo className="completa texto rosa">\n  <hgroup>\n    <h2>Ha habido Un Error</h2>\n  </hgroup> \n </articulo>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],24:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n  <article class="mitad rosaTrans">\n   <hgroup>\n    <h1>', '</h1>\n    <p>', '</p>\n   </hgroup>\n  </article>\n </section>\n <section>\n  <article class="tercio imagen" style="background: url(\'', '\'); background-size: cover;"></article>\n  <article class="dosTercios blanco texto">\n   ', '\n  </article>\n </section>\n <section>\n  <article class="completa texto info blanco">\n   ', '\n  </article>\n </section>\n <section>\n  <article class="tercio blanco pasos">\n   <hgroup>\n    <h2>Pasos</h2>\n    <ul>\n     ', '\n    </ul>\n   </hgroup>\n  </article>\n  <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n </section>\n <article class="completa texto info rosa">\n     <hgroup>\n      <h2>referencias</h2>\n      <ul>\n       <li>Extracto de "EL PUNTO, LA DENESA, EL ATRAVESADO Y OTROS BAILES ORQUESTADOS". Dora P\xE9rez de Z\xE1rate. 198</li>\n      </ul>\n     </hgroup>\n </article>\n</main>\n \n '], ['\n<main>\n <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n  <article class="mitad rosaTrans">\n   <hgroup>\n    <h1>', '</h1>\n    <p>', '</p>\n   </hgroup>\n  </article>\n </section>\n <section>\n  <article class="tercio imagen" style="background: url(\'', '\'); background-size: cover;"></article>\n  <article class="dosTercios blanco texto">\n   ', '\n  </article>\n </section>\n <section>\n  <article class="completa texto info blanco">\n   ', '\n  </article>\n </section>\n <section>\n  <article class="tercio blanco pasos">\n   <hgroup>\n    <h2>Pasos</h2>\n    <ul>\n     ', '\n    </ul>\n   </hgroup>\n  </article>\n  <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n </section>\n <article class="completa texto info rosa">\n     <hgroup>\n      <h2>referencias</h2>\n      <ul>\n       <li>Extracto de "EL PUNTO, LA DENESA, EL ATRAVESADO Y OTROS BAILES ORQUESTADOS". Dora P\xE9rez de Z\xE1rate. 198</li>\n      </ul>\n     </hgroup>\n </article>\n</main>\n \n ']),
    _templateObject2 = _taggedTemplateLiteral(['<li>', '</li>'], ['<li>', '</li>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = function (danza) {
  var el = (0, _yoYo2.default)(_templateObject, danza.portadaImagen, danza.nombre, danza.reseña, danza.introImagen, danza.intro, danza.descripcion, danza.pasos.map(function (paso) {
    return (0, _yoYo2.default)(_templateObject2, paso);
  }), danza.pasosImagen);
  return el;
};

},{"yo-yo":14}],25:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/danzas/:url', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild((0, _template2.default)(_danzas2.default, ctx.params.url));
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../danzas/danzas":27,"../footer":30,"../header":33,"../header/functions":32,"./template":26,"empty-element":4,"page":12}],26:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <div>\n ', '\n </div>\n  \n '], ['\n <div>\n ', '\n </div>\n  \n ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _danza = require('./danza');

var _danza2 = _interopRequireDefault(_danza);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = function (danzas, ident) {
  var el = (0, _yoYo2.default)(_templateObject, danzas.map(function (danza) {
    if (danza.url == ident) {
      return (0, _danza2.default)(danza);
    }
  }));
  return el;
};

},{"./danza":24,"yo-yo":14}],27:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n   <hgroup>\n    <p><i>\u201CDespu\xE9s del tamborito, el baile de parejas individual m\xE1s atractivo es el PUNTO en el cual la pareja hace gala de donaire, precisi\xF3n y gracia. Parece de pura ascendencia hisp\xE1nica a juzgar por la m\xFAsica que lo acompa\xF1a.</i></p>\n    <p><i>El baile de PUNTO no es baile de toda una noche como puede serio el Tamborito y la Cumbia; el Pind\xEDn y la Mejorana. Se baila m\xE1s bien como una demostraci\xF3n atractiva entre los minutos de descanso de un baile, para regalo de los ojos y goce del esp\xEDritu de la concurrencia a una fiesta.\u201D</i></p>\n    <p>Dora P\xE9rez de Zarate</p>\n   </hgroup>'], ['\n   <hgroup>\n    <p><i>\u201CDespu\xE9s del tamborito, el baile de parejas individual m\xE1s atractivo es el PUNTO en el cual la pareja hace gala de donaire, precisi\xF3n y gracia. Parece de pura ascendencia hisp\xE1nica a juzgar por la m\xFAsica que lo acompa\xF1a.</i></p>\n    <p><i>El baile de PUNTO no es baile de toda una noche como puede serio el Tamborito y la Cumbia; el Pind\xEDn y la Mejorana. Se baila m\xE1s bien como una demostraci\xF3n atractiva entre los minutos de descanso de un baile, para regalo de los ojos y goce del esp\xEDritu de la concurrencia a una fiesta.\u201D</i></p>\n    <p>Dora P\xE9rez de Zarate</p>\n   </hgroup>']),
    _templateObject2 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF2n de la danza</h2>\n    <p>El punto sante\xF1o consta de una serie de pasos (que describiremos a continuaci\xF3n) los cuales se repiten 3 veces <i>"tiempos"</i> en el mismo orden. A cada repetici\xF3n le llamamos tiempos o vueltas musicales. Una de sus caracter\xEDsticas particulares se lleva a cabo durante el zapateo ya que en cada uno (son 3) la pareja bailar\xE1 en una direcci\xF3n diferente. En el primer tiempo la pareja realizar\xE1 el zapateo frente a frente, en el segundo tiempo se dirigir\xE1n hacia los m\xFAsicos (es com\xFAn en los conjuntos folkl\xF3ricos dirigir el zapateo en otra direcci\xF3n cuando no se baila con m\xFAsicos en vivo) y en el \xFAltimo tiempo se dirige hacia el p\xFAblico.</p>\n    <p>Cada paso durante la ejecuci\xF3n del Punto Sante\xF1o no tiene una duraci\xF3n definida, es el cambio de la m\xFAsica la que indicar\xE1 el paso a la siguiente figura.</p>\n    <p>Inicia con <b>El PASEO</b>, es el paso de baile en el que el var\xF3n y la dama describen un amplio c\xEDrculo, ocupando cada uno de los extremos.</p>\n    <p>Al cambio de la m\xFAsica se ejecuta una ca\xEDda y vuelta pasando al <b>ZAPATEO</b> en el cual los bailadores, dependiendo del tiempo lo ejecutan, frente a frente, a la m\xFAsica o al p\xFAblico.</p>\n    <p>En seguida, otro cambio de la m\xFAsica les advierte que deben realizar el tercer movimiento, <b>EL ESCOBILLAO</b>, que separa ampliamente a la pareja y  se ejecuta con r\xE1pidos movimientos de los pies hacia atr\xE1s.</p>\n    <p>Por \xFAltimo, tambi\xE9n a indicaci\xF3n de la m\xFAsica, se realiza la <b>SEGUIDILLA</b> con la cual la pareja se desplaza acerc\xE1ndose el uno al otro para girar con mucha serenidad y finura en el centro del c\xEDrculo hasta que se indique el cambio y comience con una vuelta paseada el siguiente tiempo con el <b>PASEO</b>.</p>\n    <p>Es Com\xFAn que al ver a la pareja ejecutar tan hermoso baile los espectadores lancen monedas por el suelo; costumbre que hoy podemos ver en las fiestas cuando las quincea\xF1eras o reinas bailan el punto.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF2n de la danza</h2>\n    <p>El punto sante\xF1o consta de una serie de pasos (que describiremos a continuaci\xF3n) los cuales se repiten 3 veces <i>"tiempos"</i> en el mismo orden. A cada repetici\xF3n le llamamos tiempos o vueltas musicales. Una de sus caracter\xEDsticas particulares se lleva a cabo durante el zapateo ya que en cada uno (son 3) la pareja bailar\xE1 en una direcci\xF3n diferente. En el primer tiempo la pareja realizar\xE1 el zapateo frente a frente, en el segundo tiempo se dirigir\xE1n hacia los m\xFAsicos (es com\xFAn en los conjuntos folkl\xF3ricos dirigir el zapateo en otra direcci\xF3n cuando no se baila con m\xFAsicos en vivo) y en el \xFAltimo tiempo se dirige hacia el p\xFAblico.</p>\n    <p>Cada paso durante la ejecuci\xF3n del Punto Sante\xF1o no tiene una duraci\xF3n definida, es el cambio de la m\xFAsica la que indicar\xE1 el paso a la siguiente figura.</p>\n    <p>Inicia con <b>El PASEO</b>, es el paso de baile en el que el var\xF3n y la dama describen un amplio c\xEDrculo, ocupando cada uno de los extremos.</p>\n    <p>Al cambio de la m\xFAsica se ejecuta una ca\xEDda y vuelta pasando al <b>ZAPATEO</b> en el cual los bailadores, dependiendo del tiempo lo ejecutan, frente a frente, a la m\xFAsica o al p\xFAblico.</p>\n    <p>En seguida, otro cambio de la m\xFAsica les advierte que deben realizar el tercer movimiento, <b>EL ESCOBILLAO</b>, que separa ampliamente a la pareja y  se ejecuta con r\xE1pidos movimientos de los pies hacia atr\xE1s.</p>\n    <p>Por \xFAltimo, tambi\xE9n a indicaci\xF3n de la m\xFAsica, se realiza la <b>SEGUIDILLA</b> con la cual la pareja se desplaza acerc\xE1ndose el uno al otro para girar con mucha serenidad y finura en el centro del c\xEDrculo hasta que se indique el cambio y comience con una vuelta paseada el siguiente tiempo con el <b>PASEO</b>.</p>\n    <p>Es Com\xFAn que al ver a la pareja ejecutar tan hermoso baile los espectadores lancen monedas por el suelo; costumbre que hoy podemos ver en las fiestas cuando las quincea\xF1eras o reinas bailan el punto.</p>\n   </hgroup>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = [{
  nombre: 'El Punto Santeño',
  url: 'El-Punto-Santeno',
  region: 'Azuero',
  dato: 'Vestuario: Pollera De Lujo',
  miniatura: 'puntoMiniatura.jpg',
  reseña: 'El Punto Santeño es un género musical y a su vez un baile. Es considerado como uno de los más bellos y elegantes de todo el Istmo de Panamá; es ejecutado por una sola pareja y tiene como característica principal la elegancia y el donaire con la que el hombre y la mujer se mueven durante su ejecución.',
  portadaImagen: '/images/puntoPortada.jpg',
  intro: (0, _yoYo2.default)(_templateObject),
  introImagen: '/images/puntoIntro.jpg',
  descripcion: (0, _yoYo2.default)(_templateObject2),
  pasos: ['Paseo', 'Caida y vuelta', 'Zapateo', 'Escobillao', 'Seguidilla', 'Vuelta Paseada'],
  pasosImagen: '/images/puntoPasos.jpg'

}];

},{"yo-yo":14}],28:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/danzas', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":30,"../header":33,"../header/functions":32,"./template":29,"empty-element":4,"page":12}],29:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n <section class="portada" id="danzasPortada">\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Danzas Paname\xF1as</h2>\n    <p>Las danzas de Panam\xE1 expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colaci\xF3n rituales religiosos y celebraciones.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaFiltros">\n\n  </div>\n  <div class="listaCont">\n   ', '\n  </div> \n </section>\n</main>\n'], ['\n<main>\n <section class="portada" id="danzasPortada">\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Danzas Paname\xF1as</h2>\n    <p>Las danzas de Panam\xE1 expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colaci\xF3n rituales religiosos y celebraciones.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaFiltros">\n\n  </div>\n  <div class="listaCont">\n   ', '\n  </div> \n </section>\n</main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('../componentes/tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

var _danzas = require('./danzas');

var _danzas2 = _interopRequireDefault(_danzas);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject, _danzas2.default.map(function (danza) {
  return (0, _tarjeta2.default)('danzas', danza);
}));

},{"../componentes/tarjeta":17,"./danzas":27,"yo-yo":14}],30:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = function footer(ctx, next) {
  var pie = document.getElementById('footer');
  (0, _emptyElement2.default)(pie).appendChild(_template2.default);
  next();
};

},{"./template":31,"empty-element":4}],31:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<footer>\n <div class="footerLeft">\n  <a class="logo"></a>\n </div>\n <div class="footerRight">\n  <div class="footerRightUp">\n   <h3>Cont\xE1ctenos:</h3>\n   <ul>\n    <li>Email: info@folkinlovepty.com</li>\n    <li>Tel\xE9fono: 6945-5931</li>\n    <li>Direcci\xF3n: Calle 49A<br>\n    El Cangrejo, Bella Vista</li>\n   </ul>\n  </div>\n  <div class="footerRightDown">\n   <a href="https://facebook.com/folkinlovepty" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>\n   <a href="https://instagram.com/folkinlovepty" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>\n   <a href="mailto: info@folkinlovepty.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>\n  </div>\n </div>\n</footer>\n'], ['\n<footer>\n <div class="footerLeft">\n  <a class="logo"></a>\n </div>\n <div class="footerRight">\n  <div class="footerRightUp">\n   <h3>Cont\xE1ctenos:</h3>\n   <ul>\n    <li>Email: info@folkinlovepty.com</li>\n    <li>Tel\xE9fono: 6945-5931</li>\n    <li>Direcci\xF3n: Calle 49A<br>\n    El Cangrejo, Bella Vista</li>\n   </ul>\n  </div>\n  <div class="footerRightDown">\n   <a href="https://facebook.com/folkinlovepty" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>\n   <a href="https://instagram.com/folkinlovepty" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>\n   <a href="mailto: info@folkinlovepty.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>\n  </div>\n </div>\n</footer>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
'use strict';

var _emptyElement = require('empty-element');

var _emptyElement2 = _interopRequireDefault(_emptyElement);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = function header(ctx, next) {
  var container = document.getElementById('header');
  (0, _emptyElement2.default)(container).appendChild(_template2.default);
  next();
};

},{"./template":34,"empty-element":4}],34:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<header id= "headerContainer">\n <a href="/" class="logoContainer">\n   <div class="logo"></div>\n   <h1>FOLK in LOVE</h1>\n </a>\n <nav id="nav" class="nav hidden">\n   <a href="/" onclick=', '>Inicio</a>\n   <a href="/danzas" onclick=', '>Danzas</a>\n   <a href="/vestuarios" onclick=', '>Vestuarios</a>\n   <a href="/contacto" onclick=', '>Contacto</a>\n </nav>\n <a href="#" class="navButton" onclick=', '>\n   <i class="fa fa-bars" aria-hidden="true"></i>\n </a>\n</header>'], ['\n<header id= "headerContainer">\n <a href="/" class="logoContainer">\n   <div class="logo"></div>\n   <h1>FOLK in LOVE</h1>\n </a>\n <nav id="nav" class="nav hidden">\n   <a href="/" onclick=', '>Inicio</a>\n   <a href="/danzas" onclick=', '>Danzas</a>\n   <a href="/vestuarios" onclick=', '>Vestuarios</a>\n   <a href="/contacto" onclick=', '>Contacto</a>\n </nav>\n <a href="#" class="navButton" onclick=', '>\n   <i class="fa fa-bars" aria-hidden="true"></i>\n </a>\n</header>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _functions = require('./functions');

var _functions2 = _interopRequireDefault(_functions);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion, _functions2.default.navegacion);

},{"./functions":32,"yo-yo":14}],35:[function(require,module,exports){
'use strict';

var _page = require('page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

(0, _page2.default)();

},{"./contacto":18,"./contactoConfirmacion":20,"./contactoError":22,"./danzaPage":25,"./danzas":28,"./inicio":40,"./vestuarioPage":43,"./vestuarios":45,"page":12}],36:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="inicioAbout completa">\n    <article class="aboutTexto mitad">\n      <hgroup>\n        <h2>Que es Folk In love?</h2>\n        <h3>Conoce Tus Danzas, Descubre tus Vestuarios y Regiones</h3>\n        <p>\n          En Folk in love nos dedicamos a la investigaci\xF3n, difusion, promocion y conservaci\xF3n del folklore Paname\xF1o, Procuramos ofrecer un espacio en donde se pueda encontrar informaci\xF3n de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes del folklore.\n        </p>\n        <p>\n          Buscamos unir nuestros esfuerzos con la comunidad. Ademas de hacer investigaciones propias estamos abiertos a recibir todo tipo de aporte como fotografias, videos y datos que nos permitan tener un panorama m\xE1s amplio de nuestras manifestaciones folkloricas.\n        </p>\n      </hgroup>\n    </article>\n    <article class="aboutImagen mitad"></article>\n  </section>\n'], ['\n  <section class="inicioAbout completa">\n    <article class="aboutTexto mitad">\n      <hgroup>\n        <h2>Que es Folk In love?</h2>\n        <h3>Conoce Tus Danzas, Descubre tus Vestuarios y Regiones</h3>\n        <p>\n          En Folk in love nos dedicamos a la investigaci\xF3n, difusion, promocion y conservaci\xF3n del folklore Paname\xF1o, Procuramos ofrecer un espacio en donde se pueda encontrar informaci\xF3n de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes del folklore.\n        </p>\n        <p>\n          Buscamos unir nuestros esfuerzos con la comunidad. Ademas de hacer investigaciones propias estamos abiertos a recibir todo tipo de aporte como fotografias, videos y datos que nos permitan tener un panorama m\xE1s amplio de nuestras manifestaciones folkloricas.\n        </p>\n      </hgroup>\n    </article>\n    <article class="aboutImagen mitad"></article>\n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],37:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="inicioApoyo completa">\n    <article class="apoyoTexto mitad rosaTrans">\n      <hgroup>\n        <h2>Ayudenos a Crecer</h2>\n        <h3>Aceptamos Diferentes Tipos de Aportes</h3>\n        <p>\n          Folk in Love es una plataforma que quiere que t\xFA seas parte de la experiencia de ser paname\xF1os. \n        </p>\n        <p>\n          Nuestra identidad se ha formado por cada uno de nuestros abuelos y bisabuelos antes de toda esta \xE9poca tecnol\xF3gica, y son sus recuerdos y sus vivencias las que nos han llevado a lo que somos hoy.  \n        </p>\n        <p>  \n            Si bien nos puedes apoyar econ\xF3micamente no queremos limitar tu aporte, tal vez tengas fotos, libros, escritos o alguna historia que deseas compartir.  \n        </p>\n        <p>\n            \xBFDeseas que investiguemos en tu comunidad?  \n            Nos ayudar\xEDan los recursos que tienes a tu alrededor, hospedaje, comida o contactos que nos permitan ir y documentar las tradiciones de tu regi\xF3n para expresarles a todos los paname\xF1os la diversidad de bailes y vestidos que tiene nuestro hermoso pa\xEDs. \n        </p>\n      </hgroup>\n    </article>\n  </section>\n'], ['\n  <section class="inicioApoyo completa">\n    <article class="apoyoTexto mitad rosaTrans">\n      <hgroup>\n        <h2>Ayudenos a Crecer</h2>\n        <h3>Aceptamos Diferentes Tipos de Aportes</h3>\n        <p>\n          Folk in Love es una plataforma que quiere que t\xFA seas parte de la experiencia de ser paname\xF1os. \n        </p>\n        <p>\n          Nuestra identidad se ha formado por cada uno de nuestros abuelos y bisabuelos antes de toda esta \xE9poca tecnol\xF3gica, y son sus recuerdos y sus vivencias las que nos han llevado a lo que somos hoy.  \n        </p>\n        <p>  \n            Si bien nos puedes apoyar econ\xF3micamente no queremos limitar tu aporte, tal vez tengas fotos, libros, escritos o alguna historia que deseas compartir.  \n        </p>\n        <p>\n            \xBFDeseas que investiguemos en tu comunidad?  \n            Nos ayudar\xEDan los recursos que tienes a tu alrededor, hospedaje, comida o contactos que nos permitan ir y documentar las tradiciones de tu regi\xF3n para expresarles a todos los paname\xF1os la diversidad de bailes y vestidos que tiene nuestro hermoso pa\xEDs. \n        </p>\n      </hgroup>\n    </article>\n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],38:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <section class="portada banner">\n    <articulo class="negroTrans completa texto">\n        <hgroup>\n          <h1>Folk in Love</h1>\n          <h3>Conoce Costumbres y Tradiciones de Panam\xE1</h3>\n        </hgroup>\n    </articulo>\n    \n  </section>\n'], ['\n  <section class="portada banner">\n    <articulo class="negroTrans completa texto">\n        <hgroup>\n          <h1>Folk in Love</h1>\n          <h3>Conoce Costumbres y Tradiciones de Panam\xE1</h3>\n        </hgroup>\n    </articulo>\n    \n  </section>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],39:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <div class="inicioIdentidad">\n    <article class="identidadImagenes">\n      <a href="/vestuarios/Gala-Ocuena" class="identidadImagen identidad3 tercio">\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h2>Pollera De Gala Ocue\xF1a</h2>\n            <h3>Azuero</h3>\n          </hgroup>\n        </div>\n      </a>\n      <a href="#" class="identidadImagen identidad2 tercio">\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h2>Pollera Congo</h2>\n            <h3>Col\xF3n</h3>\n          </hgroup>\n        </div>\n      </a>\n      <a href="#" class="identidadImagen identidad1 tercio">\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h2>Pollera De Lujo</h2>\n            <h3>Azuero</h3>\n          </hgroup>\n        </div>\n      </a>\n      \n    </article>\n    <article class="identidadTexto completa blanco">\n      <hgroup>\n        <h2>Identidad</h2>\n        <h3>Investigando sobre las Costumbres de Cada Regi\xF3n</h3>\n        <p>\n          Gracias a su posicion estrategica dentro de las americas nuestro pa\xEDs ha desarrollado una riqueza\n\ncultural y folkl\xF3rica inigualable. La combinacion entre las etnias indigenas existentes antes de la\n\nconquista, la intromision europea y la llegada de los negros como esclavos ha permitido el\n\nenriquecimiento de la cultura de manera inigualable.\n        </p>\n        <p>\n          De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue\n\n          aceptada y utilizada por los paname\xF1os a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso comun en toda la republica. Actualmente podemos ver como las etnias\n\n          indigenas y los grupos congos mantienen sus tradiciones permitiendo la evoluci\xF3n al tener remplazo\n\n          generacional y danzas vivas.        </p>\n      </hgroup>\n    </article>\n  </div>\n'], ['\n  <div class="inicioIdentidad">\n    <article class="identidadImagenes">\n      <a href="/vestuarios/Gala-Ocuena" class="identidadImagen identidad3 tercio">\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h2>Pollera De Gala Ocue\xF1a</h2>\n            <h3>Azuero</h3>\n          </hgroup>\n        </div>\n      </a>\n      <a href="#" class="identidadImagen identidad2 tercio">\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h2>Pollera Congo</h2>\n            <h3>Col\xF3n</h3>\n          </hgroup>\n        </div>\n      </a>\n      <a href="#" class="identidadImagen identidad1 tercio">\n        <div class="identidadInfo negroTrans">\n          <hgroup>\n            <h2>Pollera De Lujo</h2>\n            <h3>Azuero</h3>\n          </hgroup>\n        </div>\n      </a>\n      \n    </article>\n    <article class="identidadTexto completa blanco">\n      <hgroup>\n        <h2>Identidad</h2>\n        <h3>Investigando sobre las Costumbres de Cada Regi\xF3n</h3>\n        <p>\n          Gracias a su posicion estrategica dentro de las americas nuestro pa\xEDs ha desarrollado una riqueza\n\ncultural y folkl\xF3rica inigualable. La combinacion entre las etnias indigenas existentes antes de la\n\nconquista, la intromision europea y la llegada de los negros como esclavos ha permitido el\n\nenriquecimiento de la cultura de manera inigualable.\n        </p>\n        <p>\n          De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue\n\n          aceptada y utilizada por los paname\xF1os a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso comun en toda la republica. Actualmente podemos ver como las etnias\n\n          indigenas y los grupos congos mantienen sus tradiciones permitiendo la evoluci\xF3n al tener remplazo\n\n          generacional y danzas vivas.        </p>\n      </hgroup>\n    </article>\n  </div>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject);

},{"yo-yo":14}],40:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  var headerContainer = document.getElementById('headerContainer');
  headerContainer.classList.remove('blanco');
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":30,"../header":33,"../header/functions":32,"./template":41,"empty-element":4,"page":12}],41:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject, _banner2.default, _about2.default, _identidad2.default, _apoyo2.default);

},{"./about":36,"./apoyo":37,"./banner":38,"./identidad":39,"yo-yo":14}],42:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <main>\n   <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n    <article class="mitad rosaTrans">\n      <hgroup>\n          <h1>', '</h1>\n          <p>', '</p>\n      </hgroup>\n    </article>\n   </section>\n   <section className="completa texto info blanco">\n    ', '\n   </section>\n   <section class="completa portada" style="background: url(\'', '\'); background-size:cover; background-attachment: fixed">\n    <article class="mitad negroTrans texto">\n     <hgroup>\n       <p>', '</p>\n     </hgroup>\n    </article>\n   </section>\n   <section class="completa texto info blanco">\n     ', '\n   </section>\n   <section>\n     <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n     <article class="tercio blanco joyero">\n      <hgroup>\n        <h1>Joyero</h1>\n        <ul>\n         ', '\n        </ul>\n        \n      </hgroup>\n     </article>\n   </section>\n  </main>\n '], ['\n  <main>\n   <section class="portada" style="background: url(\'', '\'); background-size:contain; background-attachment: fixed">\n    <article class="mitad rosaTrans">\n      <hgroup>\n          <h1>', '</h1>\n          <p>', '</p>\n      </hgroup>\n    </article>\n   </section>\n   <section className="completa texto info blanco">\n    ', '\n   </section>\n   <section class="completa portada" style="background: url(\'', '\'); background-size:cover; background-attachment: fixed">\n    <article class="mitad negroTrans texto">\n     <hgroup>\n       <p>', '</p>\n     </hgroup>\n    </article>\n   </section>\n   <section class="completa texto info blanco">\n     ', '\n   </section>\n   <section>\n     <article class="dosTercios imagen" style="background: url(\'', '\'); background-size:cover"></article>\n     <article class="tercio blanco joyero">\n      <hgroup>\n        <h1>Joyero</h1>\n        <ul>\n         ', '\n        </ul>\n        \n      </hgroup>\n     </article>\n   </section>\n  </main>\n ']),
    _templateObject2 = _taggedTemplateLiteral(['<li>', '</li>'], ['<li>', '</li>']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = function (vestuario) {
  var el = (0, _yoYo2.default)(_templateObject, vestuario.portadaImagen, vestuario.nombre, vestuario.reseña, vestuario.antecedentes, vestuario.generalImagen, vestuario.general, vestuario.descripcion, vestuario.joyeroImagen, vestuario.joyero.map(function (joya) {
    return (0, _yoYo2.default)(_templateObject2, joya);
  }));
  return el;
};

},{"yo-yo":14}],43:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/vestuarios/:url', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild((0, _template2.default)(_vestuarios2.default, ctx.params.url));
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":30,"../header":33,"../header/functions":32,"../vestuarios/vestuarios":47,"./template":44,"empty-element":4,"page":12}],44:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n <div>\n  ', '\n </div>\n '], ['\n <div>\n  ', '\n </div>\n ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _album = require('../componentes/album');

var _album2 = _interopRequireDefault(_album);

var _estructura = require('./estructura');

var _estructura2 = _interopRequireDefault(_estructura);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = function (vestuarios, ident) {
  var el = (0, _yoYo2.default)(_templateObject, vestuarios.map(function (vestuario) {
    if (vestuario.url == ident) {
      return (0, _estructura2.default)(vestuario);
    }
  }));
  return el;
};

},{"../componentes/album":16,"./estructura":42,"yo-yo":14}],45:[function(require,module,exports){
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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(0, _page2.default)('/vestuarios', _header2.default, _footer2.default, function (ctx, next) {
  var main = document.getElementById('main-container');
  (0, _emptyElement2.default)(main).appendChild(_template2.default);
  window.addEventListener("scroll", _functions2.default.scrollFunction);
});

},{"../footer":30,"../header":33,"../header/functions":32,"./template":46,"empty-element":4,"page":12}],46:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n<main>\n <section class="portada" id="vestuarioPortada">\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Vestuarios Paname\xF1os</h2>\n    <p>Los vestidos t\xEDpicos de nuestro pa\xEDs son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer paname\xF1a.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaFiltros">\n\n  </div>\n  <div class="listaCont">\n  ', '\n  </div> \n </section>\n</main>\n'], ['\n<main>\n <section class="portada" id="vestuarioPortada">\n  <article className="completa negroTrans">\n   <hgroup>\n    <h2>Vestuarios Paname\xF1os</h2>\n    <p>Los vestidos t\xEDpicos de nuestro pa\xEDs son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer paname\xF1a.</p>\n   </hgroup>\n  </article>\n </section>\n <section class="lista blanco">\n  <div class="listaFiltros">\n\n  </div>\n  <div class="listaCont">\n  ', '\n  </div> \n </section>\n</main>\n']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

var _tarjeta = require('../componentes/tarjeta');

var _tarjeta2 = _interopRequireDefault(_tarjeta);

var _vestuarios = require('./vestuarios');

var _vestuarios2 = _interopRequireDefault(_vestuarios);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = (0, _yoYo2.default)(_templateObject, _vestuarios2.default.map(function (danza) {
  return (0, _tarjeta2.default)('vestuarios', danza);
}));

},{"../componentes/tarjeta":17,"./vestuarios":47,"yo-yo":14}],47:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['<p>Esta hermosa pollera era utilizada por las mujeres solo en ocasiones especiales como por ejemplo en el matrimonio. Hoy en d\xEDa la representaci\xF3n del Matrimonio campesino es una tradici\xF3n que se realiza dentro del marco del festival del manito, que adem\xE1s de ser una fiesta del pueblo es una celebraci\xF3n religiosa. Se escoge una vez al a\xF1o por la suerte a una pareja ocue\xF1a para realizar el sacramento en la parroquia de San Sebasti\xE1n de Oc\xFA.</p>'], ['<p>Esta hermosa pollera era utilizada por las mujeres solo en ocasiones especiales como por ejemplo en el matrimonio. Hoy en d\xEDa la representaci\xF3n del Matrimonio campesino es una tradici\xF3n que se realiza dentro del marco del festival del manito, que adem\xE1s de ser una fiesta del pueblo es una celebraci\xF3n religiosa. Se escoge una vez al a\xF1o por la suerte a una pareja ocue\xF1a para realizar el sacramento en la parroquia de San Sebasti\xE1n de Oc\xFA.</p>']),
    _templateObject2 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>La provincia de herrera est\xE1 ubicada en la pen\xEDnsula de Azuero. Antes de la \xE9poca precolombina fue habitada por gran cantidad de ind\xEDgenas.  La conquista de la pen\xEDnsula de Azuero se inicia en 1515, por \xF3rdenes del gobernador de Castilla de Oro, Don Pedrarias D\xE1vila, luego de duras batallas entre ind\xEDgenas y espa\xF1oles en 1520 se funda la primera ciudad espa\xF1ola en la pen\xEDnsula "Nat\xE1 de los Caballeros" este fue uno de los acontecimientos m\xE1s importantes en la regi\xF3n para la expansi\xF3n espa\xF1ola a pesar del genocidio ind\xEDgena.  Los primeros pueblos lejos de Nata se formaron por iniciativa de pobladores que cre\xEDan en la libertad de los ind\xEDgenas (el espa\xF1ol quer\xEDa volver a esclavizarlos) y por soldados espa\xF1oles que vinieron a el nuevo mundo sin vocaci\xF3n b\xE9lica y con ganas de una segunda oportunidad.</p>\n    <p>A\xFAn en el a\xF1o 1903 cuando Panam\xE1 se separa de Colombia y se establece como Rep\xFAblica, Herrera no estaba constituida como provincia. Bajo la administraci\xF3n del Dr. Belisario Porras, en 1915 se funda definitivamente la provincia de Herrera con capital en la ciudad de Chitr\xE9.</p>\n    <p>El distrito de Oc\xFA es muy particular ya que no hay ind\xEDgenas en el \xE1rea (las guerras con los colonizadores acabaron con gran parte de su poblaci\xF3n) su poblaci\xF3n es en su mayor\xEDa mestiza.</p>\n    <p>El hombre y la mujer ocue\xF1a se caracterizan por su sencillez, son personas trabajadoras de la tierra por lo que es com\xFAn ver a los agricultores y a los ganaderos con sombrero y cutarras.</p>\n    <p>Otra caracter\xEDstica importante es que el folklore ocue\xF1o es uno de los mejores conservados del pa\xEDs. Los folkloristas, maestros y las personas del pueblo est\xE1n orgullosos de sus tradiciones, por esta raz\xF3n han unificando criterios y fomentado el relevo generacional en actividades como el festival del manito.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Antecedentes Hist\xF3ricos</h2>\n    <p>La provincia de herrera est\xE1 ubicada en la pen\xEDnsula de Azuero. Antes de la \xE9poca precolombina fue habitada por gran cantidad de ind\xEDgenas.  La conquista de la pen\xEDnsula de Azuero se inicia en 1515, por \xF3rdenes del gobernador de Castilla de Oro, Don Pedrarias D\xE1vila, luego de duras batallas entre ind\xEDgenas y espa\xF1oles en 1520 se funda la primera ciudad espa\xF1ola en la pen\xEDnsula "Nat\xE1 de los Caballeros" este fue uno de los acontecimientos m\xE1s importantes en la regi\xF3n para la expansi\xF3n espa\xF1ola a pesar del genocidio ind\xEDgena.  Los primeros pueblos lejos de Nata se formaron por iniciativa de pobladores que cre\xEDan en la libertad de los ind\xEDgenas (el espa\xF1ol quer\xEDa volver a esclavizarlos) y por soldados espa\xF1oles que vinieron a el nuevo mundo sin vocaci\xF3n b\xE9lica y con ganas de una segunda oportunidad.</p>\n    <p>A\xFAn en el a\xF1o 1903 cuando Panam\xE1 se separa de Colombia y se establece como Rep\xFAblica, Herrera no estaba constituida como provincia. Bajo la administraci\xF3n del Dr. Belisario Porras, en 1915 se funda definitivamente la provincia de Herrera con capital en la ciudad de Chitr\xE9.</p>\n    <p>El distrito de Oc\xFA es muy particular ya que no hay ind\xEDgenas en el \xE1rea (las guerras con los colonizadores acabaron con gran parte de su poblaci\xF3n) su poblaci\xF3n es en su mayor\xEDa mestiza.</p>\n    <p>El hombre y la mujer ocue\xF1a se caracterizan por su sencillez, son personas trabajadoras de la tierra por lo que es com\xFAn ver a los agricultores y a los ganaderos con sombrero y cutarras.</p>\n    <p>Otra caracter\xEDstica importante es que el folklore ocue\xF1o es uno de los mejores conservados del pa\xEDs. Los folkloristas, maestros y las personas del pueblo est\xE1n orgullosos de sus tradiciones, por esta raz\xF3n han unificando criterios y fomentado el relevo generacional en actividades como el festival del manito.</p>\n   </hgroup>\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <p>La camisa y la falda se confeccionan con la misma tela. La camisa est\xE1 formada por 2 arandelas y mangas terminadas en encajes, se utilizan encajes de tienda no mundillos. </p>\n    <p>Se enjareta (poner las lanas a trav\xE9s de la trencilla de enjaretar) de dos maneras: la primera forma es, el enjaretado corrido, que consiste en trazar con lana dos l\xEDneas paralelas a trav\xE9s del encaje de enjaretar en el mismo color, la segunda forma es el enjaretado en zigzag, combinando dos colores, el primer color en paralelo (enjaretado corrido) y el otro color traza un zig zag en medio de las dos l\xEDneas. Se remata el enjaretado con dos lacitos en frente y atr\xE1s con la misma lana utilizada. </p>\n    <p>El fald\xF3n de la pollera es de 2 tramos, dividido en la mitad con una trencilla de encaje y al final con un peacillo y encajes anchos o de revuelo. </p>\n    <p>El cabello se divide en 2 con una l\xEDnea a la mitad que llamamos "rayo" y se hacen trenzas que caen sobre la espalda (muchos grupos folkl\xF3ricos utilizan mo\xF1os falsos para semejar est\xE1 caracter\xEDstica) y se amarran desde la mitad con un pedazo de lana del mismo color del enjaretado dejando al final un trozo de lana suelta despu\xE9s del lazo. Si su cabello es corto puede dejarlo suelto. </p>\n    <p>El arreglo de la cabeza se realiza con un juego de peinetas que puede ir desde 2 hasta 6 pares m\xE1s el peinet\xF3n. es com\xFAn en esta regi\xF3n amarrar las peinetas con cintas del color del enjaretado y rematarlas con un lacito en la frente.  Los tembleques que se utilizan son pimpollos, peque\xF1as flores que imitan a los capullos de las rosas, se pueden hacer en dos colores y los materiales caracter\xEDsticos son las cintas, perlas y gusanillos.</p>\n    <p>Cuando se usa la pollera para matrimonio se puede hacer los tembleques y el enjaretado en color blanco.</p>\n    <p>Adem\xE1s la empollerada debe llevar un pa\xF1uelito tejido sencillo que se coloca en la pretina del lado derecho, una carterita tejida, de manta sucia o chacarita ind\xEDgena en donde lleva sus  art\xEDculos de uso personal: peinilla, espejito, perfume, el carm\xEDn (para pintar los labios) y su dinero (tradicionalmente envueltas en un pa\xF1uelito y luego en una bolsita).</p>\n    <p>Para complementar se usa un rebozo o pa\xF1o de tela sencillo en voile (bual) se le pueden poner bordado o marcado similar al de los montuno. En la actualidad se est\xE1n utilizando pa\xF1os de hamaca, (no son tradicionales de panam\xE1), se usan sobre un solo hombro, alrededor del cuello o por detr\xE1s sobre ambos hombros, se puede cruzar en la espalda formando una especie de lazo dando m\xE1s comodidad a la empollerada.</p>\n    <p>Los zapatos de la pollera deben ser de pana, cuando no se encuentran los colores en este material se hacen de tela que no tenga brillo.</p>\n   </hgroup>\n  '], ['\n   <hgroup>\n    <h2>Descripci\xF3n</h2>\n    <p>La camisa y la falda se confeccionan con la misma tela. La camisa est\xE1 formada por 2 arandelas y mangas terminadas en encajes, se utilizan encajes de tienda no mundillos. </p>\n    <p>Se enjareta (poner las lanas a trav\xE9s de la trencilla de enjaretar) de dos maneras: la primera forma es, el enjaretado corrido, que consiste en trazar con lana dos l\xEDneas paralelas a trav\xE9s del encaje de enjaretar en el mismo color, la segunda forma es el enjaretado en zigzag, combinando dos colores, el primer color en paralelo (enjaretado corrido) y el otro color traza un zig zag en medio de las dos l\xEDneas. Se remata el enjaretado con dos lacitos en frente y atr\xE1s con la misma lana utilizada. </p>\n    <p>El fald\xF3n de la pollera es de 2 tramos, dividido en la mitad con una trencilla de encaje y al final con un peacillo y encajes anchos o de revuelo. </p>\n    <p>El cabello se divide en 2 con una l\xEDnea a la mitad que llamamos "rayo" y se hacen trenzas que caen sobre la espalda (muchos grupos folkl\xF3ricos utilizan mo\xF1os falsos para semejar est\xE1 caracter\xEDstica) y se amarran desde la mitad con un pedazo de lana del mismo color del enjaretado dejando al final un trozo de lana suelta despu\xE9s del lazo. Si su cabello es corto puede dejarlo suelto. </p>\n    <p>El arreglo de la cabeza se realiza con un juego de peinetas que puede ir desde 2 hasta 6 pares m\xE1s el peinet\xF3n. es com\xFAn en esta regi\xF3n amarrar las peinetas con cintas del color del enjaretado y rematarlas con un lacito en la frente.  Los tembleques que se utilizan son pimpollos, peque\xF1as flores que imitan a los capullos de las rosas, se pueden hacer en dos colores y los materiales caracter\xEDsticos son las cintas, perlas y gusanillos.</p>\n    <p>Cuando se usa la pollera para matrimonio se puede hacer los tembleques y el enjaretado en color blanco.</p>\n    <p>Adem\xE1s la empollerada debe llevar un pa\xF1uelito tejido sencillo que se coloca en la pretina del lado derecho, una carterita tejida, de manta sucia o chacarita ind\xEDgena en donde lleva sus  art\xEDculos de uso personal: peinilla, espejito, perfume, el carm\xEDn (para pintar los labios) y su dinero (tradicionalmente envueltas en un pa\xF1uelito y luego en una bolsita).</p>\n    <p>Para complementar se usa un rebozo o pa\xF1o de tela sencillo en voile (bual) se le pueden poner bordado o marcado similar al de los montuno. En la actualidad se est\xE1n utilizando pa\xF1os de hamaca, (no son tradicionales de panam\xE1), se usan sobre un solo hombro, alrededor del cuello o por detr\xE1s sobre ambos hombros, se puede cruzar en la espalda formando una especie de lazo dando m\xE1s comodidad a la empollerada.</p>\n    <p>Los zapatos de la pollera deben ser de pana, cuando no se encuentran los colores en este material se hacen de tela que no tenga brillo.</p>\n   </hgroup>\n  ']);

var _yoYo = require('yo-yo');

var _yoYo2 = _interopRequireDefault(_yoYo);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

module.exports = [{
  nombre: 'Pollera de Gala Ocueña',
  url: 'Gala-Ocuena',
  region: 'Ocú',
  dato: 'Danzas: Mejorana',
  miniatura: 'galaOcuMiniatura.jpg',
  reseña: (0, _yoYo2.default)(_templateObject),
  antecedentes: (0, _yoYo2.default)(_templateObject2),
  portadaImagen: '/images/galaOcuPortada.jpg',
  generalImagen: '/images/galaOcuGeneral.jpg',
  general: 'La pollera de gala ocueña  es una pollera blanca utilizada para ocasiones especiales. Una de sus características es que no lleva labores corridas (como en Los Santos). Esta pollera puede ser confeccionada en tela de hilo, voile (bual), coquito, linón de motita, seda lisa o estampadoa, de coquito, tela de colores pasteles y organza bordada o letin bordado (las 2 últimas no son telas tradicionales, su uso es reciente).',
  descripcion: (0, _yoYo2.default)(_templateObject3),
  joyero: ['zarcillos', 'tapa hueso (dije con cinta negra)', 'cadena chata', 'Cadena bruja (chata abierta) con la flor de guate', 'Cadena guachapalí', 'Rosario', 'Cabestrillo', 'No se utilizan joyas en los brazos.', 'En las manos se utilizan anillos de aro lizo, de corazón o las de manito.'],
  joyeroImagen: '/images/galaOcuJoyero.jpg'
}];

},{"yo-yo":14}]},{},[35]);
