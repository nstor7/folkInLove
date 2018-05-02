const express = require('express')
const app = express()
const danzas = require('./danzas')
const vestuarios = require('./vestuarios')
const mailer = require('express-mailer')
const secret = require('./.secret.js')
const bodyParser = require('body-parser')
const tienda = require('./tienda')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('/danzas', danzas)

app.use('/vestuarios', vestuarios)

app.use('/tienda',tienda)

app.get('/', function(req, res){
 res.render('index.pug', {
   link: 'https://www.folkinlovepty.com',
   title: 'Folk in Love - Investigación y Difusión del Folklore de Panamá',
   description: 'En Folk in love nos dedicamos a la investigación, difusión, promoción y conservación del folklore Panameño.',
   keywords: 'folklore panameño, costumbres, tradidiones, panama, orígenes, Panamá',
   estructurados: 'https://www.folkinlovepty.com/estructurados-inicio'
 })
})
app.get('/estructurados-inicio', function(req, res){
  res.send(
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://folkinlovepty.com/"
      },
      "headline": "Article headline",
      "image": [
        "https://folkinlovepty.com/images/trajes-tipicos-panama-banner-full-2x.jpg",
        "https://folkinlovepty.com/images/moneda-coronada-full.jpg",
        "https://folkinlovepty.com/images/pollera-gala-ocu-identidad-full.jpg"
       ],
      "datePublished": "2017-10-016T00:00:00+00:00",
      "dateModified": "2018-05-02T09:20:00+08:00",
      "author": {
        "@type": "Person",
        "name": "Cinthia González"
      },
       "publisher": {
        "@type": "Organization",
        "name": "Folk in Love",
        "logo": {
          "@type": "ImageObject",
          "url": "https://folkinlovepty.com/images/folkInLove-logo.png"
        }
      },
      "description": "A most wonderful article"
     }
  )
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