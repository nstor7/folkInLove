import React from "react"
import Catalogo from './tienda/catalogo'
import picture from './picture'


export default function Producto(props){
 var Producto = Catalogo.find((producto) => producto.enlace === props.match.params.enlace)
 function Template(opcion) { 
  
  return (<div key={opcion.detalle} className="opciones">
       <h4>{opcion.detalle}</h4>
       <h4>{opcion.precio.toLocaleString("en-US", {
         style:'currency',
         currency:'USD'
        })}</h4>
       <p>{opcion.descripcion}</p>
  </div>)}
 var opciones = Producto.opciones.map((opcion)=> Template(opcion))
 var mensaje = `https://api.whatsapp.com/send?phone=50769455931&text=Hola!%20Quisiera%20información%20sobre%20 ${Producto.nombre}`

 return (
<div className="contenedor">
{Producto.articulo}
<section className="completa flex">
  <articulo className="tercio productoImagenes">
   {picture(Producto.imagen, Producto.alt, 'tercio')}
  </articulo>
  <articulo className="dosTercios texto">
      <h1>{Producto.nombre}</h1>
      <h3>{Producto.subtitulo}</h3>
      <h2>Opciones:</h2>
      {opciones}
      <a className="whatsApp" href={mensaje}  target="_blank">Más Información</a>
  </articulo>
 </section>
</div>
 

 )
}