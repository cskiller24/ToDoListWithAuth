import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    name: "User Authentication",
    redirect: "/login",
    component: () => import("../components/AuthLayout.vue"),
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Auth/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../views/Auth/Register.vue"),
      },
    ],
  },
  {
    name: "Tasks",
    redirect: "/tasks",
    component: () => import("../components/DefaultLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        // show
        path: "/tasks",
        name: "Tasks",
        component: () => import("../views/Tasks/Tasks.vue"),
      },
      {
        // show
        path: "/task/:uuid",
        name: "Task",
        component: () => import("../views/Tasks/Task.vue"),
      },
    ],
  },
  // Path does not exist
  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (to.meta.isGuest && store.state.user.token) {
    next({ name: "Tasks" });
  } else {
    next();
  }
});

export default router;
