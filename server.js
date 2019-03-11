/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(12);

var _index2 = _interopRequireDefault(_index);

var _contacto = __webpack_require__(18);

var _contacto2 = _interopRequireDefault(_contacto);

var _danzas = __webpack_require__(19);

var _danzas2 = _interopRequireDefault(_danzas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  exact: true,
  component: _index2.default,
  seo: {
    title: 'SSR with RR'
  }
}, {
  path: '/contacto',
  exact: true,
  component: _contacto2.default,
  seo: {
    title: 'Contactenos Para Cualquier consulta o producto que le interese'
  }
}, {
  path: '/danzas',
  exact: true,
  component: _danzas2.default,
  seo: {
    title: 'Danzas'
  }
}];

exports.default = routes;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(5);

var _cors2 = _interopRequireDefault(_cors);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(6);

var _reactRouterDom = __webpack_require__(1);

var _serializeJavascript = __webpack_require__(7);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _App = __webpack_require__(8);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(2);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.static("public"));

app.get("*", function (req, res, next) {
  var activeRoute = _routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};
  var seo = activeRoute.seo ? activeRoute.seo : { title: '', description: '' };

  var promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(function (data) {
    var context = { data: data };

    var markup = (0, _server.renderToString)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_App2.default, null)
    ));

    res.send("\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>" + seo.title + "</title>\n          <link rel=\"stylesheet\" href=\"index.css\">\n          <script src=\"/bundle.js\" defer></script>\n          <script>window.__INITIAL_DATA__ = " + (0, _serializeJavascript2.default)(data) + "</script>\n        </head>\n\n        <body>\n          <div id=\"app\">" + markup + "</div>\n        </body>\n      </html>\n    ");
  }).catch(next);
});

app.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(2);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(1);

var _NoMatch = __webpack_require__(10);

var _NoMatch2 = _interopRequireDefault(_NoMatch);

var _Navbar = __webpack_require__(11);

var _Navbar2 = _interopRequireDefault(_Navbar);

