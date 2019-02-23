!function(e){var a={};function n(o){if(a[o])return a[o].exports;var t=a[o]={i:o,l:!1,exports:{}};return e[o].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=a,n.d=function(e,a,o){n.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,a){if(1&a&&(e=n(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var t in e)n.d(o,t,function(a){return e[a]}.bind(null,t));return o},n.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(a,"a",a),a},n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},n.p="",n(n.s=12)}([function(e,a,n){var o=n(19),t=n(26),i=n(27);e.exports=o,e.exports.update=function(e,a,n){return n||(n={}),!1!==n.events&&(n.onBeforeElUpdated||(n.onBeforeElUpdated=function(e,a){for(var o=n.events||i,t=0;t<o.length;t++){var s=o[t];a[s]?e[s]=a[s]:e[s]&&(e[s]=void 0)}var r=e.value,l=a.value;"INPUT"===e.nodeName&&"file"!==e.type||"SELECT"===e.nodeName?l||a.hasAttribute("value")?l!==r&&(e.value=l):a.value=e.value:"TEXTAREA"===e.nodeName&&null===a.getAttribute("value")&&(e.value=a.value)})),t(e,a,n)}},function(e,a,n){"use strict";n.d(a,"c",function(){return o}),n.d(a,"b",function(){return t}),n.d(a,"a",function(){return i});var o=function(){var e=.19*window.innerWidth,a=document.getElementById("headerContainer");window.scrollY>e&&a.classList.add("blanco"),window.scrollY<e&&a.classList.remove("blanco")},t=function(e,a){removeEventListener("scroll",o),document.getElementById("headerContainer").classList.add("blanco"),a()},i=function(){document.getElementById("nav").classList.toggle("hidden")}},function(e,a,n){"use strict";e.exports=function(e){if(!(e instanceof HTMLElement))throw new TypeError("Expected an element");for(var a;a=e.lastChild;)e.removeChild(a);return e}},function(e,a,n){(function(a){e.exports=function(){"use strict";var e=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)},n=g,o=l,t=function(e){return c(l(e))},i=c,s=h,r=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function l(e){for(var a,n=[],o=0,t=0,i="";null!=(a=r.exec(e));){var s=a[0],l=a[1],c=a.index;if(i+=e.slice(t,c),t=c+s.length,l)i+=l[1];else{i&&(n.push(i),i="");var d=a[2],p=a[3],m=a[4],h=a[5],g=a[6],f=a[7],b="+"===g||"*"===g,v="?"===g||"*"===g,y=d||"/",w=m||h||(f?".*":"[^"+y+"]+?");n.push({name:p||o++,prefix:d||"",delimiter:y,optional:v,repeat:b,pattern:u(w)})}}return t<e.length&&(i+=e.substr(t)),i&&n.push(i),n}function c(a){for(var n=new Array(a.length),o=0;o<a.length;o++)"object"==typeof a[o]&&(n[o]=new RegExp("^"+a[o].pattern+"$"));return function(o){for(var t="",i=o||{},s=0;s<a.length;s++){var r=a[s];if("string"!=typeof r){var l,c=i[r.name];if(null==c){if(r.optional)continue;throw new TypeError('Expected "'+r.name+'" to be defined')}if(e(c)){if(!r.repeat)throw new TypeError('Expected "'+r.name+'" to not repeat, but received "'+c+'"');if(0===c.length){if(r.optional)continue;throw new TypeError('Expected "'+r.name+'" to not be empty')}for(var d=0;d<c.length;d++){if(l=encodeURIComponent(c[d]),!n[s].test(l))throw new TypeError('Expected all "'+r.name+'" to match "'+r.pattern+'", but received "'+l+'"');t+=(0===d?r.prefix:r.delimiter)+l}}else{if(l=encodeURIComponent(c),!n[s].test(l))throw new TypeError('Expected "'+r.name+'" to match "'+r.pattern+'", but received "'+l+'"');t+=r.prefix+l}}else t+=r}return t}}function d(e){return e.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function p(e,a){return e.keys=a,e}function m(e){return e.sensitive?"":"i"}function h(e,a){for(var n=(a=a||{}).strict,o=!1!==a.end,t="",i=e[e.length-1],s="string"==typeof i&&/\/$/.test(i),r=0;r<e.length;r++){var l=e[r];if("string"==typeof l)t+=d(l);else{var c=d(l.prefix),u=l.pattern;l.repeat&&(u+="(?:"+c+u+")*"),u=l.optional?c?"(?:"+c+"("+u+"))?":"("+u+")?":c+"("+u+")",t+=u}}return n||(t=(s?t.slice(0,-2):t)+"(?:\\/(?=$))?"),t+=o?"$":n&&s?"":"(?=\\/|$)",new RegExp("^"+t,m(a))}function g(a,n,o){return e(n=n||[])?o||(o={}):(o=n,n=[]),a instanceof RegExp?function(e,a){var n=e.source.match(/\((?!\?)/g);if(n)for(var o=0;o<n.length;o++)a.push({name:o,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return p(e,a)}(a,n):e(a)?function(e,a,n){for(var o=[],t=0;t<e.length;t++)o.push(g(e[t],a,n).source);return p(new RegExp("(?:"+o.join("|")+")",m(n)),a)}(a,n,o):function(e,a,n){for(var o=l(e),t=h(o,n),i=0;i<o.length;i++)"string"!=typeof o[i]&&a.push(o[i]);return p(t,a)}(a,n,o)}n.parse=o,n.compile=t,n.tokensToFunction=i,n.tokensToRegExp=s;var f,b="undefined"!=typeof document,v="undefined"!=typeof window,y="undefined"!=typeof history,w=void 0!==a,x=b&&document.ontouchstart?"touchstart":"click",j=v&&!(!window.history.location&&!window.location);function z(){this.callbacks=[],this.exits=[],this.current="",this.len=0,this._decodeURLComponents=!0,this._base="",this._strict=!1,this._running=!1,this._hashbang=!1,this.clickHandler=this.clickHandler.bind(this),this._onpopstate=this._onpopstate.bind(this)}function C(e,a){if("function"==typeof e)return C.call(this,"*",e);if("function"==typeof a)for(var n=new E(e,null,this),o=1;o<arguments.length;++o)this.callbacks.push(n.middleware(arguments[o]));else"string"==typeof e?this["string"==typeof a?"redirect":"show"](e,a):this.start(e)}function q(e,a,n){var o=this.page=n||C,t=o._window,i=o._hashbang,s=o._getBase();"/"===e[0]&&0!==e.indexOf(s)&&(e=s+(i?"#!":"")+e);var r=e.indexOf("?");this.canonicalPath=e;var l=new RegExp("^"+s.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1"));if(this.path=e.replace(l,"")||"/",i&&(this.path=this.path.replace("#!","")||"/"),this.title=b&&t.document.title,this.state=a||{},this.state.path=e,this.querystring=~r?o._decodeURLEncodedURIComponent(e.slice(r+1)):"",this.pathname=o._decodeURLEncodedURIComponent(~r?e.slice(0,r):e),this.params={},this.hash="",!i){if(!~this.path.indexOf("#"))return;var c=this.path.split("#");this.path=this.pathname=c[0],this.hash=o._decodeURLEncodedURIComponent(c[1])||"",this.querystring=this.querystring.split("#")[0]}}function E(e,a,o){this.page=o||P;var t=a||{};t.strict=t.strict||o._strict,this.path="*"===e?"(.*)":e,this.method="GET",this.regexp=n(this.path,this.keys=[],t)}z.prototype.configure=function(e){var a=e||{};this._window=a.window||v&&window,this._decodeURLComponents=!1!==a.decodeURLComponents,this._popstate=!1!==a.popstate&&v,this._click=!1!==a.click&&b,this._hashbang=!!a.hashbang;var n=this._window;this._popstate?n.addEventListener("popstate",this._onpopstate,!1):v&&n.removeEventListener("popstate",this._onpopstate,!1),this._click?n.document.addEventListener(x,this.clickHandler,!1):b&&n.document.removeEventListener(x,this.clickHandler,!1),this._hashbang&&v&&!y?n.addEventListener("hashchange",this._onpopstate,!1):v&&n.removeEventListener("hashchange",this._onpopstate,!1)},z.prototype.base=function(e){if(0===arguments.length)return this._base;this._base=e},z.prototype._getBase=function(){var e=this._base;if(e)return e;var a=v&&this._window&&this._window.location;return v&&this._hashbang&&a&&"file:"===a.protocol&&(e=a.pathname),e},z.prototype.strict=function(e){if(0===arguments.length)return this._strict;this._strict=e},z.prototype.start=function(e){var a=e||{};if(this.configure(a),!1!==a.dispatch){var n;if(this._running=!0,j){var o=this._window,t=o.location;n=this._hashbang&&~t.hash.indexOf("#!")?t.hash.substr(2)+t.search:this._hashbang?t.search+t.hash:t.pathname+t.search+t.hash}this.replace(n,null,!0,a.dispatch)}},z.prototype.stop=function(){if(this._running){this.current="",this.len=0,this._running=!1;var e=this._window;this._click&&e.document.removeEventListener(x,this.clickHandler,!1),v&&e.removeEventListener("popstate",this._onpopstate,!1),v&&e.removeEventListener("hashchange",this._onpopstate,!1)}},z.prototype.show=function(e,a,n,o){var t=new q(e,a,this),i=this.prevContext;return this.prevContext=t,this.current=t.path,!1!==n&&this.dispatch(t,i),!1!==t.handled&&!1!==o&&t.pushState(),t},z.prototype.back=function(e,a){var n=this;if(this.len>0){var o=this._window;y&&o.history.back(),this.len--}else e?setTimeout(function(){n.show(e,a)}):setTimeout(function(){n.show(n._getBase(),a)})},z.prototype.redirect=function(e,a){var n=this;"string"==typeof e&&"string"==typeof a&&C.call(this,e,function(e){setTimeout(function(){n.replace(a)},0)}),"string"==typeof e&&void 0===a&&setTimeout(function(){n.replace(e)},0)},z.prototype.replace=function(e,a,n,o){var t=new q(e,a,this),i=this.prevContext;return this.prevContext=t,this.current=t.path,t.init=n,t.save(),!1!==o&&this.dispatch(t,i),t},z.prototype.dispatch=function(e,a){var n=0,o=0,t=this;function i(){var a=t.callbacks[n++];if(e.path===t.current)return a?void a(e,i):function(e){if(!e.handled){var a=this._window;(this._hashbang?j&&this._getBase()+a.location.hash.replace("#!",""):j&&a.location.pathname+a.location.search)!==e.canonicalPath&&(this.stop(),e.handled=!1,j&&(a.location.href=e.canonicalPath))}}.call(t,e);e.handled=!1}a?function e(){var n=t.exits[o++];if(!n)return i();n(a,e)}():i()},z.prototype.exit=function(e,a){if("function"==typeof e)return this.exit("*",e);for(var n=new E(e,null,this),o=1;o<arguments.length;++o)this.exits.push(n.middleware(arguments[o]))},z.prototype.clickHandler=function(e){if(1===this._which(e)&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){var a=e.target,n=e.path||(e.composedPath?e.composedPath():null);if(n)for(var o=0;o<n.length;o++)if(n[o].nodeName&&"A"===n[o].nodeName.toUpperCase()&&n[o].href){a=n[o];break}for(;a&&"A"!==a.nodeName.toUpperCase();)a=a.parentNode;if(a&&"A"===a.nodeName.toUpperCase()){var t="object"==typeof a.href&&"SVGAnimatedString"===a.href.constructor.name;if(!a.hasAttribute("download")&&"external"!==a.getAttribute("rel")){var i=a.getAttribute("href");if((this._hashbang||!this._samePath(a)||!a.hash&&"#"!==i)&&!(i&&i.indexOf("mailto:")>-1)&&(t?!a.target.baseVal:!a.target)&&(t||this.sameOrigin(a.href))){var s=t?a.href.baseVal:a.pathname+a.search+(a.hash||"");s="/"!==s[0]?"/"+s:s,w&&s.match(/^\/[a-zA-Z]:\//)&&(s=s.replace(/^\/[a-zA-Z]:\//,"/"));var r=s,l=this._getBase();0===s.indexOf(l)&&(s=s.substr(l.length)),this._hashbang&&(s=s.replace("#!","")),(!l||r!==s||j&&"file:"===this._window.location.protocol)&&(e.preventDefault(),this.show(r))}}}}},z.prototype._onpopstate=(f=!1,v?(b&&"complete"===document.readyState?f=!0:window.addEventListener("load",function(){setTimeout(function(){f=!0},0)}),function(e){if(f)if(e.state){var a=e.state.path;this.replace(a,e.state)}else if(j){var n=this._window.location;this.show(n.pathname+n.search+n.hash,void 0,void 0,!1)}}):function(){}),z.prototype._which=function(e){return null==(e=e||v&&this._window.event).which?e.button:e.which},z.prototype._toURL=function(e){var a=this._window;if("function"==typeof URL&&j)return new URL(e,a.location.toString());if(b){var n=a.document.createElement("a");return n.href=e,n}},z.prototype.sameOrigin=function(e){if(!e||!j)return!1;var a=this._toURL(e),n=this._window,o=n.location;return o.protocol===a.protocol&&o.hostname===a.hostname&&o.port===a.port},z.prototype._samePath=function(e){if(!j)return!1;var a=this._window,n=a.location;return e.pathname===n.pathname&&e.search===n.search},z.prototype._decodeURLEncodedURIComponent=function(e){return"string"!=typeof e?e:this._decodeURLComponents?decodeURIComponent(e.replace(/\+/g," ")):e},q.prototype.pushState=function(){var e=this.page,a=e._window,n=e._hashbang;e.len++,y&&a.history.pushState(this.state,this.title,n&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},q.prototype.save=function(){var e=this.page;y&&e._window.history.replaceState(this.state,this.title,e._hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},E.prototype.middleware=function(e){var a=this;return function(n,o){if(a.match(n.path,n.params))return e(n,o);o()}},E.prototype.match=function(e,a){var n=this.keys,o=e.indexOf("?"),t=~o?e.slice(0,o):e,i=this.regexp.exec(decodeURIComponent(t));if(!i)return!1;for(var s=1,r=i.length;s<r;++s){var l=n[s-1],c=this.page._decodeURLEncodedURIComponent(i[s]);void 0===c&&hasOwnProperty.call(a,l.name)||(a[l.name]=c)}return!0};var P=function e(){var a=new z;function n(){return C.apply(a,arguments)}return n.callbacks=a.callbacks,n.exits=a.exits,n.base=a.base.bind(a),n.strict=a.strict.bind(a),n.start=a.start.bind(a),n.stop=a.stop.bind(a),n.show=a.show.bind(a),n.back=a.back.bind(a),n.redirect=a.redirect.bind(a),n.replace=a.replace.bind(a),n.dispatch=a.dispatch.bind(a),n.exit=a.exit.bind(a),n.configure=a.configure.bind(a),n.sameOrigin=a.sameOrigin.bind(a),n.clickHandler=a.clickHandler.bind(a),n.create=e,Object.defineProperty(n,"len",{get:function(){return a.len},set:function(e){a.len=e}}),Object.defineProperty(n,"current",{get:function(){return a.current},set:function(e){a.current=e}}),n.Context=q,n.Route=E,n}(),T=P,L=P;return T.default=L,T}()}).call(this,n(18))},function(e,a,n){"use strict";var o=n(2),t=n.n(o),i=n(0),s=n.n(i),r=n(1),l=s.a`
<header id= "headerContainer">
 <a href="/" class="logoContainer">
   <img src="images/folkInLove-logo.png" alt="logo de Folk in Love Pty" class='logo'>
   <img src="images/folkInLove-letras-negro.png" alt="Tipo de Folk in Love Pty" class='tipo'>
 </a>
 <nav id="nav" class="nav hidden">
   <a href="/" onclick=${r.a}>Inicio</a>
   <a href="/danzas" onclick=${r.a}>Danzas</a>
   <a href="/vestuarios" onclick=${r.a}>Vestuarios</a>
   <a href="/tienda" onclick=${r.a}>Productos y Servicios</a>
   <a href="/contacto" onclick=${r.a}>Contacto</a>
 </nav>
 <a href="#" class="navButton" onclick=${r.a}>
   <i class="fa fa-bars" aria-hidden="true"></i>
 </a>
</header>`;a.a=function(e,a){var n=document.getElementById("header");t()(n).appendChild(l),a()}},function(e,a,n){"use strict";var o=n(2),t=n.n(o),i=n(0),s=n.n(i).a`
<footer>
 <div class="footerLeft">
  <a class="logo"></a>
 </div>
 <div class="footerRight">
  <div class="footerRightUp">
   <h3>Contáctenos:</h3>
   <ul>
    <li>Email: info@folkinlovepty.com</li>
    <li>Teléfono: 6945-5931</li>
    <li>Dirección: Calle 49A<br>
    El Cangrejo, Bella Vista</li>
   </ul>
  </div>
  <div class="footerRightDown">
   <a href="https://facebook.com/folkinlovepty" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
   <a href="https://instagram.com/folkinlovepty" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
   <a href="mailto: info@folkinlovepty.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
  </div>
 </div>
</footer>
`;a.a=function(e,a){var n=document.getElementById("footer");t()(n).appendChild(s),a()}},function(e,a,n){"use strict";var o=n(0),t=n.n(o);a.a=function(e,a){return t.a`
  <a class="tarjeta" href="/${e}/${a.url}">
    <div class="tarjetaImagen" style="background: url('/images/${a.miniatura}'); background-size: cover"></div>
    <div class="tarjetaInfo">
     <hgroup>
      <h3>${a.nombre}</h3>
      <h4>Región: ${a.region}</h4>
      <h4>${a.dato}</h4>
     </hgroup>
    </div>
  </a>
 `}},function(e,a,n){var o=n(0);e.exports=[{metaTitle:"El Punto Santeño, el baile típico más elegante de Panamá.",metaDescription:"El Punto Santeño. En este artículo 📄 hablamos sobre el baile folklórico que es considerado el más elegante 💎 de Panamá 🇵🇦. su estructura musical 🎼 y sus pasos",miniatura:"puntoMiniatura.jpg",region:"Azuero",dato:"Vestuario: Pollera De Lujo",imagenOpenGraph:"puntoOpenGraph.jpg",nombre:"El Punto Santeño",url:"El-Punto-Santeno","reseña":"El Punto Santeño es un género musical y a su vez un baile. Es considerado como uno de los más bellos y elegantes de todo el Istmo de Panamá; es ejecutado por una sola pareja y tiene como característica principal la elegancia y el donaire con la que el hombre y la mujer se mueven durante su ejecución.",portadaImagen:"puntoPortada",intro:o`
   <hgroup>
    <p><i>“Después del tamborito, el baile de parejas individual más atractivo es el PUNTO en el cual la pareja hace gala de donaire, precisión y gracia. Parece de pura ascendencia hispánica a juzgar por la música que lo acompaña.</i></p>
    <p><i>El baile de PUNTO no es baile de toda una noche como puede serio el Tamborito y la Cumbia; el Pindín y la Mejorana. Se baila más bien como una demostración atractiva entre los minutos de descanso de un baile, para regalo de los ojos y goce del espíritu de la concurrencia a una fiesta.”</i></p>
    <p>Dora Pérez de Zarate</p>
   </hgroup>`,introImagen:"/images/puntoIntro.jpg",descripcion:o`
   <hgroup>
    <h2>Descripción del Punto Santeño</h2>
    <p> <b>El punto</b> consta de una serie de pasos (que describiremos a continuación) los cuales se repiten 3 veces <i>"tiempos"</i> en el mismo orden. A cada repetición le llamamos tiempos o vueltas musicales. Una de sus características particulares se lleva a cabo durante el zapateo ya que en cada uno (son 3) la pareja bailará en una dirección diferente. En el primer tiempo la pareja realizará el zapateo frente a frente, en el segundo tiempo se dirigirán hacia los músicos (es común en los conjuntos folklóricos dirigir el zapateo en otra dirección cuando no se baila con músicos en vivo) y en el último tiempo se dirige hacia el público.</p>
    <p>Cada paso durante la ejecución del Punto Santeño no tiene una duración definida, es el cambio de la música la que indicará el paso a la siguiente figura.</p>
    <p>Inicia con <b>El PASEO</b>, es el paso de baile en el que el varón y la dama describen un amplio círculo, ocupando cada uno de los extremos.</p>
    <p>Al cambio de la música se ejecuta una caída y vuelta pasando al <b>ZAPATEO</b> en el cual los bailadores, dependiendo del tiempo lo ejecutan, frente a frente, a la música o al público.</p>
    <p>En seguida, otro cambio de la música les advierte que deben realizar el tercer movimiento, <b>EL ESCOBILLAO</b>, que separa ampliamente a la pareja y  se ejecuta con rápidos movimientos de los pies hacia atrás.</p>
    <p>Por último, también a indicación de la música, se realiza una caida y vuelta para pasar a la <b>SEGUIDILLA</b> con la cual la pareja se desplaza acercándose el uno al otro para girar con mucha serenidad y finura en el centro del círculo hasta que se indique el cambio y comience con una vuelta paseada el siguiente tiempo con el <b>PASEO</b>.</p>
    <p>Al finalizar el tercer tiempo, la mujer realiza un medio giro para quedar frente al público en un cierre que puede ser con el parejo arrodillado o de pié tapandole el rostro con el sombrero simulando un beso.</p>
    <p>Es Común que al ver a la pareja ejecutar tan hermoso baile los espectadores lancen monedas por el suelo; costumbre que hoy podemos ver en las fiestas cuando las quinceañeras o reinas bailan el punto.</p>
   </hgroup>
  `,pasos:["Paseo","Caida y vuelta","Zapateo","Escobillao","Seguidilla","Vuelta Paseada"],pasosImagen:"/images/puntoPasos.jpg",referencias:o`
  <hgroup>
   <h2>Referencias Sobre El Punto Santeño</h2>
   <ul>
   <li>Extracto de "EL PUNTO, LA DENESA, EL ATRAVESADO Y OTROS BAILES ORQUESTADOS". Dora Pérez de Zárate. 198</li>
   </ul>
  </hgroup>
  `}]},function(e,a,n){var o=n(0);e.exports=[{metaTitle:"Pollera de Gala Ocueña",nombre:"Pollera de Gala Ocueña",url:"Gala-Ocuena",region:"Ocú",dato:"Danzas: Mejorana",miniatura:"galaOcuMiniatura.jpg","reseña":o`<p>Esta hermosa pollera era utilizada por las mujeres solo en ocasiones especiales como por ejemplo en el matrimonio. Hoy en día la representación del Matrimonio campesino es una tradición que se realiza dentro del marco del festival del manito, que además de ser una fiesta del pueblo es una celebración religiosa. Se escoge una vez al año por la suerte a una pareja ocueña para realizar el sacramento en la parroquia de San Sebastián de Ocú.</p>`,antecedentes:o`
   <hgroup>
    <h2>Historia de la Pollera de Gala Ocueña</h2>
    <p>La provincia de herrera está ubicada en la península de Azuero. Antes de la época precolombina fue habitada por gran cantidad de indígenas.  La conquista de la península de Azuero se inicia en 1515, por órdenes del gobernador de Castilla de Oro, Don Pedrarias Dávila, luego de duras batallas entre indígenas y españoles en 1520 se funda la primera ciudad española en la península "Natá de los Caballeros" este fue uno de los acontecimientos más importantes en la región para la expansión española a pesar del genocidio indígena.  Los primeros pueblos lejos de Nata se formaron por iniciativa de pobladores que creían en la libertad de los indígenas (el español quería volver a esclavizarlos) y por soldados españoles que vinieron a el nuevo mundo sin vocación bélica y con ganas de una segunda oportunidad.</p>
    <p>Aún en el año 1903 cuando Panamá se separa de Colombia y se establece como República, Herrera no estaba constituida como provincia. Bajo la administración del Dr. Belisario Porras, en 1915 se funda definitivamente la provincia de Herrera con capital en la ciudad de Chitré.</p>
    <p>El distrito de Ocú es muy particular ya que no hay indígenas en el área (las guerras con los colonizadores acabaron con gran parte de su población) su población es en su mayoría mestiza.</p>
    <p>El hombre y la mujer ocueña se caracterizan por su sencillez, son personas trabajadoras de la tierra por lo que es común ver a los agricultores y a los ganaderos con sombrero y cutarras.</p>
    <p>Otra característica importante es que el folklore ocueño es uno de los mejores conservados del país. Los folkloristas, maestros y las personas del pueblo están orgullosos de sus tradiciones, por esta razón han unificando criterios y fomentado el relevo generacional en actividades como el festival del manito.</p>
   </hgroup>
  `,metaDescription:"La pollera de gala ocueña  es una pollera blanca utilizada para ocasiones especiales. Una de sus características es que no lleva labores corridas (como en Los Santos). Esta pollera puede ser confeccionada en tela de hilo, voile (bual), coquito, linón de motita, seda lisa o estampada, de coquito, tela de colores pasteles y organza bordada o letin bordado (las 2 últimas no son telas tradicionales, su uso es reciente).",portadaImagen:"images/galaOcuPortadaCel-1x.jpg",portadaImagenFull:"images/galaOcuPortadaFull-1x.jpg 1x, images/galaOcuPortadaFull-2x.jpg 2x",portadaImagenTab:"images/galaOcuPortadaTab-1x.jpg 1x, images/galaOcuPortadaTab-2x.jpg 2x",portadaImagenCel:"images/galaOcuPortadaCel-1x.jpg 1x, images/galaOcuPortadaCel-2x.jpg 2x",generalImagen:"/images/galaOcuGeneral.jpg",general:"La pollera de gala ocueña  es una pollera blanca utilizada para ocasiones especiales. Una de sus características es que no lleva labores corridas (como en Los Santos). Esta pollera puede ser confeccionada en tela de hilo, voile (bual), coquito, linón de motita, seda lisa o estampada, de coquito, tela de colores pasteles y organza bordada o letin bordado (las 2 últimas no son telas tradicionales, su uso es reciente).",descripcion:o`
   <hgroup>
    <h2>Descripción de la Pollera de Gala Ocueña</h2>
    <p>La camisa y la falda se confeccionan con la misma tela. La camisa está formada por 2 arandelas y mangas terminadas en encajes, se utilizan encajes de tienda no mundillos. </p>
    <p>Se enjareta (poner las lanas a través de la trencilla de enjaretar) de dos maneras: la primera forma es, el enjaretado corrido, que consiste en trazar con lana dos líneas paralelas a través del encaje de enjaretar en el mismo color, la segunda forma es el enjaretado en zigzag, combinando dos colores, el primer color en paralelo (enjaretado corrido) y el otro color traza un zig zag en medio de las dos líneas. Se remata el enjaretado con dos lacitos en frente y atrás con la misma lana utilizada. </p>
    <p>El faldón de la pollera es de 2 tramos, dividido en la mitad con una trencilla de encaje y al final con un peacillo y encajes anchos o de revuelo. </p>
    <p>El cabello se divide en 2 con una línea a la mitad que llamamos "rayo" y se hacen trenzas que caen sobre la espalda (muchos grupos folklóricos utilizan moños falsos para semejar está característica) y se amarran desde la mitad con un pedazo de lana del mismo color del enjaretado dejando al final un trozo de lana suelta después del lazo. Si su cabello es corto puede dejarlo suelto. </p>
    <p>El arreglo de la cabeza se realiza con un juego de peinetas que puede ir desde 2 hasta 6 pares más el peinetón. Es común en esta región amarrar las peinetas con cintas del color del enjaretado y rematarlas con un lacito en la frente.  Los tembleques que se utilizan son pimpollos, pequeñas flores que imitan a los capullos de las rosas, se pueden hacer en dos colores y los materiales característicos son telas, perlas y gusanillos.</p>
    <p>Cuando se usa la pollera para matrimonio se puede hacer los tembleques y el enjaretado en color blanco.</p>
    <p>Además la empollerada debe llevar un pañuelito tejido sencillo que se coloca en la pretina del lado derecho, una carterita tejida, de manta sucia o chacarita indígena en donde lleva sus  artículos de uso personal: peinilla, espejito, perfume, el carmín (para pintar los labios) y su dinero (tradicionalmente envueltas en un pañuelito y luego en una bolsita).</p>
    <p>Para complementar se usa un rebozo o paño de tela sencillo en voile (bual) se le pueden poner bordado o marcado similar al del montuno. En la actualidad se están utilizando paños de hamaca, (no son tradicionales de panamá), se usan sobre un solo hombro, alrededor del cuello o por detrás sobre ambos hombros, se puede cruzar en la espalda formando una especie de lazo dando más comodidad a la empollerada.</p>
    <p>Los zapatos de la pollera deben ser de pana, cuando no se encuentran los colores en este material se hacen de tela que no tenga brillo.</p>
   </hgroup>
  `,extra:o`<section>
  <picture class="dosTercios">
      <source media="(min-width: 800px)" srcset="images/galaOcuJoyero">
      <img class="imagen" src="/images/galaOcuJoyero" alt="joyas de La pollera de Gala Ocueña">
  </picture>
  <article class="tercio blanco joyero">
   <hgroup>
     <h2>Joyero</h2>
     <ul>
      <li>zarcillos</li>
      <li>tapa hueso (dije con cinta negra)</li>
      <li>cadena chata</li>
      <li>Cadena bruja (chata abierta) con la flor de guate</li>
      <li>Cadena guachapalí</li>
      <li>Rosario</li>
      <li>Cabestrillo</li>
      <li>No se utilizan joyas en los brazos.</li>
      <li>En las manos se utilizan anillos de aro lizo, de corazón o las de manito.</li>
     </ul>  
    </hgroup> 
  </article>
</section>
 `},{metaTitle:"Historia, clasificación y descripción de La Pollera Congo.",nombre:"Pollera Congo",url:"Pollera-Congo",region:"Costa Atlántica",dato:"Danza: Congo",miniatura:"polleraCongoMiniatura.jpg","reseña":o`
   <hgroup>
    <p>El Congo es una <b>cultura</b>, género musical y baile Afro-colonial que se caracteriza por ser alegre y sensual, es ejecutado por hombres y mujeres al ritmo de cantos y tambor.</p>
    <p>Sus vistosas y coloridas <b>polleras</b> están cargadas de <b>historia</b> que nos habla de la fortaleza de un pueblo y de su lucha por la libertad.</p>
   </hgroup>`,antecedentes:o`
   <hgroup>
    <h2>Historia de la Pollera Congo</h2>
    <p>A pesar de lo que conocemos comúnmente, existe una teoría que brinda pruebas de la presencia de africanos en el continente americano antes de la conquista. Esta postura es defendida por el científico social y escritor de la obra "They Came Before Columbus" (Ellos vinieron antes que Colón) el Dr. Iván Van Sertima, en sus escritos el asegura que el historiador Peter Martyr (1457-1526) describió como unos africanos habían naufragado en un área cerca de la costa de la provincia de Darién y que luego se habían refugiado en las montañas. Martyr describió a los hombres como “piratas etíopes” término que en el pasado hacía referencia al continente africano. Más adelante el historiador y etnólogo Francés Charles de Bourbourg reportó la existencia de dos tribus aborígenes en Panamá, los mandingas (de piel negra) y los Tule (de piel roja), Esta información tiene concordancia con unas figuras indígenas de la cultura "Barriles" enterradas en las montañas de Chiriquí cerca de la frontera con Costa Rica, algunas de ellas resaltaban porque tenían
    
    características de la raza negra como los labios pronunciados y la nariz ancha.</p>
    <p> <b>La historia</b> más conocida nos confirma la llegada de negros como esclavos a América durante la conquista. Hombres y mujeres fueron traídos a la fuerza desde el continente africano, apiñados en barcos en condiciones inhumanas. <b>Los negros esclavos</b> eran considerados propiedad de sus amos y podían ser comprados y vendidos, no había ningún derecho que les permitiera defenderse así que algunos eran marcados o mutilados para impedir que se fugaran.</p>
    <p>Podemos pensar, ¿por qué traer a personas desde tan lejos para trabajar en América?</p>
    <p>Esta es la razón: Antes del descubrimiento de América ya se había dictado una ley para evitar la esclavitud en los territorios conquistados.</p>
    <p>Tras la llegada a América en 1492, se produjo una de las atrocidades más grandes de la historia, el genocidio indígena producto de las guerras de la conquista y aún con las leyes establecidas (era muy difícil hacerlas cumplir tan lejos de España) se daban el comercio de indios como esclavos, ya para este momento en muchas zonas de América no quedaban muchos indígenas por la guerra y por las epidemias traídas por los españoles. La demanda de mano de obra siguió creciendo hasta que el padre Fray Bartolomé de las casas propuso reemplazar a los indígenas por negros africanos y es de esta manera que se inicia la esclavitud en América con el primer cargamento de negros en 1518, proceso que duraría hasta 1880.</p>
    <p>Además de los beneficios en América, los monarcas españoles lograron sacar muchos beneficios a costar de vender licencias para permitir traer esclavos negros a América, con las siguientes cifras podemos darnos una idea de lo que representaba en ganancias el comercio de esclavos, cada una de estas licencias costaba 8 ducados (moneda de oro antigua) y en el siglo XVI se concedieron en España más de 120.000 licencias.</p>
    <p>En el año 1548 <b>En Panamá</b> se registra la primera fuga de esclavos. Los negros que se rebelaron contra la opresión española se refugiaron en las montañas y es esté hecho el que inicia el cimarronaje.</p>
    <p>Los primeros dos grupos que lograron escapar fueron liderados por <b>Bayano y Felipillo</b> Bayano y Felipillo, dos esclavos que tuvieron un rol muy importante durante la conquista.</p>
   </hgroup>
  `,metaDescription:"📄 Artículo sobre la pollera congo, ✅ su uso, historia, desde la conquista y la traída de esclavos desde África y su 📝 clasificación según el profesor Ernesto Polanco.",portadaImagen:"images/polleraCongoCel-1x.jpg",portadaImagenFull:"images/polleraCongoFull-1x.jpg 1x, images/polleraCongoFull-2x.jpg 2x",portadaImagenTab:"images/polleraCongoTab-1x.jpg 1x, images/polleraCongoTab-2x.jpg 2x",portadaImagenCel:"images/polleraCongoCel-1x.jpg 1x, images/polleraCongoCel-2x.jpg 2x",generalImagen:"/images/polleraCongoGeneral.jpg",general:"Las polleras congo son confeccionadas en telas de diferentes colores lisos y estampados, no existe una limitación en el uso de las telas, estas son del gusto de la dueña de la pollera, o producto de las telas que se tenga a la mano. Una de las pocas características en las que se restrige el uso de un elemento es en el color Rojo. En la cultura congo este color representa al diablo o chamuco y si alguien lo usa está diciendo que tiene algún pacto con él. Pero este personaje no es el que hoy conocemos, el diablo para los congos era el blanco esclavizador la viva representación del mal. Otros datos nos aportan información sobre lo que significa el uso del color rojo en el vestido congo. Se debía a la colaboración de algunos palenques con los blancos, ellos prestaron su ayuda a corsarios ingleses como Francis Drake y a piratas como Henry Morgan para sabotear el comercio colonial español.",extra:o`
  <article class="completa blanco">
   <hgroup class="blogStyle">
    <h2>Descripción de la Pollera Congo</h2>
    <p>Los vestidos típicos de la provincia de colón son de gran belleza, en especial las polleras congo.</p>
    <p>No solo es su tremendo peso histórico lo que les brida un incalculable valor, sino es la flexibilidad del pueblo. Esto se debe a que todavía, la cultura congo, permanece viva, permitiendo que los aspectos físicos de estos vestidos se mantengan en constante evolución.</p>
    <p>Como hemos mencionado la cultura congo es matriarcal y es la reina la que toma desiciones acerca de que se va a utilizar y en que combinaciones.</p>
    <p>Tenemos que tener presente que las manifestaciones folklóricas varían, en algunos casos grandemente, al ser llevados al escenario como una presentación artística.</p>
    <p>Lo que se busca con la esta información es brindar opciones a las agrupaciones folkloricas tanto tradicionales como de proyección, que no sean nativos de la provincia de colón, para que luzcan las diferentes polleras que esta cultura nos puede brindar.</p>
   </hgroup>
  </article>
   `,descripcion:o`
   <article class="completa blanco clasificacion">
    <hgroup class="blogStyle">
     <h2>Clasificación de la Pollera Congo</h2>
     <p>En <b>Colón</b> podemos encontrar una gran variedad de <b>polleras</b>:</p>
     <h3>La Pollera Estampada</h3>
     <p><b>vestido típico</b> que consiste en una camisa de una sola arandela y falda de tres tramos. Su característica principal es que la tela que se usa para la falda y la camisa es de una sola clase puede ser zaraza o de flores. El cuerpo de la camisa puede ser de otro color.</p>
     <h3>La Pollera de Metidos</h3>
     <p>Este <b>traje típico</b> consiste en una camisa de una sola arandela y una falda de tres tramos.</p>
     <p>Su característica principal recae en la falda, Se utilizan dos tipos de telas distintos uno liso y uno estampado en su confección.</p>
     <p>Las combinaciones que utilizan son:</p>
     <ul>
      <li>Estampado - tela lisa - estampado</li>
      <li>tela lisa - estampado - tela lisa</li>
     </ul>
     <h3>La Pollera de Retazos</h3>
     <p>Es una <b>pollera</b> de dos piezas, camisa y falda. Se combinan diseños lisos y estampados para crear una tela colorida y vistosa, los retazos comúnmente son en forma cuadrada o en rectángulos, pero se pueden hacer en la forma que quiera por ejemplo en triángulos.</p>
     <p>La camisa puede ser de una o dos arandelas. Esta camisa se usa por dentro de la falda, si es por fuera se termina la camisa en una rucha o arandela.</p>
     <p>El pollerón, también hecho de retazos, puede ser de dos o tres tramos. La pollera congo no lleva "picarona" (rucha final en las polleras de zaraza de las montunas) el faldón parece que se divide en tres tramos del mismo ancho.</p>
     <h3>El Pilón Portobeleño</h3>
     <p>Esta <b>pollera</b> consiste en una camisa de mangas con volantes al final y arandela en la cintura, tiene una similitud a la basquiña. El cuerpo de la camisa es de tela de un solo color, los botones que se utilizan no siempre son iguales y las arandelas son de tela estampada. Comúnmente flores o zaraza.</p>
     <p>El faldón es de tres tramos iguales y se utiliza la tela estampada o de flores que se utilizó en los volantes de la camisa.</p>
     <h3>Pollera de Parches</h3>
     <p>Esta pollera consiste en una camisa de una sola arandela y falda de tres tramos. Su nombre proviene de tener parches cuadrados en varias partes sin ningún orden

        establecido, su origen proviene de la verdadera necesidad de remendar las polleras que tenían algún tipo de agujero.</p>
      <p>Su confección es similar a la pollera estampada, A pesar de que hoy en día es común confeccionarlas con parches su origen es muy interesante y demuestra la gran creatividad de las mujeres ante la necesidad.</p>
      <p>Por debajo de la falda en algunos palenques las mujeres utilizan un peticote muy sencillo y en otros el uso de esta prenda es exclusiva de la reina, las demás usan una especie de ropa interior llamada pantaleta o petipan que llega más o menos hasta la rodilla.</p>
      <p>También se usan unas bolsas llamadas Chupas o Chumpas.</p>
      <p>El cabello se puede llevar de diferentes maneras, porque hay cabellos y peinados muy diversos, desde corto muy rizados hasta largo y liso. Si es largo se puede llevar de manera muy tradicional con partidura a la mitad y dos trenzas, con las puntas amarradas con tiritas de trapos.</p>
      <p>Para adornar la cabeza se usan flores, tradicionalmente la flor del congo llamada Cañitolendo que es una flor silvestre que se encuentra a lo largo de la costa arriba y costa abajo, puede decirse que es un tembleque natural.</p>
      <p>Una de las características del arreglo de la cabeza es que a pesar de que se hace una partidura en el centro de la cabellera y se hacen dos tortas las flores deben ocupar toda la parte trasera, dejando al descubierto la parte de arriba de la cabeza, pero no la partidura en la parte de atrás como es tradicional en la pollera santeña.</p>
      <p>Sus accesorios son collares son de cuentas, conchas y caracoles y semillas.</p>
      <p>Este vestido típico no utiliza zapatos y se dice que es por la relación del negro con la tierra.</p>
      <p>La cultura congo es matriarcal, la reina congo puede utilizar lo que ella desee, desde una pollera de retazos hasta una pollera de color blanco con una corona alta que lleva flores y cintas de colores que le caen sobre la espalda.</p>
      <p>Hemos utilizado la clasificación del profesor Ernesto Polanco</p>
    </hgroup>
   </article>

  `,extra2:o`
    <section class="completa blanco videoPasos">
     <h2>Video sobre La Pollera Congo</h2>
     <iframe src="https://www.youtube.com/embed/I-KF3UFeTHc?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </section>
  `},{metaTitle:"Pollera De Lujo",nombre:"Pollera De Lujo",url:"Pollera-De-Lujo",region:"Los Santos",dato:"Danza: Cumbia Santeña",miniatura:"PolleraDeLujoMiniatura.jpg","reseña":o`
   <hgroup>
    <p>La pollera de Gala es el vestido típico más lujoso y conocido de Panamá. el trabajo artesanal que es utilizado para su confección lo hace una pieza digna de colección. </p>
    <p>La pollera de lujo era el vestido utilizado por las mujeres panameñas en las fiestas más importantes como por ejemplo en los días patrios y en carnavales.</p>
   </hgroup>`,antecedentes:o`
   <hgroup>
    <h2>Historia de la Pollera de Lujo Santeña</h2>
    <p>La Pollera de gala Santeña o de Lujo tiene sus orígenes en Europa, es el resultado de la evolución y de una mezcla de culturas. Desde los tembleques con origen chino, peinado francés hasta zarcillos persas, el vestido típico de gala es una joya que ha unido detalles de tantos lugares, convirtiendo esas influencias en lo que nosotros conocemos hoy día como pollera. </p>
    <p>Ciertamente la influencia de nuestro traje típico es europea y al ser territorio español desde donde se embarcaron los navíos a América es fácil hacer la relación directa, pero hay muchos indicadores que permiten dar ejemplos tangibles de los orígenes tan diversos de los elementos que la conforman.  <i>1</i></p>
    <p>En Panamá se tienen datos de las polleras desde el año 1863 gracias a las imágenes captadas por el primer fotógrafo español Rafael Castro Ordoñez, a las polleras centenarias que todavía existen y a los estudios realizados a las telas y encajes. Es muy interesante conocer las menciones que se encuentran en las cartas de los viajes de Cristóbal Colón, más específicamente en su segundo viaje en donde se hace una descripción de las vestimentas que traían las primeras mujeres que llegaron a América resaltando que ellas aclimataron los vestidos al calor del trópico.</p>
    <p>La pollera de lujo es el vestido típico que representa a la provincia de Los Santos y ha sido adoptada por las personas de la capital con ciertas modificaciones como por ejemplo utilizar la Mosqueta sobre la "mota" o pom pom y tembleques con gusanillos dorados.</p>
    <p>En el Club Unión las chicas de la alta sociedad retomaron el uso de este hermoso traje típico para carnavales y días patrios. Se tienen datos que afirman que en ocasiones ellas no usaban la partidura en medio y se empolleraban hasta con flequillo. Otro dato interesante es que utilizaban la camisa de la pollera caida sobre los hombros. </p>
    <p>Ramona "La Trona" Lefevre fue una dama amante de la pollera que sobresalió gracias a su amor por el traje típico y a su poder adquisitivo lo que le permitió tener una colección de 19 polleras y uno de los joyeros más grandes y lujosos de la capital. Ella implementó elementos y los impuso como una nueva moda, como, por ejemplo: el uso del peinetón, el uso de muchas cadenas y el aumento en el tamaño de las labores de la pollera.</p>
    <p>Otra persona muy sobresaliente en la evolución de la pollera fue el sr Edgardo de León Madariaga un folklorista y artesano, responsable de un cambio estético importante en la pollera, incluyó mayor vuelo en la falda e introdujo las polleras policromadas y degradaciones "matizado". Llegó a utilizar hasta 20 colores en las labores de sus diseños. </p>
    <p>Otra dama muy importante fue Elia Charpentier la primera “Dama nacional de la pollera” ella fue la responsable del aumento en el tamaño de las monedas coronadas y hasta les incrustó esmeraldas, aumentó el tamaño del peinetón, revivió el uso del tostón y llegó a utilizar todos los tembleques de oro y perlas. </p>
    <h4>1. recomendamos las charlas del Sr. Eduardo Cano que nos brinda una nueva teoría sobre el origen de la pollera, esta teoría es el resultado de muchos años de estudio tanto a nivel nacional como internacional.</h4>
   </hgroup>
  `,metaDescription:'Es imposible determinar cuál de las polleras existentes de Panamá es mejor, cada una es fruto de la evolución y de las características históricas del pueblo al que pertenecen. Sus rasgos distintivos hacen a cada una de nuestras polleras únicas y dignas de amor y respeto. Por otro lado, las ganas de volver a "las polleras" más comerciales y vistosas han llegado a crear variaciones muy distintas de lo tradicional.',portadaImagen:"images/PolleraDeLujoCel-1x.jpg",portadaImagenFull:"images/PolleraDeLujoFull-1x.jpg 1x, images/PolleraDeLujoFull-2x.jpg 2x",portadaImagenTab:"images/PolleraDeLujoTab-1x.jpg 1x, images/PolleraDeLujoTab-2x.jpg 2x",portadaImagenCel:"images/PolleraDeLujoCel-1x.jpg 1x, images/PolleraDeLujoCel-2x.jpg 2x",generalImagen:"/images/PolleraDeLujoGeneral.jpg",general:'Es imposible determinar cuál de las polleras existentes de Panamá es mejor, cada una es fruto de la evolución y de las características históricas del pueblo al que pertenecen. Sus rasgos distintivos hacen a cada una de nuestras polleras únicas y dignas de amor y respeto. Por otro lado, las ganas de volver a "las polleras" más comerciales y vistosas han llegado a crear variaciones muy distintas de lo tradicional.',descripcion:o`
   <hgroup>
    <h2>Descripción</h2>
    <h3>Pollera de Lujo</h3>
    <p>La pollera de Gala es una pollera de encajes, en su corte y armado es igual a la pollera blanca o la de coquitos, está formado por una camisa de dos arandelas y mangas; debajo de estas mangas tiene unas cintas que se utilizan para amarrarlas y mantenerlas al mismo nivel que la segunda arandela. </p>
    <p>El Pollerón está compuesto por dos tramos de tela separados por una trencilla y terminada en un encaje pequeño llamado peacillo y encajes anchos con un poquito de recogido. </p>
    <p>En la cintura la pretina se separa en dos (adelante y atrás) y a ambos lados se terminan en cuatro tiras de tela que se amarran. Las dos tiras de atrás se amarran primero hacia adelante y luego las de adelante hacia atrás. </p>
    <p>Los dibujos o labores que se hacen sobre la tela se repiten indefinidamente a lo largo de la falda y de la camisa. </p>
    <p>Tradicionalmente se utilizan colores sólidos como azul, rojo o negro, con la modernización de los métodos de colorización de hilos y textiles la pollera ha evolucionado y en la actualidad podemos ver labores matizadas (degradación de colores en un solo tono) o combinando colores (hojas verdes, flores rojas y mariposas amarillas), a pesar de la gran diversidad debemos evitar los colores neón. </p>
    <p>No es posible decir que alguna pollera este mal o bien, la tradición y las investigaciones de las polleras centenarias nos revelan características que por necesidad y a veces por simple gusto se utilizan igual o se han modificado. </p>
    <p>Hay algunos lineamientos que forman parte del buen gusto a la hora de confeccionar una pollera. como, por ejemplo: el tamaño de las labores, históricamente podemos ver un cambio notable en el tamaño de este elemento indispensable de la pollera de lujo. hoy en día podemos decir que en la pollera se debe dejar ver el color blanco de la tela en la parte superior de los paños como buena práctica.  </p>
    <p>Diferentes tipos de labores de pollera</p>
    <ul>
     <li> Labores Talco en sombra, normalmente es utilizada para trabajar labores en color blanco.</li>
     <li> Labores Talco al Sol, se utiliza con o sin calados.</li>
     <li> Labores Marcadas o en punto de cruz. </li>
     <li> Labores Bordadas se utiliza con o sin calados. </li>
     <li> Labores Zurcidas se utiliza con o sin calados. </li>
    </ul>
    <p>Las labores de la pollera pueden ir acompañadas de "calados" son una técnica que consiste en sacar los hilos de una tela y luego trabajar una especie de bordado sobre ellos. Se realizan dentro de las labores como, por ejemplo: en el centro de una hoja o en el centro del pétalo de una flor. Es característico que las polleras lleven muchos diseños diferentes, en algunos casos en una sola pollera no se repite ninguno. </p>
    <p>los encajes utilizados para las polleras de gala son los que conocemos comúnmente como valencianos, aunque este nombre es un regionalismo y se refiere a encajes trabajados sobre una malla; Su nombre es valencie o valencienne (así es fácil encontrarlos en Google) </p>
    <p>Otra de las características de las polleras de gala son los mundillos, que son encajes confeccionados a mano con bolillos (palitos), los que conocemos comúnmente como peacillo y trencilla. según la definición del diccionario el mundillo es en realidad el cilindro que se usa para tejer las trencillas, aunque en Panamá denominamos "mundillo" al juego de trencillas trabajadas con esta técnica que se usan para las polleras. </p>
    <p>Otro accesorio muy interesante es el paño o rebozo, este accesorio es el equivalente al chal actual, era utilizado para cubrirse la cabeza del sereno o para abrigarse del frío. En la actualidad el reboso es una pieza de gran labor artesanal, se trabaja al igual que la pollera, en labores que combinan perfectamente. No es un accesorio indispensable y cuando se lleva puesto no debe ser amarrado a las mangas, ni utilizado al bailar. </p>
    <p>En la cabeza de tembleques blancos no se deben utilizan pimpollos de colores, el uso de ellos no es tradicional.  </p>
    <p>En la actualidad podemos encontrar nuevos materiales para la confección de tembleques como los cristales de Swarovski. </p>
    <p>Las Enaguas o peticotes son parte fundamental de la pollera. Se utilizan dos o tres y se confeccionan en diferentes técnicas, pueden ser de encajes, tejido de crochet, pajita, con labores en talco y calado. Las enaguas o peticotes internos son más sencillos y tienen la finalidad de no dejar ver las piernas de la empollerada. </p>
    <p>El Enjaretado en las polleras de gala se utilizan en colores contrastantes, por ejemplo: si la pollera es roja, el enjaretado puede ser en azul o celeste.  </p>
    <p>Los Zapatos en las polleras de encajes se usan con lazos y hebillas, son del mismo color que el enjaretado y se deben llevar de satén o en una tela con brillos.</p>
   </hgroup>
  `},{metaTitle:"La Camisilla",nombre:"La Camisilla",url:"Camisilla",region:"Provincias Centrales",dato:"Danza: Punto",miniatura:"camisillaMiniatura.jpg","reseña":o`
   <hgroup>
    <p>La camisilla es el vestido típico de gala del hombre panameño y es utilizada en fiestas y en ocasiones especiales como por ejemplo los domingos para asistir a misa.</p>
   </hgroup>`,antecedentes:o`
   <hgroup>
    <h2>Historia de la Camisilla</h2>
    <p>"No se sabe a ciencia cierta en qué año sé utilizo por primera vez la camisilla, existen referencias de que esta pieza masculina tiene una larga vida de existencia, ya que en la fiesta del Centenario de Chitré en 1948, se exhibió una camisilla con juegos de alforzas y pequeños talcos piramidales en relieve, con cien años de existencia".</p>
    <h3>Dora P. De Zárate</h3>
   </hgroup>
  `,metaDescription:"Los vestidos típicos de los hombres, no son tan conocidos como los de las mujeres. Existen pocosdatos sobre sus orígenes. En la actualidad podemos apreciar una amplia variedad de modelos endonde se incluyen elementos totalmente novedosos para esta prenda de vestir como, por ejemplo: encajes, bordados, calados, talcos, etc... que son labores usualmente utilizadas en las polleras de gala y en algunas montunas. ",portadaImagen:"images/camisillaCel-1x.jpg",portadaImagenFull:"images/camisillaFull-1x.jpg 1x, images/camisillaFull-2x.jpg 2x",portadaImagenTab:"images/camisillaTab-1x.jpg 1x, images/camisillaTab-2x.jpg 2x",portadaImagenCel:"images/camisillaCel-1x.jpg 1x, images/camisillaCel-2x.jpg 2x",generalImagen:"/images/camisillaGeneral.jpg",general:"Los vestidos típicos de los hombres, no son tan conocidos como los de las mujeres. Existen pocosdatos sobre sus orígenes. En la actualidad podemos apreciar una amplia variedad de modelos endonde se incluyen elementos totalmente novedosos para esta prenda de vestir como, por ejemplo: encajes, bordados, calados, talcos, etc... que son labores usualmente utilizadas en las polleras de gala y en algunas montunas. ",descripcion:o`
   <hgroup>
    <h2>Descripción</h2>
    <h3>Camisilla</h3>
    <p>Las camisillas de Los Santos son de color blanco y tienen un diseño característico. </p>
    <p>El cuello de la camisa es alto y de estilo chino, en la parte frontal posee dos bolsillos, las mangas son largas y holgadas, en las muñecas es cerrada y no lleva botones.</p>
    <p>El cuerpo de la camisilla esta adornado con alforzas, que son una serie de tabletas finamente cosidas en la parte trasera dela camisa se hacen dos o tres tiras de alforzas y en la parte frontal se hacen a ambos lados del pecho.</p>
    <p>Las camisillas llevan botones que pueden ser de oro, monedas pequeñas de plata bañada en oro, nácar o hueso. Las más sencillas normalmente llevan los botones pegados y una sola línea de ojales. mientras que las más elaboradas y finas tienen doble línea, ya que los botones son de oro y se puedes quitar y poner para lavar la camisa.</p>
    <p>Las telas utilizadas para su confección son de hilo como el holán o más sencillas como el poplin.</p>
    <p>La labor artesanal de las camisillas se destaca en las alforzas o espiguetas, que pueden tomar al rededor de cinco o seis días para su confección.</p>
    <p>De la cantidad de espiguetas depende el valor que se le brindará a la camisilla. La tradición nos dice que se consideran más finas las camisillas que tienen más espiguetas, por esta razón cuando son confeccionadas para concursos, deben tener un mínimo de 30 espiguetas en la parte delantera.</p>
    <p>tipos de alforzas o espiguetas</p>
    <ul>
     <li>Alforzas Horizontales</li>
     <li>Alforzas Verticales</li>
     <li>Alforzas Oblicuas</li>
     <li>Alforzas Oblicuas Encontradas (combinación de dos tiras independientes de alforzas)</li>
     <li>Alforzas horizontales y verticales</li>
     <li>Cepito</li>
    </ul>
    <p>Para acompañar la camisilla el hombre debe vestir con pantalón negro, zapatos negros, cutarras o chinelas (zapatos blanco con negro), una cebadera o chácara (bolsa de hilo tejida) y sombrero pintado.</p>
   </hgroup>
  `}]},function(e,a,n){const o=n(0);e.exports=[{metaTitle:"Sesión de Fotos en Pollera",metaDescripcion:"🎖Vive la EXPERIENCIA de lucir uno de los trajes típicos más hermosos del mundo. Folk in Love te ofrece 📷 sesiones de FOTOS que incluyen POLLERA, 💍 prendas, tembleques, 💄maquillaje, arreglo, sesión de fotos con asesoría de poses.",nombre:"Sesión de Fotografía",enlace:"fotos-en-traje-tipico",subtitulo:"en vestido típico",descripcion:"La sesión fotográfica incluye vestido típico, maquillaje, colocación de tembleques y prendas, asesoría con las poses y un minimo de 15 fotos editadas en biblioteca digital perzonalizada.",miniaturaFull:"images/fotografia-miniatura-full.jpg",miniaturaCel:"images/fotografia-miniatura-cel.jpg",imagenFull:"images/fotografia-imagen-full.jpg",imagenCel:"images/fotografia-imagen-cel.jpg",alt:"Sesión fotográfica de alta calidad, vestidos típicos de Panamá",opciones:[{detalle:"Pollera de Lujo",precio:350},{detalle:"Pollera Blanca",precio:300},{detalle:"Pollera Montuna",precio:225},{detalle:"Pollera Congo",precio:175},{detalle:"Persona Adicional",precio:0,descripcions:"No se cobra adicional por las fotografías, sólo el costo del alquiler de cada vestuario. (consultar precios en la sección de alquiler de vestuarios)"}],articulo:o`<section class="articulo conGaleria">
  <div class="sesionGal">
    <picture>
    <source media="(min-width: 10px )" srcset="images/sesionFotosGaleriaCel1x-1.jpg 1x, images/sesionFotosGaleriaCel2x-1.jpg 2x">
    <source media="(min-width: 541px )" srcset="images/sesionFotosGaleriaTab1x-1.jpg 1x, images/sesionFotosGaleriaTab2x-1.jpg 2x">
    <source media="(min-width: 801px )" srcset="images/sesionFotosGaleriaFull1x-1.jpg 1x, images/sesionFotosGaleriaFull2x-1.jpg 2x"> 
    <img src="images/sesionFotosGaleriaCel1x-1.jpg 1x" alt="Sesión de Fotos en pollera en el lugar de la ciudad de Panamá que prefiera">
    </picture>
    <picture>
    <source media="(min-width: 10px )" srcset="images/sesionFotosGaleriaCel1x-3.jpg 1x, images/sesionFotosGaleriaCel2x-3.jpg 2x">
    <source media="(min-width: 541px )" srcset="images/sesionFotosGaleriaTab1x-3.jpg 1x, images/sesionFotosGaleriaTab2x-3.jpg 2x">
    <source media="(min-width: 801px )" srcset="images/sesionFotosGaleriaFull1x-3.jpg 1x, images/sesionFotosGaleriaFull2x-3.jpg 2x"> 
    <img src="images/sesionFotosGaleriaCel1x-3.jpg 1x" alt="Fotos de Alta Calidad en Vestidos Típicos de Panamá"> 
    </picture>
    <picture>
    <source media="(min-width: 10px )" srcset="images/sesionFotosGaleriaCel1x-2.jpg 1x, images/sesionFotosGaleriaCel2x-2.jpg 2x">
    <source media="(min-width: 541px )" srcset="images/sesionFotosGaleriaTab1x-2.jpg 1x, images/sesionFotosGaleriaTab2x-2.jpg 2x">
    <source media="(min-width: 801px )" srcset="images/sesionFotosGaleriaFull1x-2.jpg 1x, images/sesionFotosGaleriaFull2x-2.jpg 2x"> 
    <img src="images/sesionFotosGaleriaCel1x-2.jpg 1x" alt="Fotografía en Pollera y Vestidos Típicos de Panamá. Alta calidad Fotográfica, excelentes polleras, tembleques y Maquillaje">
    </picture>
  </div>
 <articulo class="completa texto">
  <hgroup class="blogStyle">
   <h2>La Experiencia de Ponerse un Vestido Típico Panameño</h2>
   <p>Vestirse de pollera es una de las experiencias más lindas que pueden tener todas las panameña. A lo largo de nuestro país las indumentarias tradicionales son muy variadas, pero describen la vida y las experiencias de las mujeres que las portaban.</p>
   <p>Hoy en día se ha extendido el uso de la pollera de lujo porque es de incalculable belleza, pero no debemos olvidar las otras hermosas polleras y vestimentas que tiene nuestro país. Como, por ejemplo: los vestidos de diablo espejo, diablico sucio, diablicos limpios de la chorrera, indumentarias de faena, basquiña, chambra y camisola, etc...</p>
   <p>Realizarse una sesión de fotos nos hace sentir hermosas, es una experiencia que nos saca de nuestra zona de confort y nos permite vivir una experiencia memorable, ¿por qué? porque además de tomarnos el tiempo para engalanarnos con un hermoso maquillaje, peinado, prendas y demás accesorios, tendremos la experiencia de conocer los detalles de la confección del vestido típico escogido y además conocer de primera mano cómo se siente la tela, el peso de los tembleques y mucho más.</p>
   <h2>Descripción de la Sesión</h2>
   <p>La aventura inicia desde que el equipo llega a arreglarte (lugar de conveniencia) en dónde tendrás la pollera y los accesorios que necesitarás para esta maravillosa experiencia. Luego pasamos al peinado y maquillaje, de ahí a colocar la pollera, las prendas y los accesorios de la cabeza</p>
   <p>Escogeremos un lugar mágico y emblemático de Panamá para que sea el marco perfecto para tu sesión de fotos.</p>
   <p>y listo, ahora solo queda disfrutar y divertirnos con cada momento.</p>
   <p>Nuestro equipo te contara la historia de estas polleras, detalles interesantes de la confección y además te ayudará a que poses para que tus recuerdos sean como siempre los soñaste.</p>
   <h2>Qué Necesitas Para Tu Sesión?</h2>
   <p>Nuestro compromiso es hacer de ese día un momento memorable, estas son algunas recomendaciones que nos ayudarán a hacer todo de forma más ágil:</p>
   <ul>
    <li>Comer antes de tu sesión</li>
    <li>Ropa interior Blanca</li>
    <li>Cabello Limpio</li>
    <li>Cejas arregladas</li>
    <li>No usar perfume en el cuello</li>
   </ul>
   <p>Este video les explicará un poco más del proceso.</p>
   <div class="videoPasos texto">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Y656jCpFLiM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
   </div>
   <h2>Detalles de Nuestro Servicio</h2>
   <ul>
    <li>No hay límite de personas por Sesión</li>
    <li>Horarios Flexibles</li>
    <li>Locación en exteriores o interiores</li>
    <li>Tú escoges la locación que prefieras (si la locación tiene un costo, este debe ser cubierto por el cliente</li>
    <li>Atención personalizada</li>
    <li>Incluye Maquillaje y asesoría para las poses</li>
    <li>Varios paquetes a escoger</li>
    <li>Trajes para niños disponibles</li>
    <li>Trajes para hombres disponibles</li>
    <li>Todos los vestidos disponibles en tallas S, M y L</li>
    <li>Te entregamos un mínimo de 15 fotos editadas en una plataforma virtual</li>
   </ul>
  </hgroup>
 </articulo>
</section>
  
  `},{metaTitle:"Venta de Pollera Blanca para bebes, niñas, jovenes y adultas",metaDescripcion:"Pollera confeccionada en tela de organza, adornada con finos encajes de hilo.",nombre:"Pollera Blanca",enlace:"pollera-blanca",subtitulo:"Organza Bordada",descripcion:"Pollera confeccionada en tela de organza, adornada con finos encajes de hilo.",miniaturaFull:"images/organza-bordada-miniatura-full.jpg",miniaturaCel:"images/organza-bordada-miniatura-cel.jpg",imagenFull:"images/organza-bordada-producto-full.jpg",imagenCel:"images/organza-bordada-producto-cel.jpg",alt:"pollera blanca de organza bordada, traje tipico de panama",opciones:[{detalle:"Bebes de 0 a 2 años (con una sola arandela)",precio:50},{detalle:"de 3 a 5 años (con 2 arandelas)",precio:100},{detalle:"de 6 a 10 años",precio:200},{detalle:"de 11 en adelante",precio:400}]},{metaTitle:"Venta de Pollera Congo para bebes, niñas, jovenes y adultas",metaDescripcion:"Pollera de retazos de tela de vistosos colores.",nombre:"Pollera Congo",enlace:"pollera-congo",subtitulo:"De Diferentes Clases",descripcion:"Pollera de retazos de tela de vistosos colores.",miniaturaFull:"images/pollera-congo-miniatura-full.jpg",miniaturaCel:"images/pollera-congo-miniatura-cel.jpg",imagenFull:"images/pollera-congo-producto-full.jpg",imagenCel:"images/pollera-congo-producto-cel.jpg",alt:"Pollera congo de retazos, vestuarios tipicos de panama",opciones:[{detalle:"Niñas hasta 2 años",precio:45},{detalle:"Niñas hasta 10 años",precio:90},{detalle:"Adultos",precio:160}]},{metaTitle:"Venta de Polleras de lujo en Panamá",metaDescripcion:"Pollera de gala en técnica del talco al sol con calados y encajes valencianos.",nombre:"Pollera de Lujo",enlace:"pollera-lujo",subtitulo:"Talco al Sol",descripcion:"Pollera de gala en técnica del talco al sol con calados y encajes valencianos.",miniaturaFull:"images/pollera-lujo-miniatura-full.jpg",miniaturaCel:"images/pollera-lujo-miniatura-cel.jpg",imagenFull:"images/pollera-lujo-producto-full.jpg",imagenCel:"images/pollera-lujo-producto-cel.jpg",alt:"Pollera de Lujo, talco en sol, vestidos tipicos de Panama",opciones:[{detalle:"Talco en Sol",precio:5e3,"descripción":"Tiempo de entrega 10 a 12 meses, durante ese tiempo se podrán ir efectuando pagos, el primer pago se debe hacer el día de la toma de las medidas."}]},{metaTitle:"Confección de tembleques panameños blancos y en color",metaDescripcion:"Juego de 12 pares de flores.",nombre:"Tembleques",enlace:"tembleques",subtitulo:"blancos o en color",descripcion:"Juego de 12 pares de flores.",miniaturaFull:"images/tembleques-miniatura-full.jpg",miniaturaCel:"images/tembleques-miniatura-cel.jpg",imagenFull:"images/tembleques-producto-full.jpg",imagenCel:"images/tembleques-producto-cel.jpg",alt:"Cabeza de Tembleques, Accesorios Folklóricos Panameños",opciones:[{detalle:"Niñas",precio:250},{detalle:"Adulta",precio:450},{detalle:"Tapamoños",precio:25}]},{metaTitle:"Venta de Camisas típicas panameñas para hombres",metaDescripcion:"",nombre:"Camisilla",enlace:"camisilla",subtitulo:"De Gala",descripcion:"",miniaturaFull:"images/camisilla-miniatura-full.jpg",miniaturaCel:"images/camisilla-miniatura-cel.jpg",imagenFull:"images/camisilla-producto-full.jpg",imagenCel:"images/camisilla-producto-cel.jpg",alt:"Camisilla de Gala, Vestidos Típicos de Panamá",opciones:[{detalle:"Niños hasta 6 años",precio:35},{detalle:"Niños hasta 12 años",precio:45},{detalle:"Adultos, voilé y alforzas",precio:100},{detalle:"Adultos con espiguetas y tela de hilo",precio:200}]}]},function(e,a,n){(function(a){var o,t=void 0!==a?a:"undefined"!=typeof window?window:{},i=n(20);"undefined"!=typeof document?o=document:(o=t["__GLOBAL_DOCUMENT_CACHE@4"])||(o=t["__GLOBAL_DOCUMENT_CACHE@4"]=i),e.exports=o}).call(this,n(11))},function(e,a){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,a,n){"use strict";n.r(a);n(13);var o=n(3),t=n.n(o);t()("*",function(e,a){window.scrollTo(0,0),a()}),n(28),n(37),n(36),n(33),n(30),n(29),n(32),n(35),n(31),n(34),t()()},function(e,a,n){var o=n(14);"string"==typeof o&&(o=[[e.i,o,""]]);var t={hmr:!0,transform:void 0,insertInto:void 0};n(16)(o,t);o.locals&&(e.exports=o.locals)},function(e,a,n){(e.exports=n(15)(!1)).push([e.i,"body {\n  margin: 0;\n  width: 100vw;\n}\ndiv,\nsection,\narticle,\na,\nhgroup,\nmain,\nbody,\n.completa,\n.mitad,\n.tercio,\nimg,\nfooter,\nheader,\n.dosTercios {\n  box-sizing: border-box;\n}\narticle {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nsection {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n@media (max-width: 800px) {\n  section {\n    flex-wrap: wrap;\n  }\n}\nh1,\nh2,\nh5 {\n  font-family: 'Mandali', sans-serif;\n  font-family: 'Century Gothic', sans-serif;\n  font-weight: normal;\n  font-size: 3vw;\n  margin: 0;\n  padding: 0;\n}\n@media (max-width: 800px) {\n  h1,\n  h2,\n  h5 {\n    font-size: 5vw;\n  }\n}\nh3,\nh6 {\n  font-family: 'Dancing Script', cursive;\n  font-size: 2vw;\n  font-weight: 400;\n  margin: 0;\n  padding: 0;\n}\n@media (max-width: 800px) {\n  h3,\n  h6 {\n    font-size: 6vw;\n  }\n}\nh4 {\n  font-family: 'Yantramanav', sans-serif;\n  font-size: 1vw;\n  font-weight: light;\n  margin: 0;\n  padding: 0;\n}\n@media (max-width: 800px) {\n  h4 {\n    font-size: 4vw;\n  }\n}\np,\nli {\n  font-family: 'Yantramanav', sans-serif;\n  font-size: 1.3vw;\n  line-height: 1.6vw;\n  letter-spacing: 0.05vw;\n}\n@media (max-width: 800px) {\n  p,\n  li {\n    font-size: 3.9vw;\n    line-height: 4.8vw;\n    letter-spacing: 0.15vw;\n  }\n}\np b,\nli b {\n  text-transform: uppercase;\n}\np i,\nli i {\n  font-size: 1.1vw;\n}\n@media (max-width: 900px) {\n  p i,\n  li i {\n    font-size: 3.3vw;\n  }\n}\na {\n  text-decoration: none;\n}\n.blanco {\n  background: #f0f0f0;\n  color: #000;\n}\n.gris {\n  background: #808080;\n}\n.negro {\n  background: #010101;\n  color: #f0f0f0;\n}\n.negro .btn:hover {\n  cursor: pointer;\n  background: grisClaro;\n  color: negro;\n}\n.negroTrans {\n  background: rgba(1,1,1,0.3);\n  color: #f0f0f0;\n}\n.rosa {\n  background: #f22593;\n  color: #f0f0f0;\n}\n.rosaTrans {\n  background: rgba(242,37,147,0.6);\n  color: #f0f0f0;\n}\nmain {\n  width: 100vw;\n}\n.completa {\n  width: 100vw;\n  min-height: 40vw;\n  display: flex;\n}\n@media (max-width: 800px) {\n  .completa {\n    width: 100vw;\n    height: auto;\n  }\n}\n.completa hgroup {\n  width: 60vw;\n  height: auto;\n}\n@media (max-width: 800px) {\n  .completa hgroup {\n    width: 90vw;\n  }\n}\n.completa hgroup a {\n  text-transform: uppercase;\n  text-decoration: underline;\n}\n.mitad {\n  width: 50vw;\n  height: 40vw;\n}\n@media (max-width: 800px) {\n  .mitad {\n    width: 100vw;\n    height: auto;\n    padding: 1vw;\n  }\n}\n.mitad hgroup {\n  width: 90%;\n}\n.portada {\n  width: 100vw;\n  height: 40vw;\n  justify-content: space-between;\n}\n@media (max-width: 800px) {\n  .portada {\n    width: 100vw;\n    height: 80vw;\n  }\n}\n@media (max-width: 800px) {\n  .portada .completa,\n  .portada .mitad {\n    height: 80vw;\n  }\n}\n.tercio {\n  width: 33.33vw;\n  height: 40vw;\n}\n@media (max-width: 800px) {\n  .tercio {\n    width: 100vw;\n    height: auto;\n    padding: 1vw;\n  }\n}\n.imagen {\n  height: 40vw;\n}\n@media (max-width: 800px) {\n  .imagen {\n    width: 100vw;\n    height: 120vw;\n  }\n}\n.dosTercios {\n  width: 66.66vw;\n  height: 40vw;\n}\n@media (max-width: 800px) {\n  .dosTercios {\n    width: 100vw;\n    height: auto;\n    padding: 1vw;\n  }\n}\n.dosTercios hgroup {\n  width: 90%;\n}\n.imagenDoble {\n  height: 40vw;\n}\n@media (max-width: 800px) {\n  .imagenDoble {\n    width: 100vw;\n    height: 60vw;\n  }\n}\n.texto {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.texto hgroup {\n  height: auto;\n  width: 90%;\n}\n.info {\n  height: auto;\n  padding: 5vw;\n}\n.info hgroup {\n  width: 100%;\n  height: 100%;\n}\nform {\n  display: flex;\n  flex-wrap: wrap;\n}\nform input {\n  width: 28vw;\n  height: 2.34vw;\n  margin-bottom: 0.5vw;\n  font-family: 'Work Sans', sans-serif;\n  font-size: 1.3vw;\n}\n@media (max-width: 800px) {\n  form input {\n    width: 80vw;\n    height: 10vw;\n    font-size: 4vw;\n  }\n}\nform textarea {\n  width: 28vw;\n  font-family: 'Work Sans', sans-serif;\n  font-size: 1.3vw;\n}\n@media (max-width: 800px) {\n  form textarea {\n    width: 80vw;\n    font-size: 4vw;\n  }\n}\nform .btn {\n  width: 12.5vw;\n  height: 4vw;\n  float: right;\n}\n@media (max-width: 800px) {\n  form .btn {\n    width: 50vw;\n    height: 8vw;\n    font-size: 3vw;\n  }\n}\nform .btn:hover {\n  cursor: pointer;\n  background: grisClaro;\n  color: negro;\n}\n.lista {\n  width: 100vw;\n  height: auto;\n  display: flex;\n}\n.lista .listaFiltros {\n  width: 26vw;\n  height: auto;\n  padding: 1vw;\n  border-right: solid 1px #000;\n}\n@media (max-width: 800px) {\n  .lista .listaFiltros {\n    display: none;\n  }\n}\n.lista .listaCont {\n  width: 100vw;\n  height: auto;\n  padding: 2.5vw;\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n}\n@media (max-width: 800px) {\n  .lista .listaCont {\n    width: 100vw;\n    justify-content: center;\n  }\n}\n.tarjeta {\n  width: 30vw;\n  height: 40vw;\n  flex-wrap: wrap;\n  background: #ddd;\n  box-shadow: #808080 1px 1px 5px;\n  position: relative;\n  z-index: 0;\n  margin-bottom: 2.5vw;\n}\n@media (max-width: 800px) {\n  .tarjeta {\n    width: 90vw;\n    height: 120vw;\n    margin-bottom: 7.5vw;\n  }\n}\n.tarjeta:hover {\n  box-shadow: #808080 5px 5px 10px;\n}\n.tarjeta .tarjetaImagen {\n  background: #808080;\n  width: 30vw;\n  height: 24vw;\n}\n@media (max-width: 800px) {\n  .tarjeta .tarjetaImagen {\n    width: 90vw;\n    height: 72vw;\n  }\n}\n.tarjeta .tarjetaInfo {\n  height: 20vw;\n  width: 27.6vw;\n  background: #fff;\n  position: absolute;\n  bottom: 0;\n  left: 4%;\n  margin: auto;\n  overflow: visible;\n  padding: 12%;\n}\n@media (max-width: 800px) {\n  .tarjeta .tarjetaInfo {\n    width: 82.8vw;\n    height: 60vw;\n  }\n}\n.tarjeta .tarjetaInfo hgroup {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.tarjeta .tarjetaInfo hgroup h3 {\n  font-family: 'Mandali', sans-serif;\n  font-family: 'Century Gothic', sans-serif;\n  font-weight: normal;\n  font-size: 3vw;\n  margin: 0;\n  padding: 0;\n  font-size: 2vw;\n}\n@media (max-width: 800px) {\n  .tarjeta .tarjetaInfo hgroup h3 {\n    font-size: 6vw;\n  }\n}\n.tarjeta .tarjetaInfo hgroup h4 {\n  width: 100%;\n}\n@media (max-width: 800px) {\n  .tarjeta .tarjetaInfo hgroup h4 {\n    font-size: 4vw;\n  }\n}\n.blogStyle h3 {\n  font-family: 'Mandali', sans-serif;\n  font-family: 'Century Gothic', sans-serif;\n  font-weight: normal;\n  margin: 0;\n  padding: 0;\n  font-size: 1.5vw;\n}\n@media (max-width: 800px) {\n  .blogStyle h3 {\n    font-size: 4.5vw;\n  }\n}\n.medianera {\n  z-index: -6;\n}\nheader {\n  width: 100vw;\n  height: 5vw;\n  box-sizing: border-box;\n  padding: 0 5vw 0 5vw;\n  display: flex;\n  justify-content: space-between;\n  background: rgba(250,250,250,0.2);\n  position: fixed;\n  transition: all 0.3s linear;\n  z-index: 5;\n}\n@media (max-width: 800px) {\n  header {\n    height: 15vw;\n  }\n}\nheader .logoContainer {\n  width: 17vw;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.5s linear;\n  text-decoration: none;\n}\n@media (max-width: 800px) {\n  header .logoContainer {\n    width: 52vw;\n  }\n}\nheader .logoContainer .logo {\n  height: 4vw;\n  width: 4vw;\n}\n@media (max-width: 800px) {\n  header .logoContainer .logo {\n    height: 12vw;\n    width: 12vw;\n  }\n}\nheader .logoContainer .tipo {\n  height: 2vw;\n  width: 12vw;\n}\n@media (max-width: 800px) {\n  header .logoContainer .tipo {\n    width: 72vw;\n    height: 12vw;\n  }\n}\nheader .logoContainer h1 {\n  color: #000;\n  font-size: 2.5vw;\n}\n@media (max-width: 800px) {\n  header .logoContainer h1 {\n    font-size: 6vw;\n  }\n}\nnav {\n  line-height: 5vw;\n  width: 50vw;\n  display: flex;\n  justify-content: space-between;\n  transition: all ease 1s;\n  z-index: 3;\n}\n@media (max-width: 800px) {\n  nav {\n    position: absolute;\n    top: 15vw;\n    right: 0;\n    background: #f0f0f0;\n    width: 100vw;\n    transition: ease 1s;\n    height: 125vw;\n    flex-wrap: wrap;\n    z-index: 3;\n  }\n}\nnav a {\n  font-family: 'Yantramanav', sans-serif;\n  font-size: 1.5vw;\n  font-weight: normal;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: #f0f0f0;\n}\n@media (max-width: 800px) {\n  nav a {\n    font-size: 4.5vw;\n    color: #9d3973;\n    width: 100vw;\n    text-align: center;\n    line-height: 25vw;\n  }\n}\nnav a:hover {\n  color: #9d3973;\n  border-bottom: 3px solid #9d3973;\n  box-sizing: border-box;\n}\n@media (max-width: 900px) {\n  nav a:hover {\n    color: #f0f0f0;\n    background: #9d3973;\n  }\n}\n@media (max-width: 900px) {\n  .hidden {\n    right: -100vw;\n  }\n}\n.navButton {\n  border-radius: 50%;\n  background: #444;\n  font-size: 2rem;\n  color: #eee false;\n  height: 15vw;\n  width: 15vw;\n  line-height: 15vw;\n  position: fixed;\n  bottom: 1vw;\n  right: 5vw;\n  text-align: center;\n}\n@media (min-width: 800px) {\n  .navButton {\n    display: none;\n  }\n}\n.navButton .fa {\n  font-size: 10vw;\n}\n.navButton:visited {\n  color: #eee;\n}\n.blanco {\n  background: #f0f0f0;\n}\n.blanco .logoContainer {\n  opacity: 1;\n}\n.blanco a {\n  color: #000;\n}\n.blanco .navButton {\n  color: #eee;\n}\nfooter {\n  background: #000;\n  width: 100vw;\n  height: 30vw;\n  display: flex;\n}\n@media (max-width: 760px) {\n  footer {\n    height: auto;\n  }\n}\nfooter .footerLeft {\n  display: none;\n}\n@media (min-width: 760px) {\n  footer .footerLeft {\n    display: inline-block;\n    height: 20%;\n    width: 70%;\n    color: #fff;\n  }\n}\nfooter .footerRight {\n  width: 100%;\n}\n@media (min-width: 760px) {\n  footer .footerRight {\n    width: 30%;\n  }\n}\nfooter .footerRightUp {\n  height: 80%;\n  width: 100%;\n  color: #fff;\n  padding: 40px;\n  box-sizing: border-box;\n}\nfooter .footerRightUp ul {\n  list-style: none;\n}\nfooter .footerRightUp ul li {\n  margin-bottom: 1em;\n}\nfooter .footerRightDown {\n  height: 20%;\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n  line-height: 80px;\n  box-sizing: border-box;\n  padding: 0 40px;\n}\nfooter .footerRightDown a {\n  color: #fff;\n  font-size: 2rem;\n}\n.banner {\n  position: fixed;\n  z-index: -10;\n}\n.portadaTitulo {\n  text-align: center;\n}\n.portadaTitulo h1 {\n  background-size: cover;\n  margin: auto;\n  width: 30vw;\n  height: 5vw;\n}\n.portadaTitulo h1 span {\n  font-size: 0.01px;\n  height: 1px;\n}\n.inicioAbout {\n  display: flex;\n}\n@media (max-width: 800px) {\n  .inicioAbout {\n    flex-wrap: wrap;\n  }\n}\n.inicioAbout .aboutImagen {\n  padding: 0;\n}\n.inicioIdentidad {\n  width: auto;\n  height: auto;\n}\n.inicioIdentidad .identidadImagenes {\n  display: flex;\n  justify-content: center;\n}\n@media (max-width: 800px) {\n  .inicioIdentidad .identidadImagenes {\n    flex-wrap: wrap;\n  }\n}\n.inicioIdentidad .identidadImagenes .identidadImagen {\n  text-transform: none;\n  text-decoration: none;\n}\n@media (max-width: 800px) {\n  .inicioIdentidad .identidadImagenes .identidadImagen {\n    width: 100vw;\n    height: 120vw;\n    padding: 0;\n  }\n}\n.inicioIdentidad .identidadImagenes .identidadImagen .identidadInfo {\n  width: 33.33vw;\n  height: 40vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.5s linear;\n}\n@media (max-width: 800px) {\n  .inicioIdentidad .identidadImagenes .identidadImagen .identidadInfo {\n    width: 100vw;\n    height: 120vw;\n  }\n}\n.inicioIdentidad .identidadImagenes .identidadImagen .identidadInfo:hover {\n  opacity: 1;\n}\n.inicioIdentidad .identidadImagenes .identidadImagen .identidadInfo hgroup {\n  text-align: center;\n}\n.inicioIdentidad .identidadImagenes .identidadFotos {\n  z-index: -2;\n  position: absolute;\n  padding: 0;\n}\n.inicioApoyo {\n  background: url(\"/images/apoyo-full.jpg\");\n  background-size: cover;\n  background-attachment: fixed;\n  justify-content: space-between;\n}\n@media (max-width: 1280px) {\n  .inicioApoyo {\n    background: url(\"/images/apoyo-med.jpg\");\n    background-size: cover;\n    background-attachment: fixed;\n  }\n}\n@media (max-width: 800px) {\n  .inicioApoyo {\n    background: url(\"/images/apoyo-tab.jpg\");\n    background-size: cover;\n    height: auto;\n    background-attachment: fixed;\n  }\n}\n@media (max-width: 600px) {\n  .inicioApoyo {\n    background: url(\"/images/apoyo-cel.jpg\");\n    background-size: cover;\n    background-attachment: fixed;\n  }\n}\n.identidadTexto hgroup {\n  width: 90vw;\n}\n.contacto {\n  height: 55vw;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: url(\"/images/contacto-full.jpg\");\n  background-size: cover;\n  background-attachment: fixed;\n}\n@media (max-width: 1280px) {\n  .contacto {\n    background: url(\"/images/contacto-med.jpg\");\n    background-size: cover;\n    background-attachment: fixed;\n  }\n}\n@media (max-width: 800px) {\n  .contacto {\n    background: url(\"/images/contacto-tab.jpg\");\n    background-size: contain;\n    background-attachment: fixed;\n    height: 180vw;\n  }\n}\n@media (max-width: 600px) {\n  .contacto {\n    background: url(\"/images/contacto-cel.jpg\");\n    background-size: cover;\n    background-attachment: fixed;\n  }\n}\n.contacto .contactoInfo {\n  width: 35vw;\n  height: 55vw;\n  padding-top: 5vw;\n}\n@media (max-width: 800px) {\n  .contacto .contactoInfo {\n    width: 100vw;\n    height: 180vw;\n  }\n}\n.contacto .contactoInfo div {\n  color: #e1e1e1;\n  width: 80%;\n  height: auto;\n}\n.contacto .contactoInfo div h2 {\n  margin-top: 0;\n}\n.album {\n  flex-wrap: wrap;\n}\n.album .imagenCentral {\n  height: 30vw;\n  width: 30vw;\n  background: #808080;\n}\n.album .galeria {\n  height: 10vw;\n  width: 100%;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n.album .galeria .miniatura {\n  width: 8vw;\n  height: 8vw;\n  background: #808080;\n}\n.pasos,\n.joyero {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.pasos hgroup,\n.joyero hgroup {\n  height: 90%;\n  width: 90%;\n}\n.pasos hgroup ul,\n.joyero hgroup ul {\n  margin-top: 3vw;\n  height: 80%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.pasos hgroup ul li,\n.joyero hgroup ul li {\n  width: 70%;\n}\n#vestuarioPortada p {\n  font-size: 1.8vw;\n  letter-spacing: 0.2vw;\n  line-height: 2vw;\n}\n@media (max-width: 800px) {\n  #vestuarioPortada p {\n    font-size: 5.4vw;\n    letter-spacing: 0.6vw;\n    line-height: 6vw;\n  }\n}\n.clasificacion {\n  height: auto;\n}\n.clasificacion hgroup {\n  width: 90vw;\n}\n.videoPasos {\n  flex-wrap: wrap;\n  height: auto;\n}\n.videoPasos h2 {\n  width: 100vw;\n  text-align: center;\n}\n.videoPasos iframe {\n  width: 48vw;\n  height: 27vw;\n  margin: 3vw 0;\n}\n@media (max-width: 760px) {\n  .videoPasos iframe {\n    width: 80vw;\n    height: 45vw;\n  }\n}\n.tiendaFoto {\n  position: fixed;\n  width: 100vw;\n  display: block;\n}\n.tiendaTarjeta .tarjetaInfo {\n  overflow: hidden;\n}\n.tiendaTarjeta .tarjetaInfo hgroup h2 {\n  font-size: 2vw;\n  margin: 0;\n  width: 100%;\n}\n.tiendaTarjeta .tarjetaInfo hgroup h3 {\n  font-size: 1.3vw;\n  margin: 0 0 2vw 0;\n}\n.tiendaTarjeta .tarjetaInfo hgroup h4 {\n  font-size: 1.3vw;\n  margin: 0;\n}\n.tiendaTarjeta .tarjetaInfo hgroup p {\n  margin: 1vw 0 0 3vw;\n}\n.producto {\n  padding-top: 10vw;\n  box-sizing: content-box;\n  height: auto;\n  min-height: 40vw;\n  flex-wrap: wrap;\n}\n.producto .productoInfo {\n  width: 40vw;\n}\n.producto .productoInfo h2 {\n  font-size: 1.5vw;\n}\n.producto .productoInfo h4 {\n  margin-top: 2vw;\n  font-size: 1.5vw;\n}\n.producto .productoInfo p {\n  margin: 0 0 1vw 6vw;\n  font-size: 1.3vw;\n}\n.producto .productoInfo .opciones {\n  width: 30vw;\n  margin-left: 5vw;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  padding: 0.5vw 1vw;\n  box-sizing: border-box;\n}\n.producto .productoInfo .opciones h4 {\n  font-size: 1.3vw;\n  margin: 0;\n}\n.producto .productoInfo .opciones p {\n  font-size: 1.3vw;\n  margin: 0 0 0 1vw;\n  font-weight: 300;\n}\n@media (max-width: 800px) {\n  .producto .productoInfo .opciones {\n    width: 90vw;\n  }\n  .producto .productoInfo .opciones h3 {\n    font-size: 3vw;\n  }\n  .producto .productoInfo .opciones h4 {\n    font-size: 3vw;\n  }\n}\n.producto .productoImagenes {\n  display: flex;\n  justify-content: center;\n  padding-top: 1vw;\n}\n.producto .productoImagenes img {\n  width: 30vw;\n}\n@media (max-width: 800px) {\n  .producto .productoImagenes img {\n    width: 98vw;\n    height: 98vw;\n  }\n}\n.conGaleria {\n  flex-wrap: wrap;\n}\n.sesionGal {\n  width: 100vw;\n  height: auto;\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n}\n.sesionGal picture img {\n  width: 30vw;\n}\n@media (max-width: 800px) {\n  .sesionGal picture img {\n    width: 47vw;\n  }\n}\n@media (max-width: 540px) {\n  .sesionGal picture img {\n    width: 100vw;\n  }\n}\n",""])},function(e,a,n){"use strict";e.exports=function(e){var a=[];return a.toString=function(){return this.map(function(a){var n=function(e,a){var n=e[1]||"",o=e[3];if(!o)return n;if(a&&"function"==typeof btoa){var t=(s=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[n].concat(i).concat([t]).join("\n")}var s;return[n].join("\n")}(a,e);return a[2]?"@media "+a[2]+"{"+n+"}":n}).join("")},a.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},t=0;t<this.length;t++){var i=this[t][0];null!=i&&(o[i]=!0)}for(t=0;t<e.length;t++){var s=e[t];null!=s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),a.push(s))}},a}},function(e,a,n){var o,t,i={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===t&&(t=o.apply(this,arguments)),t}),r=function(e){var a={};return function(e,n){if("function"==typeof e)return e();if(void 0===a[e]){var o=function(e,a){return a?a.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}a[e]=o}return a[e]}}(),l=null,c=0,d=[],u=n(17);function p(e,a){for(var n=0;n<e.length;n++){var o=e[n],t=i[o.id];if(t){t.refs++;for(var s=0;s<t.parts.length;s++)t.parts[s](o.parts[s]);for(;s<o.parts.length;s++)t.parts.push(v(o.parts[s],a))}else{var r=[];for(s=0;s<o.parts.length;s++)r.push(v(o.parts[s],a));i[o.id]={id:o.id,refs:1,parts:r}}}}function m(e,a){for(var n=[],o={},t=0;t<e.length;t++){var i=e[t],s=a.base?i[0]+a.base:i[0],r={css:i[1],media:i[2],sourceMap:i[3]};o[s]?o[s].parts.push(r):n.push(o[s]={id:s,parts:[r]})}return n}function h(e,a){var n=r(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=d[d.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(a,o.nextSibling):n.appendChild(a):n.insertBefore(a,n.firstChild),d.push(a);else if("bottom"===e.insertAt)n.appendChild(a);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var t=r(e.insertAt.before,n);n.insertBefore(a,t)}}function g(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var a=d.indexOf(e);a>=0&&d.splice(a,1)}function f(e){var a=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var o=function(){0;return n.nc}();o&&(e.attrs.nonce=o)}return b(a,e.attrs),h(e,a),a}function b(e,a){Object.keys(a).forEach(function(n){e.setAttribute(n,a[n])})}function v(e,a){var n,o,t,i;if(a.transform&&e.css){if(!(i="function"==typeof a.transform?a.transform(e.css):a.transform.default(e.css)))return function(){};e.css=i}if(a.singleton){var s=c++;n=l||(l=f(a)),o=x.bind(null,n,s,!1),t=x.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var a=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(a,e.attrs),h(e,a),a}(a),o=function(e,a,n){var o=n.css,t=n.sourceMap,i=void 0===a.convertToAbsoluteUrls&&t;(a.convertToAbsoluteUrls||i)&&(o=u(o));t&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */");var s=new Blob([o],{type:"text/css"}),r=e.href;e.href=URL.createObjectURL(s),r&&URL.revokeObjectURL(r)}.bind(null,n,a),t=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=f(a),o=function(e,a){var n=a.css,o=a.media;o&&e.setAttribute("media",o);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),t=function(){g(n)});return o(e),function(a){if(a){if(a.css===e.css&&a.media===e.media&&a.sourceMap===e.sourceMap)return;o(e=a)}else t()}}e.exports=function(e,a){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(a=a||{}).attrs="object"==typeof a.attrs?a.attrs:{},a.singleton||"boolean"==typeof a.singleton||(a.singleton=s()),a.insertInto||(a.insertInto="head"),a.insertAt||(a.insertAt="bottom");var n=m(e,a);return p(n,a),function(e){for(var o=[],t=0;t<n.length;t++){var s=n[t];(r=i[s.id]).refs--,o.push(r)}e&&p(m(e,a),a);for(t=0;t<o.length;t++){var r;if(0===(r=o[t]).refs){for(var l=0;l<r.parts.length;l++)r.parts[l]();delete i[r.id]}}}};var y,w=(y=[],function(e,a){return y[e]=a,y.filter(Boolean).join("\n")});function x(e,a,n,o){var t=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=w(a,t);else{var i=document.createTextNode(t),s=e.childNodes;s[a]&&e.removeChild(s[a]),s.length?e.insertBefore(i,s[a]):e.appendChild(i)}}},function(e,a){e.exports=function(e){var a="undefined"!=typeof window&&window.location;if(!a)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=a.protocol+"//"+a.host,o=n+a.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,a){var t,i=a.trim().replace(/^"(.*)"$/,function(e,a){return a}).replace(/^'(.*)'$/,function(e,a){return a});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(t=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(t)+")")})}},function(e,a){var n,o,t=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function r(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(a){try{return n.call(null,e,0)}catch(a){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{o="function"==typeof clearTimeout?clearTimeout:s}catch(e){o=s}}();var l,c=[],d=!1,u=-1;function p(){d&&l&&(d=!1,l.length?c=l.concat(c):u=-1,c.length&&m())}function m(){if(!d){var e=r(p);d=!0;for(var a=c.length;a;){for(l=c,c=[];++u<a;)l&&l[u].run();u=-1,a=c.length}l=null,d=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===s||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(a){try{return o.call(null,e)}catch(a){return o.call(this,e)}}}(e)}}function h(e,a){this.fun=e,this.array=a}function g(){}t.nextTick=function(e){var a=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)a[n-1]=arguments[n];c.push(new h(e,a)),1!==c.length||d||r(m)},h.prototype.run=function(){this.fun.apply(null,this.array)},t.title="browser",t.browser=!0,t.env={},t.argv=[],t.version="",t.versions={},t.on=g,t.addListener=g,t.once=g,t.off=g,t.removeListener=g,t.removeAllListeners=g,t.emit=g,t.prependListener=g,t.prependOnceListener=g,t.listeners=function(e){return[]},t.binding=function(e){throw new Error("process.binding is not supported")},t.cwd=function(){return"/"},t.chdir=function(e){throw new Error("process.chdir is not supported")},t.umask=function(){return 0}},function(e,a,n){var o=n(10),t=n(21),i=n(23),s="http://www.w3.org/2000/svg",r="http://www.w3.org/1999/xlink",l={autofocus:1,checked:1,defaultchecked:1,disabled:1,formnovalidate:1,indeterminate:1,readonly:1,required:1,selected:1,willvalidate:1},c="!--",d=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"];function u(e,a,n){var t;-1!==d.indexOf(e)&&(a.namespace=s);var p=!1;if(a.namespace&&(p=a.namespace,delete a.namespace),p)t=o.createElementNS(p,e);else{if(e===c)return o.createComment(a.comment);t=o.createElement(e)}if(a.onload||a.onunload){var m=a.onload||function(){},h=a.onunload||function(){};i(t,function(){m(t)},function(){h(t)},u.caller.caller.caller),delete a.onload,delete a.onunload}for(var g in a)if(a.hasOwnProperty(g)){var f=g.toLowerCase(),b=a[g];if("classname"===f&&(f="class",g="class"),"htmlFor"===g&&(g="for"),l[f])if("true"===b)b=f;else if("false"===b)continue;"on"===f.slice(0,2)?t[g]=b:p?"xlink:href"===g?t.setAttributeNS(r,g,b):/^xmlns($|:)/i.test(g)||t.setAttributeNS(null,g,b):t.setAttribute(g,b)}return function e(a){if(Array.isArray(a))for(var n=0;n<a.length;n++){var i=a[n];if(Array.isArray(i))e(i);else{if(("number"==typeof i||"boolean"==typeof i||"function"==typeof i||i instanceof Date||i instanceof RegExp)&&(i=i.toString()),"string"==typeof i){if(t.lastChild&&"#text"===t.lastChild.nodeName){t.lastChild.nodeValue+=i;continue}i=o.createTextNode(i)}i&&i.nodeType&&t.appendChild(i)}}}(n),t}e.exports=t(u,{comments:!0}),e.exports.default=e.exports,e.exports.createElement=u},function(e,a){},function(e,a,n){var o=n(22),t=1,i=2,s=3,r=4,l=5,c=6,d=7,u=8,p=9,m=10,h=11,g=12,f=13;function b(e){return e===p||e===m}e.exports=function(e,a){a||(a={});var n=a.concat||function(e,a){return String(e)+String(a)};return!1!==a.attrToProp&&(e=o(e)),function(o){for(var w=t,x="",j=arguments.length,z=[],C=0;C<o.length;C++)if(C<j-1){var q=arguments[C+1],E=N(o[C]),P=w;P===m&&(P=u),P===p&&(P=u),P===d&&(P=u),P===r&&(P=l),P===i?"/"===x?(E.push([i,"/",q]),x=""):E.push([i,q]):P===f&&a.comments?x+=String(q):P!==f&&E.push([0,P,q]),z.push.apply(z,E)}else z.push.apply(z,N(o[C]));var T,L=[null,{},[]],I=[[L,-1]];for(C=0;C<z.length;C++){var k=I[I.length-1][0],A=(E=z[C])[0];if(A===i&&/^\//.test(E[1])){var S=I[I.length-1][1];I.length>1&&(I.pop(),I[I.length-1][0][2][S]=e(k[0],k[1],k[2].length?k[2]:void 0))}else if(A===i){var F=[E[1],{},[]];k[2].push(F),I.push([F,k[2].length-1])}else if(A===l||0===A&&E[1]===l){for(var O,B="";C<z.length;C++)if(z[C][0]===l)B=n(B,z[C][1]);else{if(0!==z[C][0]||z[C][1]!==l)break;if("object"!=typeof z[C][2]||B)B=n(B,z[C][2]);else for(O in z[C][2])z[C][2].hasOwnProperty(O)&&!k[1][O]&&(k[1][O]=z[C][2][O])}z[C][0]===h&&C++;for(var D=C;C<z.length;C++)if(z[C][0]===u||z[C][0]===l)k[1][B]?""===z[C][1]||(k[1][B]=n(k[1][B],z[C][1])):k[1][B]=y(z[C][1]);else{if(0!==z[C][0]||z[C][1]!==u&&z[C][1]!==l){!B.length||k[1][B]||C!==D||z[C][0]!==s&&z[C][0]!==g||(k[1][B]=B.toLowerCase()),z[C][0]===s&&C--;break}k[1][B]?""===z[C][2]||(k[1][B]=n(k[1][B],z[C][2])):k[1][B]=y(z[C][2])}}else if(A===l)k[1][E[1]]=!0;else if(0===A&&E[1]===l)k[1][E[2]]=!0;else if(A===s){if(T=k[0],v.test(T)&&I.length){S=I[I.length-1][1];I.pop(),I[I.length-1][0][2][S]=e(k[0],k[1],k[2].length?k[2]:void 0)}}else if(0===A&&E[1]===t)void 0===E[2]||null===E[2]?E[2]="":E[2]||(E[2]=n("",E[2])),Array.isArray(E[2][0])?k[2].push.apply(k[2],E[2]):k[2].push(E[2]);else if(A===t)k[2].push(E[1]);else if(A!==h&&A!==g)throw new Error("unhandled: "+A)}if(L[2].length>1&&/^\s*$/.test(L[2][0])&&L[2].shift(),(1===L[2].length||2===L[2].length&&/^\s*$/.test(L[2][1]))&&Array.isArray(L[2][0])&&(L[2]=L[2][0]),L[2].length>2||2===L[2].length&&/\S/.test(L[2][1])){if(a.createFragment)return a.createFragment(L[2]);throw new Error("multiple root elements must be wrapped in an enclosing tag")}return Array.isArray(L[2][0])&&"string"==typeof L[2][0][0]&&Array.isArray(L[2][0][2])&&(L[2][0]=e(L[2][0][0],L[2][0][1],L[2][0][2])),L[2][0];function N(e){var n=[];w===d&&(w=r);for(var o=0;o<e.length;o++){var v=e.charAt(o);w===t&&"<"===v?(x.length&&n.push([t,x]),x="",w=i):">"!==v||b(w)||w===f?w===f&&/-$/.test(x)&&"-"===v?(a.comments&&n.push([u,x.substr(0,x.length-1)]),x="",w=t):w===i&&/^!--$/.test(x)?(a.comments&&n.push([i,x],[l,"comment"],[h]),x=v,w=f):w===t||w===f?x+=v:w===i&&"/"===v&&x.length||(w===i&&/\s/.test(v)?(x.length&&n.push([i,x]),x="",w=r):w===i?x+=v:w===r&&/[^\s"'=\/]/.test(v)?(w=l,x=v):w===r&&/\s/.test(v)?(x.length&&n.push([l,x]),n.push([g])):w===l&&/\s/.test(v)?(n.push([l,x]),x="",w=c):w===l&&"="===v?(n.push([l,x],[h]),x="",w=d):w===l?x+=v:w!==c&&w!==r||"="!==v?w!==c&&w!==r||/\s/.test(v)?w===d&&'"'===v?w=m:w===d&&"'"===v?w=p:w===m&&'"'===v?(n.push([u,x],[g]),x="",w=r):w===p&&"'"===v?(n.push([u,x],[g]),x="",w=r):w!==d||/\s/.test(v)?w===u&&/\s/.test(v)?(n.push([u,x],[g]),x="",w=r):w!==u&&w!==p&&w!==m||(x+=v):(w=u,o--):(n.push([g]),/[\w-]/.test(v)?(x+=v,w=l):w=r):(n.push([h]),w=d)):(w===i&&x.length?n.push([i,x]):w===l?n.push([l,x]):w===u&&x.length&&n.push([u,x]),n.push([s]),x="",w=t)}return w===t&&x.length?(n.push([t,x]),x=""):w===u&&x.length?(n.push([u,x]),x=""):w===m&&x.length?(n.push([u,x]),x=""):w===p&&x.length?(n.push([u,x]),x=""):w===l&&(n.push([l,x]),x=""),n}};function y(e){return"function"==typeof e?e:"string"==typeof e?e:e&&"object"==typeof e?e:null==e?e:n("",e)}};var v=RegExp("^("+["area","base","basefont","bgsound","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr","!--","animate","animateTransform","circle","cursor","desc","ellipse","feBlend","feColorMatrix","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","font-face-format","font-face-name","font-face-uri","glyph","glyphRef","hkern","image","line","missing-glyph","mpath","path","polygon","polyline","rect","set","stop","tref","use","view","vkern"].join("|")+")(?:[.#][a-zA-Z0-9-￿_:-]+)*$")},function(e,a){e.exports=function(e){return function(a,o,t){for(var i in o)i in n&&(o[n[i]]=o[i],delete o[i]);return e(a,o,t)}};var n={class:"className",for:"htmlFor","http-equiv":"httpEquiv"}},function(e,a,n){var o=n(10),t=n(24),i=n(25),s=Object.create(null),r="onloadid"+(new Date%9e6).toString(36),l="data-"+r,c=0;if(t&&t.MutationObserver){var d=new MutationObserver(function(e){if(!(Object.keys(s).length<1))for(var a=0;a<e.length;a++)e[a].attributeName!==l?(g(e[a].removedNodes,m),g(e[a].addedNodes,p)):h(e[a],p,m)});o.body?u(d):o.addEventListener("DOMContentLoaded",function(e){u(d)})}function u(e){e.observe(o.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,attributeFilter:[l]})}function p(e,a){s[e][0]&&0===s[e][2]&&(s[e][0](a),s[e][2]=1)}function m(e,a){s[e][1]&&1===s[e][2]&&(s[e][1](a),s[e][2]=0)}function h(e,a,n){var o=e.target.getAttribute(l);!function(e,a){return!(!e||!a)&&s[e][3]===s[a][3]}(e.oldValue,o)?(s[e.oldValue]&&n(e.oldValue,e.target),s[o]&&a(o,e.target)):s[o]=s[e.oldValue]}function g(e,a){for(var n=Object.keys(s),o=0;o<e.length;o++){if(e[o]&&e[o].getAttribute&&e[o].getAttribute(l)){var t=e[o].getAttribute(l);n.forEach(function(n){t===n&&a(n,e[o])})}e[o].childNodes.length>0&&g(e[o].childNodes,a)}}e.exports=function e(a,n,t,r){return i(o.body,"on-load: will not work prior to DOMContentLoaded"),n=n||function(){},t=t||function(){},a.setAttribute(l,"o"+c),s["o"+c]=[n,t,0,r||e.caller],c+=1,a},e.exports.KEY_ATTR=l,e.exports.KEY_ID=r},function(e,a,n){(function(a){var n;n="undefined"!=typeof window?window:void 0!==a?a:"undefined"!=typeof self?self:{},e.exports=n}).call(this,n(11))},function(e,a){function n(e,a){if(!e)throw new Error(a||"AssertionError")}n.notEqual=function(e,a,o){n(e!=a,o)},n.notOk=function(e,a){n(!e,a)},n.equal=function(e,a,o){n(e==a,o)},n.ok=n,e.exports=n},function(e,a,n){"use strict";var o,t="http://www.w3.org/1999/xhtml",i="undefined"==typeof document?void 0:document,s=i?i.body||i.createElement("div"):{},r=s.hasAttributeNS?function(e,a,n){return e.hasAttributeNS(a,n)}:s.hasAttribute?function(e,a,n){return e.hasAttribute(n)}:function(e,a,n){return null!=e.getAttributeNode(a,n)};function l(e,a){var n=e.nodeName,o=a.nodeName;return n===o||!!(a.actualize&&n.charCodeAt(0)<91&&o.charCodeAt(0)>90)&&n===o.toUpperCase()}function c(e,a,n){e[n]!==a[n]&&(e[n]=a[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n,""))}var d={OPTION:function(e,a){c(e,a,"selected")},INPUT:function(e,a){c(e,a,"checked"),c(e,a,"disabled"),e.value!==a.value&&(e.value=a.value),r(a,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,a){var n=a.value;e.value!==n&&(e.value=n);var o=e.firstChild;if(o){var t=o.nodeValue;if(t==n||!n&&t==e.placeholder)return;o.nodeValue=n}},SELECT:function(e,a){if(!r(a,null,"multiple")){for(var n=0,o=a.firstChild;o;){var t=o.nodeName;if(t&&"OPTION"===t.toUpperCase()){if(r(o,null,"selected")){n;break}n++}o=o.nextSibling}e.selectedIndex=n}}},u=1,p=3,m=8;function h(){}function g(e){return e.id}var f=function(e){return function(a,n,s){if(s||(s={}),"string"==typeof n)if("#document"===a.nodeName||"HTML"===a.nodeName){var r=n;(n=i.createElement("html")).innerHTML=r}else c=n,!o&&i.createRange&&(o=i.createRange()).selectNode(i.body),o&&o.createContextualFragment?f=o.createContextualFragment(c):(f=i.createElement("body")).innerHTML=c,n=f.childNodes[0];var c,f,b,v=s.getNodeKey||g,y=s.onBeforeNodeAdded||h,w=s.onNodeAdded||h,x=s.onBeforeElUpdated||h,j=s.onElUpdated||h,z=s.onBeforeNodeDiscarded||h,C=s.onNodeDiscarded||h,q=s.onBeforeElChildrenUpdated||h,E=!0===s.childrenOnly,P={};function T(e){b?b.push(e):b=[e]}function L(e,a,n){!1!==z(e)&&(a&&a.removeChild(e),C(e),function e(a,n){if(a.nodeType===u)for(var o=a.firstChild;o;){var t=void 0;n&&(t=v(o))?T(t):(C(o),o.firstChild&&e(o,n)),o=o.nextSibling}}(e,n))}function I(e){w(e);for(var a=e.firstChild;a;){var n=a.nextSibling,o=v(a);if(o){var t=P[o];t&&l(a,t)&&(a.parentNode.replaceChild(t,a),k(t,a))}I(a),a=n}}function k(o,t,s){var r,c=v(t);if(c&&delete P[c],!n.isSameNode||!n.isSameNode(a)){if(!s){if(!1===x(o,t))return;if(e(o,t),j(o),!1===q(o,t))return}if("TEXTAREA"!==o.nodeName){var h,g,f,b,w=t.firstChild,z=o.firstChild;e:for(;w;){for(f=w.nextSibling,h=v(w);z;){if(g=z.nextSibling,w.isSameNode&&w.isSameNode(z)){w=f,z=g;continue e}r=v(z);var C=z.nodeType,E=void 0;if(C===w.nodeType&&(C===u?(h?h!==r&&((b=P[h])?z.nextSibling===b?E=!1:(o.insertBefore(b,z),g=z.nextSibling,r?T(r):L(z,o,!0),z=b):E=!1):r&&(E=!1),(E=!1!==E&&l(z,w))&&k(z,w)):C!==p&&C!=m||(E=!0,z.nodeValue!==w.nodeValue&&(z.nodeValue=w.nodeValue))),E){w=f,z=g;continue e}r?T(r):L(z,o,!0),z=g}if(h&&(b=P[h])&&l(b,w))o.appendChild(b),k(b,w);else{var A=y(w);!1!==A&&(A&&(w=A),w.actualize&&(w=w.actualize(o.ownerDocument||i)),o.appendChild(w),I(w))}w=f,z=g}for(;z;)g=z.nextSibling,(r=v(z))?T(r):L(z,o,!0),z=g}var S=d[o.nodeName];S&&S(o,t)}}!function e(a){if(a.nodeType===u)for(var n=a.firstChild;n;){var o=v(n);o&&(P[o]=n),e(n),n=n.nextSibling}}(a);var A,S,F=a,O=F.nodeType,B=n.nodeType;if(!E)if(O===u)B===u?l(a,n)||(C(a),F=function(e,a){for(var n=e.firstChild;n;){var o=n.nextSibling;a.appendChild(n),n=o}return a}(a,(A=n.nodeName,(S=n.namespaceURI)&&S!==t?i.createElementNS(S,A):i.createElement(A)))):F=n;else if(O===p||O===m){if(B===O)return F.nodeValue!==n.nodeValue&&(F.nodeValue=n.nodeValue),F;F=n}if(F===n)C(a);else if(k(F,n,E),b)for(var D=0,N=b.length;D<N;D++){var _=P[b[D]];_&&L(_,_.parentNode,!1)}return!E&&F!==a&&a.parentNode&&(F.actualize&&(F=F.actualize(a.ownerDocument||i)),a.parentNode.replaceChild(F,a)),F}}(function(e,a){var n,o,t,i,s,l=a.attributes;for(n=l.length-1;n>=0;--n)t=(o=l[n]).name,i=o.namespaceURI,s=o.value,i?(t=o.localName||t,e.getAttributeNS(i,t)!==s&&e.setAttributeNS(i,t,s)):e.getAttribute(t)!==s&&e.setAttribute(t,s);for(n=(l=e.attributes).length-1;n>=0;--n)!1!==(o=l[n]).specified&&(t=o.name,(i=o.namespaceURI)?(t=o.localName||t,r(a,i,t)||e.removeAttributeNS(i,t)):r(a,null,t)||e.removeAttribute(t))});e.exports=f},function(e,a){e.exports=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"]},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(0),l=n.n(r),c=l.a`
  <section class="portada">
    <picture class="banner">
      <source media="(min-width: 801px)" srcset="images/trajesTipicosPanamaBannerFull-2x.jpg 2x, images/trajesTipicosPanamaBannerFull-1x.jpg 1x">
      <source media="(min-width: 541px)" srcset="images/trajesTipicosPanamaBannerTab-2x.jpg 2x, images/trajesTipicosPanamaBannerTab-1x.jpg 1x">
      <source media="(min-width: 10px)" srcset="images/trajesTipicosPanamaBannerCel-2x.jpg 2x, images/trajesTipicosPanamaBannerCel-1x.jpg 1x">
      <img alt="trajes tipicos de panama, pollera de lujo, pollera congo y montuna ocueña" class="completa" src="images/trajesTipicosPanamaBannerCel-1x.jpg">
    </picture>
    <articulo class="negroTrans completa texto">
        <hgroup class="portadaTitulo">
          <h1 class="logoLetras">
            <span>Investigación y Difusión del Folklore de Panamá - Folk in Love</span>
          </h1>
          <h3>La Nueva Manera de Ver el Folklore</h3>
        </hgroup>
    </articulo> 
  </section>
`,d=l.a`
  <section class="inicioAbout completa">
    <article class="aboutTexto mitad blanco">
      <hgroup>
        <h2>¿Qué es Folk in love?</h2>
        <h3>Conoce Más de las costumbres y tradiciones de Panamá</h3>
        <p>
          En <b>Folk in love</b> nos dedicamos a la investigación, difusión, promoción y conservación del <b>folklore Panameño</b>, queremos ofrecer un espacio en donde se pueda encontrar información de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes de la <b>Cultura de Panamá</b>.
        </p>
        <p>
          Buscamos realizar <b>aportes culturales</b> mediante artículos escritos, <a href="/tienda">productos</a>, <a href="/tienda/fotografia">fotografías</a> y videos sobre los <a href="/vestuarios">vestidos</a> y <a href="/danzas">bailes típicos</a>, <b>origen</b> de las manifestaciones folkóricas, <b>elementos</b> de las diferentes tradiciones, entre otros.
        </p>
      </hgroup>
    </article>
    <img src="images/moneda-coronada-full.jpg" alt="Joya de la Pollera, Moneda Coronada" class="aboutImagen mitad foto">
  </section>
`,u=l.a`
  <div class="inicioIdentidad">
    <article class="identidadImagenes">
      <a href="/vestuarios/Gala-Ocuena" class="identidadImagen  tercio">
        <picture >
          <source media="(min-width: 800px)" srcset="images/pollera-gala-ocu-identidad-full.jpg">
          <img src="images/pollera-gala-ocu-identidad-cel.jpg" alt="Pollera de Gala Ocueña, traje tipico de la región de azuero, Panama" class=" tercio identidadFotos">
        </picture>
        
        <div class="identidadInfo negroTrans">
          <hgroup>
            <h5>Pollera de Gala Ocueña</h5>
            <h6>Azuero</h6>
          </hgroup>
        </div>
      </a>
      <a href="/vestuarios/Pollera-Congo" class="identidadImagen tercio">
        <picture>
          <source media="(min-width: 800px)" srcset="images/pollera-congo-identidad-full.jpg">
          <img src="images/pollera-congo-identidad-cel.jpg" alt="Pollera Congo, traje tipico de la región de Colón, Panama" class=" tercio identidadFotos">
        </picture>
        <div class="identidadInfo negroTrans">
          <hgroup>
            <h5>Pollera Congo</h5>
            <h6>Colón</h6>
          </hgroup>
        </div>
      </a>
      <a href="/vestuarios/Pollera-De-Lujo" class="identidadImagen identidad1 tercio">
        <picture>
          <source media="(min-width: 800px)" srcset="images/pollera-lujo-losantos-identidad-full.jpg">
          <img src="images/pollera-lujo-losantos-identidad-cel.jpg" alt="Pollera de lujo santeña, traje tipico de la región de azuero, Panama" class=" tercio identidadFotos">
        </picture>
        <div class="identidadInfo negroTrans">
          <hgroup>
            <h5>Pollera De Lujo</h5>
            <h6>Azuero</h6>
          </hgroup>
        </div>
      </a>
      
    </article>
    <article class="identidadTexto completa blanco">
      <hgroup>
        <h2>Elementos de Nuestro Folklore</h2>
        <h3>Investigando Sobre las Costumbres de Cada Región</h3>
        <p>
          Son Muchos los <b>elementos</b>  que forman parte de la <b>cultura y el folklore</b>  de un país. Desde pequeños y abstactos como pueden ser cuentos infantiles y rimas; Objetos como <a href="/vestuarios">vestidos tradicionales</a> e instrumentos musicales; O más trascendentales como rituales religiosos o festivos así como la manera de celebrar los momentos de la vida, como bautizos, matrimonios y funerales. 
        </p>
        <p>
          Lo importante de cada uno de estos <b>componentes</b> es que nos definen como seres humanos, como comunidad y como país, nos dán la <b>identidad</b> ante nosotros mismos y los demás.   
        </p>
        <p>  
          Dos <b>elementos</b> importantísimos que definen al <b>panameño</b>  y que pueden diferenciar <b>las costumbres</b> de cada una de las regiones del país, para darle a cada lugar su propia identidad, Son los <a href="/vestuarios">trajes típicos</a> y los <a href="danzas">bailes o danzas folklóricas</a>. 
        </p>
        <p>
          <b>Danzas</b> como <a href="/danzas/El-Punto-Santeno">el punto</a> que nos hablan de la elegancia y ceremonia que nos trajeron los españoles, el Gran Diablo es un reflejo de la llegada del cristianismo, <a href="/vestuarios/Pollera-Congo">las polleras congo</a> nos hablan de la <b>cultura</b> de los Africanos que vinieron en época de colonia y se establecieron en la costa atlántica.
        </p>
        <p>
          Y así se cuenta <b>nuestra historia</b> através de la caja y el repicador, de la pollera montuna y de una máscara de diablico sucio. Caminamos en la vida con una cutarra y nos tapamos del sol con un sombrero pintao. 
        </p>
        <p>
          Creemos en la importancia de conocer de donde venimos para poder desarrollar un sentido de <b>identidad</b>, para poder tomar decisiones hacia el futuro, para cuidar el <b>legado</b> que nos dejaron las generaciones pasadas, para entender quienes somos y de donde venimos y poder así saber hacia donde vamos.  
        </p>
      </hgroup>
    </article>
  </div>
`,p=l.a`
  <section class="inicioApoyo completa">
    <article class="apoyoTexto mitad rosaTrans">
      <hgroup>
        <h2>Origen de la Identidad del Panameño</h2>
        <h3>Historia de las Tradiciones de Panamá</h3>
        <p>
          Gracias a su posición estratégica dentro de las américas nuestro país ha desarrollado una riqueza
    
    cultural y folklórica inigualable. La combinacion entre las etnias indígenas existentes antes de la
    
    conquista, la intromisión europea y la llegada de los negros como esclavos ha permitido el
    
    enriquecimiento de la cultura de manera inigualable.
        </p>
        <p>
          De acuerdo con las investigaciones se pudo apreciar como la vestimenta femenina y masculina fue
    
          aceptada y utilizada por los panameños a inicios del siglo XX, las polleras, chambras y otros vestidos fueron de uso común en toda la república. Actualmente podemos ver como las etnias
    
          indígenas y los grupos congos mantienen sus tradiciones permitiendo la evolución al tener remplazo
    
          generacional y danzas vivas.        </p>
      </hgroup>
    </article>
  </section>
  `,m=l.a`
  <main class="home">
    ${c}
    ${d}
    ${u}
    ${p}
  </main>
`,h=n(4),g=n(5),f=n(1);t()("/",h.a,g.a,function(e,a){var n=document.getElementById("main-container");s()(n).appendChild(m),document.getElementById("headerContainer").classList.remove("blanco"),window.addEventListener("scroll",f.c),a()})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c),u=function(e,a){return d.a`
 <div>
  ${e.map(function(e){if(e.url==a)return function(e){return d.a`
  <main itemscope itemtype="http://schema.org/Article">
   <section class="portada">
    <picture class="banner">
      <source media="(min-width: 800px)" srcset="${e.portadaImagenFull}">
      <source media="(min-width: 541px)" srcset="${e.portadaImagenTab}">
      <source media="(min-width: 200px)" srcset="${e.portadaImagenCel}">
      <img class="completa" src="${e.portadaImagen}" alt="Imagen de portada ${e.nombre}">
    </picture>
    <article class="mitad rosaTrans">
      <hgroup>
          <h1 itemprop="name">${e.nombre}</h1>
          <p itemprop="description">${e.reseña}</p>
      </hgroup>
    </article>
   </section>
   <section itemprop="articleBody" className="completa texto info blanco">
    ${e.antecedentes}
   </section>
   <section class="completa portada" style="background: url('${e.generalImagen}'); background-size:cover; background-attachment: fixed">
    <article itemprop="articleBody" class="mitad negroTrans texto">
     <hgroup>
       <p>${e.general}</p>
     </hgroup>
    </article>
   </section>
   <section itemprop="articleBody" class="completa texto info blanco">
     ${e.descripcion}
   </section>
   ${e.extra}
   ${e.extra2}
  </main>
 `}(e)})}
 </div>
 `},p=n(8),m=n.n(p),h=n(1);t()("/vestuarios/:url",r.a,l.a,function(e){var a=document.getElementById("main-container");s()(a).appendChild(u(m.a,e.params.url)),window.addEventListener("scroll",h.c)})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c),u=function(e){var a;return d.a`
 <main>
  <section class="portada">
    ${a=e.portadaImagen,d.a`
  <picture class="banner">
   <source media="(min-width: 801px)" srcset="images/${a}Full-1x.jpg 1x, images/${a}Full-2x.jpg 2x">
   <source media="(min-width: 541px)" srcset="images/${a}Tab-1x.jpg 1x, images/${a}Tab-2x.jpg 2x">
   <source media="(min-width: 10px)" srcset="images/${a}Cel-1x.jpg 1x, images/${a}Cel-2x.jpg 2x">
   <img class="completa" src="images/${a}Cel.jpg" alt="Bailes Típicos de Panamá, Baile Congo">
  </picture>
 `}   
    <article class="mitad rosaTrans">
    <hgroup>
      <h1>${e.nombre}</h1>
      <p>${e.reseña}</p>
    </hgroup>
    </article>
  </section>
  <section>
    <article class="tercio imagen" style="background: url('${e.introImagen}'); background-size: cover;"></article>
    <article class="dosTercios blanco texto">
    ${e.intro}
    </article>
  </section>
  <section>
    <article class="completa texto info blanco">
    ${e.descripcion}
    </article>
  </section>
  <section>
    <article class="tercio blanco pasos">
    <hgroup>
      <h2>Pasos de ${e.nombre}</h2>
      <ul>
      ${e.pasos.map(function(e){return d.a`<li>${e}</li>`})}
      </ul>
    </hgroup>
    </article>
    <article class="dosTercios imagenDoble" style="background: url('${e.pasosImagen}'); background-size:cover"></article>
  </section>
  <article class="completa texto info rosa">
      ${e.referencias}
  </article>
</main>
 `},p=n(7),m=n.n(p),h=n(1);t()("/danzas/:url",r.a,l.a,function(e,a){var n=m.a.find(a=>a.url===e.params.url),o=document.getElementById("main-container");s()(o).appendChild(u(n)),window.addEventListener("scroll",h.c),a()})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(1),c=n(5),d=n(0),u=n.n(d),p=n(9),m=n.n(p),h=u.a`
<main>
 <section class="portada">
  <picture class="banner">
   <source media="(min-width: 801px)" srcset="images/tiendaBannerFull-1x.jpg 1x, images/tiendaBannerFull-2x.jpg 2x">
   <source media="(min-width: 541px)" srcset="images/tiendaBannerTab-1x.jpg 1x, images/tiendaBannerTab-2x.jpg 2x">
   <source media="(min-width: 10px)" srcset="images/tiendaBannerCel-1x.jpg 1x, images/tiendaBannerCel-2x.jpg 2x"> 
   <img class="completa" alt="Foto de Pollera De Lujo Santeña, traje tipico de panamá, en Panamá Viejo"  src="images/tiendaBannerCell-1x.jpg"  >
  </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Productos y Servicios Folklóricos</h1>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
   ${m.a.map(function(e){return function(e){return u.a`
  <a class="tarjeta tiendaTarjeta" href="${e.enlace}">
    <picture>
      <source media="(min-width: 800px)" srcset="${e.miniaturaFull}">
      <img src="${e.miniaturaCel}" alt=${e.alt} class="tarjetaImagen">
    </picture>
    <div class="tarjetaInfo">
     <hgroup>
      <h2>${e.nombre}</h2>
      <h3>${e.subtitulo}</h3>
      <h4>Descripción: </h4>
      <p>${e.descripcion.substring(0,90)}</p>
     </hgroup>
    </div>
  </a>
 `}(e)})}
  </div>
  
 </section>
</main>
`;t()("/tienda",r.a,c.a,function(){var e=document.getElementById("main-container");s()(e).appendChild(h),headerContainer.classList.remove("blanco"),window.addEventListener("scroll",l.c)})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c).a`

 <articulo className="completa blanco texto">
  <hgroup>
   <h2>Su Mensaje Ha Sido Enviado</h2>
  </hgroup>
 </articulo>
`,u=n(1);t()("/confirmacion",r.a,l.a,u.b,function(e,a){var n=document.getElementById("main-container");s()(n).appendChild(d)})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c),u=n(6),p=n(8),m=n.n(p),h=d.a`
<main>
 <section class="portada" id="vestuarioPortada">
  <picture class="banner">
    <source media="(min-width: 801px)" srcset="images/vestuariosBannerFull-1x.jpg 1x, images/vestuariosBannerFull-2x.jpg 2x">
    <source media="(min-width: 541px)" srcset="images/vestuariosBannerTab-1x.jpg 1x, images/vestuariosBannerTab-2x.jpg 2x">
    <source media="(min-width: 10px)" srcset="images/vestuariosBannerCel-1x.jpg 1x, images/vestuariosBannerCel-2x.jpg 2x">
    <img class="completa" src="images/vestuariosBannerCell-1x.jpg" alt="Trajes Típicos de Panamá, Pollera de Lujo Santeña en Panamá Viejo">
   </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Vestuarios Panameños</h1>
    <p>Los vestidos típicos de nuestro país son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer panameña.</p>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
  ${m.a.map(function(e){return Object(u.a)("vestuarios",e)})}
  </div> 
 </section>
</main>
`,g=n(1);t()("/vestuarios",r.a,l.a,function(e,a){var n=document.getElementById("main-container");s()(n).appendChild(h),window.addEventListener("scroll",g.c)})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c),u=n(1),p=n(9),m=n.n(p);t()("/tienda/:nombre",r.a,l.a,u.b,function(e,a){var n=m.a.find(a=>a.enlace===e.params.nombre),o=document.getElementById("main-container");s()(o).appendChild(function(e){return d.a`
 <section class="completa producto">
  <articulo class="tercio productoImagenes">
   <picture>
    <source media="(min-width: 800px)" srcset="${e.imagenFull}">
    <img src="${e.imagenCel}" alt="${e.alt}">
   </picture>
  </articulo>
  <articulo class="dosTercios">
     <div class="productoInfo">
      <h1>${e.nombre}</h1>
      <h3>${e.subtitulo}</h3>
      <h2>Opciones:</h2>
      ${e.opciones.map(function(e){return d.a`
      <div class="opciones">
       <h4>${e.detalle}</h3>
       <h4>${e.precio.toLocaleString("en-US",{style:"currency",currency:"USD"})}</h4>
       <p>${e.descripcion}</p>
      </div>`})}
    </div>
  </articulo>
  ${e.articulo}
 </section>
`}(n))})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c).a`
 <articulo className="completa texto rosa">
  <hgroup>
    <h2>Ha habido Un Error</h2>
  </hgroup> 
 </articulo>
`,u=n(1);t()("/error",r.a,l.a,u.b,function(e,a){var n=document.getElementById("main-container");s()(n).appendChild(d)})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c),u=n(6),p=n(7),m=n.n(p),h=d.a`
<main>
 <section class="portada" id="danzasPortada">
  <picture class="banner">
   <source media="(min-width: 801px)" srcset="images/danzasBannerFull-1x.jpg 1x, images/danzasBannerFull-2x.jpg 2x">
   <source media="(min-width: 541px)" srcset="images/danzasBannerTab-1x.jpg 1x, images/danzasBannerTab-2x.jpg 2x">
   <source media="(min-width: 10px)" srcset="images/danzasBannerCel-1x.jpg 1x, images/danzasBannerCel-2x.jpg 2x">
   <img class="completa" src="images/danzasBannerCel.jpg" alt="Bailes Típicos de Panamá, Baile Congo">
  </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Bailes Típicos de Panamá</h1>
    <p><b>Las danzas folklóricas</b> panameñas expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colación <b>costumbres</b>, rituales religiosos y celebraciones.</p>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
   ${m.a.map(function(e){return Object(u.a)("danzas",e)})}
  </div> 
 </section>
 <section class="completa blanco videoPasos">
  <h2>Pasos Básicos de los Danzas Típicas Panameñas</h2>
  <iframe src="https://www.youtube.com/embed/x7HdglWtujg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  <hgroup class="blogStyle">
    <p>A diferencia de otros países de latinoamérica, donde los bailes no tiene una estructura marcada y los pasos cambian a voluntad del bailarín, en Panamá si tenemos una serie de <b>pasos estructurados</b>  que son guiados por los <b>cambios de la música</b>.</p>
    <h3>El Paseo</h3>
    <p>El Paseo es el <b>paso básico por excelencia</b> , ya que con él se inician la mayoría de los bailes, como es el caso de la Cumbia Santeña.</p>
    <h3>Caida y Vuelta</h3>
    <p>Son dos <b>movimientos</b> que normalmente van juntos y marcan el cambio de un paso al otro. En algunos <b>bailes</b> las caídas son marcas y enérgicas mientras que en otros son sutiles y delicadas.</p>
    <h3>La Seguidilla</h3>
    <p>Es un paso que se realiza frente a <b>la pareja</b>. El pié que guía va en punta y el que le sigue va arrastrando pasando por en frente, cuando cambias de dirección el pié que guía cambia igualmente.</p>
    <h3>El Zapateo</h3>
    <p>Este es uno de los pasos más vistosos en las <b>danzas folkóricas panameñas</b>, mientras la mujer lo ejecuta con gracia y sutileza, el hombre muestra su fuerza y destreza.</p>
    <h3>El Cruce</h3>
    <p>En este paso, como su nombre lo indica, el hombre y la mujer se cruzan. Cada uno sale de su posición con el pié izquierdo, pasando de espaldas al lado de la pareja. Se cuentan cuatro pasos hacia adelante y cuatro pasos hacia atras.</p>
  </hgroup>
 </section>
</main>
`,g=n(1);t()("/danzas",r.a,l.a,function(e,a){var n=document.getElementById("main-container");s()(n).appendChild(h),window.addEventListener("scroll",g.c)})},function(e,a,n){"use strict";n.r(a);var o=n(3),t=n.n(o),i=n(2),s=n.n(i),r=n(4),l=n(5),c=n(0),d=n.n(c).a`
  <section class="contacto completa">
    <article class="contactoInfo rosaTrans">
      <div>
        <h2>Contáctenos:</h2>
        <h4>Email:</h4>
        <p>info@folkinlovepty.com</p>
        <h4>teléfono:</h4>
        <p>6945-5931</p>
        <form action="/contacto/send" method="post">
          <input type="text" name="nombre" placeholder="Nombre">
          <input type="text" name="email" placeholder="Email">
          <input type="text" name="asunto" placeholder="Asunto">
          <textarea name="mensaje" rows="10" cols="30" placeholder="Envianos Tu Mensaje"></textarea>
          <input type="submit" name="submit" value="Enviar" class="btn negro">
        </form>
      </div>
    </article>
  </section>
`,u=n(1);t()("/contacto",r.a,l.a,u.b,function(e,a){var n=document.getElementById("main-container");s()(n).appendChild(d)})}]);