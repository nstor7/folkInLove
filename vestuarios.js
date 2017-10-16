const express = require('express')
const vestuarios = express.Router()

vestuarios.use(express.static('public'))

vestuarios.get('/', function(req, res){
 res.render('index.pug')
})
vestuarios.get('/:nombre', function(req, res){
 res.render('index.pug')
})

module.exports = vestuarios