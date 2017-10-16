var scrollFunction = function(){
    var altura = window.innerWidth * 0.19
    var headerContainer = document.getElementById('headerContainer')
  if(window.scrollY > altura){
    headerContainer.classList.add('blanco')
  }if(window.scrollY < altura){
    headerContainer.classList.remove('blanco')
  }
}

var noScrollFunction = function(ctx, next){
  removeEventListener('scroll', scrollFunction)
  var headerContainer = document.getElementById('headerContainer')
  headerContainer.classList.add('blanco')
  next()
}
var navegacion =function(){
  var nav = document.getElementById('nav')
  nav.classList.toggle('hidden')
 }

module.exports = {scrollFunction, noScrollFunction, navegacion}
