import React from "react"
import Catalogo from './tienda/catalogo'


export default function Producto(props){
 var Producto = Catalogo.find((producto) => producto.enlace === props.match.params.enlace)
 function Template(opcion) { 
  
  return (<div className="opciones">
       <h4>{opcion.detalle}</h4>
       <h4>{opcion.precio.toLocaleString("en-US", {
         style:'currency',
         currency:'USD'
        })}</h4>
       <p>{opcion.descripcion}</p>
  </div>)}
 var opciones = Producto.opciones.map((opcion)=> Template(opcion))

 return (
 <section className="completa producto">
  <articulo className="tercio productoImagenes">
   <picture>
    <source media="(min-width: 800px)" srcSet={Producto.imagenFull}/>
    <img src={Producto.imagenCel} alt={Producto.alt}/>
   </picture>
  </articulo>
  <articulo className="dosTercios">
     <div className="productoInfo">
      <h1>{Producto.nombre}</h1>
      <h3>{Producto.subtitulo}</h3>
      <h2>Opciones:</h2>
      {opciones}
    </div>
  </articulo>
  {Producto.articulo}
 </section>

 )
}