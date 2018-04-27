import empty from 'empty-element'
import template from './template'
import catalogo from '../tienda/catalogo'

export default function(producto){
 var body = document.getElementById('body')
 var script = document.getElementById('script')
 body.insertBefore(template(producto), script)
}
