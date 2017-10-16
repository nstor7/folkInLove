import yo from 'yo-yo'
import tarjeta from '../componentes/tarjeta'
import vestuarios from './vestuarios'

module.exports = yo`
<main>
 <section class="portada" id="vestuarioPortada">
  <article className="completa negroTrans">
   <hgroup>
    <h2>Vestuarios Panameños</h2>
    <p>Los vestidos típicos de nuestro país son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer panameña.</p>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaFiltros">

  </div>
  <div class="listaCont">
  ${vestuarios.map(function(danza){
   return tarjeta('vestuarios', danza)
  })}
  </div> 
 </section>
</main>
`