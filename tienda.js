const express = require('express')
const tienda = express.Router()

tienda.use(express.static('public'))

tienda.get('/', function(req, res){
 res.render('index.pug', {
  link: 'https://www.folkinlovepty.com/tienda/',
  title: 'Tienda Folk in Love: fotografías en vestidos folklóricos, productos tradicionales para comprar o alquilar',
  description: 'Los productos y servicios de Folk in Love están pensados para acercarte al folklore panameño. Queremos hacer posible que tengas una experiencia cercana a las costumbres y tradiciones de nuestro país.',
  schemaType: 'Article',
  schemaImage: 'https://www.folkinlovepty.com/images/pollera-lujo-losantos-tienda-portada-full.jpg',
  image: 'https://www.folkinlovepty.com/images/pollera-lujo-losantos-tienda-portada-full.jpg',
  schemaPublished: '2018-5-01T03:41:00+03:41',
  schemaModified: '2018-5-05T03:41:00+03:41'
 })
})
tienda.get('/:nombre', function(req, res){
 res.render('index.pug')
})

module.exports = tienda