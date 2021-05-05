import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import MainLayout from "@/layouts/Main";

// import router modules
import baseRoutes from "@/router/modules/base";
import authRoutes from "@/router/modules/auth";
import postRoutes from "@/router/modules/post";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      component: MainLayout,
      path: "",
      children: [...baseRoutes, ...authRoutes, ...postRoutes],
    },
  ],
});

/* 
Set up router Auth Guard
*/
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.auth)) {
    try {
      await store.dispatch("auth/checkAuth");
      return next();
    } catch (e) {
      await store.dispatch("auth/fetchLogout");
      return next("/signin");
    }
  } else {
    return next();
  }
});

export default router;
