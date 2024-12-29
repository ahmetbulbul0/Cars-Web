<script>
import axios from 'axios';
import Header from './components/Header.vue';
import { ref } from 'vue';
import store from '../store';

export default {
    data() {
        return {
            fetchedData: false,
            carTypes: null,
            carBrands: null,
            carFeatures: null,
            modelName: ref(null),
            type: ref(0),
            brand: ref(0),
            productionYear: ref(null),
            color: ref(null),
            engineType: ref(null),
            horsepower: ref(null),
            torque: ref(null),
            transmission: ref(null),
            fuelConsumption: ref(null),
            price: ref(null),
            selectedFeatures: [], // Seçilen özellikleri tutar
        };
    },
    mounted() {
        this.fetchData();
        this.fetchCarTypes();
        this.fetchCarBrands();
        this.fetchCarFeatures();
    },
    methods: {
        fetchData() {
            const carId = this.$route.params.carId;
            axios.get(`http://127.0.0.1:8000/api/car/${carId}`)
                .then(response => {
                    const item = response.data.item;
                    this.modelName = item.modelName;
                    this.type = item.type.id;
                    this.brand = item.brand.id;
                    this.productionYear = item.productionYear;
                    this.color = item.color;
                    this.engineType = item.engineType;
                    this.horsepower = item.horsepower;
                    this.torque = item.torque;
                    this.transmission = item.transmission;
                    this.fuelConsumption = item.fuelConsumption;
                    this.price = item.price;
                    this.selectedFeatures = item.features.map(feature => feature.id); // Özellikleri ID olarak al
                    this.fetchedData = true;
                })
                .catch(error => {
                    console.error("Error fetching car data:", error);
                });
        },
        fetchCarTypes() {
            axios.get('http://127.0.0.1:8000/api/car-type')
                .then(response => {
                    this.carTypes = response.data.data;
                })
                .catch(error => {
                    console.error("Error fetching car types:", error);
                });
        },
        fetchCarBrands() {
            axios.get('http://127.0.0.1:8000/api/car-brand')
                .then(response => {
                    this.carBrands = response.data.data;
                })
                .catch(error => {
                    console.error("Error fetching car brands:", error);
                });
        },
        fetchCarFeatures() {
            axios.get('http://127.0.0.1:8000/api/car-feature')
                .then(response => {
                    this.carFeatures = response.data.data;
                })
                .catch(error => {
                    console.error("Error fetching car features:", error);
                });
        },
        update() {
            this.resetFormInputErrors();

            const carData = {
                modelName: this.modelName,
                type: this.type,
                brand: this.brand,
                productionYear: this.productionYear,
                color: this.color,
                engineType: this.engineType,
                horsepower: this.horsepower,
                torque: this.torque,
                transmission: this.transmission,
                fuelConsumption: this.fuelConsumption,
                price: this.price,
                features: this.selectedFeatures, // Seçilen özellikleri gönder
            };

            const carId = this.$route.params.carId;

            axios.patch(`http://127.0.0.1:8000/api/car/${carId}`, carData)
                .then(response => {
                    store.commit("setCarUpdatedMessage");
                    this.$router.push({ name: 'CarDetail', params: { carId: response.data.updated_old.id } });
                })
                .catch(error => {
                    const errors = error.response.data.errors;
                    for (const field in errors) {
                        this.handleFieldError(field, errors[field]);
                    }
                });
        },
        resetFormInputErrors() {
            const fields = ["name", "type", "brand", "productionYear", "color", "engineType", "horsepower", "torque", "transmission", "fuelConsumption", "price"];
            fields.forEach(field => {
                const errorBox = document.querySelector(`#${field}ErrorBox`);
                if (errorBox) errorBox.remove();

                const inputElement = document.querySelector(`[name='${field}']`);
                if (inputElement) {
                    inputElement.classList.add("border-gray-300");
                    inputElement.classList.remove("border-red-700");
                }
            });
        },
        handleFieldError(field, errorMessages) {
            const inputElement = document.querySelector(`[name='${field}']`);
            if (inputElement) {
                inputElement.classList.remove("border-gray-300");
                inputElement.classList.add("border-red-700");

                const box = inputElement.parentNode.parentNode;
                const errorBoxId = `${field}ErrorBox`;

                if (!document.querySelector(`#${errorBoxId}`)) {
                    let errorsContent = `<div class="w-full flex justify-end items-right flex-col gap-y-2 mt-2 text-sm text-right text-red-700" id="${errorBoxId}">`;
                    errorMessages.forEach(errorMessage => {
                        errorsContent += `<span>${errorMessage}</span>`;
                    });
                    errorsContent += "</div>";
                    box.innerHTML += errorsContent;
                }
            }
        },
    },
    components: {
        Header,
    },
};
</script>


