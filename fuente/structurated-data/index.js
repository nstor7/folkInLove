import empty from 'empty-element'
import template from './template'
import catalogo from '../tienda/catalogo'

export default function(variable){
 var body = document.getElementById('head')
 var script = document.getElementById('script')
 body.insertBefore(template(variable), script)
}
