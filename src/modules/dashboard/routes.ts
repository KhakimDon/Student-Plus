export default [
  {
    path: "/",
    redirect: { name: "Dashboard" },
    meta: {
      auth: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      layout: "default",
      auth: true,
    },
    component: () => import("@/modules/dashboard/pages/PDashboard.vue"),
  },
];