var _footer = __webpack_require__(17);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Navbar2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _routes2.default.map(function (_ref) {
            var path = _ref.path,
                exact = _ref.exact,
                Component = _ref.component,
                rest = _objectWithoutProperties(_ref, ['path', 'exact', 'component']);

            return _react2.default.createElement(_reactRouterDom.Route, { key: path, path: path, exact: exact, render: function render(props) {
                return _react2.default.createElement(Component, _extends({}, props, rest));
              } });
          }),
          _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
              return _react2.default.createElement(_NoMatch2.default, props);
            } })
        ),
        _react2.default.createElement(_footer2.default, null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoMatch;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMatch() {
  return _react2.default.createElement(
    'h1',
    null,
    'Ha habido un error 404'
  );
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBAr = function (_React$Component) {
  _inherits(NavBAr, _React$Component);

  function NavBAr(props) {
    _classCallCheck(this, NavBAr);

    var _this = _possibleConstructorReturn(this, (NavBAr.__proto__ || Object.getPrototypeOf(NavBAr)).call(this, props));

    _this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(NavBAr, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState(function (state) {
        return {
          isToggleOn: !state.isToggleOn
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "header",
        { id: "headerContainer" },
        _react2.default.createElement(
          "a",
          { href: "/", className: "logoContainer" },
          _react2.default.createElement("img", { src: "images/folkInLove-logo.png", alt: "logo de Folk in Love Pty", className: "logo" }),
          _react2.default.createElement("img", { src: "images/folkInLove-letras-negro.png", alt: "Tipo de Folk in Love Pty", className: "tipo" })
        ),
        _react2.default.createElement(
          "nav",
          { id: "nav", className: this.state.isToggleOn ? 'nav hidden' : 'nav' },
          _react2.default.createElement(
            "a",
            { href: "/", onClick: this.handleClick },
            "Inicio"
          ),
          _react2.default.createElement(
            "a",
            { href: "/danzas", onClick: this.handleClick },
            "Danzas"
          ),
          _react2.default.createElement(
            "a",
            { href: "/vestuarios", onClick: this.handleClick },
            "Vestuarios"
          ),
          _react2.default.createElement(
            "a",
            { href: "/tienda", onClick: this.handleClick },
            "Productos y Servicios"
          ),
          _react2.default.createElement(
            "a",
            { href: "/contacto", onClick: this.handleClick },
            "Contacto"
          )
        ),
        _react2.default.createElement(
          "a",
          { href: "#", className: "navButton", onClick: this.handleClick },
          _react2.default.createElement("i", { className: "fa fa-bars", "aria-hidden": "true" })
        )
      );
    }
  }]);

  return NavBAr;
}(_react2.default.Component);

exports.default = NavBAr;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Inicio;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _banner = __webpack_require__(13);

var _banner2 = _interopRequireDefault(_banner);

var _about = __webpack_require__(14);

var _about2 = _interopRequireDefault(_about);

var _identidad = __webpack_require__(15);

var _identidad2 = _interopRequireDefault(_identidad);

var _apoyo = __webpack_require__(16);

var _apoyo2 = _interopRequireDefault(_apoyo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Inicio() {
  return _react2.default.createElement(
    'main',
    { className: 'home' },
    _react2.default.createElement(_banner2.default, null),
    _react2.default.createElement(_about2.default, null),
    _react2.default.createElement(_identidad2.default, null),
    _react2.default.createElement(_apoyo2.default, null)
  );
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Banner;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Banner() {
  return _react2.default.createElement(
    "section",
    { className: "portada" },
    _react2.default.createElement(
      "picture",
      { className: "banner" },
      _react2.default.createElement("source", { media: "(min-width: 801px)", srcSet: "images/trajesTipicosPanamaBannerFull-2x.jpg 2x, images/trajesTipicosPanamaBannerFull-1x.jpg 1x" }),
      _react2.default.createElement("source", { media: "(min-width: 541px)", srcSet: "images/trajesTipicosPanamaBannerTab-2x.jpg 2x, images/trajesTipicosPanamaBannerTab-1x.jpg 1x" }),
      _react2.default.createElement("source", { media: "(min-width: 10px)", srcSet: "images/trajesTipicosPanamaBannerCel-2x.jpg 2x, images/trajesTipicosPanamaBannerCel-1x.jpg 1x" }),
      _react2.default.createElement("img", { alt: "trajes tipicos de panama, pollera de lujo, pollera congo y montuna ocue\xF1a", className: "completa", src: "images/trajesTipicosPanamaBannerCel-1x.jpg" })
    ),
    _react2.default.createElement(
      "articulo",
      { className: "negroTrans completa texto" },
      _react2.default.createElement(
        "hgroup",
        { className: "portadaTitulo" },
        _react2.default.createElement(
          "h1",
          { className: "logoLetras" },
          _react2.default.createElement(
            "span",
            null,
            "Investigaci\xF3n y Difusi\xF3n del Folklore de Panam\xE1 - Folk in Love"
          )
        ),
        _react2.default.createElement(
          "h3",
          null,
          "La Nueva Manera de Ver el Folklore"
        )
      )
    )
  );
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = About;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function About() {
  return _react2.default.createElement(
    "section",
    { className: "inicioAbout completa" },
    _react2.default.createElement(
      "article",
      { className: "aboutTexto mitad blanco" },
      _react2.default.createElement(
        "hgroup",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "\xBFQu\xE9 es Folk in love?"
        ),
        _react2.default.createElement(
          "h3",
          null,
          "Conoce M\xE1s de las costumbres y tradiciones de Panam\xE1"
        ),
        _react2.default.createElement(
          "p",
          null,
          "En ",
          _react2.default.createElement(
            "b",
            null,
            "Folk in love"
          ),
          " nos dedicamos a la investigaci\xF3n, difusi\xF3n, promoci\xF3n y conservaci\xF3n del ",
          _react2.default.createElement(
            "b",
            null,
            "folklore Paname\xF1o"
          ),
          ", queremos ofrecer un espacio en donde se pueda encontrar informaci\xF3n de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes de la ",
          _react2.default.createElement(
            "b",
            null,
            "Cultura de Panam\xE1"
          ),
          "."
        ),
        _react2.default.createElement(
          "p",
          null,
          "Buscamos realizar ",
          _react2.default.createElement(
            "b",
            null,
            "aportes culturales"
          ),
          " mediante art\xEDculos escritos, ",
          _react2.default.createElement(
            "a",
            { href: "/tienda" },
            "productos"
          ),
          ", ",
          _react2.default.createElement(
            "a",
            { href: "/tienda/fotografia" },
            "fotograf\xEDas"
          ),
          " y videos sobre los ",
          _react2.default.createElement(
            "a",
            { href: "/vestuarios" },
            "vestidos"
          ),
          " y ",
          _react2.default.createElement(
            "a",
            { href: "/danzas" },
            "bailes t\xEDpicos"
          ),
          ", ",
          _react2.default.createElement(
            "b",
            null,
            "origen"
          ),
          " de las manifestaciones folk\xF3ricas, ",
          _react2.default.createElement(
            "b",
            null,
            "elementos"
          ),
          " de las diferentes tradiciones, entre otros."
        )
      )
    ),
    _react2.default.createElement("img", { src: "images/moneda-coronada-full.jpg", alt: "Joya de la Pollera, Moneda Coronada", className: "aboutImagen mitad foto" })
  );
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Identidad;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Identidad() {
  return _react2.default.createElement(
    "div",
    { className: "inicioIdentidad" },
    _react2.default.createElement(
      "article",
      { className: "identidadImagenes" },
      _react2.default.createElement(
        "a",
        { href: "/vestuarios/Gala-Ocuena", className: "identidadImagen  tercio" },
        _react2.default.createElement(
          "picture",
          null,
          _react2.default.createElement("source", { media: "(min-width: 800px)", srcSet: "images/pollera-gala-ocu-identidad-full.jpg" }),
          _react2.default.createElement("img", { src: "images/pollera-gala-ocu-identidad-cel.jpg", alt: "Pollera de Gala Ocue\xF1a, traje tipico de la regi\xF3n de azuero, Panama", className: " tercio identidadFotos" })
        ),
        _react2.default.createElement(
          "div",
          { className: "identidadInfo negroTrans" },
          _react2.default.createElement(
            "hgroup",
            null,
            _react2.default.createElement(
              "h5",
              null,
              "Pollera de Gala Ocue\xF1a"
            ),
            _react2.default.createElement(
              "h6",
              null,
              "Azuero"
            )
          )
        )
      ),
      _react2.default.createElement(
        "a",
        { href: "/vestuarios/Pollera-Congo", className: "identidadImagen tercio" },
        _react2.default.createElement(
          "picture",
          null,
          _react2.default.createElement("source", { media: "(min-width: 800px)", srcSet: "images/pollera-congo-identidad-full.jpg" }),
          _react2.default.createElement("img", { src: "images/pollera-congo-identidad-cel.jpg", alt: "Pollera Congo, traje tipico de la regi\xF3n de Col\xF3n, Panama", className: " tercio identidadFotos" })
        ),
        _react2.default.createElement(
          "div",
          { className: "identidadInfo negroTrans" },
          _react2.default.createElement(
            "hgroup",
            null,
            _react2.default.createElement(
              "h5",
              null,
              "Pollera Congo"
            ),
            _react2.default.createElement(
              "h6",
              null,
              "Col\xF3n"
            )
          )
        )
      ),
      _react2.default.createElement(
        "a",
        { href: "/vestuarios/Pollera-De-Lujo", className: "identidadImagen identidad1 tercio" },
        _react2.default.createElement(
          "picture",
          null,
          _react2.default.createElement("source", { media: "(min-width: 800px)", srcSet: "images/pollera-lujo-losantos-identidad-full.jpg" }),
          _react2.default.createElement("img", { src: "images/pollera-lujo-losantos-identidad-cel.jpg", alt: "Pollera de lujo sante\xF1a, traje tipico de la regi\xF3n de azuero, Panama", className: " tercio identidadFotos" })
        ),
        _react2.default.createElement(
          "div",
          { className: "identidadInfo negroTrans" },
          _react2.default.createElement(
            "hgroup",
            null,
            _react2.default.createElement(
              "h5",
              null,
              "Pollera De Lujo"
            ),
            _react2.default.createElement(
              "h6",
              null,
              "Azuero"
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      "article",
      { className: "identidadTexto completa blanco" },
      _react2.default.createElement(
        "hgroup",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Elementos de Nuestro Folklore"
        ),
        _react2.default.createElement(
          "h3",
          null,
          "Investigando Sobre las Costumbres de Cada Regi\xF3n"
        ),
        _react2.default.createElement(
          "p",
          null,
          "Son Muchos los ",
          _react2.default.createElement(
            "b",
            null,
            "elementos"
          ),
          "  que forman parte de la ",
          _react2.default.createElement(
            "b",
            null,
            "cultura y el folklore"
          ),
          "  de un pa\xEDs. Desde peque\xF1os y abstactos como pueden ser cuentos infantiles y rimas; Objetos como ",
          _react2.default.createElement(
            "a",
            { href: "/vestuarios" },
            "vestidos tradicionales"
          ),
          " e instrumentos musicales; O m\xE1s trascendentales como rituales religiosos o festivos as\xED como la manera de celebrar los momentos de la vida, como bautizos, matrimonios y funerales."
        ),
        _react2.default.createElement(
          "p",
          null,
          "Lo importante de cada uno de estos ",
          _react2.default.createElement(
            "b",
            null,
            "componentes"
          ),
          " es que nos definen como seres humanos, como comunidad y como pa\xEDs, nos d\xE1n la ",
          _react2.default.createElement(
            "b",
            null,
            "identidad"
          ),
          " ante nosotros mismos y los dem\xE1s."
        ),
        _react2.default.createElement(
          "p",
          null,
          "Dos ",
          _react2.default.createElement(
            "b",
            null,
            "elementos"
          ),
          " important\xEDsimos que definen al ",
          _react2.default.createElement(
            "b",
            null,
            "paname\xF1o"
          ),
          "  y que pueden diferenciar ",
          _react2.default.createElement(
            "b",
            null,
            "las costumbres"
          ),
          " de cada una de las regiones del pa\xEDs, para darle a cada lugar su propia identidad, Son los ",
          _react2.default.createElement(
            "a",
            { href: "/vestuarios" },
            "trajes t\xEDpicos"
          ),
          " y los ",
          _react2.default.createElement(
            "a",
            { href: "danzas" },
            "bailes o danzas folkl\xF3ricas"
          ),
          "."
        ),
        _react2.default.createElement(
          "p",
          null,
          _react2.default.createElement(
            "b",
            null,
            "Danzas"
          ),
          " como ",
          _react2.default.createElement(
            "a",
            { href: "/danzas/El-Punto-Santeno" },
            "el punto"
          ),
          " que nos hablan de la elegancia y ceremonia que nos trajeron los espa\xF1oles, el Gran Diablo es un reflejo de la llegada del cristianismo, ",
          _react2.default.createElement(
            "a",
            { href: "/vestuarios/Pollera-Congo" },
            "las polleras congo"
          ),
          " nos hablan de la ",
          _react2.default.createElement(
            "b",
            null,
            "cultura"
          ),
          " de los Africanos que vinieron en \xE9poca de colonia y se establecieron en la costa atl\xE1ntica."
        ),
        _react2.default.createElement(
          "p",
          null,
          "Y as\xED se cuenta ",
          _react2.default.createElement(
            "b",
            null,
            "nuestra historia"
          ),
          " atrav\xE9s de la caja y el repicador, de la pollera montuna y de una m\xE1scara de diablico sucio. Caminamos en la vida con una cutarra y nos tapamos del sol con un sombrero pintao."
        ),
        _react2.default.createElement(
          "p",
          null,
          "Creemos en la importancia de conocer de donde venimos para poder desarrollar un sentido de ",
          _react2.default.createElement(
            "b",
            null,
            "identidad"
          ),
          ", para poder tomar decisiones hacia el futuro, para cuidar el ",
          _react2.default.createElement(
            "b",
            null,
            "legado"
          ),
          " que nos dejaron las generaciones pasadas, para entender quienes somos y de donde venimos y poder as\xED saber hacia donde vamos."
        )
      )
    )
  );
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Apoyo;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Apoyo() {
  return _react2.default.createElement(
    "section",
    { className: "inicioApoyo completa" },
    _react2.default.createElement(
      "article",
      { className: "apoyoTexto mitad rosaTrans" },
      _react2.default.createElement(
        "hgroup",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Origen de la Identidad del Paname\xF1o"
        ),
        _react2.default.createElement(
          "h3",
          null,
          "Historia de las Tradiciones de Panam\xE1"
        ),
        _react2.default.createElement(
          "p",
          null,
          "Gracias a su posici\xF3n estrat\xE9gica dentro de las am\xE9ricas nuestro pa\xEDs ha desarrollado una riqueza cultural y folkl\xF3rica inigualable. La combinacion entre las etnias ind\xEDgenas existentes antes de la conquista, la intromisi\xF3n europea y la llegada de los negros como esclavos ha permitido el enriquecimiento de la cultura de manera inigualable."
        ),
        _react2.default.createElement(
          "p",
          null,
          "De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue aceptada y utilizada por los paname\xF1os a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso com\xFAn en toda la rep\xFAblica. Actualmente podemos ver como las etnias ind\xEDgenas y los grupos congos mantienen sus tradiciones permitiendo la evoluci\xF3n al tener remplazo generacional y danzas vivas.        "
        )
      )
    )
  );
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer() {
  return _react2.default.createElement(
    "footer",
    null,
    _react2.default.createElement(
      "div",
      { "class": "footerLeft" },
      _react2.default.createElement("a", { "class": "logo" })
    ),
    _react2.default.createElement(
      "div",
      { "class": "footerRight" },
      _react2.default.createElement(
        "div",
        { "class": "footerRightUp" },
        _react2.default.createElement(
          "h3",
          null,
          "Cont\xE1ctenos:"
        ),
        _react2.default.createElement(
          "ul",
          null,
          _react2.default.createElement(
            "li",
            null,
            "Email: info@folkinlovepty.com"
          ),
          _react2.default.createElement(
            "li",
            null,
            "Tel\xE9fono: 6945-5931"
          ),
          _react2.default.createElement(
            "li",
            null,
            "Direcci\xF3n: Calle 49A",
            _react2.default.createElement("br", null),
            "El Cangrejo, Bella Vista"
          )
        )
      ),
      _react2.default.createElement(
        "div",
        { "class": "footerRightDown" },
        _react2.default.createElement(
          "a",
          { href: "https://facebook.com/folkinlovepty", target: "_blank" },
          _react2.default.createElement("i", { "class": "fa fa-facebook-official", "aria-hidden": "true" })
        ),
        _react2.default.createElement(
          "a",
          { href: "https://instagram.com/folkinlovepty", target: "_blank" },
          _react2.default.createElement("i", { "class": "fa fa-instagram", "aria-hidden": "true" })
        ),
        _react2.default.createElement(
          "a",
          { href: "mailto: info@folkinlovepty.com" },
          _react2.default.createElement("i", { "class": "fa fa-envelope-o", "aria-hidden": "true" })
        )
      )
    )
  );
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Contacto;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Contacto() {
  return _react2.default.createElement(
    "section",
    { "class": "contacto completa" },
    _react2.default.createElement(
      "article",
      { "class": "contactoInfo rosaTrans" },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h2",
          null,
          "Cont\xE1ctenos:"
        ),
        _react2.default.createElement(
          "h4",
          null,
          "Email:"
        ),
        _react2.default.createElement(
          "p",
          null,
          "info@folkinlovepty.com"
        ),
        _react2.default.createElement(
          "h4",
          null,
          "tel\xE9fono:"
        ),
        _react2.default.createElement(
          "p",
          null,
          "6945-5931"
        ),
        _react2.default.createElement(
          "form",
          { action: "/contacto/send", method: "post" },
          _react2.default.createElement("input", { type: "text", name: "nombre", placeholder: "Nombre" }),
          _react2.default.createElement("input", { type: "text", name: "email", placeholder: "Email" }),
          _react2.default.createElement("input", { type: "text", name: "asunto", placeholder: "Asunto" }),
          _react2.default.createElement("textarea", { name: "mensaje", rows: "10", cols: "30", placeholder: "Envianos Tu Mensaje" }),
          _react2.default.createElement("input", { type: "submit", name: "submit", value: "Enviar", "class": "btn negro" })
        )
      )
    )
  );
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Danzas;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import tarjeta from '../componentes/tarjeta'
// import danzas from './danzas'

function Danzas() {
  return _react2.default.createElement(
    "main",
    null,
    _react2.default.createElement(
      "section",
      { "class": "portada", id: "danzasPortada" },
      _react2.default.createElement(
        "picture",
        { "class": "banner" },
        _react2.default.createElement("source", { media: "(min-width: 801px)", srcset: "images/danzasBannerFull-1x.jpg 1x, images/danzasBannerFull-2x.jpg 2x" }),
        _react2.default.createElement("source", { media: "(min-width: 541px)", srcset: "images/danzasBannerTab-1x.jpg 1x, images/danzasBannerTab-2x.jpg 2x" }),
        _react2.default.createElement("source", { media: "(min-width: 10px)", srcset: "images/danzasBannerCel-1x.jpg 1x, images/danzasBannerCel-2x.jpg 2x" }),
        _react2.default.createElement("img", { "class": "completa", src: "images/danzasBannerCel.jpg", alt: "Bailes T\xEDpicos de Panam\xE1, Baile Congo" })
      ),
      _react2.default.createElement(
        "article",
        { className: "completa negroTrans" },
        _react2.default.createElement(
          "hgroup",
          null,
          _react2.default.createElement(
            "h1",
            null,
            "Bailes T\xEDpicos de Panam\xE1"
          ),
          _react2.default.createElement(
            "p",
            null,
            _react2.default.createElement(
              "b",
              null,
              "Las danzas folkl\xF3ricas"
            ),
            " paname\xF1as expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colaci\xF3n ",
            _react2.default.createElement(
              "b",
              null,
              "costumbres"
            ),
            ", rituales religiosos y celebraciones."
          )
        )
      )
    ),
    _react2.default.createElement(
      "section",
      { "class": "lista blanco" },
      _react2.default.createElement(
        "div",
        { "class": "listaCont" },
        _react2.default.createElement(
          "h1",
          null,
          "aqui van las danzas"
        )
      )
    ),
    _react2.default.createElement(
      "section",
      { "class": "completa blanco videoPasos" },
      _react2.default.createElement(
        "h2",
        null,
        "Pasos B\xE1sicos de los Danzas T\xEDpicas Paname\xF1as"
      ),
      _react2.default.createElement("iframe", { src: "https://www.youtube.com/embed/x7HdglWtujg?rel=0", frameborder: "0", allow: "autoplay; encrypted-media", allowfullscreen: true }),
      _react2.default.createElement(
        "hgroup",
        { "class": "blogStyle" },
        _react2.default.createElement(
          "p",
          null,
          "A diferencia de otros pa\xEDses de latinoam\xE9rica, donde los bailes no tiene una estructura marcada y los pasos cambian a voluntad del bailar\xEDn, en Panam\xE1 si tenemos una serie de ",
          _react2.default.createElement(
            "b",
            null,
            "pasos estructurados"
          ),
          "  que son guiados por los ",
          _react2.default.createElement(
            "b",
            null,
            "cambios de la m\xFAsica"
          ),
          "."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "El Paseo"
        ),
        _react2.default.createElement(
          "p",
          null,
          "El Paseo es el ",
          _react2.default.createElement(
            "b",
            null,
            "paso b\xE1sico por excelencia"
          ),
          " , ya que con \xE9l se inician la mayor\xEDa de los bailes, como es el caso de la Cumbia Sante\xF1a."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "Caida y Vuelta"
        ),
        _react2.default.createElement(
          "p",
          null,
          "Son dos ",
          _react2.default.createElement(
            "b",
            null,
            "movimientos"
          ),
          " que normalmente van juntos y marcan el cambio de un paso al otro. En algunos ",
          _react2.default.createElement(
            "b",
            null,
            "bailes"
          ),
          " las ca\xEDdas son marcas y en\xE9rgicas mientras que en otros son sutiles y delicadas."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "La Seguidilla"
        ),
        _react2.default.createElement(
          "p",
          null,
          "Es un paso que se realiza frente a ",
          _react2.default.createElement(
            "b",
            null,
            "la pareja"
          ),
          ". El pi\xE9 que gu\xEDa va en punta y el que le sigue va arrastrando pasando por en frente, cuando cambias de direcci\xF3n el pi\xE9 que gu\xEDa cambia igualmente."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "El Zapateo"
        ),
        _react2.default.createElement(
          "p",
          null,
          "Este es uno de los pasos m\xE1s vistosos en las ",
          _react2.default.createElement(
            "b",
            null,
            "danzas folk\xF3ricas paname\xF1as"
          ),
          ", mientras la mujer lo ejecuta con gracia y sutileza, el hombre muestra su fuerza y destreza."
        ),
        _react2.default.createElement(
          "h3",
          null,
          "El Cruce"
        ),
        _react2.default.createElement(
          "p",
          null,
          "En este paso, como su nombre lo indica, el hombre y la mujer se cruzan. Cada uno sale de su posici\xF3n con el pi\xE9 izquierdo, pasando de espaldas al lado de la pareja. Se cuentan cuatro pasos hacia adelante y cuatro pasos hacia atras."
        )
      )
    )
  );
}

/***/ })
/******/ ]);