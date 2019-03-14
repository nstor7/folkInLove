import React from 'react'
import Listado from './vestuarios/vestuarios'

export default function Vestuario(props){
 var Vestido = Listado.find((vestuario) =>  vestuario.url === props.match.params.url)
 return (
  <main itemScope itemType="http://schema.org/Article">
   <section className="portada">
    <picture className="banner">
      <source media="(min-width: 800px)" srcSet={Vestido.portadaImagenFull}/>
      <source media="(min-width: 541px)" srcSet={Vestido.portadaImagenTab}/>
      <source media="(min-width: 200px)" srcSet={Vestido.portadaImagenCel}/>
      <img className="completa" src={Vestido.portadaImagen} alt= {Vestido.nombre}/>
    </picture>
    <article className="mitad rosaTrans">
      <hgroup>
          <h1 itemProp="name">{Vestido.nombre}</h1>
          <p itemProp="description">{Vestido.reseña}</p>
      </hgroup>
    </article>
   </section>
   <section itemProp="articleBody" className="completa texto info blanco">
    {Vestido.antecedentes}
   </section>
   <section className="completa portada" style={{background: "url('" + Vestido.generalImagen + "')", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
    <article itemProp="articleBody" className="mitad negroTrans texto">
     <hgroup>
       <p>{Vestido.general}</p>
     </hgroup>
    </article>
   </section>
   <section itemProp="articleBody" className="completa texto info blanco">
     {Vestido.descripcion}
   </section>
   {Vestido.extra}
   {Vestido.extra2}
  </main>
 )
}