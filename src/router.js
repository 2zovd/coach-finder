import {
  createRouter,
  createWebHistory
} from 'vue-router'
import CoachDetail from './pages/coaches/CoachDetail'
import CoachesList from './pages/coaches/CoachesList'
import CoachRegistration from './pages/coaches/CoachRegistration'
import ContactCoach from './pages/requests/ContactCoach'
import RequestsRecieved from './pages/requests/RequestsRecieved'
import NotFound from './pages/NotFound'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{
        path: 'contact', // /coaches/c1/contact
        component: ContactCoach
      }]
    },
    {
      path: '/register',
      component: CoachRegistration
    },
    {
      path: '/request',
      component: RequestsRecieved
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})

export default router;