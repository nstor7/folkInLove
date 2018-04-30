import yo from 'yo-yo'
import fn from './functions'

module.exports = yo`
<header id= "headerContainer">
 <a href="/" class="logoContainer">
   <img src="images/folkInLove-logo.png" alt="logo de Folk in Love Pty" class='logo'>
   <img src="images/folkInLove-letras-negro.png" alt="Tipo de Folk in Love Pty" class='tipo'>
 </a>
 <nav id="nav" class="nav hidden">
   <a href="/" onclick=${fn.navegacion}>Inicio</a>
   <a href="/danzas" onclick=${fn.navegacion}>Danzas</a>
   <a href="/vestuarios" onclick=${fn.navegacion}>Vestuarios</a>
   <a href="/tienda" onclick=${fn.navegacion}>Productos y Servicios</a>
   <a href="/contacto" onclick=${fn.navegacion}>Contacto</a>
 </nav>
 <a href="#" class="navButton" onclick=${fn.navegacion}>
   <i class="fa fa-bars" aria-hidden="true"></i>
 </a>
</header>`
