import productos from '../../producto'
import yo from 'yo-yo'

module.exports = function(producto){
  return yo`
  <section class="producto">
    <h2>${productos.name}</h2>
  </section>
  `
}
const caracteristica = function(product){
  return yo`<li>${product}</li>`
}
