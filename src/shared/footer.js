import React from 'react'

export default function Footer(){
 return(
  <footer>
   <div class="footerLeft">
    <a class="logo"></a>
   </div>
   <div class="footerRight">
    <div class="footerRightUp">
     <h3>Contáctenos:</h3>
     <ul>
      <li>Email: info@folkinlovepty.com</li>
      <li>Teléfono: 6945-5931</li>
      <li>Dirección: Calle 49A<br/>
      El Cangrejo, Bella Vista</li>
     </ul>
    </div>
    <div class="footerRightDown">
     <a href="https://facebook.com/folkinlovepty" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
     <a href="https://instagram.com/folkinlovepty" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
     <a href="mailto: info@folkinlovepty.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
    </div>
   </div>
  </footer>
 )
}