import React from 'react'
import Tarjeta from '../tarjeta'

export default function lista (){
 const danzas = [
  {
   metaTitle: 'El Punto Santeño, el baile típico más elegante de Panamá.',
   metaDescription: 'El Punto Santeño. En este artículo 📄 hablamos sobre el baile folklórico que es considerado el más elegante 💎 de Panamá 🇵🇦. su estructura musical 🎼 y sus pasos',
   miniatura: 'images/puntoMiniatura.jpg',
   region: 'Azuero', 
   dato: 'Vestuario: Pollera De Lujo',
   imagenOpenGraph: 'puntoOpenGraph.jpg',
   nombre: 'El Punto Santeño',
   url: 'danzas/El-Punto-Santeno',
   reseña: 'El Punto Santeño es un género musical y a su vez un baile. Es considerado como uno de los más bellos y elegantes de todo el Istmo de Panamá; es ejecutado por una sola pareja y tiene como característica principal la elegancia y el donaire con la que el hombre y la mujer se mueven durante su ejecución.',
   portadaImagen: 'puntoPortada',
   intro: (
    <hgroup>
     <p><i>“Después del tamborito, el baile de parejas individual más atractivo es el PUNTO en el cual la pareja hace gala de donaire, precisión y gracia. Parece de pura ascendencia hispánica a juzgar por la música que lo acompaña.</i></p>
     <p><i>El baile de PUNTO no es baile de toda una noche como puede serio el Tamborito y la Cumbia; el Pindín y la Mejorana. Se baila más bien como una demostración atractiva entre los minutos de descanso de un baile, para regalo de los ojos y goce del espíritu de la concurrencia a una fiesta.”</i></p>
     <p>Dora Pérez de Zarate</p>
    </hgroup>
   ),
   introImagen: '/images/puntoIntro.jpg',
   descripcion: (
    <hgroup>
     <h2>Descripción del Punto Santeño</h2>
     <p> <b>El punto</b> consta de una serie de pasos (que describiremos a continuación) los cuales se repiten 3 veces <i>"tiempos"</i> en el mismo orden. A cada repetición le llamamos tiempos o vueltas musicales. Una de sus características particulares se lleva a cabo durante el zapateo ya que en cada uno (son 3) la pareja bailará en una dirección diferente. En el primer tiempo la pareja realizará el zapateo frente a frente, en el segundo tiempo se dirigirán hacia los músicos (es común en los conjuntos folklóricos dirigir el zapateo en otra dirección cuando no se baila con músicos en vivo) y en el último tiempo se dirige hacia el público.</p>
     <p>Cada paso durante la ejecución del Punto Santeño no tiene una duración definida, es el cambio de la música la que indicará el paso a la siguiente figura.</p>
     <p>Inicia con <b>El PASEO</b>, es el paso de baile en el que el varón y la dama describen un amplio círculo, ocupando cada uno de los extremos.</p>
     <p>Al cambio de la música se ejecuta una caída y vuelta pasando al <b>ZAPATEO</b> en el cual los bailadores, dependiendo del tiempo lo ejecutan, frente a frente, a la música o al público.</p>
     <p>En seguida, otro cambio de la música les advierte que deben realizar el tercer movimiento, <b>EL ESCOBILLAO</b>, que separa ampliamente a la pareja y  se ejecuta con rápidos movimientos de los pies hacia atrás.</p>
     <p>Por último, también a indicación de la música, se realiza una caida y vuelta para pasar a la <b>SEGUIDILLA</b> con la cual la pareja se desplaza acercándose el uno al otro para girar con mucha serenidad y finura en el centro del círculo hasta que se indique el cambio y comience con una vuelta paseada el siguiente tiempo con el <b>PASEO</b>.</p>
     <p>Al finalizar el tercer tiempo, la mujer realiza un medio giro para quedar frente al público en un cierre que puede ser con el parejo arrodillado o de pié tapandole el rostro con el sombrero simulando un beso.</p>
     <p>Es Común que al ver a la pareja ejecutar tan hermoso baile los espectadores lancen monedas por el suelo; costumbre que hoy podemos ver en las fiestas cuando las quinceañeras o reinas bailan el punto.</p>
    </hgroup>
   )
   ,
   pasos: ['Paseo', 'Caida y vuelta', 'Zapateo', 'Escobillao', 'Seguidilla', 'Vuelta Paseada'],
   pasosImagen: '/images/puntoPasos.jpg',
   referencias: (
    <hgroup>
    <h2>Referencias Sobre El Punto Santeño</h2>
    <ul>
    <li>Extracto de "EL PUNTO, LA DENESA, EL ATRAVESADO Y OTROS BAILES ORQUESTADOS". Dora Pérez de Zárate. 198</li>
    </ul>
   </hgroup>
   )
  }
 ]

 const Listado = () => 
  danzas.map((danza) => Tarjeta(danza)
  )
  return <Listado/>
}
