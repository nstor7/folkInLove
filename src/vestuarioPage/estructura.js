import yo from 'yo-yo'

   
module.exports = function(vestuario){
 var el = yo`
  <main itemscope itemtype="http://schema.org/Article">
   <section class="portada">
    <picture class="banner">
      <source media="(min-width: 800px)" srcset="${vestuario.portadaImagenFull}">
      <source media="(min-width: 541px)" srcset="${vestuario.portadaImagenTab}">
      <source media="(min-width: 200px)" srcset="${vestuario.portadaImagenCel}">
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
   ${vestuario.extra}
   ${vestuario.extra2}
  </main>
 `
 return el
}