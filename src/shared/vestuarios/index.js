import React from 'react'
import Listado from './vestuarios'
import Tarjeta from '../tarjeta'

export default function vestuarios(){
 return(
<main>
 <section className="portada" id="vestuarioPortada">
  <picture className="banner">
    <source media="(min-width: 801px)" srcSet="images/vestuariosBannerFull-1x.jpg 1x, images/vestuariosBannerFull-2x.jpg 2x"/>
    <source media="(min-width: 541px)" srcSet="images/vestuariosBannerTab-1x.jpg 1x, images/vestuariosBannerTab-2x.jpg 2x"/>
    <source media="(min-width: 10px)" srcSet="images/vestuariosBannerCel-1x.jpg 1x, images/vestuariosBannerCel-2x.jpg 2x"/>
    <img className="completa" src="images/vestuariosBannerCell-1x.jpg" alt="Trajes Típicos de Panamá, Pollera de Lujo Santeña en Panamá Viejo"/>
   </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Vestuarios Panameños</h1>
    <p>Los vestidos típicos de nuestro país son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer panameña.</p>
   </hgroup>
  </article>
 </section>
 <section className="lista blanco">
  <div className="listaCont">
  {Listado.map((vestuario) => Tarjeta("vestuarios", vestuario))}
  </div> 
 </section>
</main>
 )
}