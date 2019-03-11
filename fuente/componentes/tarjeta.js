import yo from 'yo-yo'

export default function(seccion, articulo){
 var el = yo`
  <a class="tarjeta" href="/${seccion}/${articulo.url}">
    <div class="tarjetaImagen" style="background: url('/images/${articulo.miniatura}'); background-size: cover"></div>
    <div class="tarjetaInfo">
     <hgroup>
      <h3>${articulo.nombre}</h3>
      <h4>Región: ${articulo.region}</h4>
      <h4>${articulo.dato}</h4>
     </hgroup>
    </div>
  </a>
 `
 return el
}