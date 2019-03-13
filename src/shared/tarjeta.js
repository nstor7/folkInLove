import React from 'react'

export default function Tarjeta(seccion, el){
var miniatura = `/images/${el.miniatura}`
var url = `/${seccion}/${el.url}`


return (
  <a className="tarjeta" href={url}>
    <img className="tarjetaImagen" src={miniatura} />
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