<script>

import axios from 'axios';
import store from '../store';
import Header from './components/Header.vue';

export default {
    data() {
        return {
            item: null,
            fetchedData: false,
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
                    this.item = response.data.item;
                    this.fetchedData = true;
                })
                .catch(error => {
                    console.error("Error fetching car brand:", error);
                });
        },
        deleteItem() {
            axios.delete(`http://127.0.0.1:8000/api/car-brand/${this.item.id}`)
                .then(() => {
                    store.commit("setCarBrandDeletedMessage", this.item.name);
                    this.$router.push({ name: 'CarBrands' });
                })
                .catch(error => {
                    console.error("Error deleting car brand:", error);
                });
        },
        cancel() {
            this.$router.push({ name: 'CarBrands' });
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
            <div class="w-full flex justify-center mt-6" v-if="item != null">
                <div class="w-1/3 bg-gray-50 rounded-md p-4 flex flex-col gap-y-4">
                    <div class="w-full flex justify-center items-center text-xl font-semibold text-gray-700">
                        <span>Are You Sure?</span>
                    </div>
                    <div class="w-full flex justify-center items-center text-sm font-medium text-gray-600">
                        <span>If you confirm, "{{ item.name }}" car brand will be deleted.</span>
                    </div>
                    <div class="w-full text-sm font-medium flex flex-col items-center gap-y-2 mt-2">
                        <button type="button"
                            class="w-2/3 px-4 py-2 rounded-l-sm bg-red-700 text-white font-medium hover:bg-red-600"
                            @click="deleteItem()">Confirm, Delete</button>
                        <button type="button"
                            class="w-2/3 px-4 py-2 rounded-r-sm bg-gray-200 text-gray-500 font-medium hover:bg-gray-300 hover:text-gray-600"
                            @click="cancel()">Cancel, Don't Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
