<script>
import axios from 'axios';
import store from '../store';
import Header from './components/Header.vue';
import TableLoadingSpinner from "./components/TableLoadingSpinner.vue";

export default {
    data() {
        return {
            items: [],
            fetchedData: false,
            deletedMessage: store.state.deletedMessage
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

            <div class="w-full mt-4 flex justify-end gap-4 rounded-md px-2">
                <div class="w-full px-4 py-2 bg-red-600 text-white rounded-md" v-if="deletedMessage != null">
                    <div class="w-full flex justify-start items-center gap-2">
                        <span class="text-xl flex justify-center items-center">
                            <ion-icon name="trash"></ion-icon>
                        </span>
                        <p class="text-sm">{{ deletedMessage }}</p>
                    </div>
                </div>
                <RouterLink :to="{ name: 'NewCarType' }"
                    class="rounded-md px-3 py-2 text-sm font-medium text-white bg-green-800">Create</RouterLink>
            </div>

            <div class="w-full bg-gray-50 mt-4 rounded-md px-2">
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
                                <RouterLink :to="{ name: 'CarTypeDetail', params: { carTypeId: item.id } }"
                                    class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                    <ion-icon name="eye"></ion-icon>
                                </RouterLink>

                                <RouterLink :to="{ name: 'EditCarType', params: { carTypeId: item.id } }"
                                    class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                    <ion-icon name="create"></ion-icon>
                                </RouterLink>

                                <RouterLink :to="{ name: 'CarTypeDelete', params: { carTypeId: item.id } }"
                                    class="flex justify-center items-center text-gray-500 text-xl hover:text-gray-800">
                                    <ion-icon name="trash"></ion-icon>
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>