import yo from 'yo-yo'
import {navegacion} from './functions'

var template = yo`
<header id= "headerContainer">
 <a href="/" class="logoContainer">
   <img src="images/folkInLove-logo.png" alt="logo de Folk in Love Pty" class='logo'>
   <img src="images/folkInLove-letras-negro.png" alt="Tipo de Folk in Love Pty" class='tipo'>
 </a>
 <nav id="nav" class="nav hidden">
   <a href="/" onclick=${navegacion}>Inicio</a>
   <a href="/danzas" onclick=${navegacion}>Danzas</a>
   <a href="/vestuarios" onclick=${navegacion}>Vestuarios</a>
   <a href="/tienda" onclick=${navegacion}>Productos y Servicios</a>
   <a href="/contacto" onclick=${navegacion}>Contacto</a>
 </nav>
 <a href="#" class="navButton" onclick=${navegacion}>
   <i class="fa fa-bars" aria-hidden="true"></i>
 </a>
</header>`

export default template