import yo from 'yo-yo'
import about from './about'
import tarjeta from './tarjeta'

module.exports = function(articulos){
  var el = yo`
<section class="w3-content pad" style="max-width:1400px">
  <div class="w3-row">
    <div class="w3-col l8 s12">
      ${articulos.map(function(articulo){
        return tarjeta(articulo)
      })}
    </div>
    <div class="w3-col l4">
      ${about}
    </div>
  </div>
</section>
`
return el}