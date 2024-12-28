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
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const carTypeId = this.$route.params.carTypeId;
            axios.get(`http://127.0.0.1:8000/api/car-type/${carTypeId}`)
                .then(response => {
                    this.name = response.data.item.name;
                    this.fetchedData = true;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        update() {
            this.resetFormInputErrors();

            var carTypeName = this.name;

            if (carTypeName) {
                const carTypeId = this.$route.params.carTypeId;
                axios.patch(`http://127.0.0.1:8000/api/car-type/${carTypeId}`, {
                    name: carTypeName,
                }).then(response => {
                    store.commit("setCarTypeUpdatedMessage");
                    this.$router.push({ name: 'CarTypeDetail', params: { carTypeId: response.data.updated_old.id } });
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

            if (!carTypeName) {
                document.querySelector("[name='name']").classList.remove("border-gray-300");
                document.querySelector("[name='name']").classList.add("border-red-700");
            }

        },
        resetFormInputErrors() {
            document.querySelector("#nameErrorBox") ? document.querySelector("#nameErrorBox").remove() : null;
            document.querySelector("[name='name']").classList.add("border-gray-300");
            document.querySelector("[name='name']").classList.remove("border-red-700");
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
                    <div class="w-full flex justify-start items-center gap-4">
                        <button type="submit" class="w-full px-4 py-2 rounded-sm bg-gray-200 text-gray-700 font-medium"
                            @click="update()">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>