import yo from 'yo-yo'

export default function (imagen) {
 var el = yo`
  <picture class="banner">
   <source media="(min-width: 801px)" srcset="images/${imagen}Full-1x.jpg 1x, images/${imagen}Full-2x.jpg 2x">
   <source media="(min-width: 541px)" srcset="images/${imagen}Tab-1x.jpg 1x, images/${imagen}Tab-2x.jpg 2x">
   <source media="(min-width: 10px)" srcset="images/${imagen}Cel-1x.jpg 1x, images/${imagen}Cel-2x.jpg 2x">
   <img class="completa" src="images/${imagen}Cel.jpg" alt="Bailes Típicos de Panamá, Baile Congo">
  </picture>
 `
 return el
}