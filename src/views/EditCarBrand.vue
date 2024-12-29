<script>

import axios from 'axios';
import Header from './components/Header.vue';
import { ref } from 'vue';
import store from '../store';

export default {
    data() {
        return {
            fetchedData: false,
            name: ref(null),
            country: ref(null),
            foundedYear: ref(null),
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const carBrandId = this.$route.params.carBrandId;
            axios.get(`http://127.0.0.1:8000/api/car-brand/${carBrandId}`)
                .then(response => {
                    this.name = response.data.item.name;
                    this.country = response.data.item.country;
                    this.foundedYear = response.data.item.foundedYear;
                    this.fetchedData = true;
                })
                .catch(error => {
                    console.error("Error fetching car brand:", error);
                });
        },
        update() {
            this.resetFormInputErrors();

            const carBrandData = {
                name: this.name,
                country: this.country,
                foundedYear: this.foundedYear,
            };

            if (carBrandData.name && carBrandData.country && carBrandData.foundedYear) {
                const carBrandId = this.$route.params.carBrandId;
                axios.patch(`http://127.0.0.1:8000/api/car-brand/${carBrandId}`, carBrandData)
                    .then(response => {
                        store.commit("setCarBrandUpdatedMessage");
                        this.$router.push({ name: 'CarBrandDetail', params: { carBrandId: response.data.updated_old.id } });
                    })
                    .catch(error => {
                        const errors = error.response.data.errors;
                        if (errors.name) {
                            this.handleFieldError("name", errors.name);
                        }
                        if (errors.country) {
                            this.handleFieldError("country", errors.country);
                        }
                        if (errors.foundedYear) {
                            this.handleFieldError("foundedYear", errors.foundedYear);
                        }
                    });
            }

            if (!carBrandData.name) {
                this.markFieldAsError("name");
            }
            if (!carBrandData.country) {
                this.markFieldAsError("country");
            }
            if (!carBrandData.foundedYear) {
                this.markFieldAsError("foundedYear");
            }
        },
        resetFormInputErrors() {
            ["name", "country", "foundedYear"].forEach(field => {
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
        markFieldAsError(field) {
            const inputElement = document.querySelector(`[name='${field}']`);
            if (inputElement) {
                inputElement.classList.remove("border-gray-300");
                inputElement.classList.add("border-red-700");
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
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Name:</label>
                            <input name="name" v-model="name" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Brand Name...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Country:</label>
                            <input name="country" v-model="country" type="text"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Country...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex justify-start items-center gap-4">
                            <label class="font-bold text-gray-600 w-1/6">Founded Year:</label>
                            <input name="foundedYear" v-model="foundedYear" type="number"
                                class="w-5/6 px-4 py-2 rounded-sm outline-none border border-gray-300"
                                placeholder="Enter Founded Year...">
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
