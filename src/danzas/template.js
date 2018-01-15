import yo from 'yo-yo'
import tarjeta from '../componentes/tarjeta'
import danzas from './danzas'

module.exports = yo`
<main>
 <section class="portada" id="danzasPortada">
  <article className="completa negroTrans">
   <hgroup>
    <h2>Danzas Panameñas</h2>
    <p>Las danzas de Panamá expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colación rituales religiosos y celebraciones.</p>
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
</main>
`

