import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

import Cars from "../views/Cars.vue";
import NewCar from "../views/NewCar.vue";
import CarDetail from "../views/CarDetail.vue";
import CarDelete from "../views/CarDelete.vue";

import CarBrands from "../views/CarBrands.vue";
import NewCarBrand from "../views/NewCarBrand.vue";
import CarBrandDetail from "../views/CarBrandDetail.vue";
import CarBrandDelete from "../views/CarBrandDelete.vue";

import CarTypes from "../views/CarTypes.vue";
import NewCarType from "../views/NewCarType.vue";
import CarTypeDetail from "../views/CarTypeDetail.vue";
import CarTypeDelete from "../views/CarTypeDelete.vue";


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
    path: "/new-car",
    name: "NewCar",
    component: NewCar,
  },
  {
    path: "/car/:carId",
    name: "CarDetail",
    component: CarDetail,
  },
  {
    path: "/delete-car/:carId",
    name: "CarDelete",
    component: CarDelete,
  },

  {
    path: "/car-brands",
    name: "CarBrands",
    component: CarBrands,
  },
  {
    path: "/new-car-brand",
    name: "NewCarBrand",
    component: NewCarBrand,
  },
  {
    path: "/car-brand/:carBrandId",
    name: "CarBrandDetail",
    component: CarBrandDetail,
  },
  {
    path: "/delete-car-brand/:carBrandId",
    name: "CarBrandDelete",
    component: CarBrandDelete,
  },

  {
    path: "/car-types",
    name: "CarTypes",
    component: CarTypes,
  },
  {
    path: "/new-car-type",
    name: "NewCarType",
    component: NewCarType,
  },
  {
    path: "/car-type/:carTypeId",
    name: "CarTypeDetail",
    component: CarTypeDetail,
  },
  {
    path: "/delete-car-type/:carTypeId",
    name: "CarTypeDelete",
    component: CarTypeDelete,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
