import empty from 'empty-element'
import template from './template'

var header = function header (ctx, next){
  var container = document.getElementById('header')
  empty(container).appendChild(template)
  next()
}
export default header