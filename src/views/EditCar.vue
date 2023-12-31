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
            name: ref(null),
            type: ref(0),
            brand: ref(0)
        };
    },
    mounted() {
        this.fetchData();
        this.fetchCarTypes();
        this.fetchCarBrands();
    },
    methods: {
        fetchData() {
            const carId = this.$route.params.carId;
            axios.get('http://127.0.0.1:8000/api/car/' + carId)
                .then(response => {
                    this.name = response.data.item.name;
                    this.type = response.data.item.type.id;
                    this.brand = response.data.item.brand.id;
                    this.fetchedData = true;
                })
                .catch(error => {
                    console.error(error);
                });
        },
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
        update() {
            this.resetFormInputErrors();

            var carName = this.name;
            var carType = this.type
            var carBrand = this.brand;

            if (carName && carType != 0 && carBrand != 0) {
                const carId = this.$route.params.carId;
                axios.patch(`http://127.0.0.1:8000/api/car/${carId}`, {
                    name: carName,
                    type: carType,
                    brand: carBrand
                }).then(response => {
                    store.commit("setCarUpdatedMessage");
                    this.$router.push({ name: 'CarDetail', params: { carId: response.data.updated_old.id } });
                }).catch(error => {
                    var errors = error.response.data.errors;
                    if (errors.name) {
                        document.querySelector("[name='name']").classList.remove("border-gray-300");
                        document.querySelector("[name='name']").classList.add("border-red-700");

                        let box = document.querySelector("[name='name']").parentNode.parentNode;
                        var errorsContent = `<div class="w-full flex justify-end items-right flex-col gap-y-2 mt-2 text-sm text-right text-red-700" id="nameErrorBox">`;

                        errors.name.forEach(nameError => {
                            errorsContent = errorsContent + `<span>${nameError}</span>`;
                        });

                        errorsContent = errorsContent + "</div>";
                        box.innerHTML = box.innerHTML + errorsContent;
                    }
                });
            }

            if (!carName) {
                document.querySelector("[name='name']").classList.remove("border-gray-300");
                document.querySelector("[name='name']").classList.add("border-red-700");
            }

            if (carType == 0) {
                document.querySelector("[name='type']").classList.remove("border-gray-200");
                document.querySelector("[name='type']").classList.add("border-red-700");
            }

            if (carBrand == 0) {
                document.querySelector("[name='brand']").classList.remove("border-gray-200");
                document.querySelector("[name='brand']").classList.add("border-red-700");
            }

        },
        resetFormInputErrors() {
            document.querySelector("#nameErrorBox") ? document.querySelector("#nameErrorBox").remove() : null;
            document.querySelector("[name='name']").classList.add("border-gray-300");
            document.querySelector("[name='name']").classList.remove("border-red-700");
            document.querySelector("[name='type']").classList.add("border-gray-200");
            document.querySelector("[name='type']").classList.remove("border-red-700");
            document.querySelector("[name='brand']").classList.add("border-gray-200");
            document.querySelector("[name='brand']").classList.remove("border-red-700");
        }
    },
    components: {
        Header
    },
};

</script>

<template>
    <div class="w-full h-full flex justify-center items-center my-6">
        <div class="w-2/3">
            <Header />
            <div class="w-full flex justify-center mt-6" v-if="fetchedData == false">
                <div class="w-1/2 bg-gray-50 rounded-md p-4 flex justify-center items-center h-24">
                    <img class="h-12 w-12" src="../assets/gif/1488.gif" alt="">
                </div>
            </div>
            <div class="w-full flex justify-center mt-6" v-if="fetchedData == true">
                <div class="w-1/2 bg-gray-50 rounded-md p-4 flex flex-col gap-y-4">
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Name:</label>
                            <input name="name" v-model="name" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Something...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Type:</label>
                            <select name="type" v-model="type"
                                class="w-5/6 px-4 py-2 rounded-sm bg-gray-200 border border-gray-200">
                                <option value="0" disabled>Choose Type</option>
                                <option v-for="carType in carTypes" :key="carType.id" :value="carType.id">{{ carType.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Brand:</label>
                            <select name="brand" v-model="brand"
                                class="w-5/6 px-4 py-2 rounded-sm bg-gray-200 border border-gray-200">
                                <option value="0" disabled>Choose Brand</option>
                                <option v-for="carBrand in carBrands" :key="carBrand.id" :value="carBrand.id">{{
                                    carBrand.name
                                }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex justify-start items-center gap-4">
                        <button type="submit" class="w-full px-4 py-2 rounded-sm bg-gray-200 text-gray-700 font-medium"
                            @click="update()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>