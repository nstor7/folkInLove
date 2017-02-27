import yo from 'yo-yo'
import navegacion from './navegacionFunction'

module.exports = yo`
<header>
 <a href="/">
   <div class="logo"></div>
   <h1>Folk In Love</h1>
 </a>

 <nav id="nav" class="nav hidden">
  <ul>
   <li><a href="#">Inicio</a></li>
   <li><a href="#">Productos</a></li>
   <li><a href="#">Servicios</a></li>
  </ul>
 </nav>
 <a href="#" class="navButton" onclick=${navegacion}>
   <i class="fa fa-bars" aria-hidden="true"></i>
 </a>
</header>`
