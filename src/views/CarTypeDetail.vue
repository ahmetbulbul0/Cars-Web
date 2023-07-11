<script>

import axios from 'axios';
import store from '../store';
import Header from './components/Header.vue';

export default {
    data() {
        return {
            item: null,
            fetchedData: false,
            updatedMessage: store.state.updatedMessage,
            createdMessage: store.state.createdMessage,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const carTypeId = this.$route.params.carTypeId;
            axios.get('http://127.0.0.1:8000/api/car-type/' + carTypeId)
                .then(response => {
                    this.item = response.data.item;
                    this.fetchedData = true
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    components: {
        Header,
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
            <div class="w-full flex justify-center mt-6" v-if="createdMessage != null">
                <div class="w-1/2 px-4 py-2 bg-green-400 text-white rounded-md">
                    <div class="w-full flex justify-start items-center gap-2">
                        <span class="text-xl flex justify-center items-center">
                            <ion-icon name="checkmark"></ion-icon>
                        </span>
                        <p class="text-sm">{{ createdMessage }}</p>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center mt-6" v-if="updatedMessage != null">
                <div class="w-1/2 px-4 py-2 bg-green-400 text-white rounded-md">
                    <div class="w-full flex justify-start items-center gap-2">
                        <span class="text-xl flex justify-center items-center">
                            <ion-icon name="checkmark"></ion-icon>
                        </span>
                        <p class="text-sm">{{ updatedMessage }}</p>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center mt-6" v-if="item != null">
                <div class="w-1/2 bg-gray-50 rounded-md p-4 flex flex-col gap-y-4">
                    <div class="w-full flex justify-start gap-4">
                        <label class="font-bold text-gray-600">Name:</label>
                        <span class="font-medium text-gray-700 break-all hyphens-auto">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>q