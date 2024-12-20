export default [
  {
    path: "/login",
    name: "AuthLogin",
    meta: {
      layout: "auth",
    },
    component: () => import("@/modules/auth/pages/Login.vue"),
  },
];
