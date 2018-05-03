import yo from 'yo-yo'
import tarjeta from '../componentes/tarjeta'
import danzas from './danzas'

module.exports = yo`
<main>
 <section class="portada" id="danzasPortada">
  <picture class="banner">
   <source media="(min-width: 800px)" srcset="images/danzas-full.jpg">
   <source media="(min-width: 600px)" srcset="images/danzas-tab.jpg">
   <img class="completa" src="images/danzas-cel.jpg" alt="Bailes Típicos de Panamá, Baile Congo">
  </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Bailes Típicos de Panamá</h1>
    <p><b>Las danzas folklóricas</b> panameñas expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colación <b>costumbres</b>, rituales religiosos y celebraciones.</p>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
   ${danzas.map(function(danza){
    return tarjeta('danzas', danza)
   })}
  </div> 
 </section>
 <section class="completa blanco videoPasos">
  <h2>Pasos Básicos de los Danzas Típicas Panameñas</h2>
  <iframe src="https://www.youtube.com/embed/x7HdglWtujg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
 </section>
</main>
`

