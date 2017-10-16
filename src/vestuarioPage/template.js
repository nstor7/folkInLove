import yo from 'yo-yo'
import album from '../componentes/album'
import estructura from './estructura'

module.exports = function(vestuarios, ident){
 var el = yo`
 <div>
  ${vestuarios.map(function(vestuario){
   if(vestuario.url == ident){
     return estructura(vestuario)
   }
  })
  }
 </div>
 `
 return el
}

