import yo from 'yo-yo'
import estructura from './danza'

module.exports = function(danzas, ident){
 var el = yo`
 <div>
 ${danzas.map(function(danza){
  if(danza.url == ident){
    return estructura(danza)
  }
 })
}
 </div>
  
 `
 return el 
}


