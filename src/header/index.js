import empty from 'empty-element'
import template from './template'
import scrollFunction from './scrollFunction'

module.exports = function header (ctx, next){
  var container = document.getElementById('header')
  empty(container).appendChild(template)
  window.addEventListener("scroll", scrollFunction)
  next()
}
