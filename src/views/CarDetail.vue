<script>

import axios from 'axios';
import Header from './components/Header.vue';

export default {
    data() {
        return {
            item: null,
            fetchedData: false
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const carId = this.$route.params.carId;
            axios.get('http://127.0.0.1:8000/api/car/' + carId)
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
            <div class="w-full flex justify-center mt-6" v-if="item != null">
                <div class="w-1/2 bg-gray-50 rounded-md p-4 flex flex-col gap-y-4">
                    <div class="w-full flex justify-start gap-4">
                        <label class="font-bold text-gray-600">Name:</label>
                        <span class="font-medium text-gray-700 break-all hyphens-auto">{{ item.name }}</span>
                    </div>
                    <div class="w-full flex justify-start gap-4">
                        <label class="font-bold text-gray-600">Type:</label>
                        <span class="font-medium text-gray-700 break-all hyphens-auto">{{ item.type.name }}</span>
                    </div>
                    <div class="w-full flex justify-start gap-4">
                        <label class="font-bold text-gray-600">Brand:</label>
                        <span class="font-medium text-gray-700 break-all hyphens-auto">{{ item.brand.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>q