import React from 'react'
import Listado from './vestuarios'
import Tarjeta from '../tarjeta'
import picture from '../picture'

export default function vestuarios(){
 return(
<div className="contenedor">
 <section className="completa banner relativa flex flexLeft">
  {picture('vestuariosBanner', "Pollera de Gala Santeña", "completa background")}
  <div className="mitad rosaTrans texto">
   <hgroup>
    <h1>Vestuarios Panameños</h1>
    <p>Los vestidos típicos de nuestro país son de gran valor y nos muestran la singularidad de cada pueblo y como de acuerdo al lugar de donde vienen expresan las vivencias y situaciones del hombre y la mujer panameña.</p>
   </hgroup>
  </div>
 </section>
 <section className="lista blanco">
  {Listado.map((vestuario) => Tarjeta("vestuarios", vestuario))}
 </section>
</div>
 )
}