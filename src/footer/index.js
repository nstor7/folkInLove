import empty from 'empty-element'
import template from './template'


module.exports =  function footer(ctx, next){
 var pie = document.getElementById('footer');
  empty(pie).appendChild(template);
  next()
}
