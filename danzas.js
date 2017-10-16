const express = require('express')
const danzas = express.Router()

danzas.use(express.static('public'))

danzas.get('/', function(req, res){
 res.render('index.pug')
})

danzas.get('/:nombre', function(req, res){
 res.render('index.pug')
})

module.exports = danzas