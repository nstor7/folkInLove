import yo from 'yo-yo'
import tarjeta from '../componentes/tarjeta'
import vestuarios from './vestuarios'

module.exports = yo`
<main>
 <section class="portada" id="vestuarioPortada">
  <picture class="banner">
    <source media="(min-width: 800px)" srcset="images/vestuarios-full.jpg">
    <source media="(min-width: 600px)" srcset="images/vestuarios-tab.jpg">
    <img class="completa" src="images/vestuarios-cel.jpg" alt="Bailes Típicos de Panamá, Baile Congo">
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