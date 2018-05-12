import yo from 'yo-yo'

export default function(producto){
 var el = yo`
 <section class="completa producto">
  <articulo class="tercio productoImagenes">
   <picture>
    <source media="(min-width: 800px)" srcset="${producto.imagenFull}">
    <img src="${producto.imagenCel}" alt="${producto.alt}">
   </picture>
  </articulo>
  <articulo class="dosTercios">
     <div class="productoInfo">
      <h1>${producto.nombre}</h1>
      <h3>${producto.subtitulo}</h3>
      <h2>Descripción:</h2>
      <p>${producto.descripcion}</p>
      <h2>Opciones:</h2>
      ${producto.opciones.map(function(opcion){
          return yo`
      <div class="opciones">
       <h4>${opcion.detalle}</h3>
       <h4>${opcion.precio.toLocaleString("en-US", {
         style:'currency',
         currency:'USD'
        })}</h4>
       <p>${opcion.descripcion}</p>
      </div>`
      })}
    </div>
  </articulo>
  ${producto.seccion}
 </section>
`
return el
}
