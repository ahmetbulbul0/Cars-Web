<script>

import axios from 'axios';
import store from '../store';
import Header from './components/Header.vue';
import TableLoadingSpinner from "./components/TableLoadingSpinner.vue";

export default {
    data() {
        return {
            items: [],
            fetchedData: false
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('http://127.0.0.1:8000/api/car')
                .then(response => {
                    this.items = response.data.data;
                    this.fetchedData = true
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
        </div>
    </div>
</template>