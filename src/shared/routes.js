import Inicio from './Inicio/index'
import Contacto from './contacto'
import Danzas from './danzas'
import Danza from './danza'
import Vestuarios from './vestuarios'
import Vestuario from './vestuario'
import Tienda from './tienda'
import Producto from './producto'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Inicio,
    seo: {
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
  },
  {
    path: '/contacto',
    exact: true,
    component: Contacto,
    seo: {
      title: 'Contactenos Para Cualquier consulta o producto que le interese'
    }
  },
  {
    path: '/danzas',
    exact: true,
    component: Danzas,
    seo: {
      title: 'Danzas'
    }
  },
  {
    path: '/danzas/:url',
    component: Danza,
  },
  {
    path: '/vestuarios',
    exact: true,
    component: Vestuarios
  },
  {
    path: '/vestuarios/:url',
    component: Vestuario,
  },
  {
    path: '/tienda',
    exact: true,
    component: Tienda
  },
  {
    path: '/tienda/:enlace',
    component: Producto
  }
]

export default routes