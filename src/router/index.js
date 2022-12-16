import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
];
const base = process.env.NODE_ENV === "production" ? "/vue_nft_sample/" : "/";
const router = createRouter({
  history: createWebHistory(base),
  routes,
});

export default router;
