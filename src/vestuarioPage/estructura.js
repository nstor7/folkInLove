import yo from 'yo-yo'
function joyero(vestuario){
  if(vestuario.joyero){
    return yo`
  <section>
    <picture class="dosTercios">
      <source media="(min-width: 800px)" srcset="${vestuario.joyeroImagen}">
      <img class="imagen" src="${vestuario.joyeroImagen}" alt="joyas de ${vestuario.nombre}">
    </picture>
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
   <section class="portada">
    <picture class="banner">
      <source media="(min-width: 800px)" srcset="${vestuario.portadaImagen}">
      <img class="completa" src="${vestuario.portadaImagen}" alt="Imagen de portada ${vestuario.nombre}">
    </picture>
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