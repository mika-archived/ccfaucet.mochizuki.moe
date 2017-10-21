import Vue from 'vue'
import ga from 'vue-ga'
import Router from 'vue-router'

import About from '@/components/About'
import Root from '@/components/Root'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

if (process.env.NODE_ENV === 'production') {
  ga(router, 'UA-68289020-2')
}

export default router
