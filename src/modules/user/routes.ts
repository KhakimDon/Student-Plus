export default [
  {
    path: "/users",
    name: "Users",
    meta: {
      layout: "default",
      // auth: true,
    },
    component: () => import("@/modules/user/pages/PUsers.vue"),
  },
  {
    path: "/users/create",
    name: "UsersCreate",
    meta: {
      layout: "default",
      // auth: true,
    },
    component: () => import("@/modules/user/pages/PCreate.vue"),
  },
  {
    path: "/users/:id",
    name: "UsersSingle",
    meta: {
      layout: "default",
      // auth: true,
    },
    redirect: { name: "UsersSingleAbout" },
    component: () => import("@/modules/user/pages/Single/PSingle.vue"),
    children: [
      {
        path: "",
        name: "UsersSingleAbout",
        component: () =>
          import("@/modules/user/pages/Single/details/PAbout.vue"),
      },
    ],
  },
];
