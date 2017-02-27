import yo from 'yo-yo'
import homeAbout from '../homeAbout'
import banner from '../banner'

module.exports = yo `
  <section class="contenido">
    ${banner}
    ${homeAbout}
  </section>
`
