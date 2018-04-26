import yo from 'yo-yo'

export default function(producto){
 var el = yo`
  <a class="tarjeta tiendaTarjeta" href="${producto.enlace}">
    <picture>
      <source media="(min-width: 800px)" srcset="${producto.miniaturaFull}">
      <img src="${producto.miniaturaCel}" alt=${producto.alt} class="tarjetaImagen">
    </picture>
    <div class="tarjetaInfo">
     <hgroup>
      <h2>${producto.nombre}</h2>
      <h3>${producto.subtitulo}</h3>
      <h4>Descripción: </h4>
      <p>${producto.descripcion}</p>
     </hgroup>
    </div>
  </a>
 `
 return el
}