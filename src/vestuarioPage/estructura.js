import yo from 'yo-yo'

module.exports = function(vestuario){
 var el = yo`
  <main>
   <section class="portada" style="background: url('${vestuario.portadaImagen}'); background-size:contain; background-attachment: fixed">
    <article class="mitad rosaTrans">
      <hgroup>
          <h1>${vestuario.nombre}</h1>
          <p>${vestuario.reseña}</p>
      </hgroup>
    </article>
   </section>
   <section className="completa texto info blanco">
    ${vestuario.antecedentes}
   </section>
   <section class="completa portada" style="background: url('${vestuario.generalImagen}'); background-size:cover; background-attachment: fixed">
    <article class="mitad negroTrans texto">
     <hgroup>
       <p>${vestuario.general}</p>
     </hgroup>
    </article>
   </section>
   <section class="completa texto info blanco">
     ${vestuario.descripcion}
   </section>
   <section>
     <article class="dosTercios imagen" style="background: url('${vestuario.joyeroImagen}'); background-size:cover"></article>
     <article class="tercio blanco joyero">
      <hgroup>
        <h1>Joyero</h1>
        <ul>
         ${vestuario.joyero.map(function(joya){
           return yo`<li>${joya}</li>`
         })}
        </ul>
        
      </hgroup>
     </article>
   </section>
  </main>
 `
 return el
}