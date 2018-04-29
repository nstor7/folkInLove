import yo from 'yo-yo'
function joyero(vestuario){
  if(vestuario.joyero){
    return yo`
  <section>
    <article class="dosTercios imagen" style="background: url('${vestuario.joyeroImagen}'); background-size:cover"></article>
    <article class="tercio blanco joyero">
      <hgroup>
        <h2>Joyero</h2>
        <ul>
         ${vestuario.joyero.map(function(joya){
           return yo`<li>${joya}</li>`
         })}
       </ul>  
      </hgroup>
    </article>
  </section>   
    `
 }}
module.exports = function(vestuario){
 var el = yo`
  <main itemscope itemtype="http://schema.org/Article">
   <section class="portada" style="background: url('${vestuario.portadaImagen}'); background-size:contain; background-attachment: fixed">
    <article class="mitad rosaTrans">
      <hgroup>
          <h1 itemprop="name">${vestuario.nombre}</h1>
          <p itemprop="description">${vestuario.reseña}</p>
      </hgroup>
    </article>
   </section>
   <section itemprop="articleBody" className="completa texto info blanco">
    ${vestuario.antecedentes}
   </section>
   <section class="completa portada" style="background: url('${vestuario.generalImagen}'); background-size:cover; background-attachment: fixed">
    <article itemprop="articleBody" class="mitad negroTrans texto">
     <hgroup>
       <p>${vestuario.general}</p>
     </hgroup>
    </article>
   </section>
   <section itemprop="articleBody" class="completa texto info blanco">
     ${vestuario.descripcion}
   </section>
   ${joyero(vestuario)}
  </main>
 `
 return el
}