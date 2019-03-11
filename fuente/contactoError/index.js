import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'
import {noScroll} from '../header/functions'

page('/error', header, footer, noScroll, function(ctx, next){
  var main = document.getElementById('main-container')
  empty(main).appendChild(template)
})