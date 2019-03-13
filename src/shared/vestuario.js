import React from 'react'
import Listado from './vestuarios/vestuarios'

export default function Vestuario(props){
 var Vestido = Listado.find((vestuario) =>  vestuario.url === props.match.params.url)
 return (
  <main itemscope itemtype="http://schema.org/Article">
   <section class="portada">
    <picture class="banner">
      <source media="(min-width: 800px)" srcset={Vestido.portadaImagenFull}/>
      <source media="(min-width: 541px)" srcset={Vestido.portadaImagenTab}/>
      <source media="(min-width: 200px)" srcset={Vestido.portadaImagenCel}/>
      <img class="completa" src={Vestido.portadaImagen} alt= {Vestido.nombre}/>
    </picture>
    <article class="mitad rosaTrans">
      <hgroup>
          <h1 itemprop="name">{Vestido.nombre}</h1>
          <p itemprop="description">{Vestido.reseña}</p>
      </hgroup>
    </article>
   </section>
   <section itemprop="articleBody" className="completa texto info blanco">
    {Vestido.antecedentes}
   </section>
   <section class="completa portada" style={{background: "url('" + Vestido.generalImagen + "')", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
    <article itemprop="articleBody" class="mitad negroTrans texto">
     <hgroup>
       <p>{Vestido.general}</p>
     </hgroup>
    </article>
   </section>
   <section itemprop="articleBody" class="completa texto info blanco">
     {Vestido.descripcion}
   </section>
   {Vestido.extra}
   {Vestido.extra2}
  </main>
 )
}