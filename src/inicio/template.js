import yo from 'yo-yo'
import banner from './banner'
import about from './about'
import identidad from './identidad'
import apoyo from './apoyo'

module.exports = yo`
  <main class="home">
    ${banner}
    ${about}
    ${identidad}
    ${apoyo}
  </main>
`
