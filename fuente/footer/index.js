import empty from 'empty-element'
import template from './template'


var footer =  function footer(ctx, next){
 var pie = document.getElementById('footer');
  empty(pie).appendChild(template);
  next()
}
export default footer