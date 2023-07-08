<script>
import axios from 'axios';
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
            axios.get('http://127.0.0.1:8000/api/car-type')
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
    }
};
</script>

<template>
    <div class="w-full h-full flex justify-center items-center my-6">
        <div class="w-2/3">
            <Header />
            <div class="w-full bg-gray-50 mt-6 rounded-md px-2">
                <table class="table-auto w-full">
                    <thead class="text-sm font-semibold capitalize text-gray-400">
                        <tr>
                            <th class="py-2 px-8 whitespace-nowrap border-b-2 w-10/12">
                                <div class="font-semibold text-left">name</div>
                            </th>
                            <th class="py-2 px-8 whitespace-nowrap border-b-2 w-2/12">
                                <div class="font-semibold text-left">action</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-gray-200 capitalize">
                        <TableLoadingSpinner :fetchedData="fetchedData" />
                        <tr v-for="item in items" :key="item.id">
                            <td class="py-3 px-8 whitespace-nowrap">
                                <div class="text-left font-medium text-gray-950">{{ item.name }}</div>
                            </td>
                            <td class="py-3 px-8 whitespace-nowrap flex justify-start items-center gap-2">
                                <a href="#soon"
                                    class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800"><ion-icon
                                        name="eye"></ion-icon></a>
                                <a href="#soon"
                                    class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800"><ion-icon
                                        name="create"></ion-icon></a>
                                <a href="#soon"
                                    class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800"><ion-icon
                                        name="trash"></ion-icon></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>