import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import vestuarios from '../vestuarios/vestuarios'
import {scroll} from '../header/functions'

page('/vestuarios/:url', header, footer, function(ctx){
 var main = document.getElementById('main-container')
 empty(main).appendChild(template(vestuarios, ctx.params.url))
 window.addEventListener("scroll", scroll)

})