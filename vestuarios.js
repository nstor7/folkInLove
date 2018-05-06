const express = require('express')
const vestuarios = express.Router()
const vestidos = require('./src/vestuarios/vestuarios')

vestuarios.use(express.static('public'))

vestuarios.get('/', function(req, res){
 res.render('index.pug', {
   title: 'Folk in Love - Vestidos Típicos de Panamá',
   description: 'Los vestidos típicos de Panamá incluyen algunos de los más hermosos del mundo. Los trajes típicos ayudan a reflejar y preservar la identidad de cada región del país.',
   link: 'https://www.folkinlovepty.com/vestuarios/',
   image: 'https://www.folkinlovepty.com/images/vestuarios-full.jpg',
   schemaType: 'Article',
   schemaImages: ['https://www.folkinlovepty.com/images/vestuarios-full.jpg'],
   schemaPublished: '2017-10-016T00:00:00+00:00',
   schemaModified: '2018-5-05T03:41:00+03:41'
 })
})
vestuarios.get('/:nombre', function(req, res){
 var vestido = vestidos.find(function(vestido){
   return vestido.url === req.params.nombre
 })
 res.render('index.pug', {
  title: 'Folk in Love - ' + vestido.nombre,
  description: vestido.general.substring(0, 160),
  keywords: 'Vestidos típicos, pollera, tembleques, matrimonio ocueño, san Sebastián de ocu, herrera, azuero, Pedrarias Dávila, españoles, conquista, nata de los caballeros, republica de panamá chitre, ocu,bual, coquito. Tela, pollera blanca, organza enjaretado, empollerada cadena chata, bruja, guachapali'
})
})

module.exports = vestuarios