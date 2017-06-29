import yo from 'yo-yo'
import banner from '../banner'
import about from '../homeAbout'
import artesanas from '../artesanas'

module.exports = yo`
  <main class="home">
    ${banner}
    <section class="linea">
      <div class="cuadro red"></div>
      <div class="cuadro blue"></div>
    </section>
    <section class="fondo2">
      <h2>Denuevo</h2>
    </section>
  </main>
`
