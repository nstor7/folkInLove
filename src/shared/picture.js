import React from 'react'

export default function Picture(imagen){

  var tamaño1 = `/images/${imagen}Full-1x.jpg 1x, /images/${imagen}Full-2x.jpg 2x`
  var tamaño2 = `/images/${imagen}Tab-1x.jpg 1x, /images/${imagen}Tab-2x.jpg 2x`
  var tamaño3 = `/images/${imagen}Cel-1x.jpg 1x, /images/${imagen}Cel-2x.jpg 2x`
  var tamaño4 = `/images/${imagen}Cel.jpg`

  return (
   <picture className="banner">
    <source media="(min-width: 801px)" srcSet={tamaño1}/>
    <source media="(min-width: 541px)" srcSet={tamaño2}/>
    <source media="(min-width: 10px)" srcSet={tamaño3}/>
    <img className="completa" src={tamaño4} alt="Bailes Típicos de Panamá, Baile Congo"/>
   </picture>
  )
 }
