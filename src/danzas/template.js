import yo from 'yo-yo'
import tarjeta from '../componentes/tarjeta'
import danzas from './danzas'

module.exports = yo`
<main>
 <section class="portada" id="danzasPortada">
  <picture class="banner">
   <source media="(min-width: 801px)" srcset="images/danzasBannerFull-1x.jpg 1x, images/danzasBannerFull-2x.jpg 2x">
   <source media="(min-width: 541px)" srcset="images/danzasBannerTab-1x.jpg 1x, images/danzasBannerTab-2x.jpg 2x">
   <source media="(min-width: 10px)" srcset="images/danzasBannerCel-1x.jpg 1x, images/danzasBannerCel-2x.jpg 2x">
   <img class="completa" src="images/danzasBannerCel.jpg" alt="Bailes Típicos de Panamá, Baile Congo">
  </picture>
  <article className="completa negroTrans">
   <hgroup>
    <h1>Bailes Típicos de Panamá</h1>
    <p><b>Las danzas folklóricas</b> panameñas expresan las experiencias del hombre y la mujer, muchas de ellas son inspiradas en la faena diaria del trabajo en el campo, otras traen a colación <b>costumbres</b>, rituales religiosos y celebraciones.</p>
   </hgroup>
  </article>
 </section>
 <section class="lista blanco">
  <div class="listaCont">
   ${danzas.map(function(danza){
    return tarjeta('danzas', danza)
   })}
  </div> 
 </section>
 <section class="completa blanco videoPasos">
  <h2>Pasos Básicos de los Danzas Típicas Panameñas</h2>
  <iframe src="https://www.youtube.com/embed/x7HdglWtujg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  <hgroup class="blogStyle">
    <p>A diferencia de otros países de latinoamérica, donde los bailes no tiene una estructura marcada y los pasos cambian a voluntad del bailarín, en Panamá si tenemos una serie de <b>pasos estructurados</b>  que son guiados por los <b>cambios de la música</b>.</p>
    <h3>El Paseo</h3>
    <p>El Paseo es el <b>paso básico por excelencia</b> , ya que con él se inician la mayoría de los bailes, como es el caso de la Cumbia Santeña.</p>
    <h3>Caida y Vuelta</h3>
    <p>Son dos <b>movimientos</b> que normalmente van juntos y marcan el cambio de un paso al otro. En algunos <b>bailes</b> las caídas son marcas y enérgicas mientras que en otros son sutiles y delicadas.</p>
    <h3>La Seguidilla</h3>
    <p>Es un paso que se realiza frente a <b>la pareja</b>. El pié que guía va en punta y el que le sigue va arrastrando pasando por en frente, cuando cambias de dirección el pié que guía cambia igualmente.</p>
    <h3>El Zapateo</h3>
    <p>Este es uno de los pasos más vistosos en las <b>danzas folkóricas panameñas</b>, mientras la mujer lo ejecuta con gracia y sutileza, el hombre muestra su fuerza y destreza.</p>
    <h3>El Cruce</h3>
    <p>En este paso, como su nombre lo indica, el hombre y la mujer se cruzan. Cada uno sale de su posición con el pié izquierdo, pasando de espaldas al lado de la pareja. Se cuentan cuatro pasos hacia adelante y cuatro pasos hacia atras.</p>
  </hgroup>
 </section>
</main>
`

