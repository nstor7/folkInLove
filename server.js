const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/*', function(req, res){
 res.render('index.pug')
})


app.listen(3000, function(err){
 if(err) return console.log('Hubo un Error'), process.exit(1)

 console.log('Sumergida Producciones escuchando en el puerto 3000')
})
