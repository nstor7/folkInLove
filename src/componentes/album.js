import yo from 'yo-yo'

module.exports = function(imagenes){
 var el = yo`
  <article class="tercio album">
    <div class="imagenCentral">Soy una imagen central</div>
    <div class="galeria">
      <a href="" class="miniatura">soy una miniatura</a>
      <a href="" class="miniatura">soy una miniatura</a>
      <a href="" class="miniatura">soy una miniatura</a>
    </div>
  </article>
 `
 return el
}