import Vue from "vue";
import ga from "vue-ga";
import Router from "vue-router";

import About from "../components/About.vue";
import Changelog from "../components/Changelog.vue";
import FaucetContainer from "../components/FaucetContainer.vue";
import Root from "../components/Root.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Root
    },
    {
      path: "/all",
      component: FaucetContainer
    },
    {
      path: "/currency/:id",
      component: FaucetContainer
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/changelog",
      component: Changelog
    }
  ]
});

if (process.env.NODE_ENV === 'production') {
  ga(router, 'UA-68289020-2')
}

export default router;
