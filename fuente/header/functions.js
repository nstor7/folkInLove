export var scroll = function(){
    var altura = window.innerWidth * 0.19
    var headerContainer = document.getElementById('headerContainer')
  if(window.scrollY > altura){
    headerContainer.classList.add('blanco')
  }if(window.scrollY < altura){
    headerContainer.classList.remove('blanco')
  }
}

export var noScroll = function(ctx, next){
  removeEventListener('scroll', scroll)
  var headerContainer = document.getElementById('headerContainer')
  headerContainer.classList.add('blanco')
  next()
}
export var navegacion = function(){
  var nav = document.getElementById('nav')
  nav.classList.toggle('hidden')
 }


