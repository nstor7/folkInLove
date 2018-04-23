import page from 'page'
import empty from 'empty-element'
import template from './template'
import header from '../header'
import footer from '../footer'
import fn from '../header/functions'

page('/', header, footer, function(ctx, next){
  var main = document.getElementById('main-container');
  empty(main).appendChild(template);
  var headerContainer = document.getElementById('headerContainer')
  headerContainer.classList.remove('blanco')
  window.addEventListener("scroll", fn.scrollFunction)
  next()
})
