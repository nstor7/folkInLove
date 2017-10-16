import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import fn from '../header/functions'

page('/danzas', header, footer, function(ctx, next){
 var main = document.getElementById('main-container')
 empty(main).appendChild(template)
 window.addEventListener("scroll", fn.scrollFunction)
})