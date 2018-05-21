import yo from 'yo-yo'
import tarjeta from '../componentes/tarjeta'
import vestuarios from './vestuarios'

module.exports = yo`
<main>
 <section class="portada" id="vestuarioPortada">
  <picture class="banner">
    <source media="(min-width: 801px)" srcset="images/vestuariosBannerFull-1x.jpg 1x, images/vestuariosBannerFull-2x.jpg 2x">
    <source media="(min-width: 541px)" srcset="images/vestuariosBannerTab-1x.jpg 1x, images/vestuariosBannerTab-2x.jpg 2x">
    <source media="(min-width: 10px)" srcset="images/vestuariosBannerCel-1x.jpg 1x, images/vestuariosBannerCel-2x.jpg 2x">
    <img class="completa" src="images/vestuariosBannerCell-1x.jpg" alt="Trajes Típicos de Panamá, Pollera de Lujo Santeña en Panamá Viejo">
   </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Vestuarios Panameños</h1>
    <p>Los vestidos típicos de nuestro país son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer panameña.</p>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
  ${vestuarios.map(function(danza){
   return tarjeta('vestuarios', danza)
  })}
  </div> 
 </section>
</main>
`