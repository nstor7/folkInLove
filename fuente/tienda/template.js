import yo from 'yo-yo'
import catalogo from './catalogo'
import tarjeta from './tarjeta'

var template = yo`
<main>
 <section class="portada">
  <picture class="banner">
   <source media="(min-width: 801px)" srcset="images/tiendaBannerFull-1x.jpg 1x, images/tiendaBannerFull-2x.jpg 2x">
   <source media="(min-width: 541px)" srcset="images/tiendaBannerTab-1x.jpg 1x, images/tiendaBannerTab-2x.jpg 2x">
   <source media="(min-width: 10px)" srcset="images/tiendaBannerCel-1x.jpg 1x, images/tiendaBannerCel-2x.jpg 2x"> 
   <img class="completa" alt="Foto de Pollera De Lujo Santeña, traje tipico de panamá, en Panamá Viejo"  src="images/tiendaBannerCell-1x.jpg"  >
  </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Productos y Servicios Folklóricos</h1>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
   ${catalogo.map(function(producto){
    return tarjeta(producto)
   })}
  </div>
  
 </section>
</main>
`
export default template