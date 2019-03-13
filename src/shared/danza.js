import React from 'react'
import Listado from './danzas/danzas'
import Picture from './picture'


 export default function Danza(props) {
  var Baile = Listado.find((danza) =>  danza.url === props.match.params.url)
  console.log(Baile) 
  return(
 <main>
  <section className="portada">
    {Picture(Baile.portadaImagen)}   
    <article className="mitad rosaTrans">
    <hgroup>
      <h1>{Baile.nombre}</h1>
      <p>{Baile.reseña}</p>
    </hgroup>
    </article>
  </section>
  <section>
    <article className='tercio imagen' style={{background: 'url("/images/' + Baile.introImagen +'")', backgroundSize: 'cover'}}></article>
    <article className="dosTercios blanco texto">
    {Baile.intro}
    </article>
  </section>
  <section>
    <article className="completa texto info blanco">
    {Baile.descripcion}
    </article>
  </section>
  <section>
    <article className="tercio blanco pasos">
    <hgroup>
      <h2>Pasos de {Baile.nombre}</h2>
      <ul>
      {Baile.pasos.map(function(paso){
        return (<li>{paso}</li>)
      })}
      </ul>
    </hgroup>
    </article>
    <article className="dosTercios imagenDoble" style={{background: 'url("/images/' + Baile.pasosImagen + '")', backgroundSize: 'cover' }}></article>
  </section>
  <article className="completa texto info rosa">
      {Baile.referencias}
  </article>
</main>
   )
  }
   
 
 
