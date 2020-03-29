const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/PageTodo.vue") },
      {
        path: "/settings",
        name: "settings",
        component: () => import("pages/PageSettings.vue")
      },
      {
        path: "/settings/help",
        name: "help",
        component: () => import("pages/PageHelp.vue")
      },
      ,
      {
        path: "/auth",
        name: "auth",
        component: () => import("pages/PageAuth.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
