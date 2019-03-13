import Inicio from './Inicio/index'
import Contacto from './contacto'
import Danzas from './danzas'
import Danza from './danza'
import Vestuarios from './vestuarios'
import Vestuario from './vestuario'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Inicio,
    seo: {
      title: 'SSR with RR'
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
  }
]

export default routes