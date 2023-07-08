import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CarBrands from "../views/CarBrands.vue";
import CarTypes from "../views/CarTypes.vue";

const routes = [
  {
    path: '/',
    name: 'Cars',
    component: Home,
  },
  {
    path: '/car-brands',
    name: 'CarBrands',
    component: CarBrands,
  },
  {
    path: '/car-type',
    name: 'CarTypes',
    component: CarTypes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
