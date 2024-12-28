<script>

import axios from 'axios';
import Header from './components/Header.vue';
import { ref } from 'vue';
import store from '../store';

export default {
    data() {
        return {
            name: ref(null),
            country: ref(null),
            foundedYear: ref(null),
        };
    },
    methods: {
        create() {

            this.resetFormInputErrors();

            var carBrandName = this.name;
            var carBrandCountry = this.country;
            var carBrandFoundedYear = this.foundedYear;

            if (carBrandName != null && carBrandCountry != null && carBrandFoundedYear != null) {

                axios.post('http://127.0.0.1:8000/api/car-brand/store', {
                    name: carBrandName,
                    country: carBrandCountry,
                    foundedYear: carBrandFoundedYear,
                }).then(response => {
                    store.commit("setCarBrandCreatedMessage");
                    this.$router.push({ name: 'CarBrandDetail', params: { carBrandId: response.data.created.id } });
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

                    if (errors.country) {
                        document.querySelector("[name='country']").classList.remove("border-gray-300");
                        document.querySelector("[name='country']").classList.add("border-red-700");

                        let box = document.querySelector("[name='country']").parentNode.parentNode;
                        var errorsContent = `<div class="w-full flex justify-end items-right flex-col gap-y-2 mt-2 text-sm text-right text-red-700" id="countryErrorBox">`;

                        errors.country.forEach(countryError => {
                            errorsContent = errorsContent + `<span>${countryError}</span>`;
                        });

                        errorsContent = errorsContent + "</div>";
                        box.innerHTML = box.innerHTML + errorsContent;
                    }

                    if (errors.foundedYear) {
                        document.querySelector("[name='foundedYear']").classList.remove("border-gray-300");
                        document.querySelector("[name='foundedYear']").classList.add("border-red-700");

                        let box = document.querySelector("[name='foundedYear']").parentNode.parentNode;
                        var errorsContent = `<div class="w-full flex justify-end items-right flex-col gap-y-2 mt-2 text-sm text-right text-red-700" id="foundedYearErrorBox">`;

                        errors.foundedYear.forEach(foundedYearError => {
                            errorsContent = errorsContent + `<span>${foundedYearError}</span>`;
                        });

                        errorsContent = errorsContent + "</div>";
                        box.innerHTML = box.innerHTML + errorsContent;
                    }
                });
            }

            if (carBrandName == null) {
                document.querySelector("[name='name']").classList.remove("border-gray-300");
                document.querySelector("[name='name']").classList.add("border-red-700");
            }

            if (carBrandCountry == null) {
                document.querySelector("[name='country']").classList.remove("border-gray-300");
                document.querySelector("[name='country']").classList.add("border-red-700");
            }

            if (carBrandFoundedYear == null) {
                document.querySelector("[name='foundedYear']").classList.remove("border-gray-300");
                document.querySelector("[name='foundedYear']").classList.add("border-red-700");
            }

        },
        resetFormInputErrors() {
            document.querySelector("#nameErrorBox") ? document.querySelector("#nameErrorBox").remove() : null;
            document.querySelector("[name='name']").classList.add("border-gray-300");
            document.querySelector("[name='name']").classList.remove("border-red-700");

            document.querySelector("#countryErrorBox") ? document.querySelector("#countryErrorBox").remove() : null;
            document.querySelector("[name='country']").classList.add("border-gray-300");
            document.querySelector("[name='country']").classList.remove("border-red-700");

            document.querySelector("#foundedYearErrorBox") ? document.querySelector("#foundedYearErrorBox").remove() : null;
            document.querySelector("[name='foundedYear']").classList.add("border-gray-300");
            document.querySelector("[name='foundedYear']").classList.remove("border-red-700");
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
                            <label class="font-bold text-gray-600 w-full">Name:</label>
                            <input name="name" v-model="name" type="text" class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300" placeholder="Enter Brand Name...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Country:</label>
                            <input name="country" v-model="country" type="text" class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300" placeholder="Enter Country...">
                        </div>
                    </div>
                    <div>
                        <div class="w-full flex flex-col items-start gap-2">
                            <label class="font-bold text-gray-600 w-full">Founded Year:</label>
                            <input name="foundedYear" v-model="foundedYear" type="number" class="w-full px-4 py-2 rounded-sm outline-none border border-gray-300" placeholder="Enter Founded Year...">
                        </div>
                    </div>
                    <div class="w-full flex justify-start items-center gap-4">
                        <button type="submit" class="w-full px-4 py-2 rounded-sm bg-gray-200 text-gray-700 font-medium" @click="create()">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
