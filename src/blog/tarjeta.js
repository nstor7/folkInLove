import yo from 'yo-yo'

module.exports = function(articulo){
 var el = yo`
 <div class="w3-card-4 w3-margin w3-white">
 <img src=${articulo.imagen} alt="Norway" style="width:100%">
 <div class="w3-container">
   <h2><b>${articulo.titulo}</b></h2>
   <h5>${articulo.fecha}</h5>
 </div>
 
 <div class="w3-container">
   <p>${articulo.descripcion}</p>
   <div class="w3-row">
     <div class="w3-col m8 s12">
       <p><button class="w3-button w3-padding-large w3-white w3-border"><b>Leer Más »</b></button></p>
     </div>
   </div>
 </div>
 </div>

`
return el
}