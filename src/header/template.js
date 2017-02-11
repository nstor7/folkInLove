import yo from 'yo-yo'
import navegacion from './navegacionFunction'

module.exports = yo`
<header>
 <a class="logo"></a>
 <nav id="nav" class="nav hidden">
  <ul>
   <li><a href="#">Inicio</a></li>
   <li><a href="#">Proyectos</a></li>
   <li><a href="#">Servicios</a></li>
   <li><a href="#">Contacto</a></li>
  </ul>
 </nav>
 <a href="#" class="navButton" onclick=${navegacion}>
   <i class="fa fa-bars" aria-hidden="true"></i>
 </a>
</header>`

