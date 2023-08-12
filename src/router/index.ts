import { createRouter, createWebHistory } from "vue-router";
import ApplicantView from "@/views/ApplicantView.vue";

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
      component: ApplicantView,
      redirect: "/",
      children: [
        {
          path: "/",
          name: "homepage",
          component: () => import("@/views/HomePage.vue"),
          meta: {
            public: true,
            title: "Nothing found",
          },
        },
        {
          path: "/job-offer/:token",
          name: "offerPage",
          component: () => import("@/views/OfferView.vue"),
          meta: {
            public: true,
            title: "Tööpakkumine",
          },
        },
        {
          path: "/new-employee-form/:token",
          name: "employeeForm",
          component: () => import("@/views/EmployeeForm.vue"),
          meta: {
            public: true,
            title: "Uue töötaja isikuandmete ankeet",
          },
        },
        {
          path: "/",
          name: "thanksPage",
          component: () => import("@/views/ThankYou.vue"),
          meta: {
            public: true,
            title: "Andmed edastatud",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta?.title ? to.meta?.title : "Employee onboarding"}`;
  next();
});

export default router;
