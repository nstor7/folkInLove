import yo from 'yo-yo'
import album from '../componentes/album'
import estructura from './estructura'

var template = function(vestuarios, ident){
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

export default template