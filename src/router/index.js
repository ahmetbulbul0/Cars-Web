import { createRouter, createWebHistory } from "vue-router";
import Cars from "../views/Cars.vue";
import CarDetail from "../views/CarDetail.vue";
import CarBrands from "../views/CarBrands.vue";
import CarBrandDetail from "../views/CarBrandDetail.vue";
import CarTypes from "../views/CarTypes.vue";
import CarTypeDetail from "../views/CarTypeDetail.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cars",
    name: "Cars",
    component: Cars,
  },
  {
    path: "/car/:carId",
    name: "CarDetail",
    component: CarDetail,
  },
  {
    path: "/car-brands",
    name: "CarBrands",
    component: CarBrands,
  },
  {
    path: "/car-types/:carBrandId",
    name: "CarBrandDetail",
    component: CarBrandDetail,
  },
  {
    path: "/car-types",
    name: "CarTypes",
    component: CarTypes,
  },
  {
    path: "/car-types/:carTypeId",
    name: "CarTypeDetail",
    component: CarTypeDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
