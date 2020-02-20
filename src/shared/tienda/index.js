import React from 'react'
import Catalogo from './catalogo'
import Tarjeta from './tarjeta'
import picture from '../picture'


export default function Tienda(props) {

 return (
<div className="contenedor">
 <section className="completa banner relativa flex negroTrans">
  {picture('tiendaBanner', 'Pollera Congo', 'completa background')}
  <article className="whiteText centerText">
    <h1>Productos y Servicios Folklóricos</h1>
  </article>
 </section>
 <section className="lista blanco">
   {Catalogo.map((Producto) => Tarjeta(Producto))}  
 </section>
</div>
 )
}