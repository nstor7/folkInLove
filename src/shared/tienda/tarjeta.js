import React from 'react'
import picture from '../picture'

export default function Tarjeta(producto){
var url = `/tienda/${producto.enlace}`
return(
  <a className="tarjeta tiendaTarjeta" key={url} href={url}>
    {picture(producto.miniatura, producto.alt, 'tarjetaImagen')}
    <div className="tarjetaInfo">
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
