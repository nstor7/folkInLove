const express = require('express')
const vestuarios = express.Router()
const vestidos = require('./src/vestuarios/vestuarios')

vestuarios.use(express.static('public'))

vestuarios.get('/', function(req, res){
 res.render('index.pug', {
   title: 'Folk in Love - Vestuarios',
   description: 'En Folk in love nos dedicamos a la investigación, difusión, promoción y conservación del folklore Panameño, queremos ofrecer un espacio en donde se pueda encontrar información de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes del folklore.',
   keywords: 'Investigación, folklore, folclore, folclor, vestuario, vestido tipico, Costumbres de Panamá, República de Panamá, Colón , Azuero, Cultura, panama, pollera, tembleques,'
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