import yo from 'yo-yo'
import catalogo from './catalogo'
import tarjeta from './tarjeta'

module.exports = yo`
<main>
 <section class="portada">
  <picture class="banner">
   <source media="(min-width: 800px)" srcset="images/pollera-lujo-losantos-tienda-portada-full.jpg">
   <img class="completa" alt="Foto de Pollera De Lujo Santeña, traje tipico de panamá, en Panamá Viejo"  src="images/pollera-lujo-losantos-tienda-portada-cel.jpg"  >
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