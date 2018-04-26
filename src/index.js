import page from 'page'

page('*', function(ctx, next){
  window.scrollTo(0,0)
  next()
})
require('./inicio')
require('./contacto')
require('./danzas')
require('./vestuarios')
require('./danzaPage')
require('./vestuarioPage')
require('./contactoConfirmacion')
require('./contactoError')
require('./tienda')
require('./producto')


page()

