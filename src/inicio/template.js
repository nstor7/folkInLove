import yo from 'yo-yo'
import banner from '../inicioBanner'
import about from '../inicioAbout'
import artesanas from '../artesanas'

module.exports = yo`
  <main class="home">
    ${banner}
    ${about}
    <section class="fondo2">
      <h2>Denuevo</h2>
    </section>
  </main>
`
