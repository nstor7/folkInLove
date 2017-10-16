import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import danzas from '../danzas/danzas'
import fn from '../header/functions'

page('/danzas/:url', header, footer, function(ctx, next){
 var main = document.getElementById('main-container')
 empty(main).appendChild(template(danzas, ctx.params.url))
 window.addEventListener("scroll", fn.scrollFunction)
})