// import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail';
// import CoachRegistration from './pages/coaches/CoachRegistration';
// import ContactCoach from './pages/requests/ContactCoach';
// import RequestsRecieved from './pages/requests/RequestsRecieved';
// import UserAuth from './pages/auth/UserAuth';
import CoachesList from './pages/coaches/CoachesList';
import NotFound from './pages/NotFound';
import store from './store/index.js';

const CoachDetail = () => import('./pages/coaches/CoachDetail');

const CoachRegistration = () => import('./pages/coaches/CoachRegistration');

const ContactCoach = () => import('./pages/requests/ContactCoach');

const RequestsRecieved = () => import('./pages/requests/RequestsRecieved');

const UserAuth = () => import('./pages/auth/UserAuth');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact', // /coaches/c1/contact
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/request',
      component: RequestsRecieved,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requireUnauth: true,
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

// Navigation guard
router.beforeEach(function (to, _from, next) {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requireUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
