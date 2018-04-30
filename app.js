const express = require('express')
const app = express()
const danzas = require('./danzas')
const vestuarios = require('./vestuarios')
const mailer = require('express-mailer')
const secret = require('./.secret.js')
const bodyParser = require('body-parser')
const tienda = require('./tienda')

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('/danzas', danzas)

app.use('/vestuarios', vestuarios)

app.use('/tienda',tienda)

app.get('/', function(req, res){
 res.render('index.pug', {
   title: 'Folk in Love - Investigación y Difusión del Folklore de Panamá',
   description: 'En Folk in love nos dedicamos a la investigación, difusión, promoción y conservación del folklore Panameño.',
   keywords: 'folklore panameño, costumbres, tradidiones, panama, orígenes, Panamá'
 })
})
app.get('/contacto', function(req,res){
 res.render('index.pug')
})

app.get('/confirmacion', function(req, res){
 res.render('index.pug')
})

app.get('/error', function(req, res){
  res.render('index.pug')
})
mailer.extend(app, {
 host: 'smtp.gmail.com',
 secureConnection: true, // use SSL
 port: 465, // port for secure SMTP
 transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
 auth: {
   user: secret.mailuser,
   pass: secret.mailpsw
 }
})
app.post('/contacto/send', function (req, res, next) {
 console.log(req.body)
 app.mailer.send('email', {
   to: secret.mailaddress,
   subject: 'email enviado desde la pagina de contacto',
   mensaje: {
     name: req.body.nombre,
     email: req.body.email,
     asunto: req.body.asunto,
     mensaje: req.body.mensaje
   }
 }, function (err) {
   if (err) {
     // handle error
     console.log(err);
     return res.redirect('/error')
   }
   res.redirect('/confirmacion');
 });
})
module.exports = app