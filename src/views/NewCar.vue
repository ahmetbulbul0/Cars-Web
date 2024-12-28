<script>

import axios from 'axios';
import Header from './components/Header.vue';
import { ref } from 'vue';
import store from '../store';

export default {
    data() {
        return {
            carTypes: null,
            carBrands: null,
            carFeatures: null,
            modelName: ref(null),
            typeId: ref(0),
            brandId: ref(0),
            productionYear: ref(null),
            color: ref(null),
            engineType: ref(null),
            horsepower: ref(null),
            torque: ref(null),
            transmission: ref(null),
            fuelConsumption: ref(null),
            price: ref(null),
            features: ref([])
        };
    },
    mounted() {
        this.fetchCarTypes();
        this.fetchCarBrands();
        this.fetchCarFeatures();
    },
    methods: {
        fetchCarTypes() {
            axios.get('http://127.0.0.1:8000/api/car-type')
                .then(response => {
                    this.carTypes = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchCarBrands() {
            axios.get('http://127.0.0.1:8000/api/car-brand')
                .then(response => {
                    this.carBrands = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchCarFeatures() {
            axios.get('http://127.0.0.1:8000/api/car-feature')
                .then(response => {
                    this.carFeatures = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        create() {
            this.resetFormInputErrors();

            const carData = {
                modelName: this.modelName,
                typeId: this.typeId,
                brandId: this.brandId,
                productionYear: this.productionYear,
                color: this.color,
                engineType: this.engineType,
                horsepower: this.horsepower,
                torque: this.torque,
                transmission: this.transmission,
                fuelConsumption: this.fuelConsumption,
                price: this.price,
                features: this.features
            };

            // Form Validation
            const errors = [];
            if (!carData.modelName) errors.push('modelName');
            if (carData.typeId === 0) errors.push('typeId');
            if (carData.brandId === 0) errors.push('brandId');
            if (!carData.productionYear) errors.push('productionYear');
            if (!carData.color) errors.push('color');
            if (!carData.engineType) errors.push('engineType');
            if (!carData.horsepower) errors.push('horsepower');
            if (!carData.torque) errors.push('torque');
            if (!carData.transmission) errors.push('transmission');
            if (!carData.fuelConsumption) errors.push('fuelConsumption');
            if (!carData.price) errors.push('price');

            if (errors.length > 0) {
                errors.forEach(field => {
                    const inputElement = document.querySelector(`[name='${field}']`);
                    inputElement?.classList.remove("border-gray-300");
                    inputElement?.classList.add("border-red-700");
                });
                return;
            }

            // API Request
            axios.post('http://127.0.0.1:8000/api/car/store', carData)
                .then(response => {
                    store.commit("setCarCreatedMessage");
                    this.$router.push({ name: 'CarDetail', params: { carId: response.data.created.id } });
                })
                .catch(error => {
                    const errors = error.response.data.errors;
                    for (let field in errors) {
                        const inputElement = document.querySelector(`[name='${field}']`);
                        if (inputElement) {
                            inputElement.classList.remove("border-gray-300");
                            inputElement.classList.add("border-red-700");

                            let box = inputElement.parentNode.parentNode;
                            const errorBoxId = `${field}ErrorBox`;
                            if (!document.querySelector(`#${errorBoxId}`)) {
                                let errorsContent = `<div class="w-full flex justify-end items-right flex-col gap-y-2 mt-2 text-sm text-right text-red-700" id="${errorBoxId}">`;
                                errors[field].forEach(fieldError => {
                                    errorsContent += `<span>${fieldError}</span>`;
                                });
                                errorsContent += "</div>";
                                box.innerHTML += errorsContent;
                            }
                        }
                    }
                });
        },
        resetFormInputErrors() {
            const fields = ["modelName", "typeId", "brandId", "productionYear", "color", "engineType", "horsepower", "torque", "transmission", "fuelConsumption", "price"];
            fields.forEach(field => {
                const inputElement = document.querySelector(`[name='${field}']`);
                if (inputElement) {
                    inputElement.classList.add("border-gray-300");
                    inputElement.classList.remove("border-red-700");
                    const errorBox = document.querySelector(`#${field}ErrorBox`);
                    if (errorBox) errorBox.remove();
                }
            });
        }
    },
    components: {
        Header
    },
};

</script>


<template>
    <div class="w-full h-full flex justify-center items-center my-6 px-6">
        <div class="w-full max-w-7xl">
            <Header />
            <div class="w-full flex justify-center mt-6">
                <div class="w-full bg-gray-50 rounded-md p-4 flex flex-col gap-y-4">
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Model Name:</label>
                            <input name="modelName" v-model="modelName" type="text"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Model Name...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Type:</label>
                            <select name="typeId" v-model="typeId"
                                class="w-full px-4 py-2 rounded-sm bg-gray-200 border border-gray-200">
                                <option value="0" selected disabled>Choose Type</option>
                                <option v-for="carType in carTypes" :key="carType.id" :value="carType.id">
                                    {{ carType.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Brand:</label>
                            <select name="brandId" v-model="brandId"
                                class="w-full px-4 py-2 rounded-sm bg-gray-200 border border-gray-200">
                                <option value="0" selected disabled>Choose Brand</option>
                                <option v-for="carBrand in carBrands" :key="carBrand.id" :value="carBrand.id">
                                    {{ carBrand.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Features:</label>
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div v-for="feature in carFeatures" :key="feature.id" class="flex items-center gap-2">
                                    <input type="checkbox" :value="feature.id" v-model="features" />
                                    <label>{{ feature.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Production Year:</label>
                            <input name="productionYear" v-model="productionYear" type="number"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Production Year...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Color:</label>
                            <input name="color" v-model="color" type="text"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Color...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Engine Type:</label>
                            <input name="engineType" v-model="engineType" type="text"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Engine Type...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Horsepower:</label>
                            <input name="horsepower" v-model="horsepower" type="number"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Horsepower...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Torque:</label>
                            <input name="torque" v-model="torque" type="number"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Torque...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Transmission:</label>
                            <input name="transmission" v-model="transmission" type="text"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Transmission Type...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Fuel Consumption:</label>
                            <input name="fuelConsumption" v-model="fuelConsumption" type="number"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Fuel Consumption...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Price:</label>
                            <input name="price" v-model="price" type="number"
                                class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Price...">
                        </div>
                    </div>
                    <div class="w-full flex justify-start items-center gap-4">
                        <button type="submit" class="w-full px-4 py-2 rounded-sm bg-gray-200 text-gray-700 font-medium"
                            @click="create()">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
