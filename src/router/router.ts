import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/paper/:id",
      name: "paper",
      component: () => import("../views/PaperView.vue"),
    },
  ],
});

export default router;
