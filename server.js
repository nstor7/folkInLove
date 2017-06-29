const mongoose = require('mongoose')
const config = require('./config')
const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/*', function(req, res){
 res.render('index.pug')
})

// mongoose.connect(config.db, (err, res) => {
//   if(err) {
//     console.log('error al conectar a la base de datos')
//   }
//   console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, () => {
   console.log(`Api Rest corriendo en el puerto ${config.port}`)
  })
// })
