import React from 'react'
import Listado from './vestuarios/vestuarios'
import picture from './picture'

export default function Vestuario(props){
 var Vestido = Listado.find((vestuario) =>  vestuario.url === props.match.params.url)
 return (
  <main itemScope itemType="http://schema.org/Article" className="contenedor">
   <section className="completa relativa flex flexLeft">
    {picture(Vestido.portadaImagen, Vestido.nombre, 'completa background flex flexLeft')}
    <article className="mitad rosaTrans texto">
      <hgroup>
          <h1 itemProp="name">{Vestido.nombre}</h1>
          {Vestido.reseña}
      </hgroup>
    </article>
   </section>
   <section itemProp="articleBody" className="completa textoLargo blanco">
    {Vestido.antecedentes}
   </section>
   <section className="completa banner relativa flex flexLeft">
    {picture(Vestido.generalImagen, Vestido.nombre, 'completa background')}
    <article itemProp="articleBody" className="mitad negroTrans texto">
     <hgroup>
       <p>{Vestido.general}</p>
     </hgroup>
    </article>
   </section>
   <section itemProp="articleBody" className="completa textoLargo blanco">
     {Vestido.descripcion}
   </section>
   {Vestido.extra}
   {Vestido.extra2}
  </main>
 )
}