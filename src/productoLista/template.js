import yo from 'yo-yo'
import card from './ProductoCard'

module.exports = function(productos){
  return yo`
    <section class="productoLista">
      ${productos.map(function(producto){
        return card(producto)
      })}
    </section>
  `
}
