import yo from 'yo-yo'
import banner from '../inicioBanner'
import about from '../inicioAbout'
import artesanas from '../artesanas'
import identidad from '../inicioIdentidad'
import apoyo from '../inicioApoyo'

module.exports = yo`
  <main class="home">
    ${banner}
    ${about}
    ${identidad}
    ${apoyo}
  </main>
`
