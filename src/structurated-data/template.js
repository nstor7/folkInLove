import yo from 'yo-yo'

export default function(producto){
 var el = yo`
 <script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "Product",
  "name": "${producto.nombre}",
  "image": [
    "${producto.imagenFull}"
   ],
  "description": "${producto.descripcion}",
  "brand": {
    "@type": "Thing",
    "name": "Folk in Love"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "89"
  }
</script>
 `
 return el
}

