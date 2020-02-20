import React from 'react'
import Picture from './picture'

export default function Tarjeta(seccion, el){
var url = `/${seccion}/${el.url}`



return (
  <a className="tarjeta" key={el.nombre} href={url}>
    {Picture(el.miniatura, el.nombre, 'tarjetaImagen')}
    <div className="tarjetaInfo">
     <hgroup>
      <h3>{el.nombre}</h3>
      <h4>Región: {el.region}</h4>
      <h4>{el.dato}</h4>
     </hgroup>
    </div>
  </a>
)
}