export default function Head(ruta = false, arreglo, props){
 var objeto
 if(ruta)
  return objeto = arreglo.find((obj) => obj.url === props.match.params.url)
  
}