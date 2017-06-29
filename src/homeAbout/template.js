import yo from 'yo-yo'
import homeAbout from '../homeAbout'
import banner from '../banner'
import artesanas from '../artesanas'

module.exports = yo `
  <section class="contenido">
    ${banner}
    ${homeAbout}
    ${artesanas}
  </section>
`
