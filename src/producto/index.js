import page from 'page'
import header from '../header'
import footer from '../footer'
import lista from '../productoLista/productos'
import template from './template'
import empty from 'empty-element'

page('/productos/:id', header, footer, function(ctx, next){
  var ident = ctx.params.id
  console.log(ident)

  var producto = lista[ident]

  var main = document.getElementById('main-container')
empty(main).appendChild(template(producto))

})
