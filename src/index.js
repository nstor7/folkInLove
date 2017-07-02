import page from 'page'
import scrollFunction from './header/scrollFunction'

page('*', function(ctx, next){
  window.scrollTo(0,0)
  next()
})
require('./inicio')
require('./productoLista')
require('./producto')
require('./contacto')


page()
