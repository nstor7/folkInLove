const express = require('express')
const danzas = express.Router()
const bailes = require('./src/danzas/danzas')

danzas.use(express.static('public'))

danzas.get('/', function(req, res){
 res.render('index.pug', {
  link: 'https://www.folkinlovepty.com/danzas/',
  title: 'Folk in Love - Bailes Típicos de Panamá',
  description: 'Los Bailes típicos de Panamá son uno de los elementos más importantes de la identidad panameña. Clasificación de las danzas folklóricas por región. ',
  keywords: 'Danzas de Panamá, Bailes Típicos, Pasos de Baile',
  schemaType: 'Article',
  schemaImages:['https://www.folkinlovepty.com/images/danzas-full.jpg'],
  schemaPublished: '2017-10-016T00:00:00+00:00',
  schemaModified: '2018-5-05T03:41:00+03:41',

  })
})

danzas.get('/:nombre', function(req, res){
 var baile = bailes.find(function(baile){
   return baile.url === req.params.nombre
 })
 res.render('index.pug', {
  title: 'Folk in Love - ' + baile.nombre,
  description: baile.reseña.substring(0, 160),
  image: 'https://www.folkinlovepty.com/images/' + baile.imagenOpenGraph
})
})

module.exports = danzas