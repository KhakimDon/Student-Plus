import { createRouter, createWebHistory } from "vue-router";

import AuthRoutes from "@/modules/auth/routes";
import { useAuthStore } from "@/modules/auth/store";
import DashboardRoutes from "@/modules/dashboard/routes";
import UserRoutes from "@/modules/user/routes";
import { ACCESS_ACTION, ACCESS_NAME } from "@/types/permission";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    meta: {
      layout: "default",
      auth: false,
    },
    component: () => import("@/layout/LError.vue"),
  },
  ...DashboardRoutes,
  ...AuthRoutes,
  ...UserRoutes,
];

const router = createRouter({
  scrollBehavior(to) {
    if (to?.query) {
      return false;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
  history: createWebHistory("/"),
  routes: routes.map((route) => ({
    ...route,
    meta: {
      // auth: true,
      ...route.meta,
    },
  })),
});

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();

  // const { checkPermission } = usePermission();

  // store.initTokens();

  // if (!to.meta?.auth) {
  //   return next();
  // }
  // try {
  //   if (store.getTokens?.access) {
  //     await store.getProfile();
  //   } else {
  //     return next({ name: "AuthLogin" });
  //   }
  // } catch (err) {
  //   await store.logout();
  //   next({ name: "AuthLogin" });
  //   return;
  // }

  next();
});

declare module "vue-router" {
  interface RouteMeta {
    permission?: {
      name: ACCESS_NAME;
      actions: ACCESS_ACTION[];
    };
  }
}

export default router;
