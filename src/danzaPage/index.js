import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import danzas from '../danzas/danzas'
import {scroll} from '../header/functions'

page('/danzas/:url', header, footer, function(ctx, next){
 var baile = danzas.find(danza => danza.url === ctx.params.url)
 var main = document.getElementById('main-container')
 empty(main).appendChild(template(baile))
 window.addEventListener("scroll", scroll)
 next()
})