<template>
    <div class="w-full h-full flex justify-center items-center my-6 px-6">
        <div class="w-full max-w-7xl">
            <Header />
            <div class="w-full flex justify-center mt-6" v-if="fetchedData == false">
                <div class="w-1/2 bg-gray-50 rounded-md p-4 flex justify-center items-center h-24">
                    <img class="h-12 w-12" src="../assets/gif/1488.gif" alt="Loading...">
                </div>
            </div>
            <div class="w-full flex justify-center mt-6" v-if="fetchedData == true">
                <div class="w-1/2 bg-gray-50 rounded-md p-4 flex flex-col gap-y-4">
                    <!-- Model Name -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Model Name:</label>
                            <input name="modelName" v-model="modelName" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Model Name...">
                        </div>
                    </div>
                    <!-- Type -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Type:</label>
                            <select name="type" v-model="type"
                                class="w-5/6 px-4 py-2 rounded-sm bg-gray-200 border border-gray-200">
                                <option value="0" disabled>Choose Type</option>
                                <option v-for="carType in carTypes" :key="carType.id" :value="carType.id">
                                    {{ carType.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!-- Brand -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Brand:</label>
                            <select name="brand" v-model="brand"
                                class="w-5/6 px-4 py-2 rounded-sm bg-gray-200 border border-gray-200">
                                <option value="0" disabled>Choose Brand</option>
                                <option v-for="carBrand in carBrands" :key="carBrand.id" :value="carBrand.id">
                                    {{ carBrand.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!-- Features -->
                    <div>
                        <div class="w-full flex flex-col gap-y-2">
                            <label class="font-bold text-gray-600">Features:</label>
                            <div class="grid grid-cols-2 gap-2">
                                <div v-for="feature in carFeatures" :key="feature.id">
                                    <label class="flex items-center gap-x-2">
                                        <input type="checkbox" :value="feature.id" v-model="selectedFeatures"
                                            class="form-checkbox">
                                        <span>{{ feature.name }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Production Year -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Production Year:</label>
                            <input name="productionYear" v-model="productionYear" type="number"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Production Year">
                        </div>
                    </div>
                    <!-- Color -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Color:</label>
                            <input name="color" v-model="color" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Color">
                        </div>
                    </div>
                    <!-- Engine Type -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Engine Type:</label>
                            <input name="engineType" v-model="engineType" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Engine Type">
                        </div>
                    </div>
                    <!-- Horsepower -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Horsepower:</label>
                            <input name="horsepower" v-model="horsepower" type="number"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Horsepower">
                        </div>
                    </div>
                    <!-- Torque -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Torque:</label>
                            <input name="torque" v-model="torque" type="number"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Torque">
                        </div>
                    </div>
                    <!-- Transmission -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Transmission:</label>
                            <input name="transmission" v-model="transmission" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Transmission">
                        </div>
                    </div>
                    <!-- Fuel Consumption -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Fuel Consumption:</label>
                            <input name="fuelConsumption" v-model="fuelConsumption" type="number"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Fuel Consumption (L/100km)">
                        </div>
                    </div>
                    <!-- Price -->
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Price:</label>
                            <input name="price" v-model="price" type="number"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Price">
                        </div>
                    </div>
                    <!-- Submit Button -->
                    <div class="w-full flex justify-start items-center gap-4">
                        <button type="submit" class="w-full px-4 py-2 rounded-sm bg-gray-200 text-gray-700 font-medium"
                            @click="update()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
