import page from 'page'
import empty from 'empty-element'
import template from './template'
import header from '../header'
import footer from '../footer'
import fn from '../header/functions'
import articulos from '../blogArticulo/articulos'

page('/blog', header, footer, fn.noScrollFunction, function(ctx, next){
 var main = document.getElementById('main-container')
  empty(main).appendChild(template(articulos))
})