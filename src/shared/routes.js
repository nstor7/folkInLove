import Inicio from './Inicio'
import Contacto from './contacto/index'
import Danzas from './danzas'
import Danza from './danza'
import Vestuarios from './vestuarios'
import Vestuario from './vestuario'
import Tienda from './tienda'
import Producto from './producto'
import Catalogo from './tienda/catalogo'
import bailes from './danzas/danzas'
import Trajes from './vestuarios/vestuarios'
import Confirmacion from './contacto/confirmacion'


const routes =  [
  {
    path: '/',
    exact: true,
    component: Inicio,
    seo:() =>{
      return {
        link: 'https://www.folkinlovepty.com',
        title: 'Folk in Love - Investigación y Difusión del Folklore de Panamá',
        description: 'En Folk in love nos dedicamos a la investigación, difusión, promoción y conservación del folklore Panameño.',
        keywords: 'folklore panameño, costumbres, tradidiones, panama, orígenes, Panamá',
        schemaType: 'Article',
        schemaImages: [
         "https://folkinlovepty.com/images/trajes-tipicos-panama-banner-full-2x.jpg",
         "https://folkinlovepty.com/images/moneda-coronada-full.jpg",
         "https://folkinlovepty.com/images/pollera-gala-ocu-identidad-full.jpg"
         ],
        schemaPublished: '2017-10-016T00:00:00+00:00',
        schemaModified: '2018-05-02T09:20:00+08:00'
      }
    } 
  },
  {
    path: '/contacto',
    exact: true,
    component: Contacto,
    seo: () => {
      return{
        title: 'Contactenos Para Cualquier consulta o producto que le interese'
      }
    },
    chimpScript: `<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[3]='MMERGE3';ftypes[3]='radio'; /*
                       * Translated default messages for the $ validation plugin.
                       * Locale: ES
                       */
                      $.extend($.validator.messages, {
                        required: "Este campo es obligatorio.",
                        remote: "Por favor, rellena este campo.",
                        email: "Por favor, escribe una dirección de correo válida",
                        url: "Por favor, escribe una URL válida.",
                        date: "Por favor, escribe una fecha válida.",
                        dateISO: "Por favor, escribe una fecha (ISO) válida.",
                        number: "Por favor, escribe un número entero válido.",
                        digits: "Por favor, escribe sólo dígitos.",
                        creditcard: "Por favor, escribe un número de tarjeta válido.",
                        equalTo: "Por favor, escribe el mismo valor de nuevo.",
                        accept: "Por favor, escribe un valor con una extensión aceptada.",
                        maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
                        minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
                        rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
                        range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
                        max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
                        min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
                      });}(jQuery));var $mcj = jQuery.noConflict(true);</script>

                      `
    
  },
  {
    path: '/danzas',
    exact: true,
    component: Danzas,
    seo: () =>{
      return {
        link: 'https://www.folkinlovepty.com/danzas/',
        title: 'Folk in Love - Bailes Típicos de Panamá',
        description: 'Los Bailes típicos de Panamá son uno de los elementos más importantes de la identidad panameña. Clasificación de las danzas folklóricas por región. ',
        keywords: 'Danzas de Panamá, Bailes Típicos, Pasos de Baile',
        image: 'https://www.folkinlovepty.com/images/danzasOpenGraph.jpg',
        schemaType: 'Article',
        schemaImages:['https://www.folkinlovepty.com/images/danzas-full.jpg'],
        schemaPublished: '2017-10-016T00:00:00+00:00',
        schemaModified: '2018-5-05T03:41:00+03:41'
      
        }
    } 
  },
  {
    path: '/danzas/:url',
    component: Danza,
    seo: (enlace)=>{
      var danza = bailes.find((baile) => baile.url === enlace)
      return {
        link: `https://www.folkinlovepty.com/${danza.url}`,
        title: `${danza.metaTitle}`,
        description: `${danza.metaDescription}`,
        image: `https://www.folkinlovepty.com/images/${danza.imagenOpenGraph}`,
        schemaType: 'Article',
        schemaImages:[
          `https://www.folkinlovepty.com/${danza.portadaImagen}`,
          `https://www.folkinlovepty.com/${danza.introImagen}`,
          `https://www.folkinlovepty.com/${danza.pasosImagen}`
      ],
        schemaPublished: '2017-10-016T00:00:00+00:00',
        schemaModified: '2018-5-05T03:41:00+03:41'
      }
    }
  },
  {
    path: '/vestuarios',
    exact: true,
    component: Vestuarios,
    seo: () => {
      return {
        title: 'Folk in Love - Vestidos Típicos de Panamá',
        description: 'Los vestidos típicos de Panamá incluyen algunos de los más hermosos del mundo. Los trajes típicos ayudan a reflejar y preservar la identidad de cada región del país.',
        link: 'https://www.folkinlovepty.com/vestuarios/',
        image: 'https://www.folkinlovepty.com/images/vestuarios-full.jpg',
        schemaType: 'Article',
        schemaImages: ['https://www.folkinlovepty.com/images/vestuarios-full.jpg'],
        schemaPublished: '2017-10-016T00:00:00+00:00',
        schemaModified: '2018-5-05T03:41:00+03:41'
      }
    }
  },
  {
    path: '/vestuarios/:url',
    component: Vestuario,
    seo: (enlace)=> {
      var vestido = Trajes.find((vestuario) => vestuario.url === enlace)
      return{
        link: `https://www.folkinlovepty.com/${vestido.url}`,
        title: `${vestido.metaTitle}`,
        description: `${vestido.metaDescription}`,
        image: `https://www.folkinlovepty.com/images/${vestido.miniatura}`,
        schemaType: 'Article',
        schemaImages:[
          `https://www.folkinlovepty.com/${vestido.portadaImagen}`,
          `https://www.folkinlovepty.com/${vestido.generalImagen}`,
          `https://www.folkinlovepty.com/${vestido.joyeroImagen}`
      ],
        schemaPublished: '2017-10-016T00:00:00+00:00',
        schemaModified: '2018-5-05T03:41:00+03:41'
      }
    }
  },
  {
    path: '/tienda',
    exact: true,
    component: Tienda,
    seo:() =>{
      return {
        link: 'https://www.folkinlovepty.com/tienda/',
        title: 'Tienda Folk in Love: fotografías en vestidos folklóricos, productos tradicionales para comprar o alquilar',
        description: 'Los productos y servicios de Folk in Love están pensados para acercarte al folklore panameño. Queremos hacer posible que tengas una experiencia cercana a las costumbres y tradiciones de nuestro país.',
        schemaType: 'Article',
        schemaImages: ['https://www.folkinlovepty.com/images/pollera-lujo-losantos-tienda-portada-full.jpg'],
        image: 'https://www.folkinlovepty.com/images/pollera-lujo-losantos-tienda-portada-full.jpg',
        schemaPublished: '2018-5-01T03:41:00+03:41',
        schemaModified: '2018-5-05T03:41:00+03:41'
       }
    } 
  },
  {
    path: '/tienda/:enlace',
    component: Producto,
    fbEvent: (enlace) =>{
      var product = Catalogo.find((prod) => prod.enlace === enlace)
      return `<script>
                fbq('track', 'ViewContent');
              </script>
              `
              
      },
    seo: (enlace) =>{
      var product = Catalogo.find((prod) => prod.enlace === enlace)
      return {
        link: `https://www.folkinlovepty.com/${product.enlace}`,
        title: `${product.metaTitle}`,
        description: `${product.metaDescripcion}`,
        image: `https://www.folkinlovepty.com/${product.miniaturaFull}`,
        schemaType: 'Article',
        schemaImages: [`https://www.folkinlovepty.com/${product.miniaturaFull}`],
        schemaPublished: '2017-10-016T00:00:00+00:00',
        schemaModified: '2018-5-05T03:41:00+03:41'
       }
      }
    },
    {
      path: '/confirmacion',
      component: Confirmacion,
      exact: true
    }
  
]

export default routes