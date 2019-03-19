import React from 'react'
import Chimp from './mailChimpForm'
export default function Contacto(){
 return(
  <section className="contacto completa">
   <article className="contactoInfo rosaTrans">
     <div>
       <h2>Contáctenos:</h2>
       <h4>Email:</h4>
       <p>info@folkinlovepty.com</p>
       <h4>teléfono:</h4>
       <p>6945-5931</p>
       <Chimp/>
     </div>
   </article>
  </section>
 )
}