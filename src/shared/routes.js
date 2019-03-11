import Inicio from './Inicio/index'
import Contacto from './contacto'
import Danzas from './danzas'


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
  }
]

export default routes