const express = require('express')
const danzas = express.Router()

danzas.use(express.static('public'))

danzas.get('/', function(req, res){
 res.render('index.pug', {
  title: 'Folk in Love - Danzas',
  description: 'En Folk in love nos dedicamos a la investigación, difusión, promoción y conservación del folklore Panameño, queremos ofrecer un espacio en donde se pueda encontrar información de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes del folklore.',
  keywords: 'Investigación, folklore, folclore, folclor, vestuario, vestido tipico, Costumbres de Panamá, República de Panamá, Colón , Azuero, Cultura, panama, danzas, celebraciones'
})
})

danzas.get('/:nombre', function(req, res){
 res.render('index.pug', {
  title: 'Folk in Love - ' + req.params.nombre,
  description: 'En Folk in love nos dedicamos a la investigación, difusión, promoción y conservación del folklore Panameño, queremos ofrecer un espacio en donde se pueda encontrar información de calidad respaldada por investigaciones y fuentes confiables que puedan servir de referencia para bailarines, maestros, vestuaristas, estudiantes y amantes del folklore.',
  keywords: 'Bailes típicos, danzas, Panamá, Celebraciones, punto santeño, baile del punto, música del punto, elegancia, baile en pareja. Dora Pérez de zarate, paseo, zapateo, escobillao, seguidilla, costumbres de Panamá'
})
})

module.exports = danzas