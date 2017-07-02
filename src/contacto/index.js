import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import fn from '../header/scrollFunction'

page('/contacto', header, footer, fn.noScrollFunction, function(ctx, next){
  var main = document.getElementById('main-container')
  empty(main).appendChild(template)
})
