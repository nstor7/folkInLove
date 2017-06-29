import yo from 'yo-yo'
import navegacion from './navegacionFunction'

module.exports = yo`
<header id= "headerContainer">
 <a href="/" class="logoContainer">
   <div class="logo"></div>
   <h1>Folk In Love</h1>
 </a>
 <nav id="nav" class="nav hidden">
   <a href="/" onclick=${navegacion}>Inicio</a>
   <a href="/" onclick=${navegacion}>Regiones</a>
   <a href="/" onclick=${navegacion}>Danzas</a>
   <a href="/" onclick=${navegacion}>Vestidos</a>
   <a href="/productos" onclick=${navegacion}>Tienda</a>
   <a href="#" onclick=${navegacion}>Contacto</a>
 </nav>
 <a href="#" class="navButton" onclick=${navegacion}>
   <i class="fa fa-bars" aria-hidden="true"></i>
 </a>
</header>`
