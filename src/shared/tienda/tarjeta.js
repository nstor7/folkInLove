import React from 'react'

export default function Tarjeta(producto){
var url = `/tienda/${producto.enlace}`
return(
  <a className="tarjeta tiendaTarjeta" key={url} href={url}>
    <picture>
      <source media="(min-width: 800px)" srcSet={producto.miniaturaFull}/>
      <img src={producto.miniaturaCel} alt={producto.alt} className="tarjetaImagen"/>
    </picture>
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
