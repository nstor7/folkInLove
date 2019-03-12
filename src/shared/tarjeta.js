import React from 'react'

export default function Tarjeta(el){

return (
  <a class="tarjeta" href={el.url}>
    <img class="tarjetaImagen" src={el.miniatura}/>
    <div class="tarjetaInfo">
     <hgroup>
      <h3>{el.nombre}</h3>
      <h4>Región: {el.region}</h4>
      <h4>{el.dato}</h4>
     </hgroup>
    </div>
  </a>
)
}