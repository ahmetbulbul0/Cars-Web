<script>

import axios from 'axios';
import Header from './components/Header.vue';
import TableLoadingSpinner from "./components/TableLoadingSpinner.vue";

export default {
    data() {
        return {
            cars: [],
            carTypes: [],
            carBrands: [],
            fetchedCars: false,
            fetchedCarTypes: false,
            fetchedCarBrands: false
        };
    },
    mounted() {
        this.fetchCars();
        this.fetchCarTypes();
        this.fetchCarBrands();
    },
    methods: {
        fetchCars() {
            axios.get('http://127.0.0.1:8000/api/car', {
                params: {
                    limit: 5
                }
            })
                .then(response => {
                    this.cars = response.data.data;
                    this.fetchedCars = true
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchCarTypes() {
            axios.get('http://127.0.0.1:8000/api/car-type', {
                params: {
                    limit: 5
                }
            })
                .then(response => {
                    this.carTypes = response.data.data;
                    this.fetchedCarTypes = true
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchCarBrands() {
            axios.get('http://127.0.0.1:8000/api/car-brand', {
                params: {
                    limit: 5
                }
            })
                .then(response => {
                    this.carBrands = response.data.data;
                    this.fetchedCarBrands = true
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    components: {
        Header,
        TableLoadingSpinner
    },
};

</script>

<template>
    <div class="w-full h-full flex justify-center items-center my-6">
        <div class="w-2/3">
            <Header />

            <div class="w-full flex justify-between items-start">
                <div class="w-auto bg-gray-50 mt-4 rounded-md px-2">
                    <h5 class="px-4 py-2 text-base font-semibold text-gray-700 bg-white mt-2 rounded-t-md">Cars</h5>
                    <table class="table-auto w-full">
                        <thead class="text-sm font-semibold capitalize text-gray-400">
                            <tr>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-4/12">
                                    <div class="font-semibold text-left">name</div>
                                </th>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-3/12">
                                    <div class="font-semibold text-left">type</div>
                                </th>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-3/12">
                                    <div class="font-semibold text-left">brand</div>
                                </th>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-2/12">
                                    <div class="font-semibold text-left">action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-200 capitalize">
                            <TableLoadingSpinner :fetchedData="fetchedCars" />
                            <tr v-for="item in cars" :key="item.id">
                                <td class="py-3 px-8 whitespace-nowrap">
                                    <div class="text-left font-medium text-gray-950">{{ item.name }}</div>
                                </td>
                                <td class="py-3 px-8 whitespace-nowrap">
                                    <div class="text-left font-medium text-gray-800">{{ item.brand.name }}</div>
                                </td>
                                <td class="py-3 px-8 whitespace-nowrap">
                                    <div class="text-left font-medium text-gray-500">{{ item.type.name }}</div>
                                </td>
                                <td class="py-3 px-8 whitespace-nowrap flex justify-start items-center gap-2">
                                    <RouterLink :to="{ name: 'CarDetail', params: { carId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="eye"></ion-icon>
                                    </RouterLink>

                                    <RouterLink :to="{ name: 'EditCar', params: { carId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="create"></ion-icon>
                                    </RouterLink>

                                    <RouterLink :to="{ name: 'CarDelete', params: { carId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="trash"></ion-icon>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="w-full flex justify-end items-center px-4 pb-4 pt-2">
                        <RouterLink :to="{ name: 'Cars' }" class="text-sm text-gray-400 hover:underline">See All More
                        </RouterLink>
                    </div>
                </div>

                <div class="w-auto bg-gray-50 mt-4 rounded-md px-2">
                    <h5 class="px-4 py-2 text-base font-semibold text-gray-700 bg-white mt-2 rounded-t-md">Car Types
                    </h5>
                    <table class="table-auto w-full">
                        <thead class="text-sm font-semibold capitalize text-gray-400">
                            <tr>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-10/12">
                                    <div class="font-semibold text-left">name</div>
                                </th>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-2/12">
                                    <div class="font-semibold text-left">action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-200 capitalize">
                            <TableLoadingSpinner :fetchedData="fetchedCarTypes" />
                            <tr v-for="item in carTypes" :key="item.id">
                                <td class="py-3 px-8 whitespace-nowrap">
                                    <div class="text-left font-medium text-gray-950">{{ item.name }}</div>
                                </td>
                                <td class="py-3 px-8 whitespace-nowrap flex justify-start items-center gap-2">
                                    <RouterLink :to="{ name: 'CarTypeDetail', params: { carTypeId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="eye"></ion-icon>
                                    </RouterLink>

                                    <RouterLink :to="{ name: 'EditCarType', params: { carTypeId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="create"></ion-icon>
                                    </RouterLink>

                                    <RouterLink :to="{ name: 'CarTypeDelete', params: { carTypeId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="trash"></ion-icon>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="w-full flex justify-end items-center px-4 pb-4 pt-2">
                        <RouterLink :to="{ name: 'CarTypes' }" class="text-sm text-gray-400 hover:underline">See All More
                        </RouterLink>
                    </div>
                </div>

                <div class="w-auto bg-gray-50 mt-4 rounded-md px-2">
                    <h5 class="px-4 py-2 text-base font-semibold text-gray-700 bg-white mt-2 rounded-t-md">Car Brands
                    </h5>
                    <table class="table-auto w-full">
                        <thead class="text-sm font-semibold capitalize text-gray-400">
                            <tr>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-10/12">
                                    <div class="font-semibold text-left">name</div>
                                </th>
                                <th class="py-2 px-8 whitespace-nowrap border-b-2 w-2/12">
                                    <div class="font-semibold text-left">action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-200 capitalize">
                            <TableLoadingSpinner :fetchedData="fetchedCarBrands" />
                            <tr v-for="item in carBrands" :key="item.id">
                                <td class="py-3 px-8 whitespace-nowrap">
                                    <div class="text-left font-medium text-gray-950">{{ item.name }}</div>
                                </td>
                                <td class="py-3 px-8 whitespace-nowrap flex justify-start items-center gap-2">

                                    <RouterLink :to="{ name: 'CarBrandDetail', params: { carBrandId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="eye"></ion-icon>
                                    </RouterLink>

                                    <RouterLink :to="{ name: 'EditCarBrand', params: { carBrandId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="create"></ion-icon>
                                    </RouterLink>

                                    <RouterLink :to="{ name: 'CarBrandDelete', params: { carBrandId: item.id } }"
                                        class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                        <ion-icon name="trash"></ion-icon>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="w-full flex justify-end items-center px-4 pb-4 pt-2">
                        <RouterLink :to="{ name: 'CarBrands' }" class="text-sm text-gray-400 hover:underline">See All More
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
</div></template>