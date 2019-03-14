import React from 'react'

export default function Tarjeta(producto){
var url = `/tienda/${producto.enlace}`
return(
  <a class="tarjeta tiendaTarjeta" href={url}>
    <picture>
      <source media="(min-width: 800px)" srcset={producto.miniaturaFull}/>
      <img src={producto.miniaturaCel} alt={producto.alt} class="tarjetaImagen"/>
    </picture>
    <div class="tarjetaInfo">
     <hgroup>
      <h2>{producto.nombre}</h2>
      <h3>{producto.subtitulo}</h3>
      <h4>Descripción: </h4>
      <p>{producto.descripcion.substring(0, 90)}</p>
     </hgroup>
    </div>
  </a>
 )
}
