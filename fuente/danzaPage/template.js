import yo from 'yo-yo'
import picture from '../componentes/picture'

var template = function(danza){
 var el = yo`
 <main>
  <section class="portada">
    ${picture(danza.portadaImagen)}   
    <article class="mitad rosaTrans">
    <hgroup>
      <h1>${danza.nombre}</h1>
      <p>${danza.reseña}</p>
    </hgroup>
    </article>
  </section>
  <section>
    <article class="tercio imagen" style="background: url('${danza.introImagen}'); background-size: cover;"></article>
    <article class="dosTercios blanco texto">
    ${danza.intro}
    </article>
  </section>
  <section>
    <article class="completa texto info blanco">
    ${danza.descripcion}
    </article>
  </section>
  <section>
    <article class="tercio blanco pasos">
    <hgroup>
      <h2>Pasos de ${danza.nombre}</h2>
      <ul>
      ${danza.pasos.map(function(paso){
        return yo`<li>${paso}</li>`
      })}
      </ul>
    </hgroup>
    </article>
    <article class="dosTercios imagenDoble" style="background: url('${danza.pasosImagen}'); background-size:cover"></article>
  </section>
  <article class="completa texto info rosa">
      ${danza.referencias}
  </article>
</main>
 `
 return el 
}


export default template