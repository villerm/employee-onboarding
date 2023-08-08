import { createRouter, createWebHistory } from "vue-router";
import BaseView from "@/views/BaseView.vue";

// Router meta typings
// https://router.vuejs.org/guide/advanced/meta.html#typescript
declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: BaseView,
      redirect: "/",
      children: [
        {
          path: "/",
          name: "homepage",
          component: () => import("@/views/HomePage.vue"),
          meta: {
            public: true,
          },
        },
        {
          path: "job-offer",
          component: () => import("@/components/JobOffer.vue"),
          meta: {
            public: true,
            isAuthenticationView: true,
          },
        },
      ],
    },
  ],
});

export default router;
