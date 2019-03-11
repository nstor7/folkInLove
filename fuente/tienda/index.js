import page from 'page'
import empty from 'empty-element'
import header from '../header'
import {scroll} from '../header/functions'
import footer from '../footer'
import template from './template'

page('/tienda', header, footer, function(){
 var main = document.getElementById('main-container')
 empty(main).appendChild(template)
 headerContainer.classList.remove('blanco')
  window.addEventListener("scroll", scroll)
})