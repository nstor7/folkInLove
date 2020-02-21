import React from 'react'
import Chimp from './mailChimpForm'
import Picture from '../picture'
export default function Contacto(){
 return(
  <div className="contenedor">
    <div className="completa relativa flex flexleft">
   {Picture('contactoBanner', 'Pollera de Coquitos', 'completa background')}
   <article className="mitad texto rosaTrans">
     <div>
       <h2>Contáctenos:</h2>
       <h4>Email:</h4>
       <p>info@folkinlovepty.com</p>
       <h4>teléfono:</h4>
       <p>6945-5931</p>
       <Chimp/>
     </div>
   </article>
  </div>
  </div>
  
 )
}