import { createRouter, createWebHistory } from "vue-router";
import Cars from "../views/Cars.vue";
import CarBrands from "../views/CarBrands.vue";
import CarTypes from "../views/CarTypes.vue";

const routes = [
  {
    path: "/",
    name: "Cars",
    component: Cars,
  },
  {
    path: "/car-brands",
    name: "CarBrands",
    component: CarBrands,
  },
  {
    path: "/car-types",
    name: "CarTypes",
    component: CarTypes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
