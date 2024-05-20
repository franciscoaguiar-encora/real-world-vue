import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/event/Layout.vue'
import AboutView from '../views/AboutView.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
        },
      ],
    },
    {
      path: '/event/:id',
      redirect: () => {
        return { name: 'event-details' }
      },
      children: [
        { path: 'register', redirect: () => ({ name: 'event-register' }) },
        { path: 'edit', redirect: () => ({ name: 'event-edit' }) },
      ],

      //     {
      //   path: '/event/:afterEvent(.*)',
      //   redirect: to => {
      //     return { path: '/events/' + to.params.afterEvent }
      //   }
      // },
    },
  ],
})

export default router
