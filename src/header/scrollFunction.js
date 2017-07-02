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

module.exports = {scrollFunction, noScrollFunction}
