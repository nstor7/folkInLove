import yo from 'yo-yo'

 module.exports = function(producto){
   return yo
   `
     <a class="card" href="/productos/${producto.id}">
       <h3>${producto.nombre}</h3>
       <img src="${producto.imagen}" alt="${producto.nombre}" class="cardImagen">
       <h4>${producto.precio}</h4>
     </a>

   `
 }
