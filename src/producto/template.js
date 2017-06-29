import yo from 'yo-yo'

module.exports = function(producto){
  return yo`
  <section class="producto">
    <h2>${producto.nombre}</h2>
    <div class="productoImagen"></div>
    <div class="productoPrecio">$${producto.precio}</div>
    <div class="productoCaracteristicas">
      <ul>
          ${producto.caracteristicas.map(function(prod){
            return caracteristica(prod)
          })}
      </ul>
    </div>
  </section>
  `
}
const caracteristica = function(product){
  return yo`<li>${product}</li>`
}
