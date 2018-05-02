import empty from 'empty-element'
import template from './template'
import catalogo from '../tienda/catalogo'

export default function(variable){
 var body = document.getElementById('body')
 var script = document.getElementById('script')
 body.insertBefore(template(variable), script)
}
