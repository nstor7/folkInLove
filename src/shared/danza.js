import React from 'react'
import Listado from './danzas/danzas'
import Picture from './picture'


 export default function Danza(props) {
  var Baile = Listado.find((danza) =>  danza.url === props.match.params.url) 
  return(
 <div className="contenedor">
  <section className="completa relativa flex flexLeft">
    {Picture(Baile.portadaImagen, Baile.nombre, 'completa background ')}   
    <article className="mitad rosaTrans texto">
    <hgroup>
      <h1>{Baile.nombre}</h1>
      <p>{Baile.reseña}</p>
    </hgroup>
    </article>
  </section>
  <div className='completa flex'>
    <div className='tercio' style={{background: 'url("/images/' + Baile.introImagen +'")', backgroundSize: 'cover'}}></div>
    <div className="dosTercios blanco texto">
    {Baile.intro}
    </div>
  </div>
    <div className="completa textoLargo  blanco">
    {Baile.descripcion}
    </div>
  <div className='completa flex'>
    <div className="tercio blanco">
    <hgroup>
      <h2>Pasos de {Baile.nombre}</h2>
      <ul>
      {Baile.pasos.map(function(paso){
        return (<li key={paso}>{paso}</li>)
      })}
      </ul>
    </hgroup>
    </div>
    <div className="dosTercios" style={{background: 'url("/images/' + Baile.pasosImagen + '")', backgroundSize: 'cover' }}></div>
  </div>
  <article className="completa texto info rosa">
      {Baile.referencias}
  </article>
</div>
   )
  }
   
 
 
