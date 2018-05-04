const express = require('express')
const danzas = express.Router()
const bailes = require('./src/danzas/danzas')

danzas.use(express.static('public'))

danzas.get('/', function(req, res){
 res.render('index.pug', {
  link: 'https://www.folkinlovepty.com/danzas/',
  title: 'Folk in Love - Bailes Típicos de Panamá',
  description: 'Los Bailes típicos de Panamá son uno de los elementos más importantes de la identidad panameña. Clasificación de las danzas folklóricas por región. ',
  keywords: 'Danzas de Panamá, Bailes Típicos, Pasos de Baile'
  })
})

danzas.get('/:nombre', function(req, res){
 var baile = bailes.find(function(baile){
   return baile.url === req.params.nombre
 })
 res.render('index.pug', {
  title: 'Folk in Love - ' + baile.nombre,
  description: baile.reseña.substring(0, 160),
  image: 'https://folkinlovepty.com/images/' + baile.miniatura
})
})

module.exports = danzas