import page from 'page'
import empty from 'empty-element'
import template from './template'
import header from '../header'
import footer from '../footer'

page('/', header, footer, function(ctx, next){
  var main = document.getElementById('main-container');
  empty(main).appendChild(template);
})
