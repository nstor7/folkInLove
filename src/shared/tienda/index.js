import React from 'react'
import Catalogo from './catalogo'
import Tarjeta from './tarjeta'


export default function Tienda(props) {

 return (
<main>
 <section className="portada">
  <picture className="banner">
   <source media="(min-width: 801px)" srcSet="images/tiendaBannerFull-1x.jpg 1x, images/tiendaBannerFull-2x.jpg 2x"/>
   <source media="(min-width: 541px)" srcSet="images/tiendaBannerTab-1x.jpg 1x, images/tiendaBannerTab-2x.jpg 2x"/>
   <source media="(min-width: 10px)" srcSet="images/tiendaBannerCel-1x.jpg 1x, images/tiendaBannerCel-2x.jpg 2x"/> 
   <img className="completa" alt="Foto de Pollera De Lujo Santeña, traje tipico de panamá, en Panamá Viejo"  src="images/tiendaBannerCell-1x.jpg"  />
  </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Productos y Servicios Folklóricos</h1>
   </hgroup>
  </article>
 </section>
 <section className="lista blanco">
  <div className="listaCont">
   {Catalogo.map((Producto) => Tarjeta(Producto))}
  </div>
  
 </section>
</main>
 )
}