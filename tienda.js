const express = require('express')
const tienda = express.Router()

tienda.use(express.static('public'))

tienda.get('/', function(req, res){
 res.render('index.pug')
})
tienda.get('/:nombre', function(req, res){
 res.render('index.pug')
})

module.exports = tienda