const config = require('./config')
const app = require('./app')

  app.listen(config.port, () => {
   console.log(`Api Rest corriendo en el puerto ${config.port}`)
  })

