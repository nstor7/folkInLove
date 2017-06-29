module.exports = function(){
    var altura = window.innerWidth * 0.19
    var headerContainer = document.getElementById('headerContainer')
  if(window.scrollY > altura){
    headerContainer.classList.add('blanco')
  }if(window.scrollY < altura){
    headerContainer.classList.remove('blanco')
  }
}
