import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import fn from '../header/functions'
import catalogo from '../tienda/catalogo'
import structure from '../structurated-data'

page('/tienda/:nombre', header, footer, fn.noScrollFunction, function(ctx, next){
 
  var producto = catalogo.find(producto => producto.enlace === ctx.params.nombre)
    var main = document.getElementById('main-container')
    empty(main).appendChild(template(producto))
    structure(producto)
})
